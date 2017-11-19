<?php
	/* CUSTOM FIELDS
	---------------------------------------------------------------------------------------------------- */
  function acf_graduate_options() {
    acf_add_local_field_group([
  		'key' => 'graduate_details',
    	'title' => 'Graduate Details',
    	'fields' => [
  			[
  				'key' => 'graduate_philosophy',
  				'label' => 'Design Philosophy',
  				'name' => 'graduate_philosophy',
  				'type' => 'textarea'
  			],
        [
          'key' => 'graduate_website',
          'label' => 'Personal Website',
          'name' => 'graduate_website',
          'type' => 'url',
          'wrapper' => [
            'width' => '50%'
          ]
        ],
  			[
  				'key' => 'graduate_instagram',
  				'label' => 'Instagram',
  				'name' => 'graduate_instagram',
  				'type' => 'url',
          'wrapper' => [
            'width' => '50%'
          ]
  			],
  			[
  				'key' => 'graduate_behance',
  				'label' => 'Behance',
  				'name' => 'graduate_behance',
  				'type' => 'url',
          'wrapper' => [
            'width' => '50%'
          ]
  			],
  			[
  				'key' => 'graduate_linkedin',
  				'label' => 'LinkedIn',
  				'name' => 'graduate_linkedin',
  				'type' => 'url',
          'wrapper' => [
            'width' => '50%'
          ]
  			],
        [
  				'key' => 'graduate_facebook',
  				'label' => 'Facebook',
  				'name' => 'graduate_facebook',
  				'type' => 'url',
          'wrapper' => [
            'width' => '50%'
          ]
  			],
        [
  				'key' => 'graduate_github',
  				'label' => 'Github',
  				'name' => 'graduate_github',
  				'type' => 'url',
          'wrapper' => [
            'width' => '50%'
          ]
  			],
  			[
  				'key' => 'graduate_description',
  				'label' => 'Exhibit Piece Description',
  				'name' => 'graduate_description',
  				'type' => 'textarea',
  			],
  			[
  				'key' => 'graduate_slider',
  				'label' => 'Exhibition Image Slider',
  				'name' => 'graduate_slider',
  				'type' => 'repeater',
          'sub_fields' => [
            [
              'key' => 'image',
              'label' => 'Image',
              'name' => 'image',
              'type' => 'image',
            ]
          ]
  			],
  		],
      'location' => [
  			[
  				[
  					'param' => 'post_type',
  					'operator' => '==',
  					'value' => 'graduate',
  				],
  			],
  		],
    	'menu_order' => 0,
    	'position' => 'normal',
    	'instruction_placement' => 'label',
    ]);
  }
  add_action('acf/init', 'acf_graduate_options');
?>
