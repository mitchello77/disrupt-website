<?php
	/* DOMAIN CONFIG
	---------------------------------------------------------------------------------------------------- */
	$config_domains = [
		'localhost' => 'local',
		'disrupt.zacharymctague.com.au' => 'staging',
		'd1srup7.com' => 'live'
	];



	/* DATABASE CONFIG
	---------------------------------------------------------------------------------------------------- */
	$config_db = [
		'general' => [
			'DB_TABLE_PREFIX' => 'wp_',
			'DB_CHARSET' => 'utf8mb4',
			'DB_COLLATE' => ''
		],

		'local' => [
			'DB_HOST' => 'localhost',
			'DB_NAME' => 'disrupt_local',
			'DB_USER' => 'root',
			'DB_PASSWORD' => ''
		],

		// 'local' => [
		// 	'DB_HOST' => '45.125.247.27',
		// 	'DB_NAME' => 'zacharym_disrupt',
		// 	'DB_USER' => 'zacharym_disrupt_admin',
		// 	'DB_PASSWORD' => '9mGGEmDoMOiV'
		// ],

		'staging' => [
			'DB_HOST' => 'localhost',
			'DB_NAME' => 'disrupt_staging',
			'DB_USER' => 'root',
			'DB_PASSWORD' => ''
		],

		'live' => [
			'DB_HOST' => 'localhost',
			'DB_NAME' => 'disrupt_live',
			'DB_USER' => 'root',
			'DB_PASSWORD' => ''
		]
	];



	/* ALLOWED BROWSERS CONFIG (minimum allowed versions)
	---------------------------------------------------------------------------------------------------- */
	$config_browser = [
		'BROWSERS' => [
			'Internet Explorer' => 10,
			'Firefox' => 25,
			'Opera' => 12.1,
			'Safari' => 7,
			'Chrome' => 25
		]
	];



	/* WORDPRESS CONFIG
	---------------------------------------------------------------------------------------------------- */
	$config_wp = [
		'WP_DEBUG' => false,
		'AUTH_KEY' => 'TU2-jNhU#6Id4D,} |om4fcGq-35-+K|tckHS6~?T$.Ar$je+E3B@?TBIU~gtf.4',
		'SECURE_AUTH_KEY' => '&2>jX3XEpo6gcX,5-fn|aq=e?x2A)*-2ALjS(!%6hE&VlU| i R[^GE)Shr$LeUk',
		'LOGGED_IN_KEY' => ')h|s}>?qk&<uqS%++O1kEC`;;~s}*?u6[/H-D+3bF]tEOVTTy^MJZ~=Dn+,+R%Gi',
		'NONCE_KEY' => 'TLX: ,8xu*d$+urjRzT$`43O/Y6-{jhVa* c(psCru8PG!lk,LX,E-Oorb08H-@0',
		'AUTH_SALT' => 'CRcb,N?A${F55@2zs2OFJD8$kQCy.iWh1S]hg:h2=e8@^0|1DO$)Zvn-K_ZHASce',
		'SECURE_AUTH_SALT' => '6i:BjPU<1(I/>tqpH=@ZU[l|DP:9Y7w~LYBmpl|2g*a.gw=+-b.0!|whoa+G-Q#N',
		'LOGGED_IN_SALT' => ':1^u-!fsFKjh&[[0XLD{]Mj=GKgsI_a>|/CmDG`%5l~d-!td1Ucpg]Z1q(l?wIv9',
		'NONCE_SALT' => 'H!}(IJN79[S0`+Ni+7eHKLeh8L[Ok(J|s&sauy-Z29-<z7 VFJR|]+52427-@t7z'
	];



	/* SETUP PHP ENVIRONMENT
	---------------------------------------------------------------------------------------------------- */
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);



	/* DEFINE CONSTANTS AND INCLUDE SETTINGS
	---------------------------------------------------------------------------------------------------- */
	if (!isset($config_domains[$_SERVER['SERVER_NAME']])) {
		die("Database config could not be found for ".$_SERVER['SERVER_NAME']);
	}

	$config = array_merge($config_db['general'], $config_db[$config_domains[$_SERVER['SERVER_NAME']]], $config_browser, $config_wp);

	foreach ($config as $key => $value) {
		define($key, $value);
	}

	$table_prefix = DB_TABLE_PREFIX;
	require_once(ABSPATH.'wp-settings.php');
?>
