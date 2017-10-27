	<!-- WORDPRESS FOOTER -->
	<footer>
      <div class="socials">
        <a href="https://www.facebook.com/disrupt17/" class="icon-link facebook" target="_blank">
          <i class="fab fa-facebook-f" data-fa-transform="grow-6"></i>
        </a>
        <a href="https://www.instagram.com/disrupt17/" class="icon-link instagram" target="_blank">
          <i class="fab fa-instagram" data-fa-transform="grow-6"></i>
        </a>
        <a class="icon-link snapchat" target="_blank">
          <i class="fab fa-snapchat-ghost" data-fa-transform="grow-6"></i>
        </a>
        <a href="https://github.com/zacharymctague/disrupt-website" class="icon-link github" target="_blank">
          <i class="fab fa-github" data-fa-transform="grow-6"></i>
        </a>
        <a href="https://github.com/zacharymctague/disrupt-website" class="icon-link no-walls" target="_blank">
          <span class="no-walls"></span>
        </a>
      </div>
    </footer>

  </main>

  <div class="snapchatCodeContainer hidden">
    <i class="fa fa-times close" data-fa-transform="grow-6"></i>
    <div class="modal centered scaleIn">
      <img class="snapchatCode" src="<?php echo THEME_URL ?>img/snap-code.png" alt="image">
      <h1>ivddisrupt2017</h1>
      <p>Snap or screenshot to add</p>
    </div>
  </div>

  <div class="blur-overlay"></div>

	<?php
		wp_footer();

		if (ENVIRONMENT !== 'live') {
			echo "<script src=\"http://127.0.0.1:35729/livereload.js?snipver=1\"></script>";
		}
	?>
</body>
</html>
