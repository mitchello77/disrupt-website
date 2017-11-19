<?php require_once('includes/header.inc'); ?>

<section>
  <div class="graduates-introduction">
    <h3 class="we-are disrupt dsrpt-horizontal">We are</h3>
    <div class="intro-title-container">
      <div class="graduates-title intro-title">
        <span>g</span>
        <span>r</span>
        <span>a</span>
        <span>d</span>
        <span>u</span>
        <span>a</span>
        <span>t</span>
        <span>e</span>
        <span>s</span>
      </div>
      <div class="disruptor-title intro-title hidden disrupt dsrpt-rgb-shift loop">
        <span>d</span>
        <span>i</span>
        <span>s</span>
        <span>r</span>
        <span>u</span>
        <span>p</span>
        <span>t</span>
        <span>o</span>
        <span>r</span>
        <span>s</span>
      </div>
    </div>
  </div>

  <div class="scroll-prompt hidden">
    <p>Scroll to explore graduates</p>
    <i class="fal fa-long-arrow-down down-arrow" data-fa-transform="grow-4"></i>
  </div>

  <div class="filters">
    <ul>
      <?php
        $taxonomies = get_object_taxonomies( (object) array( 'post_type' => 'graduate' ) );

        foreach( $taxonomies as $taxonomy ) {
           $terms = get_terms( $taxonomy );

           foreach( $terms as $i => $term ) {
             echo "<li ".($i == 0 ? "class=\"selected\"" : false).">".$term->name."</li>";
           }
         }
      ?>
    </ul>
  </div>
  <div class="graduates-viewport">
    <?php
      foreach( $taxonomies as $taxonomy ) {

         foreach( $terms as $term ) {

          echo "<div class=\"graduate-group\">";

          $query = new WP_Query([
            'post_type' => 'graduate',
            'taxonomy' => $taxonomy,
            'term' => $term->slug
          ]);

          if ( $query->have_posts() ) {
            $i = 0;

            echo "<div class=\"row\">";

            while ( $query->have_posts() ) {
              $query->the_post();

                echo "
                  <div
                    class=\"circle graduate background-image medium\"
                    style=\"background-image: url(".get_the_post_thumbnail_url().");\"
                    onclick=\"window.location.href = '".get_the_permalink()."'\"
                  >
                    <div class=\"graduate-name hidden\">
                      <h3>".get_the_title()."</h3>
                    </div>
                  </div>
                ";


              $i++;
            }

            echo "</div>";
          }

          echo "</div>";

         }
      }
     ?>
   </div> <!-- .graduate-viewport -->


  </div>
</section>

<?php require_once('includes/footer.inc'); ?>
