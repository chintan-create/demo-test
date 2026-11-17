<?php
/**
 * FLO Contact Form 7 + Google Sheets Integration.
 * Automatically provisions the "FLO Lead Form" when Contact Form 7 is active
 * and forwards every submission to the configured Google Sheets Apps Script Webhook URL.
 *
 * @package FLO
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Auto-seed the Figma-exact Contact Form 7 form when Contact Form 7 is active.
 */
function flo_maybe_seed_cf7_form() {
	if ( ! class_exists( 'WPCF7_ContactForm' ) || ! post_type_exists( 'wpcf7_contact_form' ) ) {
		return 0;
	}

	$existing = get_posts( array(
		'post_type'      => 'wpcf7_contact_form',
		'post_status'    => 'publish',
		'posts_per_page' => 1,
		'title'          => 'FLO Lead Form',
		'fields'         => 'ids',
	) );

	if ( ! empty( $existing ) ) {
		return (int) $existing[0];
	}

	$form_markup = <<<'HTML'
<div class="cf7-row-2">
  <div class="cf7-field">
    <label for="cf7-first-name">First Name<span class="req">*</span></label>
    [text* first-name id:cf7-first-name placeholder "First name"]
  </div>
  <div class="cf7-field">
    <label for="cf7-last-name">Last Name<span class="req">*</span></label>
    [text* last-name id:cf7-last-name placeholder "Last name"]
  </div>
</div>
<div class="cf7-field">
  <label for="cf7-work-email">Work email<span class="req">*</span></label>
  [email* work-email id:cf7-work-email placeholder "Business Email"]
</div>
<div class="cf7-field">
  <label for="cf7-company-name">Company Name<span class="req">*</span></label>
  [text* company-name id:cf7-company-name placeholder "Company Name"]
</div>
<div class="cf7-radio-group">
  <span class="cf7-radio-legend">Which best describes you?</span>
  [radio describes-you default:1 "Building AI into our product" "Improving our agent experience" "Modernizing our stack first" "Building an FDE captive" "Not sure yet"]
</div>
<div class="cf7-field">
  [textarea anything-else rows:3 placeholder "Anything else? (optional)"]
</div>
<div class="cf7-submit-row">
  [submit class:flo-cf7-submit "Submit"]<span class="btn-circle-arrow cf7-submit-arrow" aria-hidden="true">&#8599;</span>
</div>
HTML;

	$form_id = wp_insert_post( array(
		'post_type'   => 'wpcf7_contact_form',
		'post_status' => 'publish',
		'post_title'  => 'FLO Lead Form',
	) );

	if ( $form_id && ! is_wp_error( $form_id ) ) {
		update_post_meta( $form_id, '_form', $form_markup );
		update_post_meta( $form_id, '_mail', array(
			'active'             => true,
			'subject'            => 'FLO Lead Inquiry from [first-name] [last-name]',
			'sender'             => get_bloginfo( 'name' ) . ' <wordpress@' . wp_parse_url( home_url(), PHP_URL_HOST ) . '>',
			'recipient'          => get_option( 'admin_email' ),
			'body'               => "Name: [first-name] [last-name]\nEmail: [work-email]\nCompany: [company-name]\nInterest: [describes-you]\nNotes: [anything-else]",
			'additional_headers' => 'Reply-To: [work-email]',
			'use_html'           => false,
		) );
		return (int) $form_id;
	}

	return 0;
}
add_action( 'init', 'flo_maybe_seed_cf7_form', 20 );

/**
 * Returns the active Contact Form 7 shortcode, automatically resolving any seeded/existing form.
 */
function flo_get_active_cf7_shortcode() {
	if ( ! shortcode_exists( 'contact-form-7' ) ) {
		return '';
	}

	$custom = trim( (string) get_theme_mod( 'cf7_shortcode', '' ) );
	if ( ! empty( $custom ) && false === strpos( $custom, 'title="FLO Lead Form"' ) ) {
		return $custom;
	}

	$form_id = flo_maybe_seed_cf7_form();
	if ( $form_id > 0 ) {
		return '[contact-form-7 id="' . $form_id . '" title="FLO Lead Form"]';
	}

	$any_forms = get_posts( array(
		'post_type'      => 'wpcf7_contact_form',
		'post_status'    => 'publish',
		'posts_per_page' => 1,
		'fields'         => 'ids',
	) );
	if ( ! empty( $any_forms ) ) {
		return '[contact-form-7 id="' . (int) $any_forms[0] . '"]';
	}

	return $custom;
}

