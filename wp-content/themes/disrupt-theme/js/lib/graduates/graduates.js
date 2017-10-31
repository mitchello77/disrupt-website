// /* MOUSE INTERACTIONS
// ------------------------------------------------------------------------------------------------------------------------ */
//
// var horizon = 0,
// 		vertical = 0,
// 		mouseX,
// 		mouseY,
// 		range = 1;
//
// function gradsFollowMouse() {
// 	horizon = ((range * 2) * (mouseX / $(document).width())) - range;
// 	vertical = -(((range * 2) * (mouseY / $(window).height())) - range);
// 	$(".third").css("transform", "rotateX(" + vertical + "deg) rotateY(" + horizon + "deg)");
// }
//
// function resetSplash() {
// 	$(".third").css("transform", "rotateX(0deg) rotateY(0deg)");
// }
//
// $(document).on('mousemove.page-graduates', throttle(function (e) {
// 	mouseX = e.pageX;
// 	mouseY = e.pageY;
// 	gradsFollowMouse();
// }, 25));
//
// /* THROTTLE
//   ------------------------------------------------------------------------------------------------- */
//   function throttle(fn, threshhold, scope) {
//       threshhold || (threshhold = 250);
//       var last,
//           deferTimer;
//       return function() {
//           var context = scope || this;
//
//           var now = +new Date,
//               args = arguments;
//           if (last && now < last + threshhold) {
//               // hold on to it
//               clearTimeout(deferTimer);
//               deferTimer = setTimeout(function() {
//                   last = now;
//                   fn.apply(context, args);
//               }, threshhold);
//           } else {
//               last = now;
//               fn.apply(context, args);
//           }
//       };
//     }

/* Z AXIS SCROLL
  ------------------------------------------------------------------------------------------------- */
var scrollData = {
  top: document.documentElement.scrollTop,
  offset: 0
};
var boxPositions = [-50];
var dotClass = 'collapsed'
var dotClassCutoff = -175
var zoomSpeed = 0.1 // 1 is 1:1 with scroll speed

var fadeoutThreshold = {
  min: 20,
  max: 100
}

function setBoxPositions() {
  var previous = 0;

  $('.filters li').each(function(index) {
    previous -= 250;
    boxPositions.push(previous);
  });
}

function setFilterMovement() {
  $(".filters li").each(function(index){
    $(this).on('click', function() {
      $('html, body').animate({
        scrollTop: Math.abs(boxPositions[index] + 50) / .1
      }, 200);
    });
  });
}

function updateScrollOffset() {
  scrollData.offset = document.documentElement.scrollTop - scrollData.top;
}

function moveCamera() {
  updateScrollOffset()
  var boxes = document.getElementsByClassName("graduate-group");
  let numBoxes = boxes.length;
  for (var i = 0; i < numBoxes; i++) {
    var pos = boxPositions[i] + scrollData.offset * zoomSpeed;
    boxes[i].style.transform = `translate3d(0, 0, ${pos}px)`;

    // Handle application of dot class
    if (pos > dotClassCutoff && boxes[i].classList.contains(dotClass)) {
      boxes[i].classList.remove(dotClass)
    } else if (pos <= dotClassCutoff && !boxes[i].classList.contains(dotClass)) {
      boxes[i].classList.add(dotClass)
    }

    // Handle fade out
    if (pos > fadeoutThreshold.min) {
      let pct = (pos - fadeoutThreshold.min) / (fadeoutThreshold.max - fadeoutThreshold.min)
      let blurMax = 20

      let blur = pct * blurMax
      let opacity = 1 - pct
      boxes[i].style.opacity = opacity
      boxes[i].style.filter = `blur(${blur}px)`
    } else {
      // Catch-all effect reset
      boxes[i].style.opacity = 1
      boxes[i].style.filter = 'none';
    }
  }
}

window.addEventListener("scroll", moveCamera, false);

/* SHOW NAME
  ------------------------------------------------------------------------------------------------- */
function showGraduateName() {
  var graduate = $('.graduate')

  graduate.hover(function () {
    $(this).find('.graduate-name').removeClass('hidden');
  }, function () {
    $(this).find('.graduate-name').addClass('hidden');
  })
}



/* SHOW NAME
  ------------------------------------------------------------------------------------------------- */

function filterHoverEffects() {
  var selectedGraduate = $('.graduate')

  selectedGraduate.hover(function () {
    $(this).parents('.graduate-group').find('.graduate').not(this).toggleClass('dull')
  })
};

/* move the ghraduate container
  ------------------------------------------------------------------------------------------------- */
// function mouseMoveGradName() {
//   var movementStrength = 10;
//   var height = movementStrength / $('.graduate').height();
//   var width = movementStrength / $('.graduate').width();
//
//   $(".graduate").mousemove(function(e){
//     var pageX = e.pageX - ($(this).width() / 2);
//     var pageY = e.pageY - ($(this).height() / 2);
//     var newvalueX = width * pageX * -1 + 25;
//     var newvalueY = height * pageY * -1 + 100;
//
//     $(this).children().css({
//       transform: `translate(${newvalueX}px, ${newvalueY}px)`
//     });
//   });
//   };

// handle filters

function handleFilters() {
  $(window).scroll(function() {

    var scrollPos = $(window).scrollTop();

    $('.filters li').each(function(index){
      if (scrollPos >= Math.abs(boxPositions[index] + 50) / .1 && scrollPos > Math.abs(boxPositions[index - 1] + 50) / .1) {
        $('.filters li').removeClass('selected');
        $('.filters li').eq(index).addClass('selected');
      }
    });

  });
}

// graduates cinematic intro

function playIntroduction() {

    var titleContainer = $('.graduates-introduction')
    var weAre = $('.we-are')
    var disruptorTitle = $('.disruptor-title')
    var graduatesTitle = $('.graduates-title')
    var scrollPrompt = $('.scroll-prompt')
    var filters = $('.filters')
    var graduates = $('.graduates-viewport')

    setTimeout(function() {
      weAre.addClass('fadeIn')
    }, 750)
    setTimeout(function() {
      graduatesTitle.addClass('fadeIn')
    }, 1000)
    setTimeout(function() {
      graduatesTitle.addClass('fadeOut')
    }, 4000)
    setTimeout(function() {
      graduatesTitle.addClass('hidden')
      disruptorTitle.removeClass('hidden')
      disruptorTitle.addClass('fadeIn')
    }, 5000)
    setTimeout(function() {
      titleContainer.addClass('fadeOut')
    }, 9000)
    setTimeout(function() {
      filters.addClass('fadeIn')
      graduates.addClass('fadeIn')
    }, 9500)
    setTimeout(function() {
      scrollPrompt.removeClass('hidden')

      window.onscroll = function (e) {
        scrollPrompt.addClass('fadeOut')
  }

    }, 10000)

}


  /* call all the functions
    ------------------------------------------------------------------------------------------------- */
  $(document).ready(function() {
    setBoxPositions();
    setFilterMovement();
    moveCamera();
    showGraduateName();
    filterHoverEffects();
    // mouseMoveGradName();
    playIntroduction();
    handleFilters();
  })
