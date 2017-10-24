<?php
	/* CUSTOM POST TYPE
	---------------------------------------------------------------------------------------------------- */
  function register_news_type(){
    $singular_name = 'news';
    $plural_name = 'news';
    $labels = [
      'name'            => $plural_name,
      'singular_name'   => $singular_name,
      'add_new_item'    => 'Add New ' . $singular_name,
      'edit_item'       => 'Edit '    . $singular_name,
      'new_item'        => 'New '     . $singular_name,
      'view_item'       => 'View '    . $singular_name,
      'search_items'    => 'Search '  . $plural_name,
    ];
    $args = [
      'label' => "News",
      'public' => true,
      'publicly_queryable' => true,
      'has_archive' => false,
      'show_ui' => true,
      'show_in_menu' => true,
      'menu_icon' => 'dashicons-admin-post',
      'supports' => array('title', 'editor', 'thumbnail', 'page-attributes'),
      'rewrite' => array('slug' => 'news', 'with_front' => false),
    ];
    register_post_type('news', $args);
  }
  add_action('init', 'register_news_type');
?>
