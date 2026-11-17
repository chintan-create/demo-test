<?php
/**
 * FLO Inline SVG Icons & Brand Geometric Artwork Helpers.
 * Ensures zero external icon font overhead for 90+ Mobile PageSpeed & full Customizer icon swapping.
 *
 * @package FLO
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns an accessible inline SVG string for the chosen icon key.
 *
 * @param string $name  Icon key from Customizer.
 * @param int    $size  Pixel width/height.
 * @return string
 */
function flo_get_icon_svg( $name, $size = 16 ) {
	$size = absint( $size );
	$base = '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';

	switch ( $name ) {
		case 'sparkles':
			return '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10.5 3.5c.3-1 1.7-1 2 0l1.3 4.2c.2.6.7 1.1 1.3 1.3l4.2 1.3c1 .3 1 1.7 0 2l-4.2 1.3c-.6.2-1.1.7-1.3 1.3l-1.3 4.2c-.3 1-1.7 1-2 0l-1.3-4.2c-.2-.6-.7-1.1-1.3-1.3l-4.2-1.3c-1-.3-1-1.7 0-2l4.2-1.3c.6-.2 1.1-.7 1.3-1.3l1.3-4.2Z"/><path d="M18.8 3.2c.2-.5.8-.5 1 0l.4 1.1c.1.2.3.4.5.5l1.1.4c.5.2.5.8 0 1l-1.1.4c-.2.1-.4.3-.5.5l-.4 1.1c-.2.5-.8.5-1 0l-.4-1.1c-.1-.2-.3-.4-.5-.5l-1.1-.4c-.5-.2-.5-.8 0-1l1.1-.4c.2-.1.4-.3.5-.5l.4-1.1Z"/><path d="M18.2 16.2c.2-.5.8-.5 1 0l.3.9c.1.2.3.4.5.5l.9.3c.5.2.5.8 0 1l-.9.3c-.2.1-.4.3-.5.5l-.3.9c-.2.5-.8.5-1 0l-.3-.9c-.1-.2-.3-.4-.5-.5l-.9-.3c-.5-.2-.5-.8 0-1l.9-.3c.2-.1.4-.3.5-.5l.3-.9Z"/></svg>';
		case 'split-panel':
			return '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10.5 4.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h3.5v-15Z" fill="currentColor"/><path d="M13.5 4.5H17A2.5 2.5 0 0 1 19.5 7v10a2.5 2.5 0 0 1-2.5 2.5h-3.5" stroke="currentColor" stroke-width="2" stroke-dasharray="2.5 2.5" stroke-linecap="round"/><line x1="12" y1="3.5" x2="12" y2="20.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
		case 'laptop-code':
			return '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="11" rx="1.8" fill="currentColor"/><path d="M9.5 8.7 7.3 10.5l2.2 1.8M14.5 8.7l2.2 1.8-2.2 1.8M12.6 8.2l-1.2 4.6" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 18h19" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
		case 'shield':
			return $base . '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>';
		case 'code':
			return $base . '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>';
		case 'book':
			return $base . '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>';
		case 'layers':
			return '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z"/><path d="m3.5 11.8 8.5 4.5 8.5-4.5-1.9-1-6.6 3.5-6.6-3.5-1.9 1Z"/><path d="m3.5 15.8 8.5 4.5 8.5-4.5-1.9-1-6.6 3.5-6.6-3.5-1.9 1Z"/></svg>';
		case 'clipboard-code':
			return '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="2.5" width="6" height="3" rx="1" fill="currentColor"/><rect x="4.5" y="4.5" width="15" height="16.5" rx="2.5" fill="currentColor"/><path d="M10.2 11 8 13l2.2 2M13.8 11 16 13l-2.2 2" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
		case 'foundry-growth':
			return '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 6.5 9.5h11L12 3Z"/><path d="M12 7.8 5.5 14h13L12 7.8Z"/><path d="M12 12.6 4.5 18.5h15L12 12.6Z"/><rect x="10.7" y="18" width="2.6" height="3.5" rx="0.6"/></svg>';
		case 'rocket':
			return $base . '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>';
		case 'compass':
			return $base . '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>';
		case 'flask':
			return $base . '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>';
		case 'workflow':
			return $base . '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>';
		case 'cpu':
			return $base . '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>';
		case 'zap':
			return $base . '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>';
		case 'terminal':
			return $base . '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>';
		case 'building':
			return $base . '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>';
		case 'briefcase':
			return $base . '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>';
		case 'clock':
			return $base . '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
		case 'wrench':
			return $base . '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>';
		case 'users':
			return $base . '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
		case 'leaf':
			return $base . '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';
		case 'check-circle':
			return '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="m8.2 12.3 2.5 2.5 5.2-5.4" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
		case 'check':
		default:
			return '<svg width="' . $size . '" height="' . $size . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
	}
}

