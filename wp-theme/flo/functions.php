<?php
/**
 * FLO Theme functions and definitions.
 *
 * @package FLO
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'FLO_THEME_VERSION', '1.1.7' );

function flo_theme_setup() {
	load_theme_textdomain( 'flo', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo', array(
		'height'      => 44,
		'width'       => 160,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );

	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Slide-Out Navigation', 'flo' ),
		'footer'  => esc_html__( 'Footer Navigation', 'flo' ),
	) );
}
add_action( 'after_setup_theme', 'flo_theme_setup' );

function flo_enqueue_assets() {
	wp_enqueue_style(
		'flo-google-fonts',
		'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'flo-theme-css',
		get_template_directory_uri() . '/assets/css/theme.css',
		array( 'flo-google-fonts' ),
		FLO_THEME_VERSION
	);

	$inline_vars = sprintf(
		':root{--theme-bg:%s;--theme-surface:%s;--theme-card-bg:%s;--theme-headline:%s;--theme-burgundy:%s;--theme-case-tab:%s;--theme-amber:%s;--theme-service2:%s;--theme-olive:%s;--theme-ink:%s;--theme-muted:%s;--theme-border:%s;--theme-border-width:%dpx;--theme-radius-card:%dpx;--theme-footer-bg:%s;}',
		esc_attr( get_theme_mod( 'theme_bg', '#FAF5E6' ) ),
		esc_attr( get_theme_mod( 'theme_surface', '#F4EFE3' ) ),
		esc_attr( get_theme_mod( 'theme_card_bg', '#FBF8EE' ) ),
		esc_attr( get_theme_mod( 'theme_headline', '#4A0E17' ) ),
		esc_attr( get_theme_mod( 'theme_burgundy', '#5F1120' ) ),
		esc_attr( get_theme_mod( 'theme_case_tab', '#7D2D3D' ) ),
		esc_attr( get_theme_mod( 'theme_amber', '#DDA132' ) ),
		esc_attr( get_theme_mod( 'theme_service2', '#52C3E6' ) ),
		esc_attr( get_theme_mod( 'theme_olive', '#8A9332' ) ),
		esc_attr( get_theme_mod( 'theme_ink', '#1C1513' ) ),
		esc_attr( get_theme_mod( 'theme_muted', '#584D46' ) ),
		esc_attr( get_theme_mod( 'theme_border_color', '#DDD4C0' ) ),
		absint( get_theme_mod( 'theme_border_width', 1 ) ),
		absint( get_theme_mod( 'theme_card_radius', 16 ) ),
		esc_attr( get_theme_mod( 'theme_footer_bg', '#080808' ) )
	);
	wp_add_inline_style( 'flo-theme-css', $inline_vars );

	wp_enqueue_script(
		'flo-theme-js',
		get_template_directory_uri() . '/assets/js/theme.js',
		array(),
		FLO_THEME_VERSION,
		array( 'strategy' => 'defer', 'in_footer' => true )
	);
}
add_action( 'wp_enqueue_scripts', 'flo_enqueue_assets' );

function flo_performance_optimizations() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
}
add_action( 'init', 'flo_performance_optimizations' );

function flo_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array( 'href' => 'https://fonts.googleapis.com', 'crossorigin' => 'anonymous' );
		$urls[] = array( 'href' => 'https://fonts.gstatic.com', 'crossorigin' => 'anonymous' );
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'flo_resource_hints', 10, 2 );

require get_template_directory() . '/inc/svg-icons.php';
require get_template_directory() . '/inc/customizer.php';
require get_template_directory() . '/inc/geolocation-fr.php';
require get_template_directory() . '/inc/cf7-google-sheets.php';
