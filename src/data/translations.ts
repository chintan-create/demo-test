export type Locale = 'en' | 'fr';

export interface ThemeTokens {
  bg: string;
  surface: string;
  burgundy: string;
  headlineColor: string;
  amber: string;
  service2Accent: string;
  olive: string;
  ink: string;
  muted: string;
  borderColor: string;
  borderWidth: number;
  cardRadius: number;
  footerBg: string;
  heroImageUrl: string;
  case1ImageUrl: string;
  case2ImageUrl: string;
  case3ImageUrl: string;
  pluginImageUrl: string;
  teamImageUrl: string;
  contactImageUrl: string;
  blog1ImageUrl: string;
  blog2ImageUrl: string;
  blog3ImageUrl: string;
}

export const DEFAULT_THEME_TOKENS: ThemeTokens = {
  bg: '#FAF5E6',
  surface: '#F4EFE3',
  burgundy: '#5F1120',
  headlineColor: '#4A0E17',
  amber: '#DDA132',
  service2Accent: '#52C3E6',
  olive: '#8A9332',
  ink: '#1C1513',
  muted: '#584D46',
  borderColor: '#DDD4C0',
  borderWidth: 1,
  cardRadius: 16,
  footerBg: '#080808',
  heroImageUrl: '',
  case1ImageUrl: '',
  case2ImageUrl: '',
  case3ImageUrl: '',
  pluginImageUrl: '',
  teamImageUrl: '',
  contactImageUrl: '',
  blog1ImageUrl: '',
  blog2ImageUrl: '',
  blog3ImageUrl: '',
};

export type IconName =
  | 'check'
  | 'shield'
  | 'compass'
  | 'sparkles'
  | 'flask'
  | 'code'
  | 'layers'
  | 'refresh'
  | 'cpu'
  | 'zap'
  | 'book'
  | 'database'
  | 'workflow'
  | 'terminal'
  | 'rocket'
  | 'blocks'
  | 'building'
  | 'briefcase'
  | 'clock'
  | 'wrench'
  | 'arrow-up-circle'
  | 'users'
  | 'award'
  | 'file-code'
  | 'git-branch'
  | 'split-panel'
  | 'laptop-code'
  | 'clipboard-code'
  | 'foundry-growth'
  | 'check-circle';

export interface IconOverrides {
  heroBadge1: IconName;
  heroBadge2: IconName;
  heroBadge3: IconName;
  pillar1: IconName;
  pillar2: IconName;
  pillar3: IconName;
  service1: IconName;
  service2: IconName;
  service3: IconName;
  fde1: IconName;
  fde2: IconName;
  fde3: IconName;
}

export const DEFAULT_ICON_OVERRIDES: IconOverrides = {
  heroBadge1: 'laptop-code',
  heroBadge2: 'book',
  heroBadge3: 'check-circle',
  pillar1: 'check',
  pillar2: 'check',
  pillar3: 'check',
  service1: 'sparkles',
  service2: 'split-panel',
  service3: 'laptop-code',
  fde1: 'layers',
  fde2: 'clipboard-code',
  fde3: 'foundry-growth',
};

