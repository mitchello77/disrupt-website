<?php require_once('includes/header.inc'); ?>

<section class="graduate-single">
  <div class="container">

    <div class="wrapper">

      <div class="image">
        <div class="circle large">
          <div class="slider">
            <?php
              foreach (get_field('graduate_slider') as  $slide) {
                echo "<div class=\"slide\" style=\"background-image: url(".$slide['image']['url'].")\"></div>";
              }
            ?>
          </div> <!-- .slider -->
        </div> <!-- .circle -->

        <div class="profile circle medium" style="background-image: url(<?php echo get_the_post_thumbnail_url(); ?>);"></div> <!-- .profile -->
      </div> <!-- .image -->

      <div class="text">
        <?php

          foreach (get_terms() as $i => $term) {
            $terms .= ($i > 0 ? ', ' : '').$term->name;
          }

          echo "
            <span class=\"caption\">".$terms."</span>
            <h2>".get_the_title()."</h2>
            <p>".get_field('graduate_philosophy')."</p>
            <p>".get_field('graduate_description')."</p>
            ".(get_field('graduate_linkedin') ? "<a href=\"".get_field('graduate_linkedin')."\"><i class=\"fab fa-linkedin-in\"></i></a>" : false)."
            ".(get_field('graduate_instagram') ? "<a href=\"".get_field('graduate_instagram')."\"><i class=\"fab fa-instagram\"></i></a>" : false)."
            ".(get_field('graduate_behance') ? "<a href=\"".get_field('graduate_behance')."\"><i class=\"fab fa-behance\"></i></a>" : false)."
          ";

         ?>
      </div> <!-- .text -->
    </div> <!-- .wrapper -->

  </div> <!-- .container -->
</section> <!-- .graduate-single -->

<?php require_once('includes/footer.inc'); ?>
