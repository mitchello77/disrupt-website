var scrollPosition = document.body.scrollTop,
        boxPositions = [-100, -50, 0];
    function scrollDelta() {
      var newScrollPosition = document.body.scrollTop,
          delta = newScrollPosition - scrollPosition;
      scrollPosition = document.body.scrollTop;
      return delta;
    }
    function moveCamera() {
      var graduates = document.getElementsByClassName("graduates-group"),
          delta = scrollDelta();
      for (var i=0,l=graduates.length;i<l;i++) {
        graduatesPositions[i] += parseInt(delta);
        graduates[i].style["transform"] = "translateZ("+graduatesPositions[i]+"px)";
      }
    }
    window.addEventListener("scroll", moveCamera, false);