export interface PageContent {
  nav: {
    brand: string;
    menuLabel: string;
    closeMenuLabel: string;
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    badges: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  logos: {
    caption: string;
    brands: string[];
  };
  craft: {
    headline: string;
    subheadline: string;
    cards: { title: string; body: string }[];
  };
  cases: {
    headline: string;
    subheadline: string;
    items: {
      eyebrow: string;
      logoLabel: string;
      title: string;
      body: string;
      cta: string;
      href: string;
    }[];
  };
  services: {
    headline: string;
    subheadline: string;
    cards: { title: string; body: string; cta: string }[];
  };
  verticals: {
    headline: string;
    subheadline: string;
    cards: { eyebrow: string; title: string; body: string; cta: string }[];
  };
  plugin: {
    eyebrow: string;
    headline: string;
    body: string;
    cta: string;
    tags: string[];
  };
  fde: {
    headline: string;
    subheadline: string;
    options: {
      eyebrow: string;
      metric: string;
      body: string;
      tag: string;
    }[];
    cta: string;
  };
  team: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  contact: {
    headline: string;
    subheadline: string;
    firstNameLabel: string;
    firstNamePlaceholder: string;
    lastNameLabel: string;
    lastNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    roleQuestion: string;
    roleOptions: string[];
    notesPlaceholder: string;
    submitCta: string;
    submittingLabel: string;
    successMessage: string;
    noteLine1: string;
    noteLine2: string;
  };
  blog: {
    headline: string;
    subheadline: string;
    viewAllCta: string;
    posts: {
      date: string;
      title: string;
      category: string;
      author: string;
      tone: 'maroon' | 'burgundy' | 'ochre';
    }[];
  };
  faq: {
    headline: string;
    items: { q: string; a: string }[];
    loadMoreCta: string;
    showLessCta: string;
  };
  footer: {
    brand: string;
    tagline: string;
    columns: {
      title: string;
      links: string[];
    }[];
    aboutTitle: string;
    aboutLinks: string[];
    copyright: string;
    terms: string;
    privacy: string;
  };
}

export const TRANSLATIONS: Record<Locale, PageContent> = {
  en: {
    nav: {
      brand: 'FLO',
      menuLabel: 'Open navigation menu',
      closeMenuLabel: 'Close navigation menu',
      links: [
        { label: 'Our Craft', href: '#craft' },
        { label: 'Case Studies', href: '#cases' },
        { label: 'Services', href: '#services' },
        { label: 'Industries', href: '#verticals' },
        { label: 'FDE Bench', href: '#fde' },
        { label: 'Contact', href: '#contact' },
      ],
      cta: 'Talk to an engineer',
    },
    hero: {
      eyebrow: 'SOFTWARE ENGINEERING FOR US HEALTH TECH',
      headline: "The rigor of healthtech, at AI's pace.",
      subheadline:
        'We embed engineers trained in the craft that keeps AI-accelerated engineering safe, compliant, and built to last.',
      badges: [
        'Spec-driven development',
        'Test-driven development',
        'Continuous delivery',
      ],
      primaryCta: 'Talk to an engineer',
      secondaryCta: 'See the work',
    },
    logos: {
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      brands: ['AdAge', 'Capital One', 'Deloitte.', 'Google'],
    },
    craft: {
      headline: 'AI is only as good as the team using it.',
      subheadline:
        'AI compounds whatever a team already brings. We spent years building the discipline it now amplifies.',
      cards: [
        {
          title: 'Spec before code.',
          body: 'The thinking happens before a line is written, so the build stays on target and rework stays small.',
        },
        {
          title: 'Test-first, always.',
          body: 'A failing test sets the target. Code earns its way in by passing it, not by looking right.',
        },
        {
          title: 'Clean code, by habit.',
          body: 'We refactor as we go, so the codebase stays fast to work in long after we hand it over.',
        },
      ],
    },
    cases: {
      headline: "AI in production. Here's what it took.",
      subheadline:
        "AI products we shipped for US health tech, built with AI and the judgment to know when it's wrong.",
      items: [
        {
          eyebrow: 'ENTERPRISE AI',
          logoLabel: 'rolai',
          title: 'Ideation to live MVP in three months.',
          body: 'A retrieval platform with no-code agentic workflows, wired to 20+ language models. Now live at Virginia Tech and Providence College, with manual academic work cut in half.',
          cta: 'Read the Rolai story',
          href: '#contact',
        },
        {
          eyebrow: 'MEDICARE COMPLIANCE',
          logoLabel: 'Healthy AI',
          title: '90% review time cut. Across 800,000+ minutes a month.',
          body: 'The AI workflow that reviews Medicare sales calls for compliance, flags the risk, and leaves an audit trail a reviewer can trust, at a volume a manual team never could.',
          cta: 'Read the Healthy AI case',
          href: '#contact',
        },
        {
          eyebrow: 'OUR OWN AI PRODUCT',
          logoLabel: '[anthara]',
          title: 'Compliant code, at AI speed.',
          body: "Anthara is the runtime layer we built so AI-generated code stays inside policy as it's written. We run it on our own regulated work, and now it ships as a product.",
          cta: 'See Anthara',
          href: '#contact',
        },
      ],
    },
    services: {
      headline: 'AI work that compounds across your engineering organisation.',
      subheadline:
        'Adoption, codebase, or feature work. The engineering craft underneath is the same.',
      cards: [
        {
          title: 'AI Enablement',
          body: 'The infrastructure that makes AI adoption safe, measurable, and consistent across your engineering organisation. Productivity that holds past the first quarter.',
          cta: 'Learn More',
        },
        {
          title: 'AI Modernization',
          body: 'Incremental modernization of regulated legacy platforms with automated test harnesses, clean domain boundaries, and zero disruption to clinical operations.',
          cta: 'Learn More',
        },
        {
          title: 'AI Product Engineering',
          body: 'AI features built into your product by senior engineers who use AI well. Shipped to your standards, paired and tested.',
          cta: 'Learn More',
        },
      ],
    },
    verticals: {
      headline: 'Built for the realities of US health tech.',
      subheadline:
        'Three health tech verticals where regulation is the design starting point',
      cards: [
        {
          eyebrow: 'PAYER TECH',
          title: 'Claims, eligibility, member AI.',
          body: 'Compliance review, claims processing, and member-facing AI, defensible across CMS and Medicare audit cycles.',
          cta: 'Book a Demo',
        },
        {
          eyebrow: 'PROVIDER TECH',
          title: 'Clinical workflows. EHR-native.',
          body: 'Provider directory, pre-procedure engagement, and ambient documentation, EHR-native against Epic, Cerner, and Athena.',
          cta: 'Book a Demo',
        },
        {
          eyebrow: 'BEHAVIORAL HEALTH TECH',
          title: 'Therapist matching. Member engagement.',
          body: 'Therapist matching, member engagement, and MAT pipelines, built 42 CFR Part 2 by design.',
          cta: 'Book a Demo',
        },
      ],
    },
    plugin: {
      eyebrow: 'SPOTLIGHT · OPEN-SOURCE PLUGIN',
      headline: 'Our engineers ship faster because our Claude plugin codifies our craft.',
      body: "Bee is the Claude Code plugin we built for ourselves and open sourced. It knows our practices, enforces our standards from discovery through review, and ships with every engineer on every client engagement. It's also the template for what we build for your team. When we set up your AI infrastructure, we draw from what we've already lived.",
      cta: 'Explore Bee',
      tags: ['Spec-driven', 'Open source', 'Built for Claude Code'],
    },
    fde: {
      headline: "Your foundational model may be replaceable. Your forward-deployed engineers aren't.",
      subheadline:
        'Foundation models are commoditizing. Defensibility shifts to forward-deployed engineers embedded inside your team. That bench is the moat.',
      options: [
        {
          eyebrow: 'OPTION 01 · ACQUIRE',
          metric: '$4 billion',
          body: "OpenAI's reported price for Tomoro's 150 forward-deployed engineers. Out of reach for the rest of the AI platform market.",
          tag: 'OUT OF REACH',
        },
        {
          eyebrow: 'OPTION 02 · BUILD',
          metric: '18 months',
          body: 'Hire, vet, train, deploy, and maybe ship in eighteen months. By then your customers have moved to a platform that already has the bench.',
          tag: 'TOO SLOW',
        },
        {
          eyebrow: 'OPTION 03 · FOUNDRY',
          metric: 'Build. Operate. Transfer.',
          body: 'We build a captive of eight to twelve FDE-grade engineers, branded as yours, trained on your platform, embedded with your team, and transferred to you in 24 to 36 months.',
          tag: 'THE THIRD PATH',
        },
      ],
      cta: 'Build your FDE bench',
    },
    team: {
      headline: 'The team behind the rigor.',
      subheadline: 'Founded 2020 by Sapan and Rushali. 140+ engineers. Fully remote. Founder-led.',
      cta: 'Meet the team',
    },
    contact: {
      headline: "Tell Us What You're Building.",
      subheadline:
        "What you're building and what's getting in the way. A founder reads every message and replies within two business days.",
      firstNameLabel: 'First Name*',
      firstNamePlaceholder: 'First name',
      lastNameLabel: 'Last Name*',
      lastNamePlaceholder: 'Last name',
      emailLabel: 'Work email*',
      emailPlaceholder: 'Business Email',
      companyLabel: 'Company Name*',
      companyPlaceholder: 'Company Name',
      roleQuestion: 'Which best describes you?',
      roleOptions: [
        'Building AI into our product',
        'Improving our agent experience',
        'Modernizing our stack first',
        'Building an FDE captive',
        'Not sure yet',
      ],
      notesPlaceholder: 'Anything else? (optional)',
      submitCta: 'Submit',
      submittingLabel: 'Sending...',
      successMessage:
        'Thank you! Your message has been recorded in Google Sheets and routed to a founder.',
      noteLine1: 'A founder reads every inbound. Two business days. No SDRs.',
      noteLine2: 'Or book a 30-min call with a founder',
    },
    blog: {
      headline: 'What we have written',
      subheadline: 'Three pieces from the engineering team on shipping AI inside US health tech.',
      viewAllCta: 'View All',
      posts: [
        {
          date: 'August 15, 2025',
          title: 'Building AI Products Without Sacrificing Engineering Quality',
          category: 'View All',
          author: 'By Aarav Menon',
          tone: 'maroon',
        },
        {
          date: 'August 15, 2025',
          title: 'Why Legacy Modernization Fails in Large Enterprises',
          category: 'Provider Tech',
          author: 'By Neha Kapoor',
          tone: 'burgundy',
        },
        {
          date: 'August 15, 2025',
          title: 'What Great Engineering Teams Do Differently',
          category: 'Payer Tech',
          author: 'By Aditya Rao',
          tone: 'ochre',
        },
      ],
    },
    faq: {
      headline: 'Questions teams ask before the first call.',
      items: [
        {
          q: 'What does Flo do?',
          a: 'Flo is a custom software engineering company for US health tech. We build and ship your product using AI, with engineering craft like test-driven development, pair programming, and spec-driven development. We also build AI features such as agents and retrieval-augmented generation directly into products.',
        },
        {
          q: 'What does building with AI actually mean here?',
          a: 'Our senior engineers pair-program with frontier coding agents under strict spec-driven and test-driven guardrails. AI accelerates drafting and refactoring while deterministic tests and architectural reviews ensure HIPAA, SOC 2, and CMS compliance.',
        },
        {
          q: 'What is spec-driven development?',
          a: 'Before writing application code or prompting an agent, we define explicit behavioral contracts, compliance boundaries, and acceptance tests. Every line generated must satisfy those verifiable specifications.',
        },
        {
          q: 'How do you do test-driven development (TDD) with AI?',
          a: 'We author failing unit, integration, and policy tests first. AI assistants iterate only against red-green-refactor cycles so generated modules are deterministic, auditable, and maintainable long-term.',
        },
        {
          q: 'How does the Build-Operate-Transfer FDE captive work?',
          a: "Partner with Flo to build your FDE bench, branded as yours and transferred when it's ready. Over 24 to 36 months we recruit, train on your domain, embed with your team, and transition ownership seamlessly.",
        },
        {
          q: 'What makes Flo different from other firms now using AI?',
          a: 'Most firms bolt AI onto ad-hoc workflows, multiplying technical debt. We combine 140+ full-time craftspeople, open-source tooling like Bee, and Anthara policy runtimes specifically for regulated US healthcare.',
        },
        {
          q: 'What is Bee?',
          a: 'Bee is our open-source Claude Code plugin that codifies spec-driven discovery, TDD enforcement, and automated compliance checks across every engineering workflow.',
        },
      ],
      loadMoreCta: 'Load more',
      showLessCta: 'Show less',
    },
    footer: {
      brand: 'incubyte',
      tagline: 'Software engineering for US health tech.',
      columns: [
        {
          title: 'OUR WORK',
          links: ['Work (Index)', 'Spring Health', 'Kyruus', 'ComplianceX'],
        },
        {
          title: 'SERVICES',
          links: ['AI Product Engineering', 'AI Enablement', 'AI Modernization'],
        },
        {
          title: 'SOLUTIONS',
          links: ['Orora (Conversation Intelligence)', 'Anthara (AI conduct layer)'],
        },
        {
          title: 'INDUSTRIES',
          links: ['Payer Tech', 'Provider Tech', 'Behavioral Health'],
        },
        {
          title: 'RESOURCES',
          links: ['Blog', 'Field Notes', 'Inspiration', 'AI learning resources'],
        },
      ],
      aboutTitle: 'ABOUT US',
      aboutLinks: ['Founders & Team', 'Careers'],
      copyright: '© Copyright Flo 2026-2027.',
      terms: 'TERMS',
      privacy: 'PRIVACY',
    },
  },
  fr: {
    nav: {
      brand: 'FLO',
      menuLabel: 'Ouvrir le menu de navigation',
      closeMenuLabel: 'Fermer le menu de navigation',
      links: [
        { label: 'Notre savoir-faire', href: '#craft' },
        { label: 'Études de cas', href: '#cases' },
        { label: 'Services', href: '#services' },
        { label: 'Secteurs', href: '#verticals' },
        { label: 'Équipe FDE', href: '#fde' },
        { label: 'Contact', href: '#contact' },
      ],
      cta: 'Parler à un ingénieur',
    },
    hero: {
      eyebrow: 'INGÉNIERIE LOGICIELLE POUR LA HEALTHTECH',
      headline: "La rigueur de la healthtech, au rythme de l'IA.",
      subheadline:
        "Nous intégrons des ingénieurs formés aux pratiques qui rendent l'ingénierie accélérée par l'IA sûre, conforme et durable.",
      badges: [
        'Développement par spécifications',
        'Développement piloté par les tests',
        'Livraison continue',
      ],
      primaryCta: 'Parler à un ingénieur',
      secondaryCta: 'Voir nos réalisations',
    },
    logos: {
      caption: 'Adopté par des équipes techniques exigeantes en conformité et santé numérique,',
      brands: ['AdAge', 'Capital One', 'Deloitte.', 'Google'],
    },
    craft: {
      headline: "L'IA ne vaut que par l'équipe qui l'utilise.",
      subheadline:
        "L'IA amplifie ce qu'une équipe possède déjà. Nous avons bâti durant des années la discipline qu'elle démultiplie aujourd'hui.",
      cards: [
        {
          title: 'Spécifier avant de coder.',
          body: 'La réflexion précède chaque ligne écrite, afin que le produit reste ciblé et que les reprises soient minimales.',
        },
        {
          title: 'Les tests en premier, toujours.',
          body: "Un test en échec fixe l'objectif. Le code gagne sa place en le validant, pas en ayant simplement l'air correct.",
        },
        {
          title: 'Code propre, par habitude.',
          body: 'Nous refactorisons en continu pour que la base de code reste rapide à faire évoluer longtemps après la livraison.',
        },
      ],
    },
    cases: {
      headline: "L'IA en production. Voici ce qu'il a fallu.",
      subheadline:
        "Des produits d'IA déployés pour la healthtech nord-américaine, avec le discernement nécessaire pour repérer ses limites.",
      items: [
        {
          eyebrow: 'IA ENTREPRISE',
          logoLabel: 'rolai',
          title: "De l'idée au MVP en production en trois mois.",
          body: "Une plateforme RAG avec workflows agentiques sans code, connectée à plus de 20 modèles de langage. Déployée à Virginia Tech et Providence College, réduisant de moitié le travail académique manuel.",
          cta: "Lire l'histoire Rolai",
          href: '#contact',
        },
        {
          eyebrow: 'CONFORMITÉ MEDICARE',
          logoLabel: 'Healthy AI',
          title: '90 % de temps de révision économisé. Sur 800 000+ minutes par mois.',
          body: "Le workflow d'IA qui analyse les appels commerciaux Medicare pour la conformité, signale les risques et génère une piste d'audit fiable à une échelle impossible manuellement.",
          cta: 'Voir le cas Healthy AI',
          href: '#contact',
        },
        {
          eyebrow: 'NOTRE PRODUIT IA',
          logoLabel: '[anthara]',
          title: "Un code conforme, à la vitesse de l'IA.",
          body: "Anthara est la couche d'exécution garantissant que le code généré par l'IA reste conforme aux politiques dès son écriture. Éprouvée sur nos projets réglementés, désormais disponible comme produit.",
          cta: 'Découvrir Anthara',
          href: '#contact',
        },
      ],
    },
    services: {
      headline: "Un travail d'IA qui crée un effet cumulé dans votre organisation.",
      subheadline:
        'Adoption, modernisation ou nouvelles fonctionnalités : la rigueur technique sous-jacente reste identique.',
      cards: [
        {
          title: 'Activation IA',
          body: "L'infrastructure qui rend l'adoption de l'IA sûre, mesurable et cohérente dans toute votre organisation d'ingénierie, durablement.",
          cta: 'En savoir plus',
        },
        {
          title: 'Modernisation IA',
          body: 'Modernisation progressive des plateformes réglementées avec harnais de tests automatisés, frontières claires et zéro interruption clinique.',
          cta: 'En savoir plus',
        },
        {
          title: 'Ingénierie Produit IA',
          body: "Des fonctionnalités d'IA intégrées à votre produit par des ingénieurs seniors maîtrisant l'IA. Livrées selon vos standards, en binôme et testées.",
          cta: 'En savoir plus',
        },
      ],
    },
    verticals: {
      headline: 'Conçu pour les réalités de la santé numérique.',
      subheadline:
        'Trois secteurs où la réglementation constitue le point de départ de la conception',
      cards: [
        {
          eyebrow: 'ASSUREURS & PAYEURS',
          title: 'Réclamations, éligibilité, IA membre.',
          body: 'Contrôle de conformité, traitement des réclamations et IA orientée assurés, vérifiable lors des audits CMS et Medicare.',
          cta: 'Réserver une démo',
        },
        {
          eyebrow: 'PRESTATAIRES DE SOINS',
          title: 'Flux cliniques. Natifs DSE.',
          body: 'Annuaire de praticiens, suivi pré-opératoire et documentation ambiante intégrés nativement à Epic, Cerner et Athena.',
          cta: 'Réserver une démo',
        },
        {
          eyebrow: 'SANTÉ COMPORTEMENTALE',
          title: 'Appariement thérapeutique. Engagement.',
          body: 'Mise en relation avec des thérapeutes, suivi des patients et parcours MAT conçus dès l’origine selon la norme 42 CFR Part 2.',
          cta: 'Réserver une démo',
        },
      ],
    },
    plugin: {
      eyebrow: 'À LA UNE · PLUGIN OPEN-SOURCE',
      headline: 'Nos ingénieurs livrent plus vite car notre plugin Claude codifie notre savoir-faire.',
      body: "Bee est le plugin Claude Code que nous avons conçu et publié en open source. Il applique nos standards de la découverte jusqu'à la revue de code, et sert de modèle pour l'infrastructure IA que nous déployons chez nos clients.",
      cta: 'Explorer Bee',
      tags: ['Piloté par specs', 'Open source', 'Conçu pour Claude Code'],
    },
    fde: {
      headline:
        'Votre modèle de fondation est remplaçable. Vos ingénieurs déployés sur le terrain ne le sont pas.',
      subheadline:
        "Les modèles de fondation se banalisent. L'avantage concurrentiel repose sur des ingénieurs FDE intégrés à votre équipe.",
      options: [
        {
          eyebrow: 'OPTION 01 · ACQUÉRIR',
          metric: '4 milliards $',
          body: "Le prix rapporté d'OpenAI pour les 250 ingénieurs FDE de Torono. Hors de portée pour le reste du marché.",
          tag: 'HORS DE PORTÉE',
        },
        {
          eyebrow: 'OPTION 02 · RECRUTER',
          metric: '18 mois',
          body: 'Recruter, évaluer, former, déployer et livrer dans dix-huit mois. Vos clients auront déjà choisi une plateforme prête.',
          tag: 'TROP LENT',
        },
        {
          eyebrow: 'OPTION 03 · FOUNDRY',
          metric: 'Construire. Opérer. Transférer.',
          body: "Nous constituons une équipe dédiée de 8 à 12 ingénieurs FDE sous votre marque, formés sur votre plateforme, puis transférés sous 24 à 36 mois.",
          tag: 'LA TROISIÈME VOIE',
        },
      ],
      cta: 'Bâtir votre équipe FDE',
    },
    team: {
      headline: "L'équipe derrière la rigueur.",
      subheadline:
        'Fondée en 2020 par Sapan et Rushali. 140+ ingénieurs. 100 % télétravail. Dirigée par ses fondateurs.',
      cta: "Rencontrer l'équipe",
    },
    contact: {
      headline: 'Parlez-nous de votre projet.',
      subheadline:
        'Ce que vous construisez et ce qui vous freine. Un fondateur lit chaque message et répond sous deux jours ouvrables.',
      firstNameLabel: 'Prénom*',
      firstNamePlaceholder: 'Prénom',
      lastNameLabel: 'Nom*',
      lastNamePlaceholder: 'Nom',
      emailLabel: 'Courriel professionnel*',
      emailPlaceholder: 'Courriel professionnel',
      companyLabel: "Nom de l'entreprise*",
      companyPlaceholder: "Nom de l'entreprise",
      roleQuestion: 'Quelle option vous décrit le mieux ?',
      roleOptions: [
        "Intégrer l'IA dans notre produit",
        'Améliorer nos agents intelligents',
        "Moderniser notre architecture d'abord",
        'Créer une équipe FDE dédiée',
        'Pas encore certain',
      ],
      notesPlaceholder: 'Autre précision ? (optionnel)',
      submitCta: 'Envoyer',
      submittingLabel: 'Envoi...',
      successMessage:
        'Merci ! Votre message a bien été enregistré dans Google Sheets et transmis à un fondateur.',
      noteLine1: 'Un fondateur lit chaque demande. Deux jours ouvrables. Aucun intermédiaire.',
      noteLine2: 'Ou réserver un appel de 30 min avec un fondateur',
    },
    blog: {
      headline: 'Ce que nous avons écrit',
      subheadline:
        "Trois articles de notre équipe technique sur le déploiement de l'IA en santé numérique.",
      viewAllCta: 'Tout voir',
      posts: [
        {
          date: '15 août 2025',
          title: "Construire des produits IA sans sacrifier la qualité d'ingénierie",
          category: 'Tout voir',
          author: 'Par Aarav Menon',
          tone: 'maroon',
        },
        {
          date: '15 août 2025',
          title: 'Pourquoi la modernisation des systèmes échoue dans les grandes entreprises',
          category: 'Provider Tech',
          author: 'Par Neha Kapoor',
          tone: 'burgundy',
        },
        {
          date: '15 août 2025',
          title: 'Ce que les meilleures équipes techniques font différemment',
          category: 'Payer Tech',
          author: 'Par Aditya Rao',
          tone: 'ochre',
        },
      ],
    },
    faq: {
      headline: 'Questions posées avant le premier appel.',
      items: [
        {
          q: 'Que fait Flo concrètement ?',
          a: "Flo est une société d'ingénierie logicielle sur mesure pour la santé numérique. Nous concevons et livrons vos produits avec l'IA grâce au TDD, à la programmation en binôme et au développement piloté par spécifications.",
        },
        {
          q: "Que signifie développer avec l'IA chez vous ?",
          a: 'Nos ingénieurs seniors travaillent avec des agents de code sous garde-fous stricts de tests et de spécifications, garantissant la conformité HIPAA, SOC 2 et CMS.',
        },
        {
          q: "Qu'est-ce que le développement piloté par spécifications ?",
          a: 'Avant toute génération de code, nous formalisons les contrats comportementaux, les exigences réglementaires et les critères de validation vérifiables.',
        },
        {
          q: "Comment pratiquez-vous le TDD avec l'IA ?",
          a: "Nous rédigeons d'abord des tests unitaires et d'intégration en échec. Les assistants IA itèrent exclusivement pour faire passer ces tests de façon déterministe.",
        },
        {
          q: 'Comment fonctionne le modèle Build-Operate-Transfer (FDE) ?',
          a: 'Collaborez avec Flo pour bâtir votre équipe FDE sous votre marque et la transférer chez vous en 24 à 36 mois une fois pleinement autonome.',
        },
        {
          q: 'En quoi Flo diffère-t-il des autres cabinets ?',
          a: "Nous combinons 140+ ingénieurs à temps plein, notre plugin open source Bee et la couche de conformité Anthara pensés pour la santé réglementée.",
        },
        {
          q: "Qu'est-ce que Bee ?",
          a: 'Bee est notre plugin Claude Code open source qui automatise la vérification des spécifications, le TDD et les revues de sécurité.',
        },
      ],
      loadMoreCta: 'Afficher plus',
      showLessCta: 'Afficher moins',
    },
    footer: {
      brand: 'incubyte',
      tagline: 'Ingénierie logicielle pour la healthtech.',
      columns: [
        {
          title: 'NOS PROJETS',
          links: ['Index des projets', 'Spring Health', 'Kyruus', 'ComplianceX'],
        },
        {
          title: 'SERVICES',
          links: ['Ingénierie Produit IA', 'Activation IA', 'Modernisation IA'],
        },
        {
          title: 'SOLUTIONS',
          links: ['Orora (Intelligence conversationnelle)', 'Anthara (Couche de gouvernance IA)'],
        },
        {
          title: 'SECTEURS',
          links: ['Assureurs (Payer)', 'Prestataires (Provider)', 'Santé comportementale'],
        },
        {
          title: 'RESSOURCES',
          links: ['Blogue', 'Notes de terrain', 'Inspiration', 'Ressources IA'],
        },
      ],
      aboutTitle: 'À PROPOS',
      aboutLinks: ['Fondateurs & Équipe', 'Carrières'],
      copyright: '© Copyright Flo 2026-2027.',
      terms: 'CONDITIONS',
      privacy: 'CONFIDENTIALITÉ',
    },
  },
};
