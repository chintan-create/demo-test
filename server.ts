import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');
const WP_THEME_DIR = path.resolve(__dirname, 'wp-theme/flo');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, '[]', 'utf-8');
  }
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(
      CONFIG_FILE,
      JSON.stringify({ googleSheetWebhook: process.env.GOOGLE_SHEETS_WEBHOOK_URL || '' }, null, 2),
      'utf-8'
    );
  }
}

function readSubmissions() {
  ensureDataDir();
  try {
    return JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeSubmissions(list: unknown[]) {
  ensureDataDir();
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf-8');
}

function readConfig(): { googleSheetWebhook: string } {
  ensureDataDir();
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  } catch {
    return { googleSheetWebhook: '' };
  }
}

function writeConfig(cfg: { googleSheetWebhook: string }) {
  ensureDataDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf-8');
}

function addDirToZip(zip: JSZip, dirPath: string, zipFolderPrefix: string) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.posix.join(zipFolderPrefix, entry.name);
    if (entry.isDirectory()) {
      addDirToZip(zip, fullPath, relPath);
    } else {
      zip.file(relPath, fs.readFileSync(fullPath));
    }
  }
}

async function startServer() {
  ensureDataDir();
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // 1. Geolocation API: Global English default; auto French for CA & FR
  app.get('/api/geo', async (req, res) => {
    const queryGeo = typeof req.query.geo === 'string' ? req.query.geo.toUpperCase() : '';
    let country = queryGeo;

    if (!country) {
      const headerCountry =
        (req.headers['cf-ipcountry'] as string) ||
        (req.headers['x-appengine-country'] as string) ||
        (req.headers['x-vercel-ip-country'] as string) ||
        (req.headers['x-country-code'] as string) ||
        '';
      if (headerCountry && headerCountry !== 'ZZ') {
        country = headerCountry.toUpperCase();
      }
    }

    // Optional fast IP check if no proxy header is present (strict 550ms timeout)
    if (!country) {
      const forwardedFor = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim();
      const clientIp = forwardedFor || req.socket.remoteAddress || '';
      const isLocal =
        !clientIp ||
        clientIp === '127.0.0.1' ||
        clientIp === '::1' ||
        clientIp.startsWith('10.') ||
        clientIp.startsWith('192.168.');

      if (!isLocal) {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 550);
          const geoResp = await fetch(`https://ipapi.co/${encodeURIComponent(clientIp)}/country/`, {
            signal: controller.signal,
          });
          clearTimeout(timer);
          if (geoResp.ok) {
            const code = (await geoResp.text()).trim().toUpperCase();
            if (/^[A-Z]{2}$/.test(code)) {
              country = code;
            }
          }
        } catch {
          // Fallback cleanly to default global routing
        }
      }
    }

    if (!country) {
      country = 'US';
    }

    const locale = country === 'CA' || country === 'FR' ? 'fr' : 'en';
    res.json({ country, locale });
  });

  // 2. Google Sheets Webhook Config
  app.get('/api/sheets-config', (_req, res) => {
    res.json(readConfig());
  });

  app.post('/api/sheets-config', (req, res) => {
    const url = typeof req.body?.googleSheetWebhook === 'string' ? req.body.googleSheetWebhook.trim() : '';
    writeConfig({ googleSheetWebhook: url });
    res.json({ ok: true, googleSheetWebhook: url });
  });

  // 3. Contact Form 7 Submissions -> Persistent Sheet Store + Live Google Sheets Sync
  app.get('/api/submissions', (_req, res) => {
    res.json({ submissions: readSubmissions() });
  });

  app.delete('/api/submissions', (_req, res) => {
    writeSubmissions([]);
    res.json({ ok: true });
  });

  app.post('/api/submissions', async (req, res) => {
    const {
      firstName = '',
      lastName = '',
      workEmail = '',
      companyName = '',
      describesYou = '',
      anythingElse = '',
      locale = 'en',
      country = 'US',
    } = req.body || {};

    if (!String(firstName).trim() || !String(lastName).trim() || !String(workEmail).trim() || !String(companyName).trim()) {
      return res.status(400).json({ error: 'Please complete all required fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(workEmail).trim())) {
      return res.status(400).json({ error: 'Please enter a valid work email address.' });
    }

    const cfg = readConfig();
    let sheetSynced = false;
    let sheetStatus = 'Recorded in local testable Sheet log';

    const row = {
      id: `cf7_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      workEmail: String(workEmail).trim(),
      companyName: String(companyName).trim(),
      describesYou: String(describesYou).trim() || 'Not specified',
      anythingElse: String(anythingElse).trim(),
      locale: locale === 'fr' ? 'fr' : 'en',
      country: String(country || 'US').toUpperCase(),
      sheetSynced: false,
      sheetStatus,
    };

    if (cfg.googleSheetWebhook) {
      try {
        const hookRes = await fetch(cfg.googleSheetWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(row),
        });
        if (hookRes.ok) {
          sheetSynced = true;
          sheetStatus = 'Synced to live Google Sheet';
        } else {
          sheetStatus = `Saved locally (Google Sheet HTTP ${hookRes.status})`;
        }
      } catch {
        sheetStatus = 'Saved locally (Google Sheet webhook unreachable)';
      }
    }

    row.sheetSynced = sheetSynced;
    row.sheetStatus = sheetStatus;

    const current = readSubmissions();
    current.unshift(row);
    writeSubmissions(current.slice(0, 100));

    return res.status(201).json({ ok: true, submission: row });
  });

  // 4. Export Custom WordPress 6.7+ Theme (.zip) -> FLO
  app.get('/api/flo.zip', async (_req, res) => {
    try {
      const zip = new JSZip();
      if (fs.existsSync(WP_THEME_DIR)) {
        addDirToZip(zip, WP_THEME_DIR, 'flo');
      }
      const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="flo.zip"');
      res.send(buffer);
    } catch (err) {
      console.error('Theme download error:', err);
      res.status(500).json({ error: 'Unable to package FLO WordPress theme.' });
    }
  });

  app.post('/api/export-theme', async (req, res) => {
    try {
      const zip = new JSZip();
      if (fs.existsSync(WP_THEME_DIR)) {
        addDirToZip(zip, WP_THEME_DIR, 'flo');
      }

      const { tokens, icons, contentOverrides } = req.body || {};
      if (tokens) {
        zip.file(
          'flo/inc/customizer-defaults.json',
          JSON.stringify({ tokens, icons, contentOverrides }, null, 2)
        );
      }

      const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="flo.zip"');
      res.send(buffer);
    } catch (err) {
      console.error('Theme export error:', err);
      res.status(500).json({ error: 'Unable to package FLO WordPress theme.' });
    }
  });

  // Mount Vite middleware in dev or serve dist/ in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
