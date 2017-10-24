<?php require_once('includes/header.inc'); ?>

<section class="graduate-single">
  <div class="container">

    <div class="wrapper">

      <div class="image">
        <div
        class="profile circle medium"
        style="background-image: url(<?php echo get_the_post_thumbnail_url(); ?>);"
        ></div>

        <div class="slider circle large">
          <?php
            foreach (get_field('graduate_slider') as  $slide) {
              echo "<div class=\"slide\" style=\"background-image: url(".$slide['image'].")\"></div>";
            }
          ?>
        </div> <!-- .slider -->
      </div>

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
          ";

         ?>
      </div> <!-- .text -->
    </div> <!-- .wrapper -->

  </div> <!-- .container -->
</section> <!-- .graduate-single -->

<?php require_once('includes/footer.inc'); ?>
