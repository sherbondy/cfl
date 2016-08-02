<?php
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

$args = array(
    'post_type' => 'events',
);

query_posts($args);

$context['events'] = Timber::get_posts($args);

Timber::render('page-events.twig', $context);
