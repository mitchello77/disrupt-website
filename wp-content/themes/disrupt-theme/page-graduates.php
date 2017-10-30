<?php require_once('includes/header.inc'); ?>

<section>
  <div class="filters">
    <ul>
      <?php
      $taxonomies = get_object_taxonomies( (object) array( 'post_type' => 'graduate' ) );

      foreach( $taxonomies as $taxonomy ) {
         $terms = get_terms( $taxonomy );

         foreach( $terms as $term ) {
           echo "<li>".$term->name."</li>";
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
            while ( $query->have_posts() ) {
              $query->the_post();

              if ($i == 0 || $i == 5) {
                if ($i == 5) {
                  echo "</div>";
                }

                echo "<div class=\"row\">";
              }

              echo "
                <div
                  class=\"circle graduate background-image medium\"
                  style=\"background-image: url(".get_the_post_thumbnail_url().");\"
                  onclick=\"window.open('".ROOT_URL."graduates/anna-sachs')\"
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
