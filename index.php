<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

if ( ! class_exists( 'Timber' ) ) {
  echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
  return;
}
$context = Timber::get_context();
$context['posts'] = Timber::get_posts();
$context['foo'] = 'bar';

$request  = wp_remote_get( 'https://menu.cloverfoodlab.com/api/locations' );
$response = wp_remote_retrieve_body( $request );

// if (
//     'OK' !== wp_remote_retrieve_response_message( $response )
//     OR 200 !== wp_remote_retrieve_response_code( $response )
// )

// wp_send_json_error( $response );

// $test['data'] = wp_send_json_success( $response );

// $test['data'] = wp_send_json_success( $response );

// $test['data'] = $response;

$context['apiResponse'] = $response;

$templates = array( 'index.twig' );

if ( is_home() ) {
  array_unshift( $templates, 'home.twig' );
}
Timber::render( $templates, $context);
