<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
} else {

}


Timber::$dirname = array('templates', 'views');

date_default_timezone_set('America/New_York');
class StarterSite extends TimberSite {


	function register_post_types() {
		//this is where you can register custom post types
		register_post_type( 'events', array(
			'labels' => array(
				'name' => __( 'Events' ) ,
				'singular_name' => __( 'Event' ) ,
				'edit_item' => __( 'Edit Event' )
			) ,
			'with_front' => false,
			'menu_position' => 13,
			'public' => true,
			'has_archive' => true,
			'supports' => array(
				'title',
				'revisions',
			) ,
			'rewrite' => array(
				'slug' => 'event'
			),
			'menu_icon' => 'dashicons-calendar-alt'
		) );
	}

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		// add_filter( 'the_content', array( $this, 'filter_ptags_on_images') );
		add_filter('the_content', array( $this, 'filter_ptags_on_images') );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'pre_get_posts', function ( $query ) {
		    if ( $query->is_main_query() && !is_admin() && is_archive()) {
		        $query->set( 'posts_per_page', 12 );
		    }
		} );
		parent::__construct();
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}
	function filter_ptags_on_images($content){
    return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
	}
	function add_to_context( $context ) {
		$context['locations'] = wp_remote_get( 'https://menu.cloverfoodlab.com/api/locations' );
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::get_context();';
		$context['nav_more'] = new TimberMenu('Nav More');
		$context['site'] = $this;
		$today = date('Ymd');
		$context['today'] = $today;
		$context['today_alt'] = date("D M j G:i:s T Y");
		$args = array(
				'post_type'	=> 'events',
				'posts_per_page'	=> -1,
				'meta_key'	=> 'info_date',
				'compare' => '>=',
				'value' => '20160820',

				'meta_query' => array(
			    array(
		        'key' => 'info_date',
		        'value' => $today,
		        'compare' => '>='
			    )
				),
				'orderby'	=> 'meta_value_num',
				'order'		=> 'ASC'
		);
		$context['events'] = Timber::get_posts($args);
		setup_postdata( $events );
		return $context;
	}


	function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own fuctions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}

}

new StarterSite();
