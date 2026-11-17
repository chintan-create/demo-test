<?php
/**
 * FLO Header template with WCAG skip link, exact rounded pill bar, and slide-out mobile/desktop navigation drawer.
 *
 * @package FLO
 */

$current_lang = function_exists( 'flo_get_active_language' ) ? flo_get_active_language() : 'en';
?>
<!doctype html>
<html lang="<?php echo esc_attr( $current_lang ); ?>">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main-content">
	<?php echo 'fr' === $current_lang ? 'Aller au contenu principal' : 'Skip to main content'; ?>
</a>

<header class="site-header" role="banner">
	<div class="header-pill">
		<a class="brand-wordmark" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
			<?php
			if ( has_custom_logo() ) {
				the_custom_logo();
			} elseif ( get_theme_mod( 'show_header_brand_text', false ) ) {
				echo esc_html( get_theme_mod( 'brand_name', 'FLO' ) );
			}
			?>
		</a>
		<button
			type="button"
			class="menu-toggle-btn"
			aria-controls="slideout-nav"
			aria-expanded="false"
			aria-label="<?php echo 'fr' === $current_lang ? 'Ouvrir le menu' : 'Open navigation menu'; ?>"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
				<line x1="3" y1="7" x2="21" y2="7"></line>
				<line x1="3" y1="12" x2="21" y2="12"></line>
				<line x1="3" y1="17" x2="21" y2="17"></line>
			</svg>
		</button>
	</div>
</header>

<div id="slideout-backdrop" class="drawer-backdrop" hidden></div>
<aside id="slideout-nav" class="slideout-drawer" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Site Navigation', 'flo' ); ?>" hidden>
	<div class="drawer-header">
		<span class="brand-wordmark"><?php echo esc_html( get_theme_mod( 'brand_name', 'FLO' ) ); ?></span>
		<button type="button" class="drawer-close-btn" aria-label="<?php esc_attr_e( 'Close navigation menu', 'flo' ); ?>">&times;</button>
	</div>
	<nav aria-label="Primary Navigation">
		<?php
		if ( has_nav_menu( 'primary' ) ) {
			wp_nav_menu( array(
				'theme_location' => 'primary',
				'container'      => false,
				'menu_class'     => 'drawer-links',
			) );
		} else {
			?>
			<ul class="drawer-links">
				<li><a href="#craft"><?php echo 'fr' === $current_lang ? 'Notre savoir-faire' : 'Our Craft'; ?></a></li>
				<li><a href="#cases"><?php echo 'fr' === $current_lang ? 'Études de cas' : 'Case Studies'; ?></a></li>
				<li><a href="#services"><?php echo 'fr' === $current_lang ? 'Services' : 'Services'; ?></a></li>
				<li><a href="#verticals"><?php echo 'fr' === $current_lang ? 'Secteurs' : 'Industries'; ?></a></li>
				<li><a href="#fde"><?php echo 'fr' === $current_lang ? 'Équipe FDE' : 'FDE Bench'; ?></a></li>
				<li><a href="#contact"><?php echo 'fr' === $current_lang ? 'Contact' : 'Contact'; ?></a></li>
			</ul>
			<?php
		}
		?>
	</nav>
	<div class="drawer-lang-switch">
		<a href="?lang=en" class="<?php echo 'en' === $current_lang ? 'active' : ''; ?>">English</a>
		<a href="?lang=fr" class="<?php echo 'fr' === $current_lang ? 'active' : ''; ?>">Français</a>
	</div>
</aside>