/**
 * Renders the 132px Figma geometric header artwork + positioned white icon tile for Service Cards.
 *
 * @param int    $variant   0, 1, or 2.
 * @param string $icon_key  Icon key.
 * @return string
 */
function flo_get_service_card_artwork( $variant, $icon_key ) {
	$svg = '';
	$pos_class = 'pos-top-right';

	if ( 0 === (int) $variant ) {
		$pos_class = 'pos-top-right';
		$svg = '<svg viewBox="0 0 280 140" class="service-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
			. '<rect width="280" height="140" fill="#BE8710"/>'
			. '<path d="M 0 0 A 70 70 0 0 1 70 70 L 0 70 Z" fill="#D3A540"/>'
			. '<path d="M 140 0 A 70 70 0 0 0 70 70 L 140 70 Z" fill="#D3A540"/>'
			. '<path d="M 0 140 A 70 70 0 0 0 70 70 L 0 70 Z" fill="#D3A540"/>'
			. '<path d="M 140 140 A 70 70 0 0 1 70 70 L 140 70 Z" fill="#D3A540"/>'
			. '<path d="M 140 0 L 210 0 L 210 70 A 70 70 0 0 1 140 0 Z" fill="#D3A540" opacity="0.45"/>'
			. '<path d="M 210 0 L 280 0 A 70 70 0 0 1 210 70 Z" fill="#D3A540" opacity="0.6"/>'
			. '<path d="M 140 70 A 70 70 0 0 1 210 140 L 140 140 Z" fill="#D3A540" opacity="0.45"/>'
			. '<path d="M 210 70 A 70 70 0 0 1 280 140 L 210 140 Z" fill="#D3A540"/>'
			. '<path d="M 70 0 V 140 M 140 0 V 140 M 210 0 V 140 M 0 70 H 280" stroke="#DFB95E" stroke-opacity="0.28" stroke-width="1" fill="none"/>'
			. '</svg>';
	} elseif ( 1 === (int) $variant ) {
		$pos_class = 'pos-bottom-right';
		$svg = '<svg viewBox="0 0 280 140" class="service-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
			. '<rect width="280" height="140" fill="#E5AF37"/>'
			. '<path d="M 0 0 L 70 0 L 70 70 A 70 70 0 0 1 0 0 Z" fill="var(--theme-service2, #52C3E6)"/>'
			. '<path d="M 70 0 A 70 70 0 0 1 140 70 L 70 70 Z" fill="var(--theme-service2, #52C3E6)"/>'
			. '<path d="M 140 0 L 210 0 L 210 70 A 70 70 0 0 1 140 0 Z" fill="var(--theme-service2, #52C3E6)"/>'
			. '<path d="M 210 70 A 70 70 0 0 1 280 0 A 70 70 0 0 1 210 70 Z" fill="var(--theme-service2, #52C3E6)"/>'
			. '<path d="M 0 70 L 70 70 L 70 140 A 70 70 0 0 1 0 70 Z" fill="var(--theme-service2, #52C3E6)"/>'
			. '<path d="M 70 70 A 70 70 0 0 1 140 140 L 70 140 Z" fill="var(--theme-service2, #52C3E6)"/>'
			. '<path d="M 140 140 A 70 70 0 0 1 210 70 L 210 140 Z" fill="var(--theme-service2, #52C3E6)"/>'
			. '<path d="M 210 70 L 280 70 A 70 70 0 0 1 210 140 Z" fill="var(--theme-service2, #52C3E6)"/>'
			. '</svg>';
	} else {
		$pos_class = 'pos-center';
		$svg = '<svg viewBox="0 0 280 140" class="service-art-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
			. '<rect width="280" height="140" fill="#E2B345"/>'
			. '<path d="M 0 0 L 70 0 A 70 70 0 0 1 0 70 Z" fill="#D49E2A"/>'
			. '<path d="M 70 0 A 70 70 0 0 0 140 70 L 140 0 Z" fill="#D49E2A"/>'
			. '<path d="M 140 0 L 210 0 L 210 70 A 70 70 0 0 1 140 0 Z" fill="#D49E2A"/>'
			. '<rect x="210" y="0" width="70" height="70" fill="#D49E2A" opacity="0.82"/>'
			. '<path d="M 0 70 A 70 70 0 0 1 70 140 L 0 140 Z" fill="#ECC76B" opacity="0.7"/>'
			. '<path d="M 70 70 L 140 70 A 70 70 0 0 1 70 140 Z" fill="#D49E2A"/>'
			. '<path d="M 140 70 L 210 70 L 210 140 A 70 70 0 0 1 140 70 Z" fill="#D49E2A"/>'
			. '<path d="M 210 70 A 70 70 0 0 1 280 140 L 210 140 Z" fill="#D49E2A" opacity="0.85"/>'
			. '</svg>';
	}

	return '<div class="service-art-wrap">'
		. $svg
		. '<div class="service-icon-tile ' . esc_attr( $pos_class ) . '">' . flo_get_icon_svg( $icon_key, 24 ) . '</div>'
		. '</div>';
}

