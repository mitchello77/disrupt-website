	<!-- WORDPRESS FOOTER -->
	<footer>
      <div class="socials">
        <a href="https://www.facebook.com/disrupt17/" class="icon-link facebook" target="_blank">
          <i class="fa fa-facebook" aria-hidden="true"></i>
        </a>
        <a href="https://www.instagram.com/disrupt17/" class="icon-link instagram" target="_blank">
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </a>
        <a class="icon-link snapchat" target="_blank">
          <i class="fa fa-snapchat-ghost" aria-hidden="true"></i>
        </a>
        <a href="https://github.com/kelvinoshea/disrupt-splash" class="icon-link github" target="_blank">
          <i class="fa fa-github" aria-hidden="true"></i>
        </a>
      </div>
    </footer>

  <div class="snapchatCodeContainer hidden">
    <i class="fa fa-times close"></i>
    <div class="modal centered scaleIn">
      <img class="snapchatCode" src="../images/snap-code.png" alt="image">
      <h1>ivddisrupt2017</h1>
      <p>Snap or screenshot to add</p>
    </div>
  </div>

	<?php
		wp_footer();

		if (ENVIRONMENT !== 'live') {
			echo "<script src=\"http://127.0.0.1:35729/livereload.js?snipver=1\"></script>";
		}
	?>
</body>
</html>
