import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Leaf,
  Menu,
  Minus,
  Plus,
} from 'lucide-react';
import {
  DEFAULT_ICON_OVERRIDES,
  DEFAULT_THEME_TOKENS,
  TRANSLATIONS,
  type IconOverrides,
  type Locale,
  type PageContent,
  type ThemeTokens,
} from './data/translations';
import {
  DynamicIcon,
  GeometricMosaicDivider,
  HeroBotanicalStage,
  PartnerLogoWordmark,
  ServiceCardArtwork,
  TeamMosaicGrid,
  VerticalCardPattern,
} from './components/BrandPatterns';
import { SlideOutMenu } from './components/SlideOutMenu';
import {
  ThemeCustomizerDrawer,
  type CustomizerTab,
  type FormSubmission,
  type ViewportPreview,
} from './components/ThemeCustomizerDrawer';

const STORAGE_TOKENS_KEY = 'flo_wp_tokens_v2';
const STORAGE_ICONS_KEY = 'flo_wp_icons_v2';
const STORAGE_CONTENT_KEY = 'flo_wp_content_v2';

export default function App() {
  const [locale, setLocale] = useState<Locale>('en');
  const [detectedCountry, setDetectedCountry] = useState<string>('US');
  const [geoOverride, setGeoOverride] = useState<string>('');

  const [tokens, setTokens] = useState<ThemeTokens>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_TOKENS_KEY);
      return saved ? { ...DEFAULT_THEME_TOKENS, ...JSON.parse(saved) } : DEFAULT_THEME_TOKENS;
    } catch {
      return DEFAULT_THEME_TOKENS;
    }
  });

  const [icons, setIcons] = useState<IconOverrides>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ICONS_KEY);
      return saved ? { ...DEFAULT_ICON_OVERRIDES, ...JSON.parse(saved) } : DEFAULT_ICON_OVERRIDES;
    } catch {
      return DEFAULT_ICON_OVERRIDES;
    }
  });

  const [customContent, setCustomContent] = useState<Record<Locale, PageContent>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CONTENT_KEY);
      return saved ? JSON.parse(saved) : TRANSLATIONS;
    } catch {
      return TRANSLATIONS;
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [customizerTab, setCustomizerTab] = useState<CustomizerTab>('tokens');
  const [viewportMode, setViewportMode] = useState<ViewportPreview>('responsive');

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [describesYou, setDescribesYou] = useState('');
  const [anythingElse, setAnythingElse] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [googleSheetWebhook, setGoogleSheetWebhook] = useState('');

  const content = customContent[locale] || TRANSLATIONS[locale];

  useEffect(() => {
    setDescribesYou(content.contact.roleOptions[0]);
  }, [locale, content.contact.roleOptions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_TOKENS_KEY, JSON.stringify(tokens));
    const root = document.documentElement.style;
    root.setProperty('--theme-bg', tokens.bg);
    root.setProperty('--theme-surface', tokens.surface);
    root.setProperty('--theme-burgundy', tokens.burgundy);
    root.setProperty('--theme-amber', tokens.amber);
    root.setProperty('--theme-olive', tokens.olive);
    root.setProperty('--theme-ink', tokens.ink);
    root.setProperty('--theme-muted', tokens.muted);
    root.setProperty('--theme-border', tokens.borderColor);
    root.setProperty('--theme-border-width', `${tokens.borderWidth}px`);
    root.setProperty('--theme-radius-card', `${tokens.cardRadius}px`);
    root.setProperty('--theme-footer-bg', tokens.footerBg);
  }, [tokens]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ICONS_KEY, JSON.stringify(icons));
  }, [icons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(customContent));
  }, [customContent]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const fetchGeo = useCallback(async (overrideCode = '') => {
    try {
      const query = overrideCode ? `?geo=${encodeURIComponent(overrideCode)}` : window.location.search;
      const res = await fetch(`/api/geo${query}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.country) setDetectedCountry(data.country);
      if (data.locale === 'fr' || data.locale === 'en') {
        setLocale(data.locale);
      }
    } catch {
      // Keep default EN
    }
  }, []);

  const refreshSubmissions = useCallback(async () => {
    try {
      const [subRes, cfgRes] = await Promise.all([
        fetch('/api/submissions'),
        fetch('/api/sheets-config'),
      ]);
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubmissions(subData.submissions || []);
      }
      if (cfgRes.ok) {
        const cfgData = await cfgRes.json();
        setGoogleSheetWebhook(cfgData.googleSheetWebhook || '');
      }
    } catch {
      // Ignore transient errors
    }
  }, []);

  useEffect(() => {
    fetchGeo();
    refreshSubmissions();
  }, [fetchGeo, refreshSubmissions]);

  const handleSimulateGeo = (countryCode: string) => {
    setGeoOverride(countryCode);
    fetchGeo(countryCode);
  };

  const handleUpdateContentField = (section: string, key: string, value: string) => {
    setCustomContent((prev) => ({
      ...prev,
      [locale]: {
        ...prev[locale],
        [section]: {
          ...(prev[locale][section as keyof PageContent] as Record<string, unknown>),
          [key]: value,
        },
      },
    }));
  };

  const handleResetAll = () => {
    setTokens(DEFAULT_THEME_TOKENS);
    setIcons(DEFAULT_ICON_OVERRIDES);
    setCustomContent(TRANSLATIONS);
    localStorage.removeItem(STORAGE_TOKENS_KEY);
    localStorage.removeItem(STORAGE_ICONS_KEY);
    localStorage.removeItem(STORAGE_CONTENT_KEY);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!firstName.trim() || !lastName.trim() || !workEmail.trim() || !companyName.trim()) {
      setFormError(
        locale === 'fr'
          ? 'Veuillez remplir tous les champs obligatoires.'
          : 'Please fill in all required fields.'
      );
      return;
    }

    setFormSubmitting(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          workEmail,
          companyName,
          describesYou,
          anythingElse,
          locale,
          country: detectedCountry,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || 'Submission failed.');
        return;
      }
      setFormSuccess(content.contact.successMessage);
      setFirstName('');
      setLastName('');
      setWorkEmail('');
      setCompanyName('');
      setAnythingElse('');
      refreshSubmissions();
    } catch {
      setFormError(
        locale === 'fr'
          ? 'Erreur réseau lors de l’envoi.'
          : 'Network error while submitting form.'
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  const openStudio = (tab: CustomizerTab = 'tokens') => {
    setCustomizerTab(tab);
    setCustomizerOpen(true);
  };

  const isMobileSim = viewportMode === '390';

  const cardStyle = useMemo<React.CSSProperties>(
    () => ({
      backgroundColor: tokens.surface,
      borderColor: tokens.borderColor,
      borderWidth: `${tokens.borderWidth}px`,
      borderStyle: 'solid',
      borderRadius: `${tokens.cardRadius}px`,
    }),
    [tokens]
  );

  const visibleFaqs = showAllFaqs ? content.faq.items : content.faq.items.slice(0, 6);

  return (
    <div
      className="min-h-screen transition-colors"
      style={{ backgroundColor: tokens.bg, color: tokens.ink }}
    >
      <a href="#main-content" className="skip-link">
        {locale === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
      </a>

      <div
        className={`mx-auto transition-all duration-300 ${
          viewportMode === '390'
            ? 'max-w-[390px] my-6 shadow-2xl rounded-[32px] overflow-hidden border-4 border-[#1C1513]'
            : viewportMode === '1080'
              ? 'max-w-[1080px] shadow-xl'
              : 'w-full'
        }`}
        style={{ backgroundColor: tokens.bg }}
      >
        {/* 1. Header Pill Bar (Exact match to Figma: clean white rounded bar with hamburger menu on right) */}
        <header className="pt-5 px-4 sm:px-6" role="banner">
          <div
            className="max-w-[1000px] mx-auto bg-white rounded-full px-5 py-1.5 min-h-[54px] flex items-center justify-between shadow-[0_8px_24px_rgba(92,58,24,0.08)]"
            style={{
              borderColor: '#E5DDD0',
              borderWidth: `${tokens.borderWidth}px`,
              borderStyle: 'solid',
            }}
          >
            <a
              href="#top"
              aria-label={content.nav.brand}
              className="w-8 h-8 inline-flex items-center"
            >
              <span className="sr-only">{content.nav.brand}</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-controls="mobile-slideout-menu"
              aria-expanded={menuOpen}
              aria-label={content.nav.menuLabel}
              className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
              style={{ color: tokens.headlineColor }}
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </header>

        <main id="main-content" role="main">
          {/* 2. Hero Section */}
          <section id="top" className="pt-8 sm:pt-10 text-center">
            <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.09em] uppercase"
                style={{
                  borderColor: '#DDD0C0',
                  borderWidth: `${tokens.borderWidth}px`,
                  borderStyle: 'solid',
                  color: tokens.headlineColor,
                  backgroundColor: '#FAF3E3',
                }}
              >
                {content.hero.eyebrow}
              </span>

              <h1
                className={`font-serif-display font-bold tracking-[-0.025em] leading-[1.04] mx-auto mt-4 mb-4 text-balance ${
                  isMobileSim
                    ? 'text-[34px] max-w-[340px]'
                    : 'text-[38px] sm:text-[56px] md:text-[64px] max-w-[720px]'
                }`}
                style={{ color: tokens.headlineColor }}
              >
                {content.hero.headline}
              </h1>

              <p
                className="mx-auto text-[14px] sm:text-[15.5px] leading-relaxed max-w-[520px] mb-5"
                style={{ color: '#2F2623' }}
              >
                {content.hero.subheadline}
              </p>

              {/* Subtle hairline divider + inline bare burgundy icons matching Figma */}
              <div className="max-w-[760px] mx-auto border-t border-[#E8DEC9] pt-4 mb-7">
                <div
                  className={`flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[11px] sm:text-[11.5px] font-medium ${
                    isMobileSim ? 'flex-col' : ''
                  }`}
                  style={{ color: tokens.headlineColor }}
                >
                  {[
                    { label: content.hero.badges[0], icon: icons.heroBadge1 },
                    { label: content.hero.badges[1], icon: icons.heroBadge2 },
                    { label: content.hero.badges[2], icon: icons.heroBadge3 },
                  ].map((badge) => (
                    <span key={badge.label} className="inline-flex items-center gap-1.5">
                      <span
                        className="inline-flex items-center justify-center shrink-0"
                        style={{ color: tokens.headlineColor }}
                      >
                        <DynamicIcon name={badge.icon} className="w-3.5 h-3.5" />
                      </span>
                      <span>{badge.label}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero CTAs matching Figma tangent amber circle arrow */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="#contact" className="inline-flex items-center group">
                  <span
                    className="inline-flex items-center px-6 py-2.5 rounded-full text-white text-sm font-semibold min-h-[44px] transition-opacity group-hover:opacity-95"
                    style={{ backgroundColor: tokens.headlineColor }}
                  >
                    {content.hero.primaryCta}
                  </span>
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                    style={{ backgroundColor: tokens.amber, color: tokens.ink }}
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </a>

                <a
                  href="#cases"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-sm font-semibold min-h-[44px] hover:bg-black/[0.03] transition-colors"
                  style={{
                    color: tokens.headlineColor,
                    borderColor: '#7A3B48',
                    borderWidth: `${Math.max(1, tokens.borderWidth)}px`,
                    borderStyle: 'solid',
                  }}
                >
                  <span>{content.hero.secondaryCta}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <HeroBotanicalStage tokens={tokens} />
          </section>

          {/* 3. Partner Trust Strip */}
          <section
            aria-label="Trusted enterprise partners"
            className="w-full py-5 border-b"
            style={{
              background:
                'linear-gradient(90deg, #E8D9BE 0%, #FAF3E3 16%, #FAF3E3 82%, #E5D4B5 100%)',
              borderColor: tokens.borderColor,
            }}
          >
            <div
              className={`max-w-[980px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-6 ${
                isMobileSim ? 'flex-col text-center' : 'flex-col md:flex-row'
              }`}
            >
              <p
                className="text-[11px] sm:text-xs leading-snug max-w-[205px]"
                style={{ color: '#4A3F3B' }}
              >
                {content.logos.caption}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-11">
                {content.logos.brands.map((brand) => (
                  <PartnerLogoWordmark key={brand} name={brand} />
                ))}
              </div>
            </div>
          </section>

          {/* 4. Craft Section ("AI is only as good as the team using it.") */}
          <section id="craft" className="py-14 sm:py-20">
            <div className="max-w-[960px] mx-auto px-4 sm:px-6">
              <div className="text-center max-w-[540px] mx-auto mb-10">
                <h2 className="font-serif-display font-bold text-[30px] sm:text-[40px] leading-[1.12] mb-3 text-balance">
                  {content.craft.headline}
                </h2>
                <p className="text-sm sm:text-[15px]" style={{ color: tokens.muted }}>
                  {content.craft.subheadline}
                </p>
              </div>

              <div
                className={`grid gap-5 ${
                  isMobileSim ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
                }`}
              >
                {content.craft.cards.map((card, idx) => {
                  const iconKey =
                    idx === 0 ? icons.pillar1 : idx === 1 ? icons.pillar2 : icons.pillar3;
                  const bw = Math.max(1, tokens.borderWidth);
                  const strokeCol = '#E8C56E';
                  return (
                    <article
                      key={card.title}
                      className="p-6 pb-7 relative flex flex-col justify-between min-h-[232px]"
                      style={{
                        backgroundColor: tokens.surface,
                        borderColor: strokeCol,
                        borderWidth: `${bw}px`,
                        borderStyle: 'solid',
                        borderRadius: `${tokens.cardRadius}px`,
                        borderTopRightRadius: '0px',
                      }}
                    >
                      {/* Top-right concave notch mask + continuous border stroke */}
                      <svg
                        width="68"
                        height="68"
                        viewBox="0 0 68 68"
                        className="absolute pointer-events-none z-10"
                        style={{ top: `-${bw}px`, right: `-${bw}px` }}
                        aria-hidden="true"
                      >
                        <path
                          d={`M 0 0 L 68 0 L 68 68 L ${68 - bw / 2} 68 L ${68 - bw / 2} 57 A 8 8 0 0 0 ${60 - bw / 2} 49 L 46 49 A 27 27 0 0 1 19 22 L 19 ${8 + bw / 2} A 8 8 0 0 0 11 ${bw / 2} L 0 ${bw / 2} Z`}
                          fill={tokens.bg}
                        />
                        <path
                          d={`M 0 ${bw / 2} L 11 ${bw / 2} A 8 8 0 0 1 19 ${8 + bw / 2} L 19 22 A 27 27 0 0 0 46 49 L ${60 - bw / 2} 49 A 8 8 0 0 1 ${68 - bw / 2} 57 L ${68 - bw / 2} 68`}
                          fill="none"
                          stroke={strokeCol}
                          strokeWidth={bw}
                        />
                      </svg>

                      {/* 40px Golden Circle Badge tucked in top-right cutout */}
                      <span
                        className="absolute top-[2px] right-[2px] z-20 w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: tokens.amber, color: tokens.headlineColor }}
                        aria-hidden="true"
                      >
                        <DynamicIcon name={iconKey} className="w-5 h-5" />
                      </span>

                      <h3
                        className="font-sans-body font-bold text-[21px] leading-[1.22] max-w-[165px] mb-9 pr-6"
                        style={{ color: tokens.ink }}
                      >
                        {card.title}
                      </h3>

                      <p className="text-[13.5px] leading-[1.6]" style={{ color: tokens.ink }}>
                        {card.body}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 5. Case Studies ("AI in production. Here's what it took.") */}
          <section
            id="cases"
            className="py-14 sm:py-20 text-white relative overflow-hidden"
            style={{ backgroundColor: tokens.burgundy }}
          >
            {/* Repeating Botanical Leaf Tile Outline Grid matching Figma */}
            <svg
              viewBox="0 0 1080 280"
              className="absolute top-0 left-0 w-full h-[280px] pointer-events-none"
              preserveAspectRatio="xMidYMin slice"
              aria-hidden="true"
            >
              {[0, 1].map((row) =>
                [0, 1, 2, 3, 4, 5].map((col) => {
                  const x = col * 180;
                  const y = row * 140;
                  return (
                    <g key={`${row}-${col}`} transform={`translate(${x}, ${y})`}>
                      <rect
                        x="2"
                        y="2"
                        width="176"
                        height="136"
                        rx="6"
                        fill="none"
                        stroke={tokens.amber}
                        strokeOpacity="0.16"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M 16 14 C 110 14 164 56 164 124 C 70 124 16 82 16 14 Z"
                        fill="none"
                        stroke={tokens.amber}
                        strokeOpacity="0.18"
                        strokeWidth="1.2"
                      />
                    </g>
                  );
                })
              )}
            </svg>

            <div className="max-w-[940px] mx-auto px-4 sm:px-6 relative z-10">
              <div className="text-center max-w-[540px] mx-auto mb-12">
                <h2 className="font-serif-display font-bold text-[30px] sm:text-[42px] leading-[1.12] mb-3 text-balance">
                  {content.cases.headline}
                </h2>
                <p className="text-sm text-white/85 leading-relaxed">{content.cases.subheadline}</p>
              </div>

              <div className="space-y-8">
                {content.cases.items.map((item, idx) => {
                  const customThumb =
                    idx === 0
                      ? tokens.case1ImageUrl
                      : idx === 1
                        ? tokens.case2ImageUrl
                        : tokens.case3ImageUrl;
                  return (
                    <article
                      key={item.eyebrow}
                      className="relative text-[#1C1513]"
                    >
                      <div
                        className={`relative p-6 sm:p-8 shadow-sm ${
                          isMobileSim ? 'pt-[70px] pb-[78px]' : 'pt-[70px] md:pt-8 pb-[78px] md:pb-8'
                        }`}
                        style={{
                          backgroundColor: '#FBF6EB',
                          borderRadius: `${Math.max(18, tokens.cardRadius)}px`,
                        }}
                      >
                        {/* Top-Left Burgundy Notched Cutout with Concave Fillets + Golden Amber Pill */}
                        <div
                          className="absolute top-0 left-0 z-20 pr-3.5 pb-3"
                          style={{
                            backgroundColor: tokens.burgundy,
                            borderBottomRightRadius: '22px',
                          }}
                        >
                          <span
                            className="pointer-events-none absolute top-0 left-full w-5 h-5"
                            style={{
                              background: `radial-gradient(circle at 100% 100%, transparent 20px, ${tokens.burgundy} 20.5px)`,
                            }}
                            aria-hidden="true"
                          />
                          <span
                            className="pointer-events-none absolute top-full left-0 w-5 h-5"
                            style={{
                              background: `radial-gradient(circle at 100% 100%, transparent 20px, ${tokens.burgundy} 20.5px)`,
                            }}
                            aria-hidden="true"
                          />
                          <div
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.06em] uppercase shadow-xs"
                            style={{
                              backgroundColor: tokens.amber,
                              color: tokens.headlineColor,
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M2 2C10 2 14 6 14 14C6 14 2 10 2 2Z" />
                            </svg>
                            <span>{item.eyebrow}</span>
                          </div>
                        </div>

                        {/* Card Content Grid */}
                        <div
                          className={`grid gap-6 items-start ${
                            isMobileSim
                              ? 'grid-cols-1'
                              : 'grid-cols-1 md:grid-cols-[175px_0.85fr_1.35fr]'
                          }`}
                        >
                          {/* Droplet Thumbnail Container matching Figma */}
                          <div className={isMobileSim ? '' : 'md:mt-10'}>
                            <div
                              className="w-[156px] h-[148px] bg-white flex items-center justify-center p-4 border overflow-hidden mx-auto md:mx-0"
                              style={{
                                borderColor: '#D6EAE5',
                                borderRadius: '50% 4px 50% 50%',
                              }}
                            >
                              {customThumb ? (
                                <img
                                  src={customThumb}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                  style={{ borderRadius: '50% 4px 50% 50%' }}
                                  referrerPolicy="no-referrer"
                                />
                              ) : idx === 0 ? (
                                <div className="w-[104px] h-[44px] bg-[#734A28] flex items-center justify-center text-white/95 font-serif-display font-bold text-sm tracking-wide">
                                  <span className="sr-only">{item.logoLabel}</span>
                                </div>
                              ) : idx === 1 ? (
                                <div className="w-24 h-24 rounded-full bg-[#FAF6EC] border border-[#E2DACB] flex items-center justify-center font-serif-display font-semibold text-sm text-[#1C1513]">
                                  {item.logoLabel}
                                </div>
                              ) : (
                                <span className="font-mono font-bold text-lg tracking-tight text-[#1C1513]">
                                  {item.logoLabel}
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 className="font-serif-display font-bold text-[22px] sm:text-[24px] leading-[1.18] pt-0.5">
                            {item.title}
                          </h3>

                          <div className={isMobileSim ? '' : 'md:pb-14'}>
                            <p
                              className="text-[13.5px] leading-relaxed"
                              style={{ color: tokens.ink }}
                            >
                              {item.body}
                            </p>
                          </div>
                        </div>

                        {/* Bottom-Right Burgundy Notched Cutout with White CTA Pill + Golden Circle */}
                        <div
                          className="absolute bottom-0 right-0 z-20 pl-3.5 pt-3"
                          style={{
                            backgroundColor: tokens.burgundy,
                            borderTopLeftRadius: '22px',
                          }}
                        >
                          <span
                            className="pointer-events-none absolute bottom-0 right-full w-5 h-5"
                            style={{
                              background: `radial-gradient(circle at 0% 0%, transparent 20px, ${tokens.burgundy} 20.5px)`,
                            }}
                            aria-hidden="true"
                          />
                          <span
                            className="pointer-events-none absolute bottom-full right-0 w-5 h-5"
                            style={{
                              background: `radial-gradient(circle at 0% 0%, transparent 20px, ${tokens.burgundy} 20.5px)`,
                            }}
                            aria-hidden="true"
                          />
                          <a href={item.href} className="inline-flex items-center gap-1.5 group">
                            <span
                              className="inline-flex items-center px-5 py-2 rounded-full bg-white text-[13px] font-semibold min-h-[42px] group-hover:bg-white/95 transition-colors"
                              style={{ color: tokens.burgundy }}
                            >
                              {item.cta}
                            </span>
                            <span
                              className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                              style={{ backgroundColor: tokens.amber, color: tokens.ink }}
                              aria-hidden="true"
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 6. Services ("AI work that compounds across your engineering organisation.") */}
          <section id="services" className="py-14 sm:py-20">
            <div className="max-w-[960px] mx-auto px-4 sm:px-6">
              <div className="text-center max-w-[600px] mx-auto mb-10">
                <h2 className="font-serif-display font-bold text-[30px] sm:text-[40px] leading-[1.12] mb-3 text-balance">
                  {content.services.headline}
                </h2>
                <p className="text-sm sm:text-[15px]" style={{ color: tokens.muted }}>
                  {content.services.subheadline}
                </p>
              </div>

              <div
                className={`grid gap-5 ${
                  isMobileSim ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
                }`}
              >
                {content.services.cards.map((card, idx) => {
                  const iconKey =
                    idx === 0 ? icons.service1 : idx === 1 ? icons.service2 : icons.service3;
                  const cardBg =
                    idx === 0 ? '#BE8710' : idx === 1 ? '#E5AF37' : '#E2B345';
                  const cardBorder =
                    idx === 0 ? '#8E6207' : idx === 1 ? '#B8871B' : '#B48822';
                  return (
                    <article
                      key={card.title}
                      className="overflow-hidden flex flex-col justify-between"
                      style={{
                        backgroundColor: cardBg,
                        color: tokens.ink,
                        borderColor: cardBorder,
                        borderWidth: `${Math.max(1, tokens.borderWidth)}px`,
                        borderStyle: 'solid',
                        borderRadius: `${tokens.cardRadius}px`,
                      }}
                    >
                      <ServiceCardArtwork variant={idx} tokens={tokens} iconKey={iconKey} />

                      <div className="p-6 pt-5 flex-1 flex flex-col justify-start">
                        <div>
                          <h3 className="font-serif-display font-bold text-[22px] leading-tight mb-2.5">
                            {card.title}
                          </h3>
                          <p className="text-[13px] leading-[1.55] text-[#1C1513] mb-4">
                            {card.body}
                          </p>
                        </div>

                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1.5 text-[13px] font-bold hover:underline min-h-[36px] self-start"
                        >
                          <span>{card.cta}</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 7. Health Tech Verticals ("Built for the realities of US health tech.") */}
          <section id="verticals" className="py-10 sm:py-16">
            <div className="max-w-[960px] mx-auto px-4 sm:px-6">
              <div className="text-center max-w-[540px] mx-auto mb-10">
                <h2 className="font-serif-display font-bold text-[30px] sm:text-[40px] leading-[1.12] mb-3 text-balance">
                  {content.verticals.headline}
                </h2>
                <p className="text-sm sm:text-[15px]" style={{ color: tokens.muted }}>
                  {content.verticals.subheadline}
                </p>
              </div>

              <div
                className={`grid gap-5 ${
                  isMobileSim ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
                }`}
              >
                {content.verticals.cards.map((card, idx) => (
                  <article
                    key={card.eyebrow}
                    className="p-4 sm:p-5 flex flex-col justify-between bg-[#FAFCE7]"
                    style={{
                      borderColor: '#D9EA96',
                      borderWidth: `${Math.max(1, tokens.borderWidth)}px`,
                      borderStyle: 'solid',
                      borderRadius: `${tokens.cardRadius}px`,
                    }}
                  >
                    <div>
                      <VerticalCardPattern variant={idx} />
                      <div
                        className="text-[11px] font-bold tracking-[0.08em] uppercase mb-2"
                        style={{ color: '#6B1D2B' }}
                      >
                        {card.eyebrow}
                      </div>
                      <h3 className="font-serif-display font-bold text-[22px] leading-[1.18] mb-2.5 text-[#1C1513]">
                        {card.title}
                      </h3>
                      <p className="text-[13px] leading-[1.55] mb-5 text-[#332926]">
                        {card.body}
                      </p>
                    </div>

                    <div>
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-xs font-semibold hover:bg-black/5 transition-colors min-h-[40px]"
                        style={{
                          color: tokens.ink,
                          borderColor: tokens.borderColor,
                          borderWidth: `${tokens.borderWidth}px`,
                          borderStyle: 'solid',
                        }}
                      >
                        <span>{card.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Open Source Plugin Spotlight ("Bee") */}
          <section className="relative" style={{ backgroundColor: tokens.burgundy }}>
            <div
              className="pt-8 sm:pt-12 pb-12 sm:pb-16 rounded-b-[28px] sm:rounded-b-[36px]"
              style={{ backgroundColor: tokens.bg }}
            >
              <div className="max-w-[940px] mx-auto px-4 sm:px-6">
                <div
                  className="text-white relative overflow-hidden"
                  style={{
                    backgroundColor: tokens.burgundy,
                    borderRadius: '20px',
                  }}
                >
                  {/* Top-left subtle gold geometric outline grid */}
                  <svg
                    viewBox="0 0 280 140"
                    className="hidden md:block absolute top-0 left-0 w-[395px] h-[198px] pointer-events-none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <g fill="none" stroke="#B69E56" strokeOpacity="0.45" strokeWidth="1">
                      <path d="M 0 0 H 70 V 70 H 0 Z" />
                      <path d="M 70 0 A 70 70 0 0 1 0 70" />
                      <path d="M 70 0 H 140 V 35 A 35 35 0 0 1 105 70 H 70 Z" />
                      <path d="M 140 0 H 210 V 70 H 175 A 35 35 0 0 1 140 35 Z" />
                      <path d="M 210 0 H 280 V 35 A 35 35 0 0 1 210 35 Z" />
                      <rect x="0" y="70" width="70" height="70" />
                      <rect x="70" y="70" width="70" height="70" />
                      <path d="M 140 140 A 70 70 0 0 1 210 70 V 140 Z" />
                      <path d="M 210 140 A 70 70 0 0 1 280 70 V 140 Z" />
                    </g>
                  </svg>

                  <div
                    className={`grid items-stretch ${
                      isMobileSim ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-[380px_1fr]'
                    }`}
                  >
                    {/* Left flush burgundy artwork panel */}
                    <div
                      className={`relative z-10 min-h-[220px] sm:min-h-[340px] ${
                        isMobileSim ? 'mt-0' : 'md:mt-[96px]'
                      } bg-[#6E192D] overflow-hidden`}
                    >
                      {tokens.pluginImageUrl ? (
                        <img
                          src={tokens.pluginImageUrl}
                          alt="Bee open-source Claude plugin"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : null}
                    </div>

                    {/* Right spotlight copy & CTA */}
                    <div className="p-6 sm:p-10 md:py-11 md:px-10 flex flex-col justify-center relative z-10">
                      <span
                        className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.09em] uppercase mb-3"
                        style={{ color: tokens.amber }}
                      >
                        <span
                          className="w-3.5 h-3.5 inline-block shrink-0"
                          style={{
                            backgroundColor: tokens.amber,
                            borderRadius: '50% 4px 50% 50%',
                          }}
                          aria-hidden="true"
                        />
                        <span>{content.plugin.eyebrow}</span>
                      </span>
                      <h2 className="font-serif-display font-bold text-[26px] sm:text-[32px] leading-[1.14] mb-4">
                        {content.plugin.headline}
                      </h2>
                      <p className="text-[13px] sm:text-[13.5px] text-white/88 leading-[1.6] mb-6">
                        {content.plugin.body}
                      </p>

                      <div className="mb-7">
                        <a href="#contact" className="inline-flex items-center group">
                          <span
                            className="inline-flex items-center px-7 py-2.5 rounded-full bg-white text-xs font-bold min-h-[44px] group-hover:bg-white/95"
                            style={{ color: tokens.headlineColor }}
                          >
                            {content.plugin.cta}
                          </span>
                          <span
                            className="w-[44px] h-[44px] rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                            style={{ backgroundColor: tokens.amber, color: tokens.ink }}
                            aria-hidden="true"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </a>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-4 border-t border-white/15 text-[11.5px] text-white/90">
                        {content.plugin.tags.map((tag, idx) => (
                          <span key={tag} className="inline-flex items-center gap-2">
                            {idx === 0 && (
                              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white/85 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                                <path d="M3 2.5h7l3 3V13.5H3V2.5Z" />
                                <path d="M5.5 7.5h5M5.5 10h3.5" strokeLinecap="round" />
                              </svg>
                            )}
                            {idx === 1 && (
                              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white/85 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                                <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
                                <circle cx="8" cy="8" r="2" />
                              </svg>
                            )}
                            {idx >= 2 && (
                              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white/85 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                                <rect x="2" y="3" width="12" height="10" rx="1.5" />
                                <path d="M6.5 6.5 4.8 8l1.7 1.5M9.5 6.5 11.2 8 9.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Tall Burgundy Curve + Golden Leaf + FDE Bench Comparison */}
          <section id="fde" className="relative bg-white">
            <div className="w-full overflow-hidden" style={{ backgroundColor: tokens.burgundy }}>
              <div className="h-[52px] sm:h-[76px]" />
              <svg
                viewBox="0 0 1080 128"
                className="w-full h-[88px] sm:h-[128px] block"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 0 0 L 1080 0 L 1080 28 C 820 82 420 72 0 64 Z"
                  fill={tokens.burgundy}
                />
                <path
                  d="M 0 64 C 420 72 820 82 1080 28 L 1080 128 L 0 128 Z"
                  fill="#FFFFFF"
                />
                {/* Large Golden Two-Petal Leaf with dark burgundy stroke matching Figma */}
                <path
                  d="M 974 78 Q 1002 6 1044 6 Q 1068 62 1034 114 Q 982 108 974 78 Z"
                  fill="#CA9118"
                  stroke="#4A0E17"
                  strokeWidth="2"
                />
                <path
                  d="M 880 14 Q 992 10 1046 112 Q 928 128 880 14 Z"
                  fill="#E4AF38"
                  stroke="#4A0E17"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="max-w-[940px] mx-auto px-4 sm:px-6 pt-8 pb-14 sm:pt-10 sm:pb-16 relative">
              <div className="max-w-[660px] mb-10">
                <h2 className="font-serif-display font-bold text-[30px] sm:text-[42px] leading-[1.1] mb-3.5 text-balance text-[#1C1513]">
                  {content.fde.headline}
                </h2>
                <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: '#4A3F3B' }}>
                  {content.fde.subheadline}
                </p>
              </div>

              {/* Outer architectural pocket frame matching Figma */}
              <div
                className="relative"
                style={{
                  borderColor: '#9D866E',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderTopLeftRadius: '0px',
                  borderTopRightRadius: '56px',
                  borderBottomLeftRadius: '0px',
                  borderBottomRightRadius: '0px',
                }}
              >
                {/* Inner 3-column icy-mint table with top-right & bottom-left 56px curves */}
                <div
                  className={`grid overflow-hidden bg-[#F4FAFB] ${
                    isMobileSim ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
                  }`}
                  style={{
                    borderBottom: '1px solid #9D866E',
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '56px',
                    borderBottomLeftRadius: '56px',
                    borderBottomRightRadius: '0px',
                  }}
                >
                  {content.fde.options.map((opt, idx) => {
                    const iconKey = idx === 0 ? icons.fde1 : idx === 1 ? icons.fde2 : icons.fde3;
                    return (
                      <article
                        key={opt.eyebrow}
                        className={`p-6 sm:p-7 flex flex-col justify-between ${
                          idx < 2 ? 'border-b md:border-b-0 md:border-r' : ''
                        }`}
                        style={{ borderColor: '#9D866E' }}
                      >
                        <div>
                          <div className="mb-7 text-[#6E162A]">
                            <DynamicIcon name={iconKey} className="w-6 h-6" />
                          </div>
                          <div className="text-[10.5px] font-bold tracking-[0.14em] uppercase mb-2 text-[#4A433F]">
                            {opt.eyebrow}
                          </div>
                          <h3 className="font-serif-display font-bold text-[24px] leading-[1.15] mb-3.5 text-[#1C1513]">
                            {opt.metric}
                          </h3>
                          <p className="text-[13px] leading-[1.55] mb-8 text-[#332926]">
                            {opt.body}
                          </p>
                        </div>

                        <div>
                          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.06em] uppercase bg-[#F7EFE2] border border-[#EADBC8] text-[#6E162A]">
                            {opt.tag}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Bottom pocket area inside outer frame holding leaf accent & CTA */}
                <div className="relative px-4 sm:px-6 py-4 flex items-center justify-end bg-white">
                  <div
                    className="hidden sm:flex absolute -bottom-3.5 -left-3.5 w-8 h-8 rounded-full items-center justify-center bg-white z-10"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none">
                      <path
                        d="M15 16 Q16 5 22 4 Q25 13 18 22 Q14 20 15 16 Z"
                        fill="#A4AF42"
                        stroke="#4A0E17"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M5 7 Q15 6 19 22 Q9 23 5 7 Z"
                        fill="#E2AF38"
                        stroke="#4A0E17"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </div>

                  <a href="#contact" className="inline-flex items-center group">
                    <span
                      className="inline-flex items-center px-5 py-2 rounded-full text-white text-xs font-semibold min-h-[42px] group-hover:opacity-95"
                      style={{ backgroundColor: tokens.headlineColor }}
                    >
                      {content.fde.cta}
                    </span>
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center -ml-1"
                      style={{ backgroundColor: tokens.amber, color: tokens.ink }}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <GeometricMosaicDivider tokens={tokens} />
          </section>

          {/* 10. Team Section ("The team behind the rigor.") */}
          <section id="team" className="py-14 sm:py-20">
            <div className="max-w-[940px] mx-auto px-4 sm:px-6">
              <div
                className={`grid gap-10 items-center ${
                  isMobileSim ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-[0.9fr_1.1fr]'
                }`}
              >
                <div>
                  <h2 className="font-serif-display font-bold text-[32px] sm:text-[40px] leading-[1.1] mb-3">
                    {content.team.headline}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: tokens.muted }}>
                    {content.team.subheadline}
                  </p>
                  <a href="#contact" className="inline-flex items-center group">
                    <span
                      className="inline-flex items-center px-5 py-2 rounded-full text-white text-xs font-semibold min-h-[42px] group-hover:opacity-95"
                      style={{ backgroundColor: tokens.headlineColor }}
                    >
                      {content.team.cta}
                    </span>
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center -ml-1"
                      style={{ backgroundColor: tokens.amber, color: tokens.ink }}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </a>
                </div>

                <TeamMosaicGrid tokens={tokens} />
              </div>
            </div>
          </section>

          {/* 11. Contact Form 7 + Google Sheets Section */}
          <section
            id="contact"
            className="py-12 sm:py-16"
            style={{ backgroundColor: tokens.burgundy }}
          >
            <div className="max-w-[940px] mx-auto px-4 sm:px-6">
              <div
                className={`grid gap-5 items-stretch ${
                  isMobileSim ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-[0.95fr_1.15fr]'
                }`}
              >
                <div
                  className="p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  style={{
                    backgroundColor: tokens.bg,
                    borderRadius: `${tokens.cardRadius}px`,
                  }}
                >
                  <div>
                    <h2 className="font-serif-display font-bold text-[28px] sm:text-[34px] leading-[1.1] mb-3">
                      {content.contact.headline}
                    </h2>
                    <p
                      className="text-xs sm:text-[13px] leading-relaxed mb-6"
                      style={{ color: tokens.muted }}
                    >
                      {content.contact.subheadline}
                    </p>
                  </div>

                  <div>
                    {tokens.contactImageUrl ? (
                      <img
                        src={tokens.contactImageUrl}
                        alt="Flo engineering team contact"
                        className="w-full h-36 object-cover rounded-xl mb-4"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-36 rounded-xl bg-[#EAE0C8] mb-4" aria-hidden="true" />
                    )}
                    <svg viewBox="0 0 280 56" className="w-full h-12 opacity-25" aria-hidden="true">
                      <path d="M 0 56 Q 35 0 70 56 T 140 56 T 210 56 T 280 56" fill="none" stroke="#551020" strokeWidth="1" />
                      <circle cx="70" cy="28" r="22" fill="none" stroke="#551020" strokeWidth="1" />
                      <circle cx="210" cy="28" r="22" fill="none" stroke="#551020" strokeWidth="1" />
                    </svg>
                  </div>
                </div>

                <div
                  className="bg-white p-6 sm:p-8"
                  style={{ borderRadius: `${tokens.cardRadius}px` }}
                >
                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-4 text-xs"
                    noValidate
                    aria-label="Contact Form 7 Healthtech Lead Form"
                  >
                    <div
                      className={`grid gap-3 ${
                        isMobileSim ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                      }`}
                    >
                      <div>
                        <label htmlFor="cf7-first-name" className="block font-semibold mb-1">
                          {content.contact.firstNameLabel.replace('*', '')}
                          <span className="text-[#B91C1C]">*</span>
                        </label>
                        <input
                          id="cf7-first-name"
                          name="first-name"
                          type="text"
                          required
                          placeholder={content.contact.firstNamePlaceholder}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border text-xs min-h-[42px]"
                          style={{ borderColor: tokens.borderColor }}
                        />
                      </div>
                      <div>
                        <label htmlFor="cf7-last-name" className="block font-semibold mb-1">
                          {content.contact.lastNameLabel.replace('*', '')}
                          <span className="text-[#B91C1C]">*</span>
                        </label>
                        <input
                          id="cf7-last-name"
                          name="last-name"
                          type="text"
                          required
                          placeholder={content.contact.lastNamePlaceholder}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border text-xs min-h-[42px]"
                          style={{ borderColor: tokens.borderColor }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cf7-work-email" className="block font-semibold mb-1">
                        {content.contact.emailLabel.replace('*', '')}
                        <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="cf7-work-email"
                        name="work-email"
                        type="email"
                        required
                        placeholder={content.contact.emailPlaceholder}
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border text-xs min-h-[42px]"
                        style={{ borderColor: tokens.borderColor }}
                      />
                    </div>

                    <div>
                      <label htmlFor="cf7-company-name" className="block font-semibold mb-1">
                        {content.contact.companyLabel.replace('*', '')}
                        <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="cf7-company-name"
                        name="company-name"
                        type="text"
                        required
                        placeholder={content.contact.companyPlaceholder}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border text-xs min-h-[42px]"
                        style={{ borderColor: tokens.borderColor }}
                      />
                    </div>

                    <fieldset>
                      <legend className="font-semibold mb-2">{content.contact.roleQuestion}</legend>
                      <div className="space-y-1.5">
                        {content.contact.roleOptions.slice(0, 3).map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-2 cursor-pointer py-0.5"
                          >
                            <input
                              type="radio"
                              name="describes-you"
                              value={option}
                              checked={describesYou === option}
                              onChange={() => setDescribesYou(option)}
                              className="accent-[#551020] w-4 h-4"
                            />
                            <span style={{ color: tokens.muted }}>{option}</span>
                          </label>
                        ))}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                          {content.contact.roleOptions.slice(3).map((option) => (
                            <label
                              key={option}
                              className="flex items-center gap-2 cursor-pointer py-0.5"
                            >
                              <input
                                type="radio"
                                name="describes-you"
                                value={option}
                                checked={describesYou === option}
                                onChange={() => setDescribesYou(option)}
                                className="accent-[#551020] w-4 h-4"
                              />
                              <span style={{ color: tokens.muted }}>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor="cf7-notes" className="sr-only">
                        {content.contact.notesPlaceholder}
                      </label>
                      <textarea
                        id="cf7-notes"
                        name="anything-else"
                        rows={3}
                        placeholder={content.contact.notesPlaceholder}
                        value={anythingElse}
                        onChange={(e) => setAnythingElse(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border text-xs"
                        style={{ borderColor: tokens.borderColor }}
                      />
                    </div>

                    <div aria-live="polite">
                      {formError && (
                        <p className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-800 font-medium">
                          {formError}
                        </p>
                      )}
                      {formSuccess && (
                        <div className="p-3 rounded-lg bg-[#FAF6EC] border border-[#8A9332] text-[#1C1513] font-medium flex items-center justify-between gap-2">
                          <span>{formSuccess}</span>
                          <button
                            type="button"
                            onClick={() => openStudio('sheets')}
                            className="underline font-bold text-[#551020] shrink-0 cursor-pointer"
                          >
                            View Sheet
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="inline-flex items-center group cursor-pointer disabled:opacity-60"
                      >
                        <span
                          className="inline-flex items-center px-6 py-2.5 rounded-full text-white text-xs font-semibold min-h-[42px]"
                          style={{ backgroundColor: tokens.headlineColor }}
                        >
                          {formSubmitting
                            ? content.contact.submittingLabel
                            : content.contact.submitCta}
                        </span>
                        <span
                          className="w-10 h-10 rounded-full flex items-center justify-center -ml-1"
                          style={{ backgroundColor: tokens.amber, color: tokens.ink }}
                          aria-hidden="true"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </button>
                    </div>

                    <div className="pt-2 text-[11px] space-y-1" style={{ color: tokens.muted }}>
                      <p>{content.contact.noteLine1}</p>
                      <p className="font-semibold" style={{ color: tokens.ink }}>
                        <a href="#contact" className="hover:underline inline-flex items-center gap-1">
                          <span>{content.contact.noteLine2}</span>
                          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* 12. Blog / Articles ("What we have written") */}
          <section id="blog" className="py-14 sm:py-20">
            <div className="max-w-[940px] mx-auto px-4 sm:px-6">
              <div
                className={`flex items-end justify-between gap-4 mb-8 ${
                  isMobileSim ? 'flex-col items-start' : 'flex-col sm:flex-row sm:items-end'
                }`}
              >
                <div>
                  <h2 className="font-serif-display font-bold text-[30px] sm:text-[38px] leading-tight mb-2">
                    {content.blog.headline}
                  </h2>
                  <p className="text-sm" style={{ color: tokens.muted }}>
                    {content.blog.subheadline}
                  </p>
                </div>
                <a
                  href="#blog"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-xs font-semibold shrink-0 min-h-[40px]"
                  style={{
                    borderColor: tokens.borderColor,
                    borderWidth: `${tokens.borderWidth}px`,
                    borderStyle: 'solid',
                    color: tokens.ink,
                  }}
                >
                  <span>{content.blog.viewAllCta}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <div
                className={`grid gap-5 ${
                  isMobileSim ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
                }`}
              >
                {content.blog.posts.map((post, idx) => {
                  const thumbColor =
                    post.tone === 'maroon'
                      ? '#7A192D'
                      : post.tone === 'burgundy'
                        ? '#551020'
                        : '#8B5E2A';
                  const blogImg =
                    idx === 0
                      ? tokens.blog1ImageUrl
                      : idx === 1
                        ? tokens.blog2ImageUrl
                        : tokens.blog3ImageUrl;
                  return (
                    <article
                      key={post.title}
                      className="p-4 flex flex-col justify-between bg-[#FBF8EE]"
                      style={{
                        borderColor: tokens.borderColor,
                        borderWidth: `${tokens.borderWidth}px`,
                        borderStyle: 'solid',
                        borderRadius: `${tokens.cardRadius}px`,
                      }}
                    >
                      <div>
                        <div
                          className="w-full h-36 rounded-xl mb-4 overflow-hidden"
                          style={{ backgroundColor: thumbColor }}
                        >
                          {blogImg && (
                            <img
                              src={blogImg}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>
                        <div className="text-[11px] mb-1.5" style={{ color: tokens.muted }}>
                          {post.date}
                        </div>
                        <h3 className="font-serif-display font-bold text-[17px] leading-snug mb-4">
                          {post.title}
                        </h3>
                      </div>

                      <div
                        className="flex items-center justify-between pt-3 border-t text-[11px]"
                        style={{ borderColor: tokens.borderColor }}
                      >
                        <span
                          className="px-2.5 py-1 rounded-md border font-semibold bg-white"
                          style={{ borderColor: tokens.borderColor, color: tokens.ink }}
                        >
                          {post.category}
                        </span>
                        <span style={{ color: tokens.muted }}>{post.author}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 13. FAQ Accordion ("Questions teams ask before the first call.") */}
          <section id="faq" className="pb-16 sm:pb-24">
            <div className="max-w-[780px] mx-auto px-4 sm:px-6">
              <h2 className="font-serif-display font-bold text-[30px] sm:text-[40px] leading-[1.12] text-center mb-10 text-balance">
                {content.faq.headline}
              </h2>

              <div className="space-y-3">
                {visibleFaqs.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={item.q}
                      className="overflow-hidden transition-colors"
                      style={{
                        backgroundColor: isOpen ? tokens.surface : '#FBF8EE',
                        borderColor: tokens.borderColor,
                        borderWidth: `${tokens.borderWidth}px`,
                        borderStyle: 'solid',
                        borderRadius: `${Math.max(10, tokens.cardRadius - 4)}px`,
                      }}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left text-sm font-semibold min-h-[52px] cursor-pointer"
                      >
                        <span>{item.q}</span>
                        {isOpen ? (
                          <Minus className="w-4 h-4 shrink-0" aria-hidden="true" />
                        ) : (
                          <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                        )}
                      </button>
                      {isOpen && (
                        <div
                          className="px-5 pb-5 text-[13px] leading-relaxed"
                          style={{ color: tokens.muted }}
                        >
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllFaqs((v) => !v)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold min-h-[42px] cursor-pointer hover:opacity-95"
                  style={{ backgroundColor: tokens.headlineColor }}
                >
                  {showAllFaqs ? (
                    <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  <span>
                    {showAllFaqs ? content.faq.showLessCta : content.faq.loadMoreCta}
                  </span>
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* 14. Footer */}
        <footer
          role="contentinfo"
          className="text-white pt-14 pb-0 relative overflow-hidden"
          style={{ backgroundColor: tokens.footerBg }}
        >
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
              <div>
                <div className="font-sans-body font-bold text-2xl tracking-tight mb-1">
                  {content.footer.brand}
                </div>
                <p className="text-xs text-white/70 max-w-[180px]">{content.footer.tagline}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full border border-white/30 flex flex-col items-center justify-center text-[9px] font-bold leading-tight text-center">
                  <span>AICPA</span>
                  <span>SOC 2</span>
                </span>
                <span className="w-12 h-12 rounded-full border border-white/30 flex flex-col items-center justify-center text-[10px] font-bold leading-tight text-center">
                  <span>BAA</span>
                  <span className="text-[8px] font-normal text-white/70">compliant</span>
                </span>
              </div>
            </div>

            <div
              className={`grid gap-8 mb-10 ${
                isMobileSim ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-5'
              }`}
            >
              {content.footer.columns.map((col) => (
                <div key={col.title}>
                  <h3 className="text-[10px] font-bold tracking-[0.09em] uppercase text-white/55 mb-3">
                    {col.title}
                  </h3>
                  <ul className="space-y-1.5 text-xs text-white/85">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#top" className="hover:underline">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <h3 className="text-[10px] font-bold tracking-[0.09em] uppercase text-white/55 mb-2">
                {content.footer.aboutTitle}
              </h3>
              <ul className="space-y-1.5 text-xs text-white/85">
                {content.footer.aboutLinks.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-[11px] text-white/60">
              <span>{content.footer.copyright}</span>
              <div className="flex items-center gap-5">
                <a href="#top" className="hover:text-white">
                  {content.footer.terms}
                </a>
                <a href="#top" className="hover:text-white">
                  {content.footer.privacy}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a href="#top" aria-label="YouTube" className="hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                  </svg>
                </a>
                <a href="#top" aria-label="LinkedIn" className="hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <svg
            viewBox="0 0 1080 120"
            className="w-full h-[96px] mt-8 opacity-20 pointer-events-none block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0 120 Q 120 10 240 120 T 480 120 T 720 120 T 960 120 T 1080 120"
              fill="none"
              stroke="#FAF6EC"
              strokeWidth="1"
            />
            <circle cx="270" cy="90" r="48" fill="none" stroke="#FAF6EC" strokeWidth="1" />
            <circle cx="540" cy="90" r="48" fill="none" stroke="#FAF6EC" strokeWidth="1" />
            <circle cx="810" cy="90" r="48" fill="none" stroke="#FAF6EC" strokeWidth="1" />
          </svg>
        </footer>
      </div>

      {/* Slide-out Mobile/Desktop Navigation Drawer (holds WP Customizer, Sheet Log, Export flo.zip, EN/FR switcher) */}
      <SlideOutMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        content={content}
        locale={locale}
        detectedCountry={detectedCountry}
        onChangeLocale={setLocale}
        onOpenCustomizer={openStudio}
        tokens={tokens}
      />

      {/* FLO WordPress Customizer, Geo/Breakpoint Tester, Google Sheets & flo.zip Exporter */}
      <ThemeCustomizerDrawer
        isOpen={customizerOpen}
        activeTab={customizerTab}
        onTabChange={setCustomizerTab}
        onClose={() => setCustomizerOpen(false)}
        tokens={tokens}
        onChangeTokens={setTokens}
        icons={icons}
        onChangeIcons={setIcons}
        content={content}
        onUpdateContentField={handleUpdateContentField}
        onResetAll={handleResetAll}
        viewportMode={viewportMode}
        onChangeViewportMode={setViewportMode}
        geoOverride={geoOverride}
        onSimulateGeo={handleSimulateGeo}
        detectedCountry={detectedCountry}
        locale={locale}
        submissions={submissions}
        onRefreshSubmissions={refreshSubmissions}
        onClearSubmissions={async () => {
          await fetch('/api/submissions', { method: 'DELETE' });
          refreshSubmissions();
        }}
        googleSheetWebhook={googleSheetWebhook}
        onSaveWebhook={async (url) => {
          await fetch('/api/sheets-config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ googleSheetWebhook: url }),
          });
          setGoogleSheetWebhook(url);
        }}
      />
    </div>
  );
}
