import React, { useEffect, useState } from 'react';
import {
  X,
  Palette,
  Type,
  MonitorSmartphone,
  FileSpreadsheet,
  Download,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Trash2,
} from 'lucide-react';
import type {
  IconName,
  IconOverrides,
  Locale,
  PageContent,
  ThemeTokens,
} from '../data/translations';

export type CustomizerTab = 'tokens' | 'content' | 'tester' | 'sheets' | 'export';
export type ViewportPreview = 'responsive' | '1080' | '390';

export interface FormSubmission {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  companyName: string;
  describesYou: string;
  anythingElse: string;
  locale: Locale;
  country: string;
  sheetSynced: boolean;
  sheetStatus: string;
}

interface ThemeCustomizerDrawerProps {
  isOpen: boolean;
  activeTab: CustomizerTab;
  onTabChange: (tab: CustomizerTab) => void;
  onClose: () => void;
  tokens: ThemeTokens;
  onChangeTokens: (next: ThemeTokens) => void;
  icons: IconOverrides;
  onChangeIcons: (next: IconOverrides) => void;
  content: PageContent;
  onUpdateContentField: (section: string, key: string, value: string) => void;
  onResetAll: () => void;
  viewportMode: ViewportPreview;
  onChangeViewportMode: (mode: ViewportPreview) => void;
  geoOverride: string;
  onSimulateGeo: (countryCode: string) => void;
  detectedCountry: string;
  locale: Locale;
  submissions: FormSubmission[];
  onRefreshSubmissions: () => void;
  onClearSubmissions: () => void;
  googleSheetWebhook: string;
  onSaveWebhook: (url: string) => Promise<void>;
}

const ICON_CHOICES: { value: IconName; label: string }[] = [
  { value: 'check', label: 'Checkmark' },
  { value: 'check-circle', label: 'Check Circle' },
  { value: 'sparkles', label: 'Sparkles' },
  { value: 'split-panel', label: 'Modernize / Split' },
  { value: 'laptop-code', label: 'Laptop </>' },
  { value: 'clipboard-code', label: 'Clipboard </>' },
  { value: 'foundry-growth', label: 'Foundry Stack' },
  { value: 'shield', label: 'Shield' },
  { value: 'code', label: 'Code </>' },
  { value: 'file-code', label: 'File Code' },
  { value: 'flask', label: 'Flask / TDD' },
  { value: 'git-branch', label: 'Git Branch' },
  { value: 'layers', label: 'Layers' },
  { value: 'book', label: 'Blueprint Book' },
  { value: 'cpu', label: 'CPU / AI' },
  { value: 'workflow', label: 'Workflow' },
  { value: 'rocket', label: 'Rocket' },
  { value: 'arrow-up-circle', label: 'Arrow Up Circle' },
  { value: 'users', label: 'Users' },
  { value: 'award', label: 'Award' },
];

