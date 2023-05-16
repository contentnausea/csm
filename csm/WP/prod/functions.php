<?php
function theme_enqueue_styles() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
	wp_enqueue_style( 'footer-style', get_stylesheet_directory_uri() . '/css/footer.css' );
	wp_enqueue_style( 'header-style', get_stylesheet_directory_uri() . '/css/header.css' );
	wp_enqueue_style( 'blog-style', get_stylesheet_directory_uri() . '/css/blog.css' );
	wp_enqueue_style( 'homepage-style', get_stylesheet_directory_uri() . '/css/home.css' );
	wp_enqueue_style( 'colors-style', get_stylesheet_directory_uri() . '/css/colors.css' ); 
}

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

//Shortcode to display modules in search tabs
function showmodule_shortcode($moduleid) {
extract(shortcode_atts(array('id' =>'*'),$moduleid)); 
return do_shortcode('[et_pb_section global_module="'.$id.'"][/et_pb_section]');
}
add_shortcode('showmodule', 'showmodule_shortcode');

?>