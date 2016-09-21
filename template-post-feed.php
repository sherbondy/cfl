<?php
/*
Template Name: Post Feed
*/
/**
 * The template for displaying people pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the wordpress construct of pages
 * and that other 'pages' on your wordpress site will use a
 * different template.
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$templates = array( 'template-post-feed.twig', 'archive.twig' );

global $paged;
if (!isset($paged) || !$paged){
    $paged = 1;
}

$context = Timber::get_context();
$post = new TimberPost();

$context['post'] = $post;
$feed_category = get_field_objects($data["post"]->ID)['feed_category']['value'];

$args = array(
  'cat' => $feed_category,
  'posts_per_page' => 12,
  'paged' => $paged
);

query_posts($args);

$context['posts'] = Timber::get_posts();
$context['pagination'] = Timber::get_pagination();
$context['current_page'] = $paged;
Timber::render( $templates, $context );
