import React from 'react';
import {
  Check,
  ShieldCheck,
  Compass,
  Sparkles,
  FlaskConical,
  Code2,
  Layers,
  RefreshCw,
  Cpu,
  Zap,
  BookOpen,
  Database,
  Workflow,
  Terminal,
  Rocket,
  Blocks,
  Building2,
  Briefcase,
  Clock,
  Wrench,
  ArrowUpCircle,
  Users,
  Award,
  FileCode2,
  GitBranch,
} from 'lucide-react';
import type { ThemeTokens } from '../data/translations';

export function DynamicIcon({
  name,
  className = 'w-4 h-4',
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case 'shield':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'compass':
      return <Compass className={className} aria-hidden="true" />;
    case 'sparkles':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M10.5 3.5c.3-1 1.7-1 2 0l1.3 4.2c.2.6.7 1.1 1.3 1.3l4.2 1.3c1 .3 1 1.7 0 2l-4.2 1.3c-.6.2-1.1.7-1.3 1.3l-1.3 4.2c-.3 1-1.7 1-2 0l-1.3-4.2c-.2-.6-.7-1.1-1.3-1.3l-4.2-1.3c-1-.3-1-1.7 0-2l4.2-1.3c.6-.2 1.1-.7 1.3-1.3l1.3-4.2Z" />
          <path d="M18.8 3.2c.2-.5.8-.5 1 0l.4 1.1c.1.2.3.4.5.5l1.1.4c.5.2.5.8 0 1l-1.1.4c-.2.1-.4.3-.5.5l-.4 1.1c-.2.5-.8.5-1 0l-.4-1.1c-.1-.2-.3-.4-.5-.5l-1.1-.4c-.5-.2-.5-.8 0-1l1.1-.4c.2-.1.4-.3.5-.5l.4-1.1Z" />
          <path d="M18.2 16.2c.2-.5.8-.5 1 0l.3.9c.1.2.3.4.5.5l.9.3c.5.2.5.8 0 1l-.9.3c-.2.1-.4.3-.5.5l-.3.9c-.2.5-.8.5-1 0l-.3-.9c-.1-.2-.3-.4-.5-.5l-.9-.3c-.5-.2-.5-.8 0-1l.9-.3c.2-.1.4-.3.5-.5l.3-.9Z" />
        </svg>
      );
    case 'split-panel':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <path d="M10.5 4.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h3.5v-15Z" fill="currentColor" />
          <path d="M13.5 4.5H17A2.5 2.5 0 0 1 19.5 7v10a2.5 2.5 0 0 1-2.5 2.5h-3.5" stroke="currentColor" strokeWidth="2" strokeDasharray="2.5 2.5" strokeLinecap="round" />
          <line x1="12" y1="3.5" x2="12" y2="20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'laptop-code':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="4" y="5" width="16" height="11" rx="1.8" fill="currentColor" />
          <path d="M9.5 8.7 7.3 10.5l2.2 1.8M14.5 8.7l2.2 1.8-2.2 1.8M12.6 8.2l-1.2 4.6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.5 18h19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'flask':
      return <FlaskConical className={className} aria-hidden="true" />;
    case 'code':
      return <Code2 className={className} aria-hidden="true" />;
    case 'layers':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z" />
          <path d="m3.5 11.8 8.5 4.5 8.5-4.5-1.9-1-6.6 3.5-6.6-3.5-1.9 1Z" />
          <path d="m3.5 15.8 8.5 4.5 8.5-4.5-1.9-1-6.6 3.5-6.6-3.5-1.9 1Z" />
        </svg>
      );
    case 'clipboard-code':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <rect x="9" y="2.5" width="6" height="3" rx="1" fill="currentColor" />
          <rect x="4.5" y="4.5" width="15" height="16.5" rx="2.5" fill="currentColor" />
          <path d="M10.2 11 8 13l2.2 2M13.8 11 16 13l-2.2 2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'foundry-growth':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M12 3 6.5 9.5h11L12 3Z" />
          <path d="M12 7.8 5.5 14h13L12 7.8Z" />
          <path d="M12 12.6 4.5 18.5h15L12 12.6Z" />
          <rect x="10.7" y="18" width="2.6" height="3.5" rx="0.6" />
        </svg>
      );
    case 'refresh':
      return <RefreshCw className={className} aria-hidden="true" />;
    case 'cpu':
      return <Cpu className={className} aria-hidden="true" />;
    case 'zap':
      return <Zap className={className} aria-hidden="true" />;
    case 'book':
      return <BookOpen className={className} aria-hidden="true" />;
    case 'database':
      return <Database className={className} aria-hidden="true" />;
    case 'workflow':
      return <Workflow className={className} aria-hidden="true" />;
    case 'terminal':
      return <Terminal className={className} aria-hidden="true" />;
    case 'rocket':
      return <Rocket className={className} aria-hidden="true" />;
    case 'blocks':
      return <Blocks className={className} aria-hidden="true" />;
    case 'building':
      return <Building2 className={className} aria-hidden="true" />;
    case 'briefcase':
      return <Briefcase className={className} aria-hidden="true" />;
    case 'clock':
      return <Clock className={className} aria-hidden="true" />;
    case 'wrench':
      return <Wrench className={className} aria-hidden="true" />;
    case 'arrow-up-circle':
      return <ArrowUpCircle className={className} aria-hidden="true" />;
    case 'users':
      return <Users className={className} aria-hidden="true" />;
    case 'award':
      return <Award className={className} aria-hidden="true" />;
    case 'file-code':
      return <FileCode2 className={className} aria-hidden="true" />;
    case 'git-branch':
      return <GitBranch className={className} aria-hidden="true" />;
    case 'check-circle':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
          <path d="m8.2 12.3 2.5 2.5 5.2-5.4" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'check':
    default:
      return <Check className={className} strokeWidth={2.5} aria-hidden="true" />;
  }
}

