<?php
	include 'includes/common.inc';
	include 'includes/customTypes.inc';
	include 'includes/customFields.inc';



	// ADD THUMBNAIL SUPPORT
	add_theme_support('post-thumbnails');
	add_post_type_support( 'page', 'excerpt' );



	// ADD OPTIONS PAGE
	// acf_add_options_page();
	// acf_add_options_sub_page('General');
	// acf_add_options_sub_page('Global');


	// REGISTER MENUS
	function register_menus() {
		register_nav_menus([
			'primary-navigation' => __( 'Primary Navigation' ),
			'footer-links' => __( 'Footer Links' )
		]);
	}
	add_action('init', 'register_menus');



	// REMOVE MENU ITEMS FOR ALL USERS
	function remove_menus() {
		remove_menu_page('edit.php'); // Posts
		remove_menu_page('edit-comments.php'); // Comments
	}
	add_action('admin_menu', 'remove_menus');


	// REMOVE MENU ITEMS FOR CLIENT
	add_action('admin_menu', 'remove_admin_menu_links');
	function remove_admin_menu_links(){
		$user = wp_get_current_user();

		if ($user && isset($user->user_login) && $user->user_login !== 'admin') {
		  remove_menu_page('edit-comments.php');
		  remove_menu_page('themes.php');
		  remove_menu_page('plugins.php');
		  remove_menu_page('users.php');
		  remove_menu_page('tools.php');
		  remove_menu_page('edit.php?post_type=acf-field-group');
		  remove_menu_page('kiwi_social_sharing_settings');
		  remove_menu_page('wpseo_dashboard');
		}
	}

	remove_theme_support('genesis-admin-menu');


	// SHOW DEBUG FOR REMOVING MENU ITEMS (look at [2] for each in the array)
	// add_action( 'admin_init', 'wpse_136058_debug_admin_menu' );
	// function wpse_136058_debug_admin_menu() {
	// 	echo '<pre>' . print_r( $GLOBALS[ 'menu' ], TRUE) . '</pre>';
	// }



	// REMOVE CONTENT EDITOR FROM PAGES
	add_action('init', 'remove_content_editor');

	function remove_content_editor() {
		remove_post_type_support('page', 'editor');
	}



	// CONTENT WITH FORMATTING
	function get_the_content_with_formatting($more_link_text = '...', $stripteaser = 0, $more_file = '') {
		$content = get_the_content($more_link_text, $stripteaser, $more_file);
		$content = apply_filters('the_content', $content);
		$content = str_replace(']]>', ']]&gt;', $content);
		return $content;
	}



	// CUSTOM IMAGE SIZES
	add_image_size('banner', 1920);
?>
