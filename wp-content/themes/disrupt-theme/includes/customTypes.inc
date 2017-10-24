<?php
	/* CUSTOM POST TYPE
	---------------------------------------------------------------------------------------------------- */
  function register_graduate_type() {
    $singular_name = 'graduate';
    $plural_name = 'graduates';
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
      'label' => "Graduates",
      'public' => true,
      'publicly_queryable' => true,
      'has_archive' => false,
      'show_ui' => true,
      'show_in_menu' => true,
      'menu_icon' => 'dashicons-groups',
      'supports' => array('title', 'thumbnail', 'page-attributes'),
      'rewrite' => array('slug' => 'graduates', 'with_front' => false),
    ];
    register_post_type('graduate', $args);
  }
  add_action('init', 'register_graduate_type');

  function register_taxonomy_graduate() {
		register_taxonomy(
			'expertise',
			'graduate',
			[
        'hierarchical' => true,
				'label' => 'Expertise',
			],
      [
        'rewrite' => [
          'slug' => 'experitse'
        ]
      ]
		);
	}
	add_action( 'init', 'register_taxonomy_graduate' );
?>
