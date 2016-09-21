<?php
/*
Template Name: Origins Timeline
*/
/**
 * The template for displaying the origins timeline in chronlogical order.
 *
 */

$templates = array( 'page-origins.twig', 'archive.twig' );

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
  'posts_per_page' => 1000,
  'paged' => false,
  'orderby' => "date",
  'order' => 'ASC'
);

query_posts($args);

$posts = Timber::get_posts();

$posts_by_year = array();

foreach ($posts as $post) {
  $post_date = strtotime($post->post_date);
  $post_year = date('Y', $post_date);

  if (array_key_exists($post_year, $posts_by_year)) {
    array_push($posts_by_year[$post_year], $post);
  } else {
    $posts_by_year[$post_year] = array();
  }
}

$context['posts'] = $posts;
$context['posts_by_year'] = $posts_by_year;
$context['pagination'] = Timber::get_pagination();
$context['current_page'] = $paged;
Timber::render( $templates, $context );