const APPS_SCRIPT_SNIPPET = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "First Name", "Last Name", "Work Email", "Company", "Profile", "Notes", "Locale", "Country"]);
  }
  sheet.appendRow([
    data.createdAt || new Date().toISOString(),
    data.firstName,
    data.lastName,
    data.workEmail,
    data.companyName,
    data.describesYou,
    data.anythingElse,
    data.locale,
    data.country
  ]);
  return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(ContentService.MimeType.JSON);
}`;

export function ThemeCustomizerDrawer({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
  tokens,
  onChangeTokens,
  icons,
  onChangeIcons,
  content,
  onUpdateContentField,
  onResetAll,
  viewportMode,
  onChangeViewportMode,
  geoOverride,
  onSimulateGeo,
  detectedCountry,
  locale,
  submissions,
  onRefreshSubmissions,
  onClearSubmissions,
  googleSheetWebhook,
  onSaveWebhook,
}: ThemeCustomizerDrawerProps) {
  const [webhookInput, setWebhookInput] = useState(googleSheetWebhook);
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [testSending, setTestSending] = useState(false);

  useEffect(() => {
    setWebhookInput(googleSheetWebhook);
  }, [googleSheetWebhook]);

  if (!isOpen) return null;

  const handleDownloadThemeZip = async () => {
    setExporting(true);
    try {
      const response = await fetch('/api/export-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens, icons, contentOverrides: content }),
      });
      if (!response.ok) throw new Error('Failed to export FLO theme');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'flo.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  const handleSendTestSubmission = async () => {
    setTestSending(true);
    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: locale === 'fr' ? 'Camille' : 'Jordan',
          lastName: locale === 'fr' ? 'Tremblay' : 'Hayes',
          workEmail: 'test@healthtech-demo.com',
          companyName: 'NorthStar Clinical AI',
          describesYou: content.contact.roleOptions[0],
          anythingElse: 'Automated test submission verifying CF7 + Google Sheets sync.',
          locale,
          country: detectedCountry,
        }),
      });
      onRefreshSubmissions();
    } finally {
      setTestSending(false);
    }
  };

  const handleDownloadCsv = () => {
    const header = [
      'Timestamp',
      'First Name',
      'Last Name',
      'Work Email',
      'Company',
      'Profile',
      'Notes',
      'Locale',
      'Country',
      'Sheet Sync',
    ];
    const rows = submissions.map((s) =>
      [
        s.createdAt,
        s.firstName,
        s.lastName,
        s.workEmail,
        s.companyName,
        s.describesYou,
        s.anythingElse,
        s.locale,
        s.country,
        s.sheetStatus,
      ]
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    );
    const csv = [header.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cf7-google-sheet-submissions.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="FLO WordPress Theme Customizer & Tester"
        className="relative z-10 w-full max-w-[470px] h-full bg-white text-[#1C1513] shadow-2xl flex flex-col border-l border-[#E2DACB]"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2DACB] bg-[#FAF6EC]">
          <div>
            <h2 className="font-serif-display font-bold text-lg text-[#1C1513]">
              FLO — WordPress Theme Studio
            </h2>
            <p className="text-xs text-[#584D46]">
              Theme: FLO (WP 6.7+) · CF7 · Google Sheets · CA/FR GeoIP
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetAll}
              title="Reset customizations to Figma defaults"
              className="w-9 h-9 rounded-lg border border-[#E2DACB] flex items-center justify-center hover:bg-black/5 cursor-pointer"
              aria-label="Reset customizations"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-lg border border-[#E2DACB] flex items-center justify-center hover:bg-black/5 cursor-pointer"
              aria-label="Close FLO Theme Studio"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 border-b border-[#E2DACB] bg-[#F4EFE3] text-[11px] font-semibold">
          {[
            { id: 'tokens', label: 'Colors/Bg', icon: Palette },
            { id: 'content', label: 'Icons/Img', icon: Type },
            { id: 'tester', label: 'Geo/View', icon: MonitorSmartphone },
            { id: 'sheets', label: 'Sheets', icon: FileSpreadsheet },
            { id: 'export', label: 'FLO Zip', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id as CustomizerTab)}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 border-b-2 transition-colors cursor-pointer ${
                  active
                    ? 'border-[#5F1120] bg-white text-[#5F1120]'
                    : 'border-transparent text-[#584D46] hover:text-[#1C1513]'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
          {activeTab === 'tokens' && (
            <div className="space-y-4">
              <p className="text-xs text-[#584D46]">
                Change any background, accent color, text ink, border color, border width, or corner
                radius live. Everything exports directly into <code>flo/theme.json</code> &amp;{' '}
                <code>flo/inc/customizer.php</code>.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: 'Page Background', key: 'bg' as const },
                  { label: 'Card Surface', key: 'surface' as const },
                  { label: 'Hero Headline', key: 'headlineColor' as const },
                  { label: 'Primary Burgundy', key: 'burgundy' as const },
                  { label: 'Amber Accent', key: 'amber' as const },
                  { label: 'Service 2 Cyan', key: 'service2Accent' as const },
                  { label: 'Olive Leaf', key: 'olive' as const },
                  { label: 'Body Text Ink', key: 'ink' as const },
                  { label: 'Border Color', key: 'borderColor' as const },
                  { label: 'Footer Background', key: 'footerBg' as const },
                ].map((field) => (
                  <label
                    key={field.key}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-[#E2DACB] bg-[#FAF6EC]/60"
                  >
                    <span className="text-xs font-medium">{field.label}</span>
                    <input
                      type="color"
                      value={tokens[field.key]}
                      onChange={(e) =>
                        onChangeTokens({ ...tokens, [field.key]: e.target.value })
                      }
                      className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
                    />
                  </label>
                ))}
              </div>

              <div className="space-y-3 pt-2 border-t border-[#E2DACB]">
                <label className="block">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Border Width</span>
                    <span>{tokens.borderWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={4}
                    step={1}
                    value={tokens.borderWidth}
                    onChange={(e) =>
                      onChangeTokens({ ...tokens, borderWidth: Number(e.target.value) })
                    }
                    className="w-full accent-[#5F1120]"
                  />
                </label>

                <label className="block">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Card Corner Radius</span>
                    <span>{tokens.cardRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={32}
                    step={2}
                    value={tokens.cardRadius}
                    onChange={(e) =>
                      onChangeTokens({ ...tokens, cardRadius: Number(e.target.value) })
                    }
                    className="w-full accent-[#5F1120]"
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#584D46]">
                  Editable Text ({locale.toUpperCase()})
                </h3>
                <label className="block">
                  <span className="block text-xs font-semibold mb-1">Hero Eyebrow</span>
                  <input
                    type="text"
                    value={content.hero.eyebrow}
                    onChange={(e) => onUpdateContentField('hero', 'eyebrow', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2DACB]"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-semibold mb-1">Hero Headline</span>
                  <input
                    type="text"
                    value={content.hero.headline}
                    onChange={(e) => onUpdateContentField('hero', 'headline', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2DACB]"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-semibold mb-1">Hero Subheadline</span>
                  <textarea
                    rows={2}
                    value={content.hero.subheadline}
                    onChange={(e) => onUpdateContentField('hero', 'subheadline', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2DACB]"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-semibold mb-1">Primary CTA Label</span>
                  <input
                    type="text"
                    value={content.hero.primaryCta}
                    onChange={(e) => onUpdateContentField('hero', 'primaryCta', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2DACB]"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-semibold mb-1">Contact Form Title</span>
                  <input
                    type="text"
                    value={content.contact.headline}
                    onChange={(e) => onUpdateContentField('contact', 'headline', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E2DACB]"
                  />
                </label>
              </div>

              <div className="pt-3 border-t border-[#E2DACB] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#584D46]">
                  All Customizable Icons
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {(
                    [
                      { key: 'heroBadge1', label: 'Hero Badge 1' },
                      { key: 'heroBadge2', label: 'Hero Badge 2' },
                      { key: 'heroBadge3', label: 'Hero Badge 3' },
                      { key: 'pillar1', label: 'Craft Card 1' },
                      { key: 'pillar2', label: 'Craft Card 2' },
                      { key: 'pillar3', label: 'Craft Card 3' },
                      { key: 'service1', label: 'Service 1' },
                      { key: 'service2', label: 'Service 2' },
                      { key: 'service3', label: 'Service 3' },
                      { key: 'fde1', label: 'FDE Option 1' },
                      { key: 'fde2', label: 'FDE Option 2' },
                      { key: 'fde3', label: 'FDE Option 3' },
                    ] as const
                  ).map((item) => (
                    <label key={item.key} className="block">
                      <span className="block text-[11px] font-medium mb-1">{item.label}</span>
                      <select
                        value={icons[item.key]}
                        onChange={(e) =>
                          onChangeIcons({
                            ...icons,
                            [item.key]: e.target.value as IconName,
                          })
                        }
                        className="w-full px-2.5 py-2 text-xs rounded-lg border border-[#E2DACB] bg-white"
                      >
                        {ICON_CHOICES.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2DACB] space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#584D46]">
                  Custom Image URLs (Replace Any Slot)
                </h3>
                {[
                  { label: 'Hero Showcase Image', key: 'heroImageUrl' as const },
                  { label: 'Case Study 1 Thumbnail', key: 'case1ImageUrl' as const },
                  { label: 'Case Study 2 Thumbnail', key: 'case2ImageUrl' as const },
                  { label: 'Case Study 3 Thumbnail', key: 'case3ImageUrl' as const },
                  { label: 'Plugin Spotlight Graphic', key: 'pluginImageUrl' as const },
                  { label: 'Team Grid Image', key: 'teamImageUrl' as const },
                  { label: 'Contact Left Panel Image', key: 'contactImageUrl' as const },
                  { label: 'Blog Post 1 Thumbnail', key: 'blog1ImageUrl' as const },
                  { label: 'Blog Post 2 Thumbnail', key: 'blog2ImageUrl' as const },
                  { label: 'Blog Post 3 Thumbnail', key: 'blog3ImageUrl' as const },
                ].map((imgField) => (
                  <label key={imgField.key} className="block">
                    <span className="block text-[11px] font-medium mb-1">{imgField.label}</span>
                    <input
                      type="url"
                      placeholder="https://... (optional)"
                      value={tokens[imgField.key]}
                      onChange={(e) =>
                        onChangeTokens({ ...tokens, [imgField.key]: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E2DACB] bg-white"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tester' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#584D46] mb-2">
                  Breakpoint Preview (1080px Desktop / 390px Mobile)
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'responsive', label: 'Full Screen' },
                    { id: '1080', label: '1080px Desktop' },
                    { id: '390', label: '390px Mobile' },
                  ].map((vp) => (
                    <button
                      key={vp.id}
                      type="button"
                      onClick={() => onChangeViewportMode(vp.id as ViewportPreview)}
                      className={`py-2.5 px-2 rounded-xl border text-xs font-semibold cursor-pointer ${
                        viewportMode === vp.id
                          ? 'bg-[#5F1120] text-white border-[#5F1120]'
                          : 'border-[#E2DACB] hover:bg-[#FAF6EC]'
                      }`}
                    >
                      {vp.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2DACB]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#584D46] mb-1">
                  Geolocation Language Routing Test
                </h3>
                <p className="text-xs text-[#584D46] mb-3">
                  Global visitors open in <strong>English</strong>. Visitors from{' '}
                  <strong>Canada (CA)</strong> or <strong>France (FR)</strong> automatically receive{' '}
                  <strong>French</strong>. Active country: <strong>{detectedCountry}</strong> →{' '}
                  <strong>{locale.toUpperCase()}</strong>.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { code: '', label: 'Auto GeoIP Detect' },
                    { code: 'US', label: 'Simulate US (EN)' },
                    { code: 'CA', label: 'Simulate Canada (FR)' },
                    { code: 'FR', label: 'Simulate France (FR)' },
                  ].map((geo) => (
                    <button
                      key={geo.label}
                      type="button"
                      onClick={() => onSimulateGeo(geo.code)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-left cursor-pointer ${
                        geoOverride === geo.code
                          ? 'bg-[#5F1120] text-white border-[#5F1120]'
                          : 'border-[#E2DACB] hover:bg-[#FAF6EC]'
                      }`}
                    >
                      {geo.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sheets' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#FAF6EC] border border-[#E2DACB] space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F1120]">
                  Google Sheets Live Webhook Sync
                </h3>
                <p className="text-xs text-[#584D46]">
                  Every Contact Form 7 submission saves locally to the testable log below AND
                  forwards immediately to your Google Sheet Apps Script Web App URL if configured.
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={webhookInput}
                    onChange={(e) => setWebhookInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#E2DACB] bg-white"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      await onSaveWebhook(webhookInput);
                      setWebhookSaved(true);
                      setTimeout(() => setWebhookSaved(false), 2000);
                    }}
                    className="px-3 py-2 rounded-lg bg-[#5F1120] text-white text-xs font-semibold cursor-pointer"
                  >
                    {webhookSaved ? 'Saved' : 'Connect'}
                  </button>
                </div>

                <details className="text-xs pt-1">
                  <summary className="cursor-pointer font-semibold text-[#5F1120]">
                    View 1-minute Google Apps Script setup code
                  </summary>
                  <div className="mt-2 relative">
                    <pre className="p-2.5 rounded-lg bg-[#1C1513] text-[#FAF6EC] text-[10px] overflow-x-auto">
                      {APPS_SCRIPT_SNIPPET}
                    </pre>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(APPS_SCRIPT_SNIPPET);
                        setCopiedScript(true);
                        setTimeout(() => setCopiedScript(false), 1800);
                      }}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#5F1120] cursor-pointer"
                    >
                      {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScript ? 'Copied Apps Script' : 'Copy Apps Script'}</span>
                    </button>
                  </div>
                </details>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#584D46]">
                  Sheet Rows ({submissions.length})
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={testSending}
                    onClick={handleSendTestSubmission}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#DDA132] text-[#1C1513] text-xs font-semibold cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-3 h-3" />
                    <span>{testSending ? 'Testing...' : 'Send Test Row'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadCsv}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E2DACB] text-xs font-semibold cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>CSV</span>
                  </button>
                  {submissions.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearSubmissions}
                      title="Clear test submissions"
                      className="p-1.5 rounded-lg border border-[#E2DACB] text-[#5F1120] cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 max-h-[320px] overflow-y-auto">
                {submissions.length === 0 ? (
                  <p className="text-xs text-[#584D46] p-4 rounded-xl border border-dashed border-[#E2DACB] text-center">
                    No form submissions yet. Submit the contact form on the page or click “Send Test Row”.
                  </p>
                ) : (
                  submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3 rounded-xl border border-[#E2DACB] bg-[#FAF6EC]/50 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span>
                          {sub.firstName} {sub.lastName} · {sub.companyName}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#EFE8D7]">
                          <CheckCircle2 className="w-3 h-3 text-[#8A9332]" />
                          {sub.country}/{sub.locale.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[#584D46]">{sub.workEmail} · {sub.describesYou}</div>
                      {sub.anythingElse && <div className="text-[#1C1513]">{sub.anythingElse}</div>}
                      <div className="text-[10px] text-[#584D46]">
                        {new Date(sub.createdAt).toLocaleString()} · {sub.sheetStatus}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#5F1120] text-white space-y-3">
                <h3 className="font-serif-display font-bold text-lg">
                  Download WordPress Theme: FLO (.zip)
                </h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  Complete <strong>FLO</strong> WordPress 6.7+ theme including{' '}
                  <code className="bg-white/15 px-1 rounded">front-page.php</code> (all 13 homepage
                  sections), <code className="bg-white/15 px-1 rounded">theme.json</code> (v3),{' '}
                  <code className="bg-white/15 px-1 rounded">inc/customizer.php</code> (every icon,
                  image, text, background &amp; border customizable), Contact Form 7 + Google Sheets
                  connector, and CA/FR Geolocation auto-routing.
                </p>
                <button
                  type="button"
                  disabled={exporting}
                  onClick={handleDownloadThemeZip}
                  className="w-full py-3 px-4 rounded-full bg-[#DDA132] text-[#1C1513] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer hover:opacity-95"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {exporting ? 'Packaging FLO Theme...' : 'Download flo.zip (WordPress Theme)'}
                  </span>
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-[#584D46]">
                  Recommended Free WordPress Plugins
                </h4>
                <ul className="space-y-2">
                  <li className="p-3 rounded-xl border border-[#E2DACB]">
                    <strong>Contact Form 7</strong> (Free) — Renders the exact CF7 lead form via{' '}
                    <code>[contact-form-7]</code> shortcode in <code>front-page.php</code>.
                  </li>
                  <li className="p-3 rounded-xl border border-[#E2DACB]">
                    <strong>CF7 Google Sheet Connector</strong> (Free) — Plus built-in{' '}
                    <code>wpcf7_mail_sent</code> Apps Script webhook in <code>inc/cf7-google-sheets.php</code>.
                  </li>
                  <li className="p-3 rounded-xl border border-[#E2DACB]">
                    <strong>Polylang</strong> + <strong>GeoIP Detection</strong> (Free) — Serves
                    English globally and automatically routes CA &amp; FR visitors to French.
                  </li>
                  <li className="p-3 rounded-xl border border-[#E2DACB]">
                    <strong>WP-Optimize</strong> / <strong>Autoptimize</strong> (Free) — Page cache &amp;
                    asset minification for 90+ Mobile PageSpeed and &lt;1.5s load time.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
