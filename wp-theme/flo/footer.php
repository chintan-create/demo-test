<?php
/**
 * FLO Footer template matching the design screenshot.
 *
 * @package FLO
 */

$current_lang = function_exists( 'flo_get_active_language' ) ? flo_get_active_language() : 'en';
$is_fr = ( 'fr' === $current_lang );
?>
<footer class="site-footer" role="contentinfo">
	<div class="container footer-inner">
		<div class="footer-top">
			<div>
				<div class="footer-brand"><?php echo esc_html( get_theme_mod( 'footer_brand', 'incubyte' ) ); ?></div>
				<p class="footer-tagline">
					<?php echo $is_fr ? 'Ingénierie logicielle pour la healthtech.' : esc_html( get_theme_mod( 'footer_tagline', 'Software engineering for US health tech.' ) ); ?>
				</p>
			</div>
			<div class="compliance-badges">
				<span class="soc2-badge">AICPA<br>SOC 2</span>
				<span class="baa-badge">BAA<br><small>compliant</small></span>
			</div>
		</div>

		<div class="footer-columns">
			<div>
				<h4><?php echo $is_fr ? 'NOS PROJETS' : 'OUR WORK'; ?></h4>
				<ul>
					<li><a href="#cases">Work (Index)</a></li>
					<li><a href="#cases">Spring Health</a></li>
					<li><a href="#cases">Kyruus</a></li>
					<li><a href="#cases">ComplianceX</a></li>
				</ul>
			</div>
			<div>
				<h4>SERVICES</h4>
				<ul>
					<li><a href="#services">AI Product Engineering</a></li>
					<li><a href="#services">AI Enablement</a></li>
					<li><a href="#services">AI Modernization</a></li>
				</ul>
			</div>
			<div>
				<h4>SOLUTIONS</h4>
				<ul>
					<li><a href="#cases">Orora (Conversation Intelligence)</a></li>
					<li><a href="#cases">Anthara (AI conduct layer)</a></li>
				</ul>
			</div>
			<div>
				<h4><?php echo $is_fr ? 'SECTEURS' : 'INDUSTRIES'; ?></h4>
				<ul>
					<li><a href="#verticals">Payer Tech</a></li>
					<li><a href="#verticals">Provider Tech</a></li>
					<li><a href="#verticals">Behavioral Health</a></li>
				</ul>
			</div>
			<div>
				<h4><?php echo $is_fr ? 'RESSOURCES' : 'RESOURCES'; ?></h4>
				<ul>
					<li><a href="#blog">Blog</a></li>
					<li><a href="#blog">Field Notes</a></li>
					<li><a href="#blog">Inspiration</a></li>
					<li><a href="#faq">AI learning resources</a></li>
				</ul>
			</div>
		</div>

		<div class="footer-about">
			<h4><?php echo $is_fr ? 'À PROPOS' : 'ABOUT US'; ?></h4>
			<ul>
				<li><a href="#team">Founders &amp; Team</a></li>
				<li><a href="#contact">Careers</a></li>
			</ul>
		</div>

		<div class="footer-bottom">
			<span>&copy; Copyright Flo 2026-2027.</span>
			<div class="footer-legal">
				<a href="#terms">TERMS</a>
				<a href="#privacy">PRIVACY</a>
			</div>
			<div class="footer-socials">
				<a href="#youtube" aria-label="YouTube">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>
				</a>
				<a href="#linkedin" aria-label="LinkedIn">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>
				</a>
			</div>
		</div>
	</div>
	<svg viewBox="0 0 1080 96" class="footer-botanical-art" preserveAspectRatio="none" aria-hidden="true">
		<path d="M 0 96 Q 90 12 180 96 T 360 96 T 540 96 T 720 96 T 900 96 T 1080 96" fill="none" stroke="#FAF6EC" stroke-width="1"/>
		<circle cx="270" cy="74" r="40" fill="none" stroke="#FAF6EC" stroke-width="1"/>
		<circle cx="810" cy="74" r="40" fill="none" stroke="#FAF6EC" stroke-width="1"/>
	</svg>
</footer>
<?php wp_footer(); ?>
</body>
</html>