export function HeroBotanicalStage({ tokens }: { tokens: ThemeTokens }) {
  return (
    <div className="relative w-full mt-10 select-none overflow-hidden">
      {/* 2-Row Botanical Geometric Mosaic Strip anchored behind bottom of burgundy card */}
      <div className="absolute inset-x-0 bottom-0 h-[126px] sm:h-[156px] z-10 overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1080 156"
          className="w-full h-full block"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Row 1 */}
          <rect x="0" y="0" width="96" height="78" fill="#E4AF38" />
          <path d="M 8 6 A 76 76 0 0 1 88 78 A 76 76 0 0 1 8 6 Z" fill="#BCE3B4" />
          <rect x="96" y="0" width="96" height="78" fill="#ECE2CC" />
          <path d="M 96 0 H 192 V 78 H 144 A 48 48 0 0 1 96 30 Z" fill="#DFD1B4" />
          <rect x="888" y="0" width="96" height="78" fill="#E4AF38" />
          <path d="M 984 0 V 78 H 906 A 78 78 0 0 1 984 0 Z" fill="#BCE3B4" />
          <rect x="984" y="0" width="96" height="78" fill="#E4AF38" />
          <path d="M 984 0 H 1080 A 78 78 0 0 1 1002 78 H 984 Z" fill="#BCE3B4" />

          {/* Row 2 */}
          <rect x="0" y="78" width="96" height="78" fill="#68381B" />
          <path d="M 96 78 V 156 H 80 A 68 68 0 0 1 96 78 Z" fill="#CA9118" />
          <rect x="96" y="78" width="96" height="78" fill="#CA9118" />
          <rect x="888" y="78" width="96" height="78" fill="#68381B" />
          <rect x="984" y="78" width="96" height="78" fill="#68381B" />
          <path d="M 984 156 A 78 78 0 0 1 1062 78 H 1080 V 156 Z" fill="#CA9118" />
        </svg>
      </div>

      {/* Foreground Solid Burgundy Stage Card sitting flush on bottom */}
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 relative z-20 flex justify-center sm:justify-end">
        <div
          className="w-full sm:w-[94%] h-[210px] sm:h-[268px] overflow-hidden relative"
          style={{
            backgroundColor: '#6D192B',
          }}
        >
          {tokens.heroImageUrl && (
            <img
              src={tokens.heroImageUrl}
              alt="Flo health tech engineering platform showcase"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function GeometricMosaicDivider({ tokens }: { tokens: ThemeTokens }) {
  return (
    <div className="w-full h-[52px] sm:h-[64px] overflow-hidden select-none" aria-hidden="true">
      <svg viewBox="0 0 1080 64" className="w-full h-full block" preserveAspectRatio="none">
        <rect width="1080" height="64" fill="#EDE3CB" />
        <rect x="0" y="0" width="108" height="64" fill={tokens.olive} />
        <path d="M 0 0 L 108 0 Q 54 64 0 64 Z" fill="#D5DC66" />
        <rect x="108" y="0" width="108" height="64" fill={tokens.burgundy} />
        <circle cx="162" cy="64" r="46" fill={tokens.amber} />
        <rect x="216" y="0" width="108" height="64" fill="#F4EDE0" />
        <path d="M 216 64 Q 270 0 324 64 Z" fill="#704B28" />
        <rect x="324" y="0" width="108" height="64" fill={tokens.amber} />
        <path d="M 324 0 Q 378 64 432 0 Z" fill={tokens.burgundy} />
        <rect x="432" y="0" width="108" height="64" fill="#E6DEC8" />
        <circle cx="486" cy="0" r="46" fill={tokens.olive} />
        <rect x="540" y="0" width="108" height="64" fill={tokens.burgundy} />
        <path d="M 540 64 Q 594 0 648 64 Z" fill="#E6DEC8" />
        <rect x="648" y="0" width="108" height="64" fill="#D5DC66" />
        <path d="M 648 0 Q 702 64 756 0 Z" fill={tokens.amber} />
        <rect x="756" y="0" width="108" height="64" fill={tokens.burgundy} />
        <circle cx="810" cy="64" r="46" fill="#EDE3CB" />
        <rect x="864" y="0" width="108" height="64" fill={tokens.amber} />
        <path d="M 864 64 Q 918 0 972 64 Z" fill={tokens.olive} />
        <rect x="972" y="0" width="108" height="64" fill="#EDE3CB" />
        <path d="M 972 0 Q 1026 64 1080 0 Z" fill={tokens.burgundy} />
      </svg>
    </div>
  );
}

export function ServiceCardArtwork({
  variant,
  tokens,
  iconKey,
}: {
  variant: number;
  tokens: ThemeTokens;
  iconKey: string;
}) {
  const iconColor =
    variant === 0 ? '#BE8710' : variant === 1 ? '#DDA52B' : tokens.headlineColor;

  return (
    <div className="relative h-[152px] w-full overflow-hidden">
      {variant === 0 && (
        <svg viewBox="0 0 280 140" className="w-full h-full block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="280" height="140" fill="#BE8710" />
          {/* 4-petal butterfly motif on left */}
          <path d="M 0 0 A 70 70 0 0 1 70 70 L 0 70 Z" fill="#D3A540" />
          <path d="M 140 0 A 70 70 0 0 0 70 70 L 140 70 Z" fill="#D3A540" />
          <path d="M 0 140 A 70 70 0 0 0 70 70 L 0 70 Z" fill="#D3A540" />
          <path d="M 140 140 A 70 70 0 0 1 70 70 L 140 70 Z" fill="#D3A540" />
          {/* Right columns */}
          <path d="M 140 0 L 210 0 L 210 70 A 70 70 0 0 1 140 0 Z" fill="#D3A540" opacity="0.45" />
          <path d="M 210 0 L 280 0 A 70 70 0 0 1 210 70 Z" fill="#D3A540" opacity="0.6" />
          <path d="M 140 70 A 70 70 0 0 1 210 140 L 140 140 Z" fill="#D3A540" opacity="0.45" />
          <path d="M 210 70 A 70 70 0 0 1 280 140 L 210 140 Z" fill="#D3A540" />
          {/* Subtle modular grid lines */}
          <path d="M 70 0 V 140 M 140 0 V 140 M 210 0 V 140 M 0 70 H 280" stroke="#DFB95E" strokeOpacity="0.28" strokeWidth="1" fill="none" />
        </svg>
      )}
      {variant === 1 && (
        <svg viewBox="0 0 280 140" className="w-full h-full block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="280" height="140" fill="#E5AF37" />
          {/* Row 1 cyan modular geometric tiles */}
          <path d="M 0 0 L 70 0 L 70 70 A 70 70 0 0 1 0 0 Z" fill={tokens.service2Accent} />
          <path d="M 70 0 A 70 70 0 0 1 140 70 L 70 70 Z" fill={tokens.service2Accent} />
          <path d="M 140 0 L 210 0 L 210 70 A 70 70 0 0 1 140 0 Z" fill={tokens.service2Accent} />
          <path d="M 210 70 A 70 70 0 0 1 280 0 A 70 70 0 0 1 210 70 Z" fill={tokens.service2Accent} />
          {/* Row 2 cyan modular geometric tiles */}
          <path d="M 0 70 L 70 70 L 70 140 A 70 70 0 0 1 0 70 Z" fill={tokens.service2Accent} />
          <path d="M 70 70 A 70 70 0 0 1 140 140 L 70 140 Z" fill={tokens.service2Accent} />
          <path d="M 140 140 A 70 70 0 0 1 210 70 L 210 140 Z" fill={tokens.service2Accent} />
          <path d="M 210 70 L 280 70 A 70 70 0 0 1 210 140 Z" fill={tokens.service2Accent} />
        </svg>
      )}
      {variant === 2 && (
        <svg viewBox="0 0 280 140" className="w-full h-full block" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="280" height="140" fill="#E2B345" />
          {/* Row 1 warm gold geometric tiles */}
          <path d="M 0 0 L 70 0 A 70 70 0 0 1 0 70 Z" fill="#D49E2A" />
          <path d="M 70 0 A 70 70 0 0 0 140 70 L 140 0 Z" fill="#D49E2A" />
          <path d="M 140 0 L 210 0 L 210 70 A 70 70 0 0 1 140 0 Z" fill="#D49E2A" />
          <rect x="210" y="0" width="70" height="70" fill="#D49E2A" opacity="0.82" />
          {/* Row 2 warm gold geometric tiles */}
          <path d="M 0 70 A 70 70 0 0 1 70 140 L 0 140 Z" fill="#ECC76B" opacity="0.7" />
          <path d="M 70 70 L 140 70 A 70 70 0 0 1 70 140 Z" fill="#D49E2A" />
          <path d="M 140 70 L 210 70 L 210 140 A 70 70 0 0 1 140 70 Z" fill="#D49E2A" />
          <path d="M 210 70 A 70 70 0 0 1 280 140 L 210 140 Z" fill="#D49E2A" opacity="0.85" />
        </svg>
      )}

      {/* Droplet-shaped white icon container matching Figma (sharp bottom-right corner) */}
      <div
        className={`absolute w-[54px] h-[54px] bg-white shadow-xs flex items-center justify-center ${
          variant === 0
            ? 'top-2 right-11'
            : variant === 1
              ? 'bottom-1.5 right-8'
              : 'bottom-1.5 left-[43%] -translate-x-1/2'
        }`}
        style={{
          color: iconColor,
          borderRadius: '50% 50% 4px 50%',
        }}
      >
        <DynamicIcon name={iconKey} className="w-6 h-6" />
      </div>
    </div>
  );
}

export function PartnerLogoWordmark({ name }: { name: string }) {
  if (name === 'AdAge') {
    return (
      <span className="font-sans-body font-extrabold text-xl sm:text-[23px] tracking-[-0.04em] text-[#1C1513]">
        AdAge
      </span>
    );
  }
  if (name === 'Capital One') {
    return (
      <span className="inline-flex items-center gap-1 font-sans-body font-bold text-base sm:text-lg tracking-tight text-[#1C1513] italic">
        Capital<span className="not-italic font-normal">One</span>
      </span>
    );
  }
  if (name === 'Deloitte.') {
    return (
      <span className="font-sans-body font-extrabold text-xl sm:text-2xl tracking-tight text-[#1C1513]">
        Deloitte<span className="text-[#86BC25]">.</span>
      </span>
    );
  }
  if (name === 'Google') {
    return (
      <span className="font-sans-body font-semibold text-xl sm:text-2xl tracking-tight text-[#1C1513]">
        Google
      </span>
    );
  }
  return (
    <span className="font-sans-body font-semibold text-lg text-[#1C1513]">{name}</span>
  );
}

export function VerticalCardPattern({ variant }: { variant: number }) {
  const stroke = '#DCEB9E';
  return (
    <div className="w-full h-[136px] overflow-hidden mb-5" aria-hidden="true">
      <svg viewBox="0 0 280 140" className="w-full h-full block" preserveAspectRatio="xMidYMid meet">
        {/* Row 1 shared outlines */}
        <path d="M 0.5 69.5 V 35 A 34.5 34.5 0 0 1 69.5 35 V 69.5 Z" fill="none" stroke={stroke} strokeWidth="1" />
        <path
          d="M 70.5 0.5 H 105 A 34.5 34.5 0 0 1 105 69.5 H 70.5 Z"
          fill={variant === 1 ? '#671225' : 'none'}
          stroke={variant === 1 ? '#671225' : stroke}
          strokeWidth="1"
        />
        <path d="M 140.5 0.5 H 209.5 A 69 69 0 0 1 140.5 69.5 Z" fill="none" stroke={stroke} strokeWidth="1" />
        <path
          d="M 210.5 69.5 V 35 A 34.5 34.5 0 0 1 279.5 35 V 69.5 Z"
          fill={variant === 0 ? '#671225' : variant === 2 ? '#E3D2B4' : 'none'}
          stroke={variant === 0 ? '#671225' : variant === 2 ? '#D7C4A3' : stroke}
          strokeWidth="1"
        />

        {/* Row 2 shared / variant shapes */}
        <path d="M 0.5 70.5 A 69 69 0 0 1 69.5 139.5 H 0.5 Z" fill="none" stroke={stroke} strokeWidth="1" />

        {variant === 0 && (
          <rect x="70.5" y="70.5" width="69" height="69" fill="#E3D2B4" stroke={stroke} strokeWidth="1" />
        )}
        {variant === 1 && (
          <path d="M 70.5 70.5 A 69 69 0 0 1 139.5 139.5 H 70.5 Z" fill="none" stroke={stroke} strokeWidth="1" />
        )}
        {variant === 2 && (
          <path
            d="M 70.5 70.5 H 105 A 34.5 34.5 0 0 1 105 139.5 H 70.5 Z"
            fill="#CA9117"
            stroke="#B4C676"
            strokeWidth="1"
          />
        )}

        <path d="M 140.5 139.5 A 69 69 0 0 1 209.5 70.5 A 69 69 0 0 1 140.5 139.5 Z" fill="none" stroke={stroke} strokeWidth="1" />
        <path
          d="M 210.5 70.5 A 69 69 0 0 1 279.5 139.5 H 210.5 Z"
          fill={variant === 1 ? '#68381B' : 'none'}
          stroke={variant === 1 ? '#68381B' : stroke}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export function TeamMosaicGrid({ tokens }: { tokens: ThemeTokens }) {
  if (tokens.teamImageUrl) {
    return (
      <div
        className="w-full aspect-[4/3] overflow-hidden border"
        style={{
          borderRadius: `${tokens.cardRadius}px`,
          borderColor: tokens.borderColor,
          borderWidth: `${tokens.borderWidth}px`,
        }}
      >
        <img
          src={tokens.teamImageUrl}
          alt="Flo and Incubyte remote engineering team"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2.5 w-full" aria-hidden="true">
      <div className="aspect-square rounded-xl bg-[#EFE8D7] overflow-hidden relative">
        <div className="absolute right-0 bottom-0 w-3/4 h-3/4 rounded-tl-full bg-[#E5DEC9]" />
      </div>
      <div className="aspect-square rounded-xl bg-[#EFE8D7] overflow-hidden relative">
        <div className="w-full h-1/2 bg-[#E5DEC9] rounded-b-full" />
      </div>
      <div className="aspect-square rounded-xl overflow-hidden relative" style={{ backgroundColor: tokens.burgundy }}>
        <div className="w-full h-1/2 rounded-b-full bg-[#FAF6EC]/15" />
      </div>
      <div className="aspect-square rounded-xl bg-[#EFE8D7] overflow-hidden relative">
        <div className="w-3/4 h-3/4 rounded-br-full bg-[#E5DEC9]" />
      </div>

      <div className="aspect-square rounded-xl bg-[#EFE8D7] overflow-hidden relative">
        <div className="w-full h-full rounded-tr-full bg-[#E5DEC9]" />
      </div>
      <div className="aspect-square rounded-xl bg-[#EFE8D7] overflow-hidden relative">
        <div className="w-4/5 h-4/5 mx-auto mt-2 rounded-full bg-[#E5DEC9]" />
      </div>
      <div className="aspect-square rounded-xl bg-[#EFE8D7] overflow-hidden relative">
        <div className="w-full h-1/2 mt-auto bg-[#E5DEC9] rounded-t-full" />
      </div>
      <div className="aspect-square rounded-xl overflow-hidden relative" style={{ backgroundColor: tokens.amber }}>
        <div className="w-3/4 h-3/4 rounded-br-full bg-[#FAF6EC]/25" />
      </div>

      <div className="aspect-square rounded-xl overflow-hidden relative" style={{ backgroundColor: tokens.olive }}>
        <div className="w-full h-full rounded-tl-full bg-[#FAF6EC]/20" />
      </div>
      <div className="aspect-square rounded-xl bg-[#EFE8D7] overflow-hidden relative">
        <div className="w-full h-full rounded-bl-full bg-[#E5DEC9]" />
      </div>
      <div className="aspect-square rounded-xl overflow-hidden relative" style={{ backgroundColor: tokens.burgundy }}>
        <div className="w-3/4 h-3/4 ml-auto rounded-bl-full bg-[#FAF6EC]/15" />
      </div>
      <div className="aspect-square rounded-xl bg-[#EFE8D7] overflow-hidden relative">
        <div className="w-full h-full rounded-tr-full bg-[#E5DEC9]" />
      </div>
    </div>
  );
}
