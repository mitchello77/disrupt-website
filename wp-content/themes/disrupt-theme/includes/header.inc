<!DOCTYPE html>
<html>
<head>
	<!-- GENERIC META -->
	<meta http-equiv='X-UA-Compatible' content='IE=edge'>
	<meta http-equiv='content-type' content='text/html; charset=utf-8'>
	<meta name='viewport' content='width=device-width, initial-scale=1.0, minimal-ui, user-scalable=0'>
	<?php
		if (ENVIRONMENT !== 'live') {
			echo "<meta name='robots' content='noindex, nofollow'>";			
		}
	?>


	<!-- GENERIC FONTS -->
	<link rel='stylesheet' type='text/css' href='https://fonts.googleapis.com/css?family=Lato:300,300italic,400,400italic,700,700italic'>


	<!-- GENERIC CSS -->
	<link type='text/css' rel='stylesheet' href='<?php echo THEME_URL; ?>js/lib/slick/slick.css'>
	<link type='text/css' rel='stylesheet' href='<?php echo THEME_URL; ?>css/style.css'>


	<!-- GENERIC JS -->
	<script type='text/javascript'>
		var THEME_URL = "<?php echo THEME_URL; ?>";
		var ROOT_URL = "<?php echo ROOT_URL; ?>";
	</script>

	<script src="https://use.typekit.net/nlt7cfp.js"></script>
	<script>try{Typekit.load({ async: true });}catch(e){}</script>

	<script type='text/javascript' src='<?php echo THEME_URL; ?>js/lib/jquery/jquery-3.2.1.min.js'></script>
	<script type='text/javascript' src='<?php echo THEME_URL; ?>js/lib/jquery/jquery.easing.min.js'></script>
	<script type='text/javascript' src='<?php echo THEME_URL; ?>js/lib/jquery/jquery.mobile.custom.min.js'></script>
	<script type='text/javascript' src='<?php echo THEME_URL; ?>js/lib/jquery/jquery.mobile.swipeupdown.min.js'></script>
	<script type='text/javascript' src='<?php echo THEME_URL; ?>js/lib/retina/retina.min.js'></script>
	<script type='text/javascript' src='<?php echo THEME_URL; ?>js/lib/slick/slick.min.js'></script>
	<script type='text/javascript' src='<?php echo THEME_URL; ?>js/lib/fontawesome/everything.min.js'></script>
	<script type='text/javascript' src='<?php echo THEME_URL; ?>js/generic.min.js'></script>



	<!-- FAVICON -->
	<link rel='shortcut icon' type='image/png' href='<?php echo THEME_URL; ?>img/favicon/favicon.ico'>
	<link rel='apple-touch-icon-precomposed' sizes='57x57' href='<?php echo THEME_URL; ?>img/favicon/apple-touch-icon-57x57.png'>
	<link rel='apple-touch-icon-precomposed' sizes='114x114' href='<?php echo THEME_URL; ?>img/favicon/apple-touch-icon-114x114.png'>
	<link rel='apple-touch-icon-precomposed' sizes='72x72' href='<?php echo THEME_URL; ?>img/favicon/apple-touch-icon-72x72.png'>
	<link rel='apple-touch-icon-precomposed' sizes='144x144' href='<?php echo THEME_URL; ?>img/favicon/apple-touch-icon-144x144.png'>
	<link rel='apple-touch-icon-precomposed' sizes='60x60' href='<?php echo THEME_URL; ?>img/favicon/apple-touch-icon-60x60.png'>
	<link rel='apple-touch-icon-precomposed' sizes='120x120' href='<?php echo THEME_URL; ?>img/favicon/apple-touch-icon-120x120.png'>
	<link rel='apple-touch-icon-precomposed' sizes='76x76' href='<?php echo THEME_URL; ?>img/favicon/apple-touch-icon-76x76.png'>
	<link rel='apple-touch-icon-precomposed' sizes='152x152' href='<?php echo THEME_URL; ?>img/favicon/apple-touch-icon-152x152.png'>
	<link rel='icon' type='image/png' href='<?php echo THEME_URL; ?>img/favicon/favicon-196x196.png' sizes='196x196'>
	<link rel='icon' type='image/png' href='<?php echo THEME_URL; ?>img/favicon/favicon-96x96.png' sizes='96x96'>
	<link rel='icon' type='image/png' href='<?php echo THEME_URL; ?>img/favicon/favicon-32x32.png' sizes='32x32'>
	<link rel='icon' type='image/png' href='<?php echo THEME_URL; ?>img/favicon/favicon-16x16.png' sizes='16x16'>
	<link rel='icon' type='image/png' href='<?php echo THEME_URL; ?>img/favicon/favicon-128.png' sizes='128x128'>



	<!-- WORDPRESS HEADER -->
	<?php wp_head(); ?>



	<!-- PAGE SPECIFIC -->
