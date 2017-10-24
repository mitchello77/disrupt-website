<?php
	/* CUSTOM FIELDS
	---------------------------------------------------------------------------------------------------- */
  function acf_general_options(){
    acf_add_local_field_group([
  		'key' => 'social_links',
    	'title' => 'Social Links',
    	'fields' => [
  			[
  				'key' => 'facebook_url',
  				'label' => 'Facebook',
  				'name' => 'facebook_url',
  				'type' => 'url'
  			],
  			[
  				'key' => 'instagram_url',
  				'label' => 'Instagram',
  				'name' => 'instagram_url',
  				'type' => 'url'
  			],
  			[
  				'key' => 'twitter_url',
  				'label' => 'Twitter',
  				'name' => 'twitter_url',
  				'type' => 'url'
  			]
  		],
      'location' => [
  			[
  				[
  					'param' => 'options_page',
  					'operator' => '==',
  					'value' => 'acf-options-general',
  				],
  			],
  		],
    	'menu_order' => 0,
    	'position' => 'normal',
    	'instruction_placement' => 'label',
    ]);
  }
  add_action('acf/init', 'acf_general_options');
?>