/**
 * Shared helper to push a lead payload to Google Sheets Apps Script Webhook.
 *
 * @param array $payload Lead fields.
 */
function flo_send_payload_to_google_sheet( $payload ) {
	$webhook_url = trim( (string) get_theme_mod( 'google_sheet_url', '' ) );
	if ( empty( $webhook_url ) ) {
		return;
	}

	wp_remote_post( esc_url_raw( $webhook_url ), array(
		'timeout' => 8,
		'headers' => array( 'Content-Type' => 'application/json' ),
		'body'    => wp_json_encode( $payload ),
	) );
}

/**
 * Hook into Contact Form 7 submission event.
 *
 * @param WPCF7_ContactForm $contact_form Submitted form object.
 */
function flo_cf7_push_to_google_sheet( $contact_form ) {
	if ( ! class_exists( 'WPCF7_Submission' ) ) {
		return;
	}

	$submission = WPCF7_Submission::get_instance();
	if ( ! $submission ) {
		return;
	}

	$posted = $submission->get_posted_data();
	$payload = array(
		'createdAt'    => gmdate( 'c' ),
		'firstName'    => sanitize_text_field( $posted['first-name'] ?? '' ),
		'lastName'     => sanitize_text_field( $posted['last-name'] ?? '' ),
		'workEmail'    => sanitize_email( $posted['work-email'] ?? '' ),
		'companyName'  => sanitize_text_field( $posted['company-name'] ?? '' ),
		'describesYou' => sanitize_text_field( is_array( $posted['describes-you'] ?? '' ) ? implode( ', ', $posted['describes-you'] ) : ( $posted['describes-you'] ?? '' ) ),
		'anythingElse' => sanitize_textarea_field( $posted['anything-else'] ?? '' ),
		'locale'       => function_exists( 'flo_get_active_language' ) ? flo_get_active_language() : 'en',
		'country'      => function_exists( 'flo_detect_visitor_country' ) ? flo_detect_visitor_country() : 'US',
	);

	flo_send_payload_to_google_sheet( $payload );
}
add_action( 'wpcf7_mail_sent', 'flo_cf7_push_to_google_sheet' );

/**
 * Fallback form handler when Contact Form 7 plugin is not yet installed.
 */
function flo_handle_fallback_lead_submit() {
	if ( ! isset( $_POST['flo_lead_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['flo_lead_nonce'] ) ), 'flo_fallback_lead' ) ) {
		wp_safe_redirect( add_query_arg( 'flo_lead', 'invalid', home_url( '/#contact' ) ) );
		exit;
	}

	$first = sanitize_text_field( wp_unslash( $_POST['first-name'] ?? '' ) );
	$last  = sanitize_text_field( wp_unslash( $_POST['last-name'] ?? '' ) );
	$email = sanitize_email( wp_unslash( $_POST['work-email'] ?? '' ) );
	$comp  = sanitize_text_field( wp_unslash( $_POST['company-name'] ?? '' ) );
	$role  = sanitize_text_field( wp_unslash( $_POST['describes-you'] ?? '' ) );
	$notes = sanitize_textarea_field( wp_unslash( $_POST['anything-else'] ?? '' ) );

	if ( empty( $first ) || empty( $last ) || empty( $email ) || empty( $comp ) ) {
		wp_safe_redirect( add_query_arg( 'flo_lead', 'missing', home_url( '/#contact' ) ) );
		exit;
	}

	flo_send_payload_to_google_sheet( array(
		'createdAt'    => gmdate( 'c' ),
		'firstName'    => $first,
		'lastName'     => $last,
		'workEmail'    => $email,
		'companyName'  => $comp,
		'describesYou' => $role,
		'anythingElse' => $notes,
		'locale'       => function_exists( 'flo_get_active_language' ) ? flo_get_active_language() : 'en',
		'country'      => function_exists( 'flo_detect_visitor_country' ) ? flo_detect_visitor_country() : 'US',
	) );

	wp_safe_redirect( add_query_arg( 'flo_lead', 'sent', home_url( '/#contact' ) ) );
	exit;
}
add_action( 'admin_post_nopriv_flo_submit_lead', 'flo_handle_fallback_lead_submit' );
add_action( 'admin_post_flo_submit_lead', 'flo_handle_fallback_lead_submit' );
