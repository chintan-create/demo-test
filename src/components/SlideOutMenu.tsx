import React, { useEffect, useRef } from 'react';
import { X, Globe, SlidersHorizontal, ArrowUpRight, FileSpreadsheet } from 'lucide-react';
import type { Locale, PageContent, ThemeTokens } from '../data/translations';

interface SlideOutMenuProps {
  isOpen: boolean;
  onClose: () => void;
  content: PageContent;
  locale: Locale;
  detectedCountry: string;
  onChangeLocale: (locale: Locale) => void;
  onOpenCustomizer: (tab?: 'tokens' | 'content' | 'tester' | 'sheets' | 'export') => void;
  tokens: ThemeTokens;
}

export function SlideOutMenu({
  isOpen,
  onClose,
  content,
  locale,
  detectedCountry,
  onChangeLocale,
  onOpenCustomizer,
  tokens,
}: SlideOutMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`drawer-backdrop fixed inset-0 bg-black/45 backdrop-blur-[2px] ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Slide-out Panel */}
      <aside
        id="mobile-slideout-menu"
        role="dialog"
        aria-modal="true"
        aria-label={content.nav.menuLabel}
        className={`drawer-panel fixed top-0 right-0 h-full w-[320px] max-w-[88vw] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: tokens.bg, color: tokens.ink }}
      >
        <div>
          <div
            className="flex items-center justify-between pb-5 mb-6 border-b"
            style={{ borderColor: tokens.borderColor }}
          >
            <span className="font-sans-body font-bold text-xl tracking-tight">
              {content.nav.brand}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={content.nav.closeMenuLabel}
              className="w-11 h-11 rounded-full flex items-center justify-center border transition-colors hover:bg-black/5 cursor-pointer"
              style={{ borderColor: tokens.borderColor }}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Primary drawer navigation">
            <ul className="space-y-1">
              {content.nav.links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-3 rounded-xl font-medium text-base transition-colors hover:bg-black/5 min-h-[44px]"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language / Geolocation switcher */}
          <div
            className="mt-6 pt-5 border-t"
            style={{ borderColor: tokens.borderColor }}
          >
            <div className="flex items-center justify-between text-xs font-medium mb-2.5" style={{ color: tokens.muted }}>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                {locale === 'fr' ? 'Langue / Région' : 'Language / Region'}
              </span>
              <span className="uppercase tracking-wider">{detectedCountry}</span>
            </div>
            <div
              className="grid grid-cols-2 gap-1.5 p-1 rounded-xl border"
              style={{ borderColor: tokens.borderColor, backgroundColor: tokens.surface }}
            >
              <button
                type="button"
                onClick={() => onChangeLocale('en')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors min-h-[40px] cursor-pointer ${
                  locale === 'en' ? 'text-white shadow-sm' : 'hover:bg-black/5'
                }`}
                style={locale === 'en' ? { backgroundColor: tokens.burgundy } : undefined}
              >
                English (Global)
              </button>
              <button
                type="button"
                onClick={() => onChangeLocale('fr')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors min-h-[40px] cursor-pointer ${
                  locale === 'fr' ? 'text-white shadow-sm' : 'hover:bg-black/5'
                }`}
                style={locale === 'fr' ? { backgroundColor: tokens.burgundy } : undefined}
              >
                Français (CA/FR)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 space-y-2.5 border-t mt-6" style={{ borderColor: tokens.borderColor }}>
          <a
            href="#contact"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-white text-sm font-semibold min-h-[44px] transition-opacity hover:opacity-90"
            style={{ backgroundColor: tokens.burgundy }}
          >
            <span>{content.nav.cta}</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCustomizer('tokens');
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold min-h-[44px] hover:bg-black/5 cursor-pointer"
              style={{ borderColor: tokens.borderColor }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>WP Customizer</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCustomizer('sheets');
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold min-h-[44px] hover:bg-black/5 cursor-pointer"
              style={{ borderColor: tokens.borderColor }}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Sheet Log</span>
            </button>
          </div>

          <a
            href="/api/flo.zip"
            download="flo.zip"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold min-h-[44px] transition-opacity hover:opacity-90"
            style={{ backgroundColor: tokens.amber, color: tokens.ink }}
          >
            <span>Download FLO Theme (.zip)</span>
          </a>
        </div>
      </aside>
    </div>
  );
}
