<?php require_once('includes/header.inc'); ?>

<section class="graduate-single">
  <div class="container">

    <div class="wrapper">
      <div
      class="profile circle small"
      style="background-image: url(<?php echo get_the_post_thumbnail_url(); ?>);"
      ></div>

      <div class="slider circle large">
        <div class="slide"></div>
        <div class="slide"></div>
        <div class="slide"></div>
      </div> <!-- .slider -->

      <div class="text">
        <?php

          echo "
            <span class=\"caption\">Interaction Designer</span>
            <h2>".get_the_title()."</h2>
            <p>".get_field('graduate_philosophy')."</p>
            <p>".get_field('graduate_description')."</p>
          ";

         ?>
      </div> <!-- .text -->
    </div> <!-- .wrapper -->

  </div> <!-- .container -->
</section> <!-- .graduate-single -->

<?php require_once('includes/footer.inc'); ?>
