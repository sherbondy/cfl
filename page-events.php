<?php
$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

query_posts($args);

Timber::render('page-events.twig', $context);
