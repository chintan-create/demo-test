<?php
/**
 * Main template file (required by WordPress theme installer).
 * Renders the FLO homepage when on the front page, or standard post/page loop otherwise.
 *
 * @package FLO
 */

if ( is_front_page() || is_home() ) {
	include get_template_directory() . '/front-page.php';
	return;
}

get_header();
?>
<main id="main-content" class="container section-block" role="main">
	<?php
	if ( have_posts() ) :
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<h1 class="section-title-left"><?php the_title(); ?></h1>
				<div class="entry-content">
					<?php the_content(); ?>
				</div>
			</article>
			<?php
		endwhile;
	endif;
	?>
</main>
<?php
get_footer();
