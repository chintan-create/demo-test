<?php
/**
 * Standard WordPress Page template.
 *
 * @package FLO
 */

get_header();
?>
<main id="main-content" class="container section-block" role="main">
	<?php
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
	?>
</main>
<?php
get_footer();