/**
 * Renders the 136px 4x2 geometric modular SVG pattern for Health Tech Vertical cards.
 *
 * @param int $variant 0, 1, or 2.
 * @return string
 */
function flo_get_vertical_pattern_svg( $variant ) {
	$stroke = '#DCEB9E';
	$v      = (int) $variant;

	$col2_r1_fill   = ( 1 === $v ) ? '#671225' : 'none';
	$col2_r1_stroke = ( 1 === $v ) ? '#671225' : $stroke;

	$col4_r1_fill   = ( 0 === $v ) ? '#671225' : ( ( 2 === $v ) ? '#E3D2B4' : 'none' );
	$col4_r1_stroke = ( 0 === $v ) ? '#671225' : ( ( 2 === $v ) ? '#D7C4A3' : $stroke );

	if ( 0 === $v ) {
		$col2_r2 = '<rect x="70.5" y="70.5" width="69" height="69" fill="#E3D2B4" stroke="' . $stroke . '" stroke-width="1"/>';
	} elseif ( 1 === $v ) {
		$col2_r2 = '<path d="M 70.5 70.5 A 69 69 0 0 1 139.5 139.5 H 70.5 Z" fill="none" stroke="' . $stroke . '" stroke-width="1"/>';
	} else {
		$col2_r2 = '<path d="M 70.5 70.5 H 105 A 34.5 34.5 0 0 1 105 139.5 H 70.5 Z" fill="#CA9117" stroke="#B4C676" stroke-width="1"/>';
	}

	$col4_r2_fill   = ( 1 === $v ) ? '#68381B' : 'none';
	$col4_r2_stroke = ( 1 === $v ) ? '#68381B' : $stroke;

	$inner = '<path d="M 0.5 69.5 V 35 A 34.5 34.5 0 0 1 69.5 35 V 69.5 Z" fill="none" stroke="' . $stroke . '" stroke-width="1"/>'
		. '<path d="M 70.5 0.5 H 105 A 34.5 34.5 0 0 1 105 69.5 H 70.5 Z" fill="' . $col2_r1_fill . '" stroke="' . $col2_r1_stroke . '" stroke-width="1"/>'
		. '<path d="M 140.5 0.5 H 209.5 A 69 69 0 0 1 140.5 69.5 Z" fill="none" stroke="' . $stroke . '" stroke-width="1"/>'
		. '<path d="M 210.5 69.5 V 35 A 34.5 34.5 0 0 1 279.5 35 V 69.5 Z" fill="' . $col4_r1_fill . '" stroke="' . $col4_r1_stroke . '" stroke-width="1"/>'
		. '<path d="M 0.5 70.5 A 69 69 0 0 1 69.5 139.5 H 0.5 Z" fill="none" stroke="' . $stroke . '" stroke-width="1"/>'
		. $col2_r2
		. '<path d="M 140.5 139.5 A 69 69 0 0 1 209.5 70.5 A 69 69 0 0 1 140.5 139.5 Z" fill="none" stroke="' . $stroke . '" stroke-width="1"/>'
		. '<path d="M 210.5 70.5 A 69 69 0 0 1 279.5 139.5 H 210.5 Z" fill="' . $col4_r2_fill . '" stroke="' . $col4_r2_stroke . '" stroke-width="1"/>';

	return '<div class="vertical-art" aria-hidden="true"><svg viewBox="0 0 280 140" class="vertical-art-svg" preserveAspectRatio="xMidYMid meet">' . $inner . '</svg></div>';
}
