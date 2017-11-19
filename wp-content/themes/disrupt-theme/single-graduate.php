<?php require_once('includes/header.inc'); ?>

<section class="graduate-single">
  <div class="container">

    <div class="wrapper">

      <div class="image">
        <div class="circle large">
          <div class="slider">
            <?php
              if (get_field('graduate_slider')) {
                foreach (get_field('graduate_slider') as $slide) {
                  echo "<div class=\"slide\" style=\"background-image: url(".$slide['image']['url'].")\"></div>";
                }
              }
            ?>
          </div> <!-- .slider -->
        </div> <!-- .circle -->

        <div class="profile circle medium graduate disrupt dsrpt-blocks" style="background-image: url(<?php echo get_the_post_thumbnail_url(); ?>);"></div> <!-- .profile -->
      </div> <!-- .image -->

      <div class="text">
        <?php

          $term_list = wp_get_post_terms(get_the_ID(), 'expertise', array("fields" => "all"));
          if ($term_list) {
            foreach ($term_list as $i => $term) {
              $terms .= ($i > 0 ? ', ' : '').$term->name;
            }
          }

          echo "
            <span class=\"caption magenta\">".$terms."</span>
            <h2>".get_the_title()."</h2>
            <p>".get_field('graduate_description')."</p>
            <hr>
            <p>".get_field('graduate_philosophy')."</p>
            <div class=\"graduate-socials\">
              ".(get_field('graduate_website') ? "<a href=\"".get_field('graduate_website')."\"><i class=\"fal fa-globe icon\"></i></a>" : false)."
              ".(get_field('graduate_linkedin') ? "<a href=\"".get_field('graduate_linkedin')."\"><i class=\"fab fa-linkedin-in icon\"></i></a>" : false)."
              ".(get_field('graduate_instagram') ? "<a href=\"".get_field('graduate_instagram')."\"><i class=\"fab fa-instagram icon\"></i></a>" : false)."
              ".(get_field('graduate_behance') ? "<a href=\"".get_field('graduate_behance')."\"><i class=\"fab fa-behance icon\"></i></a>" : false)."
              ".(get_field('graduate_facebook') ? "<a href=\"".get_field('graduate_facebook')."\"><i class=\"fab fa-facebook-f icon\"></i></a>" : false)."
              ".(get_field('graduate_github') ? "<a href=\"".get_field('graduate_github')."\"><i class=\"fab fa-github icon\"></i></a>" : false)."
            </div>
          ";

         ?>
      </div> <!-- .text -->
    </div> <!-- .wrapper -->

  </div> <!-- .container -->
  <div class="graduate-navigation-container">
    <div class="graduate-navigation left">
      <div class="fal fa-long-arrow-left arrow-left"></div>
      <div class="nav-text"><?php echo previous_post_link( '%link', '%title' ) ?></div>
    </div>
    <div class="graduate-navigation right">
      <div class="nav-text"><?php echo next_post_link( '%link', '%title' ) ?></div>
      <div class="fal fa-long-arrow-right arrow-right"></div>
    </div>
  </div>
</section> <!-- .graduate-single -->

<?php require_once('includes/footer.inc'); ?>
