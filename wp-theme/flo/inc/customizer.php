<?php
/**
 * FLO Theme Customizer Settings.
 * Every color, background, border, icon, image, and text across all 13 sections is editable without code.
 *
 * @package FLO
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function flo_customize_register( $wp_customize ) {
	// 1. Colors, Backgrounds & Borders
	$wp_customize->add_section( 'flo_design_tokens', array(
		'title'    => __( 'FLO Colors, Backgrounds & Borders', 'flo' ),
		'priority' => 25,
	) );

	$colors = array(
		'theme_bg'           => array( 'Page Canvas Background', '#FAF5E6' ),
		'theme_surface'      => array( 'Craft Card Surface Background', '#F4EFE3' ),
		'theme_card_bg'      => array( 'Verticals / FDE / Blog Card Background', '#FBF8EE' ),
		'theme_headline'     => array( 'Hero Headline & CTA Color', '#4A0E17' ),
		'theme_burgundy'     => array( 'Primary Burgundy Sections', '#5F1120' ),
		'theme_case_tab'     => array( 'Case Study Eyebrow Tab Background', '#7D2D3D' ),
		'theme_amber'        => array( 'Golden Amber Accent & Services Bg', '#DDA132' ),
		'theme_service2'     => array( 'Service Card 2 Cyan Accent', '#52C3E6' ),
		'theme_olive'        => array( 'Botanical Olive Accent', '#8A9332' ),
		'theme_ink'          => array( 'Primary Ink Text', '#1C1513' ),
		'theme_muted'        => array( 'Muted Body Text', '#584D46' ),
		'theme_border_color' => array( 'Card & Pill Border Color', '#DDD4C0' ),
		'theme_footer_bg'    => array( 'Footer Background', '#080808' ),
	);

	foreach ( $colors as $id => $config ) {
		$wp_customize->add_setting( $id, array(
			'default'           => $config[1],
			'sanitize_callback' => 'sanitize_hex_color',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, $id, array(
			'label'   => $config[0],
			'section' => 'flo_design_tokens',
		) ) );
	}

	$wp_customize->add_setting( 'theme_border_width', array( 'default' => 1, 'sanitize_callback' => 'absint' ) );
	$wp_customize->add_control( 'theme_border_width', array(
		'label'       => __( 'Border Width (px)', 'flo' ),
		'section'     => 'flo_design_tokens',
		'type'        => 'number',
		'input_attrs' => array( 'min' => 0, 'max' => 6, 'step' => 1 ),
	) );

	$wp_customize->add_setting( 'theme_card_radius', array( 'default' => 16, 'sanitize_callback' => 'absint' ) );
	$wp_customize->add_control( 'theme_card_radius', array(
		'label'       => __( 'Card Corner Radius (px)', 'flo' ),
		'section'     => 'flo_design_tokens',
		'type'        => 'number',
		'input_attrs' => array( 'min' => 0, 'max' => 36, 'step' => 1 ),
	) );

	// 2. Editable Copy & Contact Form 7 / Google Sheets
	$wp_customize->add_section( 'flo_homepage_content', array(
		'title'    => __( 'FLO Text, CF7 Shortcode & Google Sheets', 'flo' ),
		'priority' => 26,
	) );

	$text_fields = array(
		'brand_name'          => array( 'Drawer Brand Name', 'FLO' ),
		'footer_brand'        => array( 'Footer Wordmark', 'incubyte' ),
		'footer_tagline'      => array( 'Footer Tagline (EN)', 'Software engineering for US health tech.' ),
		'hero_eyebrow'        => array( 'Hero Eyebrow', 'SOFTWARE ENGINEERING FOR US HEALTH TECH' ),
		'hero_headline'       => array( 'Hero Headline (EN)', "The rigor of healthtech, at AI's pace." ),
		'hero_subheadline'    => array( 'Hero Subheadline (EN)', 'We embed engineers trained in the craft that keeps AI-accelerated engineering safe, compliant, and built to last.' ),
		'hero_primary_cta'    => array( 'Hero Primary CTA (EN)', 'Talk to an engineer' ),
		'hero_secondary_cta'  => array( 'Hero Secondary CTA (EN)', 'See the work' ),
		'logos_caption'       => array( 'Logos Strip Caption', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' ),
		'craft_headline'      => array( 'Craft Section Headline', 'AI is only as good as the team using it.' ),
		'craft_subheadline'   => array( 'Craft Section Subheadline', 'AI compounds whatever a team already brings. We spent years building the discipline it now amplifies.' ),
		'cases_headline'      => array( 'Case Studies Headline', "AI in production. Here's what it took." ),
		'cases_subheadline'   => array( 'Case Studies Subheadline', "AI products we shipped for US health tech, built with AI and the judgment to know when it's wrong." ),
		'services_headline'   => array( 'Services Headline', 'AI work that compounds across your engineering organisation.' ),
		'services_subheadline'=> array( 'Services Subheadline', 'Adoption, codebase, or feature work. The engineering craft underneath is the same.' ),
		'verticals_headline'  => array( 'Verticals Headline', 'Built for the realities of US health tech.' ),
		'verticals_subheadline'=> array( 'Verticals Subheadline', 'Three health tech verticals where regulation is the design starting point' ),
		'plugin_eyebrow'      => array( 'Plugin Spotlight Eyebrow', 'SPOTLIGHT · OPEN-SOURCE PLUGIN' ),
		'plugin_headline'     => array( 'Plugin Spotlight Headline', 'Our engineers ship faster because our Claude plugin codifies our craft.' ),
		'plugin_cta'          => array( 'Plugin Spotlight CTA', 'Explore Bee' ),
		'fde_headline'        => array( 'FDE Headline', "Your foundational model may be replaceable. Your forward-deployed engineers aren't." ),
		'fde_subheadline'     => array( 'FDE Subheadline', 'Foundation models are commoditizing. Defensibility shifts to forward-deployed engineers embedded inside your team. That bench is the moat.' ),
		'fde_cta'             => array( 'FDE CTA Button', 'Build your FDE bench' ),
		'team_headline'       => array( 'Team Headline', 'The team behind the rigor.' ),
		'team_subheadline'    => array( 'Team Subheadline', 'Founded 2020 by Sapan and Rushali. 140+ engineers. Fully remote. Founder-led.' ),
		'team_cta'            => array( 'Team CTA Button', 'Meet the team' ),
		'contact_headline'    => array( 'Contact Headline', "Tell Us What You're Building." ),
		'contact_subheadline' => array( 'Contact Subheadline', "What you're building and what's getting in the way. A founder reads every message and replies within two business days." ),
		'blog_headline'       => array( 'Blog Section Headline', 'What we have written' ),
		'blog_subheadline'    => array( 'Blog Section Subheadline', 'Three pieces from the engineering team on shipping AI inside US health tech.' ),
		'faq_headline'        => array( 'FAQ Section Headline', 'Questions teams ask before the first call.' ),
		'cf7_shortcode'       => array( 'Contact Form 7 Shortcode (leave default to auto-load FLO Lead Form)', '[contact-form-7 title="FLO Lead Form"]' ),
		'google_sheet_url'    => array( 'Google Sheets Apps Script Webhook URL', '' ),
	);

	foreach ( $text_fields as $id => $cfg ) {
		$wp_customize->add_setting( $id, array(
			'default'           => $cfg[1],
			'sanitize_callback' => 'sanitize_text_field',
		) );
		$wp_customize->add_control( $id, array(
			'label'   => $cfg[0],
			'section' => 'flo_homepage_content',
			'type'    => 'text',
		) );
	}

	// 3. Customizable Icons & Images
	$wp_customize->add_section( 'flo_media_icons', array(
		'title'    => __( 'FLO Images & Icons', 'flo' ),
		'priority' => 27,
	) );

	$images = array(
		'hero_showcase_image' => 'Hero Showcase Image',
		'case1_image'         => 'Case Study 1 Thumbnail',
		'case2_image'         => 'Case Study 2 Thumbnail',
		'case3_image'         => 'Case Study 3 Thumbnail',
		'plugin_image'        => 'Bee Plugin Spotlight Image',
		'team_mosaic_image'   => 'Team Grid Image',
		'contact_panel_image' => 'Contact Left Panel Image',
		'blog1_image'         => 'Blog Post 1 Thumbnail',
		'blog2_image'         => 'Blog Post 2 Thumbnail',
		'blog3_image'         => 'Blog Post 3 Thumbnail',
	);
	foreach ( $images as $id => $label ) {
		$wp_customize->add_setting( $id, array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
		) );
		$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, $id, array(
			'label'   => $label,
			'section' => 'flo_media_icons',
		) ) );
	}

	$icon_choices = array(
		'check'          => 'Checkmark',
		'check-circle'   => 'Check Circle',
		'sparkles'       => 'Sparkles',
		'split-panel'    => 'Modernize / Split',
		'laptop-code'    => 'Laptop </>',
		'clipboard-code' => 'Clipboard </>',
		'foundry-growth' => 'Foundry Stack',
		'shield'         => 'Shield',
		'code'           => 'Code </>',
		'book'           => 'Book / Blueprint',
		'layers'         => 'Layers',
		'rocket'         => 'Rocket',
		'compass'        => 'Compass',
		'flask'          => 'Flask / Test',
		'workflow'       => 'Workflow',
		'cpu'            => 'CPU / AI',
		'zap'            => 'Lightning / Zap',
		'terminal'       => 'Terminal',
		'building'       => 'Building / Acquire',
		'briefcase'      => 'Briefcase',
		'clock'          => 'Clock',
		'wrench'         => 'Wrench',
		'users'          => 'Users / Team',
		'leaf'           => 'Botanical Leaf',
	);
	$icon_slots = array(
		'hero_badge1_icon' => array( 'Hero Badge 1 Icon (Spec-driven)', 'laptop-code' ),
		'hero_badge2_icon' => array( 'Hero Badge 2 Icon (Test-driven)', 'book' ),
		'hero_badge3_icon' => array( 'Hero Badge 3 Icon (Continuous delivery)', 'check-circle' ),
		'pillar1_icon'     => array( 'Craft Card 1 Icon', 'check' ),
		'pillar2_icon'     => array( 'Craft Card 2 Icon', 'check' ),
		'pillar3_icon'     => array( 'Craft Card 3 Icon', 'check' ),
		'service1_icon'    => array( 'Service 1 Icon', 'sparkles' ),
		'service2_icon'    => array( 'Service 2 Icon', 'split-panel' ),
		'service3_icon'    => array( 'Service 3 Icon', 'laptop-code' ),
		'fde1_icon'        => array( 'FDE Option 1 Icon', 'layers' ),
		'fde2_icon'        => array( 'FDE Option 2 Icon', 'clipboard-code' ),
		'fde3_icon'        => array( 'FDE Option 3 Icon', 'foundry-growth' ),
	);
	foreach ( $icon_slots as $id => $cfg ) {
		$wp_customize->add_setting( $id, array(
			'default'           => $cfg[1],
			'sanitize_callback' => 'sanitize_key',
		) );
		$wp_customize->add_control( $id, array(
			'label'   => $cfg[0],
			'section' => 'flo_media_icons',
			'type'    => 'select',
			'choices' => $icon_choices,
		) );
	}
}
add_action( 'customize_register', 'flo_customize_register' );
