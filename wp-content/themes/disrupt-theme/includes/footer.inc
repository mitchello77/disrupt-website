	<!-- WORDPRESS FOOTER -->
	<?php
		wp_footer();

		if (ENVIRONMENT !== 'live') {
			echo "<script src=\"http://127.0.0.1:35729/livereload.js?snipver=1\"></script>";
		}
	?>
</body>
</html>
