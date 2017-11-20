<?php require_once('includes/header.inc'); ?>

<?php
  // Function to turn a graduate_slider slide image into a base64 string
  // ALL IMAGES MUST BE .JPG FOR THE EFFECT TO WORK NICELY
  function create_base64_image ($url) {
    // Get base64 image
    $img = @file_get_contents($url);
    if ($img === FALSE) {
      // Return a 1px black GIF (fallback)
      return 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    }
    return 'data:image/jpg;base64,' . base64_encode($img);
  }

  // Create base64 image array
  $b64Images = "";
  foreach (get_field('graduate_slider') as $slide) {
    $url = $slide['image']['url'];
    $img = @file_get_contents($url);
    $dataUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    if ($img !== FALSE) {
      // Return a 1px black GIF (fallback)
      $dataUrl = 'data:image/jpg;base64,' . base64_encode($img);
    }
    $b64Images .= $dataUrl . ',';
  }
  rtrim($b64Images, ',');

  // Print JS to init slider
  echo '<script type="text/javascript">';
  echo '$(document).ready(function(){initGlitchSlideshow([' . $b64images . '])})';
  echo '</script>'
?>

<section class="graduate-single">
  <div class="container">

    <div class="wrapper">

      <div class="image">
        <div class="circle large">
          <div class="img-container"></div>
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
              // ".(get_field('graduate_instagram') ? "<a href=\"".get_field('graduate_instagram')."\"><i class=\"fab fa-instagram icon\"></i></a>" : false)."
              ".(get_field('graduate_behance') ? "<a href=\"".get_field('graduate_behance')."\"><i class=\"fab fa-behance icon\"></i></a>" : false)."
            </div>
          ";

         ?>
      </div> <!-- .text -->
    </div> <!-- .wrapper -->

  </div> <!-- .container -->
  <div class="graduate-navigation-container">
    <div class="graduate-navigation left">
      <div class="fal fa-long-arrow-left arrow-left"></div>
      <div class="nav-text">prev</div>
    </div>
    <div class="graduate-navigation right">
      <div class="nav-text">next</div>
      <div class="fal fa-long-arrow-right arrow-right"></div>
    </div>
  </div>
</section> <!-- .graduate-single -->

<?php require_once('includes/footer.inc'); ?>
