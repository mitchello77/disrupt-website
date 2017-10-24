<?php
	// START SESSIOIN
	session_start();



	// DEFINE CONSTANTS
	define('ROOT_URL', str_replace('\\', '/', get_site_url().'/'));
	define('THEME_URL', str_replace('\\', '/', get_template_directory_uri().'/'));
	define('THEME_DIR', wp_normalize_path(get_template_directory().'/'));
	define('ENVIRONMENT', $config_domains[$_SERVER['SERVER_NAME']]);



	// BROWSER DETECTION
	// unset($_SESSION['BROWSER_OK']);
	if (!isset($_SESSION['BROWSER_OK'])) {
		require_once('browserDetect.inc');

		$ua = new BrowserDetection();
		$ua = [
			'browser' => $ua->getName(),
			'version' => $ua->getVersion()
		];

		if ($ua['version'] !== '?') {
			if ($ua['browser'] && $ua['version'] > 0 && $config_browser['BROWSERS'][$ua['browser']] && $config_browser['BROWSERS'][$ua['browser']] > $ua['version']) {
				$_SESSION['BROWSER_OK'] = false;
				require_once(THEME_DIR.'/update.inc');
				exit;
			}
		}

		$_SESSION['BROWSER_OK'] = true;
	}
	else if ($_SESSION['BROWSER_OK'] === false) {
		require_once(THEME_DIR.'/update.inc');
		exit;
	}



	// COMPONENTS
	function component($component = '', $config = [], $row = []) {
		$config_general_default = [
			'class' => false,
			'id' => false
		];

		if (file_exists(THEME_DIR . 'components/'.$component.'/config.inc')) {
			include(THEME_DIR . 'components/'.$component.'/config.inc');

			// Merge Global Default and Layout Specific Default
			$config_default = array_merge($config_general_default, $config_default);

			if (isset($config) && $config !== false) {
				// Merge defaults with parsed variables
				$config = array_merge($config_default, $config );
			}
			else if (isset($row)) {
				// Merge defaults with filtered ACF config
				$config = array_merge($config_default, array_filter($row));
			}
		}
		else {
			$config = $config_general_default;
		}

		if (file_exists(THEME_DIR . 'components/'.$component.'/index.inc')) {
			include(THEME_DIR . 'components/'.$component.'/index.inc');
		}
	}
?>
