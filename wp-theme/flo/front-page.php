<?php
/**
 * FLO Complete Homepage Template (All 13 Sections).
 * Replicates the Figma homepage design across 1080px desktop and 390px mobile breakpoints.
 *
 * @package FLO
 */

get_header();
$lang  = function_exists( 'flo_get_active_language' ) ? flo_get_active_language() : 'en';
$is_fr = ( 'fr' === $lang );
?>
<main id="main-content" role="main">
	<!-- 1. Hero Section -->
	<section id="top" class="hero-section">
		<div class="container hero-inner">
			<span class="eyebrow-pill">
				<?php echo $is_fr ? 'INGÉNIERIE LOGICIELLE POUR LA HEALTHTECH' : esc_html( get_theme_mod( 'hero_eyebrow', 'SOFTWARE ENGINEERING FOR US HEALTH TECH' ) ); ?>
			</span>
			<h1 class="hero-title">
				<?php echo $is_fr ? "La rigueur de la healthtech, au rythme de l'IA." : esc_html( get_theme_mod( 'hero_headline', "The rigor of healthtech, at AI's pace." ) ); ?>
			</h1>
			<p class="hero-subtitle">
				<?php echo $is_fr ? "Nous intégrons des ingénieurs formés aux pratiques qui rendent l'ingénierie accélérée par l'IA sûre, conforme et durable." : esc_html( get_theme_mod( 'hero_subheadline', 'We embed engineers trained in the craft that keeps AI-accelerated engineering safe, compliant, and built to last.' ) ); ?>
			</p>
			<div class="hero-badges-wrap">
				<div class="hero-badges">
					<span class="hero-badge-item">
						<span class="hero-badge-icon" aria-hidden="true"><?php echo flo_get_icon_svg( get_theme_mod( 'hero_badge1_icon', 'laptop-code' ), 14 ); ?></span>
						<span><?php echo $is_fr ? 'Développement par spécifications' : 'Spec-driven development'; ?></span>
					</span>
					<span class="hero-badge-item">
						<span class="hero-badge-icon" aria-hidden="true"><?php echo flo_get_icon_svg( get_theme_mod( 'hero_badge2_icon', 'book' ), 14 ); ?></span>
						<span><?php echo $is_fr ? 'Développement piloté par les tests' : 'Test-driven development'; ?></span>
					</span>
					<span class="hero-badge-item">
						<span class="hero-badge-icon" aria-hidden="true"><?php echo flo_get_icon_svg( get_theme_mod( 'hero_badge3_icon', 'check-circle' ), 14 ); ?></span>
						<span><?php echo $is_fr ? 'Livraison continue' : 'Continuous delivery'; ?></span>
					</span>
				</div>
			</div>
			<div class="hero-cta-row">
				<a href="#contact" class="btn-pill-group">
					<span class="btn-primary-pill"><?php echo $is_fr ? 'Parler à un ingénieur' : esc_html( get_theme_mod( 'hero_primary_cta', 'Talk to an engineer' ) ); ?></span>
					<span class="btn-circle-arrow btn-circle-lg" aria-hidden="true">&#8599;</span>
				</a>
				<a href="#cases" class="btn-secondary">
					<span><?php echo $is_fr ? 'Voir nos réalisations' : esc_html( get_theme_mod( 'hero_secondary_cta', 'See the work' ) ); ?></span>
					<span aria-hidden="true">&rarr;</span>
				</a>
			</div>
		</div>

		<!-- Background 2-Row Botanical Geometric Mosaic + Foreground Burgundy Stage -->
		<div class="hero-stage-wrap">
			<div class="mosaic-strip-wrap" aria-hidden="true">
				<svg viewBox="0 0 1080 156" class="mosaic-strip" preserveAspectRatio="xMidYMid slice">
					<rect x="0" y="0" width="96" height="78" fill="#E4AF38"/>
					<path d="M 8 6 A 76 76 0 0 1 88 78 A 76 76 0 0 1 8 6 Z" fill="#BCE3B4"/>
					<rect x="96" y="0" width="96" height="78" fill="#ECE2CC"/>
					<path d="M 96 0 H 192 V 78 H 144 A 48 48 0 0 1 96 30 Z" fill="#DFD1B4"/>
					<rect x="888" y="0" width="96" height="78" fill="#E4AF38"/>
					<path d="M 984 0 V 78 H 906 A 78 78 0 0 1 984 0 Z" fill="#BCE3B4"/>
					<rect x="984" y="0" width="96" height="78" fill="#E4AF38"/>
					<path d="M 984 0 H 1080 A 78 78 0 0 1 1002 78 H 984 Z" fill="#BCE3B4"/>
					<rect x="0" y="78" width="96" height="78" fill="#68381B"/>
					<path d="M 96 78 V 156 H 80 A 68 68 0 0 1 96 78 Z" fill="#CA9118"/>
					<rect x="96" y="78" width="96" height="78" fill="#CA9118"/>
					<rect x="888" y="78" width="96" height="78" fill="#68381B"/>
					<rect x="984" y="78" width="96" height="78" fill="#68381B"/>
					<path d="M 984 156 A 78 78 0 0 1 1062 78 H 1080 V 156 Z" fill="#CA9118"/>
				</svg>
			</div>
			<div class="hero-stage-container">
				<div class="hero-stage-card">
					<?php
					$hero_img = get_theme_mod( 'hero_showcase_image', '' );
					if ( $hero_img ) :
						?>
						<img src="<?php echo esc_url( $hero_img ); ?>" alt="FLO Engineering Platform" class="hero-stage-img">
					<?php endif; ?>
				</div>
			</div>
		</div>
	</section>

	<!-- 2. Partner Trust Strip -->
	<section class="logos-strip" aria-label="Trusted Partners">
		<div class="container logos-inner">
			<p class="logos-caption">
				<?php echo $is_fr ? 'Adopté par des équipes d’ingénierie de classe mondiale,' : esc_html( get_theme_mod( 'logos_caption', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' ) ); ?>
			</p>
			<div class="logos-row">
				<span class="logo-adage">AdAge</span>
				<span class="logo-capone">Capital<span>One</span></span>
				<span class="logo-deloitte">Deloitte<span class="dot">.</span></span>
				<span class="logo-google">Google</span>
			</div>
		</div>
	</section>

	<!-- 3. Craft Pillars -->
	<section id="craft" class="section-block">
		<div class="container container-narrow">
			<div class="section-header-center">
				<h2 class="section-title">
					<?php echo $is_fr ? "L'IA ne vaut que par l'équipe qui l'utilise." : esc_html( get_theme_mod( 'craft_headline', 'AI is only as good as the team using it.' ) ); ?>
				</h2>
				<p class="section-subtitle">
					<?php echo $is_fr ? "L'IA amplifie ce qu'une équipe possède déjà. Nous avons bâti durant des années la discipline qu'elle démultiplie aujourd'hui." : esc_html( get_theme_mod( 'craft_subheadline', 'AI compounds whatever a team already brings. We spent years building the discipline it now amplifies.' ) ); ?>
				</p>
			</div>
			<?php
			$bw  = max( 1, absint( get_theme_mod( 'theme_border_width', 1 ) ) );
			$hb  = $bw / 2;
			$craft_corner_svg = sprintf(
				'<svg width="68" height="68" viewBox="0 0 68 68" class="craft-notch-svg" aria-hidden="true">'
				. '<path d="M 0 0 L 68 0 L 68 68 L %1$s 68 L %1$s 57 A 8 8 0 0 0 %2$s 49 L 46 49 A 27 27 0 0 1 19 22 L 19 %3$s A 8 8 0 0 0 11 %4$s L 0 %4$s Z" fill="var(--theme-bg, #FAF5E6)"/>'
				. '<path d="M 0 %4$s L 11 %4$s A 8 8 0 0 1 19 %3$s L 19 22 A 27 27 0 0 0 46 49 L %2$s 49 A 8 8 0 0 1 %1$s 57 L %1$s 68" fill="none" stroke="#E8C56E" stroke-width="%5$d"/>'
				. '</svg>',
				68 - $hb,
				60 - $hb,
				8 + $hb,
				$hb,
				$bw
			);
			?>
			<div class="grid-3">
				<article class="craft-card">
					<?php echo $craft_corner_svg; ?>
					<span class="amber-badge" aria-hidden="true"><?php echo flo_get_icon_svg( get_theme_mod( 'pillar1_icon', 'check' ), 20 ); ?></span>
					<h3><?php echo $is_fr ? 'Spécifier avant de coder.' : 'Spec before code.'; ?></h3>
					<p><?php echo $is_fr ? 'La réflexion précède chaque ligne écrite, afin que le produit reste ciblé et que les reprises soient minimales.' : 'The thinking happens before a line is written, so the build stays on target and rework stays small.'; ?></p>
				</article>
				<article class="craft-card">
					<?php echo $craft_corner_svg; ?>
					<span class="amber-badge" aria-hidden="true"><?php echo flo_get_icon_svg( get_theme_mod( 'pillar2_icon', 'check' ), 20 ); ?></span>
					<h3><?php echo $is_fr ? 'Les tests en premier, toujours.' : 'Test-first, always.'; ?></h3>
					<p><?php echo $is_fr ? "Un test en échec fixe l'objectif. Le code gagne sa place en le validant, pas seulement par son apparence." : 'A failing test sets the target. Code earns its way in by passing it, not by looking right.'; ?></p>
				</article>
				<article class="craft-card">
					<?php echo $craft_corner_svg; ?>
					<span class="amber-badge" aria-hidden="true"><?php echo flo_get_icon_svg( get_theme_mod( 'pillar3_icon', 'check' ), 20 ); ?></span>
					<h3><?php echo $is_fr ? 'Code propre, par habitude.' : 'Clean code, by habit.'; ?></h3>
					<p><?php echo $is_fr ? 'Nous refactorisons au fil de l’eau, pour une base de code rapide à faire évoluer longtemps après la livraison.' : 'We refactor as we go, so the codebase stays fast to work in long after we hand it over.'; ?></p>
				</article>
			</div>
		</div>
	</section>

	<!-- 4. Case Studies ("AI in production. Here's what it took.") -->
	<section id="cases" class="cases-section">
		<svg viewBox="0 0 1080 280" class="cases-bg-leaf-grid" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
			<?php
			for ( $r = 0; $r < 2; $r++ ) :
				for ( $c = 0; $c < 6; $c++ ) :
					$tx = $c * 180;
					$ty = $r * 140;
					?>
					<g transform="translate(<?php echo (int) $tx; ?>, <?php echo (int) $ty; ?>)">
						<rect x="2" y="2" width="176" height="136" rx="6" fill="none" stroke="var(--theme-amber, #DDA132)" stroke-opacity="0.16" stroke-width="1.2"/>
						<path d="M 16 14 C 110 14 164 56 164 124 C 70 124 16 82 16 14 Z" fill="none" stroke="var(--theme-amber, #DDA132)" stroke-opacity="0.18" stroke-width="1.2"/>
					</g>
					<?php
				endfor;
			endfor;
			?>
		</svg>
		<div class="container container-medium cases-inner">
			<div class="section-header-center light">
				<h2 class="section-title">
					<?php echo $is_fr ? "L'IA en production. Voici ce qu'il a fallu." : esc_html( get_theme_mod( 'cases_headline', "AI in production. Here's what it took." ) ); ?>
				</h2>
				<p class="section-subtitle">
					<?php echo $is_fr ? "Des produits d'IA déployés pour la healthtech, avec le discernement nécessaire pour détecter leurs limites." : esc_html( get_theme_mod( 'cases_subheadline', "AI products we shipped for US health tech, built with AI and the judgment to know when it's wrong." ) ); ?>
				</p>
			</div>

			<div class="cases-stack">
				<?php
				$case1_img = get_theme_mod( 'case1_image', '' );
				$case2_img = get_theme_mod( 'case2_image', '' );
				$case3_img = get_theme_mod( 'case3_image', '' );
				$leaf_svg  = '<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M2 2C10 2 14 6 14 14C6 14 2 10 2 2Z"/></svg>';
				?>
				<article class="case-card">
					<div class="case-notch-tl">
						<span class="case-fillet-tl-right" aria-hidden="true"></span>
						<span class="case-fillet-tl-bottom" aria-hidden="true"></span>
						<div class="case-amber-pill"><?php echo $leaf_svg; ?><span><?php echo $is_fr ? 'IA ENTREPRISE' : 'ENTERPRISE AI'; ?></span></div>
					</div>
					<div class="case-grid">
						<div class="case-thumb-col">
							<div class="case-droplet">
								<?php if ( $case1_img ) : ?>
									<img src="<?php echo esc_url( $case1_img ); ?>" alt="Rolai Case Study" class="case-custom-img">
								<?php else : ?>
									<div class="case-thumb-brown" aria-label="rolai"></div>
								<?php endif; ?>
							</div>
						</div>
						<h3 class="case-title"><?php echo $is_fr ? "De l'idée au MVP en production en trois mois." : 'Ideation to live MVP in three months.'; ?></h3>
						<div class="case-body-col">
							<p><?php echo $is_fr ? 'Une plateforme RAG sans code avec workflows agentiques connectée à 20+ modèles de langage, déployée à Virginia Tech et Providence College.' : 'A retrieval platform with no-code agentic workflows, wired to 20+ language models. Now live at Virginia Tech and Providence College, with manual academic work cut in half.'; ?></p>
						</div>
					</div>
					<div class="case-notch-br">
						<span class="case-fillet-br-left" aria-hidden="true"></span>
						<span class="case-fillet-br-top" aria-hidden="true"></span>
						<a href="#contact" class="case-cta-group">
							<span class="case-cta-pill"><?php echo $is_fr ? "Lire l'histoire Rolai" : 'Read the Rolai story'; ?></span>
							<span class="btn-circle-arrow case-cta-arrow" aria-hidden="true">&#8599;</span>
						</a>
					</div>
				</article>

				<article class="case-card">
					<div class="case-notch-tl">
						<span class="case-fillet-tl-right" aria-hidden="true"></span>
						<span class="case-fillet-tl-bottom" aria-hidden="true"></span>
						<div class="case-amber-pill"><?php echo $leaf_svg; ?><span><?php echo $is_fr ? 'CONFORMITÉ MEDICARE' : 'MEDICARE COMPLIANCE'; ?></span></div>
					</div>
					<div class="case-grid">
						<div class="case-thumb-col">
							<div class="case-droplet">
								<?php if ( $case2_img ) : ?>
									<img src="<?php echo esc_url( $case2_img ); ?>" alt="Healthy AI Case Study" class="case-custom-img">
								<?php else : ?>
									<div class="case-thumb-circle">Healthy AI</div>
								<?php endif; ?>
							</div>
						</div>
						<h3 class="case-title"><?php echo $is_fr ? '90 % de temps de révision économisé. Sur 800 000+ minutes par mois.' : '90% review time cut. Across 800,000+ minutes a month.'; ?></h3>
						<div class="case-body-col">
							<p><?php echo $is_fr ? "Le workflow d'IA qui analyse les appels commerciaux Medicare, signale les risques et laisse une piste d'audit fiable." : 'The AI workflow that reviews Medicare sales calls for compliance, flags the risk, and leaves an audit trail a reviewer can trust, at a volume a manual team never could.'; ?></p>
						</div>
					</div>
					<div class="case-notch-br">
						<span class="case-fillet-br-left" aria-hidden="true"></span>
						<span class="case-fillet-br-top" aria-hidden="true"></span>
						<a href="#contact" class="case-cta-group">
							<span class="case-cta-pill"><?php echo $is_fr ? 'Voir le cas Healthy AI' : 'Read the Healthy AI case'; ?></span>
							<span class="btn-circle-arrow case-cta-arrow" aria-hidden="true">&#8599;</span>
						</a>
					</div>
				</article>

				<article class="case-card">
					<div class="case-notch-tl">
						<span class="case-fillet-tl-right" aria-hidden="true"></span>
						<span class="case-fillet-tl-bottom" aria-hidden="true"></span>
						<div class="case-amber-pill"><?php echo $leaf_svg; ?><span><?php echo $is_fr ? 'NOTRE PROPRE PRODUIT IA' : 'OUR OWN AI PRODUCT'; ?></span></div>
					</div>
					<div class="case-grid">
						<div class="case-thumb-col">
							<div class="case-droplet">
								<?php if ( $case3_img ) : ?>
									<img src="<?php echo esc_url( $case3_img ); ?>" alt="Anthara Product" class="case-custom-img">
								<?php else : ?>
									<span class="case-thumb-mono">[anthara]</span>
								<?php endif; ?>
							</div>
						</div>
						<h3 class="case-title"><?php echo $is_fr ? "Un code conforme, à la vitesse de l'IA." : 'Compliant code, at AI speed.'; ?></h3>
						<div class="case-body-col">
							<p><?php echo $is_fr ? "Anthara est la couche d'exécution qui garantit que le code généré par l'IA reste conforme aux politiques dès son écriture." : "Anthara is the runtime layer we built so AI-generated code stays inside policy as it's written. We run it on our own regulated work, and now it ships as a product."; ?></p>
						</div>
					</div>
					<div class="case-notch-br">
						<span class="case-fillet-br-left" aria-hidden="true"></span>
						<span class="case-fillet-br-top" aria-hidden="true"></span>
						<a href="#contact" class="case-cta-group">
							<span class="case-cta-pill"><?php echo $is_fr ? 'Découvrir Anthara' : 'See Anthara'; ?></span>
							<span class="btn-circle-arrow case-cta-arrow" aria-hidden="true">&#8599;</span>
						</a>
					</div>
				</article>
			</div>
		</div>
	</section>

	<!-- 5. Services ("AI work that compounds across your engineering organisation.") -->
	<section id="services" class="section-block">
		<div class="container container-narrow">
			<div class="section-header-center section-header-wide">
				<h2 class="section-title">
					<?php echo $is_fr ? "Un travail d'IA qui crée un effet cumulé dans votre organisation." : esc_html( get_theme_mod( 'services_headline', 'AI work that compounds across your engineering organisation.' ) ); ?>
				</h2>
				<p class="section-subtitle">
					<?php echo $is_fr ? 'Adoption, modernisation ou produit : la rigueur sous-jacente reste identique.' : esc_html( get_theme_mod( 'services_subheadline', 'Adoption, codebase, or feature work. The engineering craft underneath is the same.' ) ); ?>
				</p>
			</div>
			<div class="grid-3">
				<article class="service-card">
					<?php echo flo_get_service_card_artwork( 0, get_theme_mod( 'service1_icon', 'sparkles' ) ); ?>
					<div class="service-body">
						<div>
							<h3><?php echo $is_fr ? 'Activation IA' : 'AI Enablement'; ?></h3>
							<p><?php echo $is_fr ? "L'infrastructure qui rend l'adoption de l'IA sûre, mesurable et cohérente dans toute votre organisation." : 'The infrastructure that makes AI adoption safe, measurable, and consistent across your engineering organisation. Productivity that holds past the first quarter.'; ?></p>
						</div>
						<a href="#contact" class="service-link"><?php echo $is_fr ? 'En savoir plus' : 'Learn More'; ?> <span aria-hidden="true">&rarr;</span></a>
					</div>
				</article>
				<article class="service-card">
					<?php echo flo_get_service_card_artwork( 1, get_theme_mod( 'service2_icon', 'split-panel' ) ); ?>
					<div class="service-body">
						<div>
							<h3><?php echo $is_fr ? 'Modernisation IA' : 'AI Modernization'; ?></h3>
							<p><?php echo $is_fr ? 'Modernisation progressive des plateformes réglementées avec harnais de tests automatisés et zéro interruption.' : 'The infrastructure that makes AI adoption safe, measurable, and consistent across your engineering organisation. Productivity that holds past the first quarter.'; ?></p>
						</div>
						<a href="#contact" class="service-link"><?php echo $is_fr ? 'En savoir plus' : 'Learn More'; ?> <span aria-hidden="true">&rarr;</span></a>
					</div>
				</article>
				<article class="service-card">
					<?php echo flo_get_service_card_artwork( 2, get_theme_mod( 'service3_icon', 'laptop-code' ) ); ?>
					<div class="service-body">
						<div>
							<h3><?php echo $is_fr ? 'Ingénierie Produit IA' : 'AI Product Engineering'; ?></h3>
							<p><?php echo $is_fr ? "Des fonctionnalités d'IA intégrées à votre produit par des ingénieurs seniors selon vos standards." : 'AI features built into your product by senior engineers who use AI well. Shipped to your standards, paired and tested.'; ?></p>
						</div>
						<a href="#contact" class="service-link"><?php echo $is_fr ? 'En savoir plus' : 'Learn More'; ?> <span aria-hidden="true">&rarr;</span></a>
					</div>
				</article>
			</div>
		</div>
	</section>

	<!-- 6. Health Tech Verticals -->
	<section id="verticals" class="section-block section-compact-top">
		<div class="container container-narrow">
			<div class="section-header-center">
				<h2 class="section-title">
					<?php echo $is_fr ? 'Conçu pour les réalités de la santé numérique.' : esc_html( get_theme_mod( 'verticals_headline', 'Built for the realities of US health tech.' ) ); ?>
				</h2>
				<p class="section-subtitle">
					<?php echo $is_fr ? 'Trois secteurs où la réglementation est le point de départ.' : esc_html( get_theme_mod( 'verticals_subheadline', 'Three health tech verticals where regulation is the design starting point' ) ); ?>
				</p>
			</div>
			<div class="grid-3">
				<article class="vertical-card">
					<div>
						<?php echo flo_get_vertical_pattern_svg( 0 ); ?>
						<span class="vertical-eyebrow"><?php echo $is_fr ? 'ASSUREURS & PAYEURS' : 'PAYER TECH'; ?></span>
						<h3><?php echo $is_fr ? 'Réclamations, éligibilité, IA membre.' : 'Claims, eligibility, member AI.'; ?></h3>
						<p><?php echo $is_fr ? 'Contrôle de conformité et traitement des réclamations vérifiable lors des audits CMS et Medicare.' : 'Compliance review, claims processing, and member-facing AI, defensible across CMS and Medicare audit cycles.'; ?></p>
					</div>
					<div><a href="#contact" class="btn-secondary btn-secondary-sm"><?php echo $is_fr ? 'Réserver une démo' : 'Book a Demo'; ?> <span aria-hidden="true">&rarr;</span></a></div>
				</article>
				<article class="vertical-card">
					<div>
						<?php echo flo_get_vertical_pattern_svg( 1 ); ?>
						<span class="vertical-eyebrow"><?php echo $is_fr ? 'PRESTATAIRES DE SOINS' : 'PROVIDER TECH'; ?></span>
						<h3><?php echo $is_fr ? 'Flux cliniques. Natifs DSE.' : 'Clinical workflows. EHR-native.'; ?></h3>
						<p><?php echo $is_fr ? 'Annuaire, suivi pré-opératoire et documentation ambiante natifs Epic, Cerner et Athena.' : 'Provider directory, pre-procedure engagement, and ambient documentation, EHR-native against Epic, Cerner, and Athena.'; ?></p>
					</div>
					<div><a href="#contact" class="btn-secondary btn-secondary-sm"><?php echo $is_fr ? 'Réserver une démo' : 'Book a Demo'; ?> <span aria-hidden="true">&rarr;</span></a></div>
				</article>
				<article class="vertical-card">
					<div>
						<?php echo flo_get_vertical_pattern_svg( 2 ); ?>
						<span class="vertical-eyebrow"><?php echo $is_fr ? 'SANTÉ COMPORTEMENTALE' : 'BEHAVIORAL HEALTH TECH'; ?></span>
						<h3><?php echo $is_fr ? 'Appariement thérapeutique. Engagement.' : 'Therapist matching. Member engagement.'; ?></h3>
						<p><?php echo $is_fr ? 'Mise en relation thérapeutique et parcours MAT conformes 42 CFR Part 2 dès la conception.' : 'Therapist matching, member engagement, and MAT pipelines, built 42 CFR Part 2 by design.'; ?></p>
					</div>
					<div><a href="#contact" class="btn-secondary btn-secondary-sm"><?php echo $is_fr ? 'Réserver une démo' : 'Book a Demo'; ?> <span aria-hidden="true">&rarr;</span></a></div>
				</article>
			</div>
		</div>
	</section>

	<!-- 7. Open-Source Plugin Spotlight ("Bee") -->
	<section class="plugin-spotlight-band">
		<div class="plugin-cream-wrapper">
			<div class="container container-medium">
				<div class="plugin-spotlight">
					<svg viewBox="0 0 280 140" class="plugin-geo-bg" preserveAspectRatio="none" aria-hidden="true">
						<g fill="none" stroke="#B69E56" stroke-opacity="0.45" stroke-width="1">
							<path d="M 0 0 H 70 V 70 H 0 Z"/>
							<path d="M 70 0 A 70 70 0 0 1 0 70"/>
							<path d="M 70 0 H 140 V 35 A 35 35 0 0 1 105 70 H 70 Z"/>
							<path d="M 140 0 H 210 V 70 H 175 A 35 35 0 0 1 140 35 Z"/>
							<path d="M 210 0 H 280 V 35 A 35 35 0 0 1 210 35 Z"/>
							<rect x="0" y="70" width="70" height="70"/>
							<rect x="70" y="70" width="70" height="70"/>
							<path d="M 140 140 A 70 70 0 0 1 210 70 V 140 Z"/>
							<path d="M 210 140 A 70 70 0 0 1 280 70 V 140 Z"/>
						</g>
					</svg>
					<div class="plugin-graphic">
						<?php
						$plugin_img = get_theme_mod( 'plugin_image', '' );
						if ( $plugin_img ) :
							?>
							<img src="<?php echo esc_url( $plugin_img ); ?>" alt="Bee open-source Claude plugin" class="plugin-custom-img">
						<?php endif; ?>
					</div>
					<div class="plugin-content">
						<span class="plugin-eyebrow">
							<span class="plugin-droplet" aria-hidden="true"></span>
							<span><?php echo $is_fr ? 'À LA UNE · PLUGIN OPEN-SOURCE' : esc_html( get_theme_mod( 'plugin_eyebrow', 'SPOTLIGHT · OPEN-SOURCE PLUGIN' ) ); ?></span>
						</span>
						<h2><?php echo $is_fr ? 'Nos ingénieurs livrent plus vite car notre plugin Claude codifie notre savoir-faire.' : esc_html( get_theme_mod( 'plugin_headline', 'Our engineers ship faster because our Claude plugin codifies our craft.' ) ); ?></h2>
						<p><?php echo $is_fr ? "Bee est le plugin Claude Code que nous avons publié en open source. Il applique nos standards de la découverte jusqu'à la revue de code." : "Bee is the Claude Code plugin we built for ourselves and open sourced. It knows our practices, enforces our standards from discovery through review, and ships with every engineer on every client engagement. It's also the template for what we build for your team. When we set up your AI infrastructure, we draw from what we've already lived."; ?></p>
						<div class="plugin-cta-wrap">
							<a href="#contact" class="btn-pill-group">
								<span class="btn-white-pill"><?php echo $is_fr ? 'Explorer Bee' : esc_html( get_theme_mod( 'plugin_cta', 'Explore Bee' ) ); ?></span>
								<span class="btn-circle-arrow btn-circle-md" aria-hidden="true">&#8599;</span>
							</a>
						</div>
						<div class="plugin-tags">
							<span class="plugin-tag-item">
								<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 2.5h7l3 3V13.5H3V2.5Z"/><path d="M5.5 7.5h5M5.5 10h3.5" stroke-linecap="round"/></svg>
								<span><?php echo $is_fr ? 'Piloté par specs' : 'Spec-driven'; ?></span>
							</span>
							<span class="plugin-tag-item">
								<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="2" y="3.5" width="12" height="9" rx="1.5"/><circle cx="8" cy="8" r="2"/></svg>
								<span><?php echo $is_fr ? 'Open source' : 'Open source'; ?></span>
							</span>
							<span class="plugin-tag-item">
								<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="2" y="3" width="12" height="10" rx="1.5"/><path d="M6.5 6.5 4.8 8l1.7 1.5M9.5 6.5 11.2 8 9.5 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
								<span><?php echo $is_fr ? 'Conçu pour Claude Code' : 'Built for Claude Code'; ?></span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- 8. Tall Burgundy Curve + Golden Leaf + FDE Bench Comparison -->
	<section id="fde" class="fde-section">
		<div class="fde-curve-wrap">
			<div class="fde-burgundy-spacer"></div>
			<svg viewBox="0 0 1080 128" class="fde-curve" preserveAspectRatio="none" aria-hidden="true">
				<path d="M 0 0 L 1080 0 L 1080 28 C 820 82 420 72 0 64 Z" fill="var(--theme-burgundy, #5F1120)"/>
				<path d="M 0 64 C 420 72 820 82 1080 28 L 1080 128 L 0 128 Z" fill="#FFFFFF"/>
				<path d="M 974 78 Q 1002 6 1044 6 Q 1068 62 1034 114 Q 982 108 974 78 Z" fill="#CA9118" stroke="#4A0E17" stroke-width="2"/>
				<path d="M 880 14 Q 992 10 1046 112 Q 928 128 880 14 Z" fill="#E4AF38" stroke="#4A0E17" stroke-width="2"/>
			</svg>
		</div>
		<div class="container container-medium fde-body">
			<div class="fde-header">
				<h2 class="section-title-left">
					<?php echo $is_fr ? 'Votre modèle est remplaçable. Vos ingénieurs FDE ne le sont pas.' : esc_html( get_theme_mod( 'fde_headline', "Your foundational model may be replaceable. Your forward-deployed engineers aren't." ) ); ?>
				</h2>
				<p class="section-subtitle-left">
					<?php echo $is_fr ? "Les modèles de fondation se banalisent. L'avantage repose sur des ingénieurs intégrés à votre équipe." : esc_html( get_theme_mod( 'fde_subheadline', 'Foundation models are commoditizing. Defensibility shifts to forward-deployed engineers embedded inside your team. That bench is the moat.' ) ); ?>
				</p>
			</div>

			<div class="fde-outer-frame">
				<div class="fde-table">
					<article class="fde-col">
						<div>
							<div class="fde-icon-box" aria-hidden="true"><?php echo flo_get_icon_svg( get_theme_mod( 'fde1_icon', 'layers' ), 24 ); ?></div>
							<span class="fde-eyebrow"><?php echo $is_fr ? 'OPTION 01 · ACQUÉRIR' : 'OPTION 01 · ACQUIRE'; ?></span>
							<h3><?php echo $is_fr ? '4 milliards $' : '$4 billion'; ?></h3>
							<p><?php echo $is_fr ? "Le prix rapporté d'OpenAI pour les 150 ingénieurs FDE de Tomoro. Hors de portée du marché." : "OpenAI's reported price for Tomoro's 150 forward-deployed engineers. Out of reach for the rest of the AI platform market."; ?></p>
						</div>
						<span class="fde-tag"><?php echo $is_fr ? 'HORS DE PORTÉE' : 'OUT OF REACH'; ?></span>
					</article>
					<article class="fde-col">
						<div>
							<div class="fde-icon-box" aria-hidden="true"><?php echo flo_get_icon_svg( get_theme_mod( 'fde2_icon', 'clipboard-code' ), 24 ); ?></div>
							<span class="fde-eyebrow"><?php echo $is_fr ? 'OPTION 02 · RECRUTER' : 'OPTION 02 · BUILD'; ?></span>
							<h3><?php echo $is_fr ? '18 mois' : '18 months'; ?></h3>
							<p><?php echo $is_fr ? 'Recruter, former et déployer en dix-huit mois. Vos clients auront déjà choisi un autre acteur.' : 'Hire, vet, train, deploy, and maybe ship in eighteen months. By then your customers have moved to a platform that already has the bench.'; ?></p>
						</div>
						<span class="fde-tag"><?php echo $is_fr ? 'TROP LENT' : 'TOO SLOW'; ?></span>
					</article>
					<article class="fde-col">
						<div>
							<div class="fde-icon-box" aria-hidden="true"><?php echo flo_get_icon_svg( get_theme_mod( 'fde3_icon', 'foundry-growth' ), 24 ); ?></div>
							<span class="fde-eyebrow"><?php echo $is_fr ? 'OPTION 03 · FOUNDRY' : 'OPTION 03 · FOUNDRY'; ?></span>
							<h3><?php echo $is_fr ? 'Construire. Opérer. Transférer.' : 'Build. Operate. Transfer.'; ?></h3>
							<p><?php echo $is_fr ? 'Une équipe dédiée de 8 à 12 ingénieurs FDE sous votre marque, transférée sous 24 à 36 mois.' : 'We build a captive of eight to twelve FDE-grade engineers, branded as yours, trained on your platform, embedded with your team, and transferred to you in 24 to 36 months.'; ?></p>
						</div>
						<span class="fde-tag"><?php echo $is_fr ? 'LA TROISIÈME VOIE' : 'THE THIRD PATH'; ?></span>
					</article>
				</div>

				<div class="fde-pocket-bar">
					<div class="fde-leaf-corner" aria-hidden="true">
						<svg viewBox="0 0 28 28" width="24" height="24" fill="none">
							<path d="M15 16 Q16 5 22 4 Q25 13 18 22 Q14 20 15 16 Z" fill="#A4AF42" stroke="#4A0E17" stroke-width="1.4"/>
							<path d="M5 7 Q15 6 19 22 Q9 23 5 7 Z" fill="#E2AF38" stroke="#4A0E17" stroke-width="1.4"/>
						</svg>
					</div>
					<a href="#contact" class="btn-pill-group">
						<span class="btn-primary-pill btn-pill-sm"><?php echo $is_fr ? 'Bâtir votre équipe FDE' : esc_html( get_theme_mod( 'fde_cta', 'Build your FDE bench' ) ); ?></span>
						<span class="btn-circle-arrow btn-circle-md" aria-hidden="true">&#8599;</span>
					</a>
				</div>
			</div>
		</div>

		<!-- Full-Width 10-Tile Geometric Mosaic Divider -->
		<div class="mosaic-divider-wrap" aria-hidden="true">
			<svg viewBox="0 0 1080 64" class="mosaic-divider-svg" preserveAspectRatio="none">
				<rect width="1080" height="64" fill="#EDE3CB"/>
				<rect x="0" y="0" width="108" height="64" fill="var(--theme-olive, #8A9332)"/>
				<path d="M 0 0 L 108 0 Q 54 64 0 64 Z" fill="#D5DC66"/>
				<rect x="108" y="0" width="108" height="64" fill="var(--theme-burgundy, #5F1120)"/>
				<circle cx="162" cy="64" r="46" fill="var(--theme-amber, #DDA132)"/>
				<rect x="216" y="0" width="108" height="64" fill="#F4EDE0"/>
				<path d="M 216 64 Q 270 0 324 64 Z" fill="#704B28"/>
				<rect x="324" y="0" width="108" height="64" fill="var(--theme-amber, #DDA132)"/>
				<path d="M 324 0 Q 378 64 432 0 Z" fill="var(--theme-burgundy, #5F1120)"/>
				<rect x="432" y="0" width="108" height="64" fill="#E6DEC8"/>
				<circle cx="486" cy="0" r="46" fill="var(--theme-olive, #8A9332)"/>
				<rect x="540" y="0" width="108" height="64" fill="var(--theme-burgundy, #5F1120)"/>
				<path d="M 540 64 Q 594 0 648 64 Z" fill="#E6DEC8"/>
				<rect x="648" y="0" width="108" height="64" fill="#D5DC66"/>
				<path d="M 648 0 Q 702 64 756 0 Z" fill="var(--theme-amber, #DDA132)"/>
				<rect x="756" y="0" width="108" height="64" fill="var(--theme-burgundy, #5F1120)"/>
				<circle cx="810" cy="64" r="46" fill="#EDE3CB"/>
				<rect x="864" y="0" width="108" height="64" fill="var(--theme-amber, #DDA132)"/>
				<path d="M 864 64 Q 918 0 972 64 Z" fill="var(--theme-olive, #8A9332)"/>
				<rect x="972" y="0" width="108" height="64" fill="#EDE3CB"/>
				<path d="M 972 0 Q 1026 64 1080 0 Z" fill="var(--theme-burgundy, #5F1120)"/>
			</svg>
		</div>
	</section>

	<!-- 9. Team Section -->
	<section id="team" class="section-block">
		<div class="container container-medium team-grid">
			<div>
				<h2 class="section-title-left">
					<?php echo $is_fr ? "L'équipe derrière la rigueur." : esc_html( get_theme_mod( 'team_headline', 'The team behind the rigor.' ) ); ?>
				</h2>
				<p class="section-subtitle-left">
					<?php echo $is_fr ? 'Fondée en 2020 par Sapan et Rushali. 140+ ingénieurs. 100 % télétravail. Dirigée par les fondateurs.' : esc_html( get_theme_mod( 'team_subheadline', 'Founded 2020 by Sapan and Rushali. 140+ engineers. Fully remote. Founder-led.' ) ); ?>
				</p>
				<a href="#contact" class="btn-pill-group">
					<span class="btn-primary-pill btn-pill-sm"><?php echo $is_fr ? "Rencontrer l'équipe" : esc_html( get_theme_mod( 'team_cta', 'Meet the team' ) ); ?></span>
					<span class="btn-circle-arrow btn-circle-md" aria-hidden="true">&#8599;</span>
				</a>
			</div>
			<div class="team-mosaic-wrap">
				<?php
				$team_img = get_theme_mod( 'team_mosaic_image', '' );
				if ( $team_img ) :
					?>
					<div class="team-custom-frame">
						<img src="<?php echo esc_url( $team_img ); ?>" alt="FLO Engineering Team" class="team-custom-img">
					</div>
				<?php else : ?>
					<div class="team-mosaic" aria-hidden="true">
						<div class="tile"><span class="cutout c-tl-br"></span></div>
						<div class="tile"><span class="cutout c-b-half"></span></div>
						<div class="tile tile-burgundy"><span class="cutout c-b-half-light"></span></div>
						<div class="tile"><span class="cutout c-br-tl"></span></div>
						<div class="tile"><span class="cutout c-tr-full"></span></div>
						<div class="tile"><span class="cutout c-circle"></span></div>
						<div class="tile"><span class="cutout c-t-half"></span></div>
						<div class="tile tile-amber"><span class="cutout c-br-tl-light"></span></div>
						<div class="tile tile-olive"><span class="cutout c-tl-full-light"></span></div>
						<div class="tile"><span class="cutout c-bl-full"></span></div>
						<div class="tile tile-burgundy"><span class="cutout c-bl-light"></span></div>
						<div class="tile"><span class="cutout c-tr-full"></span></div>
					</div>
				<?php endif; ?>
			</div>
		</div>
	</section>

	<!-- 10. Contact Form 7 + Google Sheets Section -->
	<section id="contact" class="contact-section">
		<div class="container container-medium contact-grid">
			<div class="contact-info-card">
				<div>
					<h2><?php echo $is_fr ? 'Parlez-nous de votre projet.' : esc_html( get_theme_mod( 'contact_headline', "Tell Us What You're Building." ) ); ?></h2>
					<p><?php echo $is_fr ? 'Un fondateur lit chaque message et répond sous deux jours ouvrables.' : esc_html( get_theme_mod( 'contact_subheadline', "What you're building and what's getting in the way. A founder reads every message and replies within two business days." ) ); ?></p>
				</div>
				<div class="contact-visual-bottom">
					<?php
					$contact_img = get_theme_mod( 'contact_panel_image', '' );
					if ( $contact_img ) :
						?>
						<img src="<?php echo esc_url( $contact_img ); ?>" alt="FLO Contact Showcase" class="contact-custom-img">
					<?php else : ?>
						<div class="contact-sand-block" aria-hidden="true"></div>
					<?php endif; ?>
					<svg viewBox="0 0 280 56" class="contact-line-art" aria-hidden="true">
						<path d="M 0 56 Q 35 0 70 56 T 140 56 T 210 56 T 280 56" fill="none" stroke="var(--theme-burgundy, #551020)" stroke-width="1"/>
						<circle cx="70" cy="28" r="22" fill="none" stroke="var(--theme-burgundy, #551020)" stroke-width="1"/>
						<circle cx="210" cy="28" r="22" fill="none" stroke="var(--theme-burgundy, #551020)" stroke-width="1"/>
					</svg>
				</div>
			</div>

			<div class="contact-form-card">
				<?php
				$cf7_sc = function_exists( 'flo_get_active_cf7_shortcode' ) ? flo_get_active_cf7_shortcode() : '';
				if ( ! empty( $cf7_sc ) ) {
					echo do_shortcode( wp_kses_post( $cf7_sc ) );
				} else {
					$lead_status = isset( $_GET['flo_lead'] ) ? sanitize_key( wp_unslash( $_GET['flo_lead'] ) ) : '';
					?>
					<form action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post" class="flo-fallback-form">
						<input type="hidden" name="action" value="flo_submit_lead">
						<?php wp_nonce_field( 'flo_fallback_lead', 'flo_lead_nonce' ); ?>
						<div class="cf7-row-2">
							<div class="cf7-field">
								<label for="flo-fn"><?php echo $is_fr ? 'Prénom' : 'First Name'; ?><span class="req">*</span></label>
								<input id="flo-fn" name="first-name" type="text" required placeholder="<?php echo $is_fr ? 'Prénom' : 'First name'; ?>">
							</div>
							<div class="cf7-field">
								<label for="flo-ln"><?php echo $is_fr ? 'Nom' : 'Last Name'; ?><span class="req">*</span></label>
								<input id="flo-ln" name="last-name" type="text" required placeholder="<?php echo $is_fr ? 'Nom' : 'Last name'; ?>">
							</div>
						</div>
						<div class="cf7-field">
							<label for="flo-em"><?php echo $is_fr ? 'E-mail professionnel' : 'Work email'; ?><span class="req">*</span></label>
							<input id="flo-em" name="work-email" type="email" required placeholder="<?php echo $is_fr ? 'E-mail professionnel' : 'Business Email'; ?>">
						</div>
						<div class="cf7-field">
							<label for="flo-co"><?php echo $is_fr ? 'Entreprise' : 'Company Name'; ?><span class="req">*</span></label>
							<input id="flo-co" name="company-name" type="text" required placeholder="<?php echo $is_fr ? 'Nom de l’entreprise' : 'Company Name'; ?>">
						</div>
						<div class="cf7-radio-group">
							<span class="cf7-radio-legend"><?php echo $is_fr ? 'Ce qui vous décrit le mieux ?' : 'Which best describes you?'; ?></span>
							<label><input type="radio" name="describes-you" value="Building AI into our product" checked> <span><?php echo $is_fr ? "Intégrer l'IA dans notre produit" : 'Building AI into our product'; ?></span></label>
							<label><input type="radio" name="describes-you" value="Improving our agent experience"> <span><?php echo $is_fr ? 'Améliorer nos agents IA' : 'Improving our agent experience'; ?></span></label>
							<label><input type="radio" name="describes-you" value="Modernizing our stack first"> <span><?php echo $is_fr ? 'Moderniser notre architecture' : 'Modernizing our stack first'; ?></span></label>
							<div class="cf7-radio-inline">
								<label><input type="radio" name="describes-you" value="Building an FDE captive"> <span><?php echo $is_fr ? 'Créer une équipe FDE dédiée' : 'Building an FDE captive'; ?></span></label>
								<label><input type="radio" name="describes-you" value="Not sure yet"> <span><?php echo $is_fr ? 'Pas encore décidé' : 'Not sure yet'; ?></span></label>
							</div>
						</div>
						<div class="cf7-field">
							<textarea name="anything-else" rows="3" placeholder="<?php echo $is_fr ? 'Autre chose ? (optionnel)' : 'Anything else? (optional)'; ?>"></textarea>
						</div>
						<?php if ( 'sent' === $lead_status ) : ?>
							<p class="flo-form-success"><?php echo $is_fr ? 'Merci ! Votre message a été transmis.' : 'Thank you! Your message has been submitted and synced.'; ?></p>
						<?php elseif ( 'missing' === $lead_status ) : ?>
							<p class="flo-form-error"><?php echo $is_fr ? 'Veuillez remplir tous les champs obligatoires.' : 'Please complete all required fields.'; ?></p>
						<?php endif; ?>
						<div class="cf7-submit-row">
							<button type="submit" class="btn-pill-group btn-submit-reset">
								<span class="btn-primary-pill btn-pill-sm"><?php echo $is_fr ? 'Envoyer' : 'Submit'; ?></span>
								<span class="btn-circle-arrow btn-circle-md" aria-hidden="true">&#8599;</span>
							</button>
						</div>
					</form>
					<?php
				}
				?>
				<div class="contact-notes">
					<p><?php echo $is_fr ? 'Un fondateur lit chaque message. Deux jours ouvrables. Sans SDR.' : 'A founder reads every inbound. Two business days. No SDRs.'; ?></p>
					<p class="contact-note-link"><a href="#contact"><?php echo $is_fr ? 'Ou réserver un appel de 30 min avec un fondateur' : 'Or book a 30-min call with a founder'; ?> <span aria-hidden="true">&#8599;</span></a></p>
				</div>
			</div>
		</div>
	</section>

	<!-- 11. Blog Section -->
	<section id="blog" class="section-block">
		<div class="container container-medium">
			<div class="blog-header">
				<div>
					<h2 class="section-title-left">
						<?php echo $is_fr ? 'Ce que nous avons écrit' : esc_html( get_theme_mod( 'blog_headline', 'What we have written' ) ); ?>
					</h2>
					<p class="section-subtitle-left">
						<?php echo $is_fr ? "Trois articles de notre équipe technique sur l'IA en healthtech." : esc_html( get_theme_mod( 'blog_subheadline', 'Three pieces from the engineering team on shipping AI inside US health tech.' ) ); ?>
					</p>
				</div>
				<a href="#blog" class="btn-secondary btn-secondary-sm"><?php echo $is_fr ? 'Tout voir' : 'View All'; ?> <span aria-hidden="true">&rarr;</span></a>
			</div>
			<?php
			$blog1_img = get_theme_mod( 'blog1_image', '' );
			$blog2_img = get_theme_mod( 'blog2_image', '' );
			$blog3_img = get_theme_mod( 'blog3_image', '' );
			?>
			<div class="grid-3">
				<article class="blog-card">
					<div>
						<div class="blog-thumb thumb-maroon">
							<?php if ( $blog1_img ) : ?>
								<img src="<?php echo esc_url( $blog1_img ); ?>" alt="Building AI Products" class="blog-custom-img">
							<?php endif; ?>
						</div>
						<span class="blog-date">August 15, 2025</span>
						<h3><?php echo $is_fr ? "Développer des produits IA sans sacrifier la qualité d'ingénierie" : 'Building AI Products Without Sacrificing Engineering Quality'; ?></h3>
					</div>
					<div class="blog-meta"><span class="blog-tag"><?php echo $is_fr ? 'Tout voir' : 'View All'; ?></span><span>By Aarav Menon</span></div>
				</article>
				<article class="blog-card">
					<div>
						<div class="blog-thumb thumb-burgundy">
							<?php if ( $blog2_img ) : ?>
								<img src="<?php echo esc_url( $blog2_img ); ?>" alt="Why Legacy Modernization Fails" class="blog-custom-img">
							<?php endif; ?>
						</div>
						<span class="blog-date">August 15, 2025</span>
						<h3><?php echo $is_fr ? 'Pourquoi la modernisation échoue dans les grandes entreprises' : 'Why Legacy Modernization Fails in Large Enterprises'; ?></h3>
					</div>
					<div class="blog-meta"><span class="blog-tag">Provider Tech</span><span>By Neha Kapoor</span></div>
				</article>
				<article class="blog-card">
					<div>
						<div class="blog-thumb thumb-ochre">
							<?php if ( $blog3_img ) : ?>
								<img src="<?php echo esc_url( $blog3_img ); ?>" alt="What Great Engineering Teams Do" class="blog-custom-img">
							<?php endif; ?>
						</div>
						<span class="blog-date">August 15, 2025</span>
						<h3><?php echo $is_fr ? "Ce que les grandes équipes d'ingénierie font différemment" : 'What Great Engineering Teams Do Differently'; ?></h3>
					</div>
					<div class="blog-meta"><span class="blog-tag">Payer Tech</span><span>By Aditya Rao</span></div>
				</article>
			</div>
		</div>
	</section>

	<!-- 12. FAQ Accordion -->
	<section id="faq" class="section-block section-compact-top">
		<div class="container faq-container">
			<h2 class="section-title faq-heading">
				<?php echo $is_fr ? 'Questions posées avant le premier appel.' : esc_html( get_theme_mod( 'faq_headline', 'Questions teams ask before the first call.' ) ); ?>
			</h2>
			<div class="faq-list">
				<div class="faq-item open">
					<button type="button" class="faq-trigger" aria-expanded="true">
						<span><?php echo $is_fr ? 'Que fait Flo concrètement ?' : 'What does Flo do?'; ?></span>
						<span class="faq-symbol">&minus;</span>
					</button>
					<div class="faq-panel">
						<p><?php echo $is_fr ? "Flo est une société d'ingénierie logicielle sur mesure pour la santé numérique. Nous concevons et livrons votre produit avec l'IA, le TDD, le pair programming et les spécifications." : 'Flo is a custom software engineering company for US health tech. We build and ship your product using AI, with engineering craft like test-driven development, pair programming, and spec-driven development. We also build AI features such as agents and retrieval augmented generation directly into products.'; ?></p>
					</div>
				</div>
				<div class="faq-item">
					<button type="button" class="faq-trigger" aria-expanded="false">
						<span><?php echo $is_fr ? "Que signifie développer avec l'IA ici ?" : 'What does building with AI actually mean here?'; ?></span>
						<span class="faq-symbol">+</span>
					</button>
					<div class="faq-panel" hidden>
						<p><?php echo $is_fr ? "Nos ingénieurs seniors travaillent en binôme avec des agents de code sous des garde-fous stricts pour la conformité HIPAA et CMS." : 'Our senior engineers pair with coding agents under strict spec-driven and test-driven guardrails so every line meets HIPAA, SOC 2, and CMS audit standards.'; ?></p>
					</div>
				</div>
				<div class="faq-item">
					<button type="button" class="faq-trigger" aria-expanded="false">
						<span><?php echo $is_fr ? "Qu'est-ce que le développement piloté par spécifications ?" : 'What is spec-driven development?'; ?></span>
						<span class="faq-symbol">+</span>
					</button>
					<div class="faq-panel" hidden>
						<p><?php echo $is_fr ? 'Nous définissons les contrats comportementaux et les limites réglementaires avant toute génération de code.' : 'We author explicit behavioral contracts and compliance boundaries before generating code, cutting rework and hallucinations.'; ?></p>
					</div>
				</div>
				<div class="faq-item">
					<button type="button" class="faq-trigger" aria-expanded="false">
						<span><?php echo $is_fr ? 'Comment pratiquez-vous le TDD avec l’IA ?' : 'How do you do test-driven development (TDD) with AI?'; ?></span>
						<span class="faq-symbol">+</span>
					</button>
					<div class="faq-panel" hidden>
						<p><?php echo $is_fr ? "Chaque fonctionnalité démarre par des tests en échec, puis l'IA itère jusqu'à validation déterministe." : 'We write failing tests first and constrain AI code generation to satisfy deterministic red-green-refactor cycles.'; ?></p>
					</div>
				</div>
				<div class="faq-item">
					<button type="button" class="faq-trigger" aria-expanded="false">
						<span><?php echo $is_fr ? 'Pouvez-vous travailler dans des environnements réglementés ?' : 'Can you work inside regulated health tech stacks (HIPAA, Epic, CMS)?'; ?></span>
						<span class="faq-symbol">+</span>
					</button>
					<div class="faq-panel" hidden>
						<p><?php echo $is_fr ? 'Oui. Nos équipes opèrent en environnements SOC 2 Type II, BAA et 42 CFR Part 2 avec intégration Epic/Cerner.' : 'Yes. Our teams operate in BAA-covered, SOC 2 Type II environments with Epic, Cerner, Athena, and 42 CFR Part 2 controls.'; ?></p>
					</div>
				</div>
				<div class="faq-item">
					<button type="button" class="faq-trigger" aria-expanded="false">
						<span><?php echo $is_fr ? "Qu'est-ce que Bee ?" : 'What is Bee?'; ?></span>
						<span class="faq-symbol">+</span>
					</button>
					<div class="faq-panel" hidden>
						<p><?php echo $is_fr ? 'Bee est notre plugin open source Claude Code qui encode nos pratiques de découverte, TDD et revue.' : 'Bee is our open-source Claude Code plugin that enforces spec-driven discovery, test-first execution, and automated compliance checks.'; ?></p>
					</div>
				</div>
				<div class="faq-item faq-extra" hidden>
					<button type="button" class="faq-trigger" aria-expanded="false">
						<span><?php echo $is_fr ? 'Comment fonctionne le modèle Build-Operate-Transfer ?' : 'How does the Build-Operate-Transfer FDE captive work?'; ?></span>
						<span class="faq-symbol">+</span>
					</button>
					<div class="faq-panel" hidden>
						<p><?php echo $is_fr ? 'Nous recrutons et formons 8 à 12 ingénieurs sous votre marque, intégrés à vos équipes pendant 24 à 36 mois avant transfert.' : 'We recruit, train, and embed 8 to 12 FDE-grade engineers branded as yours for 24–36 months before seamlessly transferring the bench.'; ?></p>
					</div>
				</div>
				<div class="faq-item faq-extra" hidden>
					<button type="button" class="faq-trigger" aria-expanded="false">
						<span><?php echo $is_fr ? 'En combien de temps démarrez-vous ?' : 'How fast can we start an engagement?'; ?></span>
						<span class="faq-symbol">+</span>
					</button>
					<div class="faq-panel" hidden>
						<p><?php echo $is_fr ? 'Un fondateur examine chaque demande sous 2 jours ouvrables et les équipes démarrent sous 2 à 3 semaines.' : 'A founder reviews every submission within two business days and dedicated pods mobilize in two to three weeks.'; ?></p>
					</div>
				</div>
			</div>
			<div class="faq-load-more-wrap">
				<button type="button" id="faq-load-more" class="btn-primary-pill btn-pill-sm">+ <?php echo $is_fr ? 'Afficher plus' : 'Load more'; ?></button>
			</div>
		</div>
	</section>
</main>
<?php get_footer(); ?>
