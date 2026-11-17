<?php
/**
 * FLO Automatic Geolocation Language Routing.
 * Global default: English ('en')
 * Canada ('CA') & France ('FR') visitors: automatically served French ('fr').
 *
 * @package FLO
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function flo_detect_visitor_country() {
	if ( ! empty( $_SERVER['HTTP_CF_IPCOUNTRY'] ) ) {
		return strtoupper( sanitize_text_field( wp_unslash( $_SERVER['HTTP_CF_IPCOUNTRY'] ) ) );
	}
	if ( ! empty( $_SERVER['HTTP_X_COUNTRY_CODE'] ) ) {
		return strtoupper( sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_COUNTRY_CODE'] ) ) );
	}
	if ( function_exists( 'geoip_detect2_get_info_from_current_ip' ) ) {
		$record = geoip_detect2_get_info_from_current_ip();
		if ( ! empty( $record->country->isoCode ) ) {
			return strtoupper( $record->country->isoCode );
		}
	}
	return 'US';
}

function flo_get_active_language() {
	if ( isset( $_GET['lang'] ) ) {
		$lang = sanitize_key( wp_unslash( $_GET['lang'] ) );
		if ( in_array( $lang, array( 'en', 'fr' ), true ) ) {
			return $lang;
		}
	}
	if ( ! empty( $_COOKIE['flo_lang'] ) ) {
		$cookie_lang = sanitize_key( wp_unslash( $_COOKIE['flo_lang'] ) );
		if ( in_array( $cookie_lang, array( 'en', 'fr' ), true ) ) {
			return $cookie_lang;
		}
	}
	if ( function_exists( 'pll_current_language' ) ) {
		$pll = pll_current_language();
		if ( in_array( $pll, array( 'en', 'fr' ), true ) ) {
			return $pll;
		}
	}

	$country = flo_detect_visitor_country();
	return in_array( $country, array( 'CA', 'FR' ), true ) ? 'fr' : 'en';
}

function flo_geo_language_cookie_sync() {
	if ( isset( $_GET['lang'] ) ) {
		$lang = sanitize_key( wp_unslash( $_GET['lang'] ) );
		if ( in_array( $lang, array( 'en', 'fr' ), true ) ) {
			setcookie( 'flo_lang', $lang, time() + MONTH_IN_SECONDS, COOKIEPATH, COOKIE_DOMAIN, is_ssl(), true );
		}
	}
}
add_action( 'init', 'flo_geo_language_cookie_sync' );
