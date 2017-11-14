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
  offset: 0,
  target: 0
};
var graduateLayers = document.getElementsByClassName("graduate-group")
// var graduateCircle = document.getElementsByClassName("graduate")
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
  console.log(document.documentElement.scrollTop)
  scrollData.target = window.pageYOffset - scrollData.top
}

let limiter = 0
let limiterMax = 0
const isMac = (navigator.platform.toLowerCase().indexOf('mac') > -1)

// Limit performance if on battery power
try {
  navigator.getBattery().then(batteryManager => {
    if (batteryManager) {
      limiterMax = 1 * (!batteryManager.charging)
    }
  })
} catch (e) {
  console.warn('navigator.getBattery() not supported.')
}

function animateScroll() {
  updateScrollOffset()
  if (scrollData.offset !== scrollData.target) {
    if (isMac) {
      // Mac does auto inertial scrolling
      scrollData.offset = scrollData.target
    } else {
      // Fake inertial scrolling
      scrollData.offset += (scrollData.target - scrollData.offset) * 0.15
    }
  }
  if (limiter++ === limiterMax) {
    moveCamera()
    limiter = 0
  }
  window.requestAnimationFrame(animateScroll)
}
window.requestAnimationFrame(animateScroll)

function moveCamera() {
  let numLayers = graduateLayers.length;
  for (var i = 0; i < numLayers; i++) {
    var pos = boxPositions[i] + scrollData.offset * zoomSpeed;
    graduateLayers[i].style.transform = `translate3d(0, 0, ${pos}px)`;

    // Handle application of dot class
    if (pos > dotClassCutoff && graduateLayers[i].classList.contains(dotClass)) {
      graduateLayers[i].classList.remove(dotClass)
    } else if (pos <= dotClassCutoff && !graduateLayers[i].classList.contains(dotClass)) {
      graduateLayers[i].classList.add(dotClass)
    }

    // Handle fade out
    if (pos > fadeoutThreshold.min) {
      let pct = (pos - fadeoutThreshold.min) / (fadeoutThreshold.max - fadeoutThreshold.min)
      let blurMax = 20

      let blur = pct * blurMax
      let opacity = 1 - pct
      graduateLayers[i].style.opacity = opacity
      // graduateCircle[i].style.filter = `blur(${blur}px)`
      // graduateLayers[i].style.filter = `blur(${blur}px)`
    } else {
      // Catch-all effect reset
      graduateLayers[i].style.opacity = 1
      // graduateCircle[i].style.filter = 'none';
    }
  }
}

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

    $(this).scrollTop(0);

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
      window.DISRUPT.addDisruptions([document.querySelector('.disruptor-title')], false)
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
    handleFilters();

    // Only play this once!
    if (!localStorage.getItem('showedGraduatesIntro')) {
      playIntroduction();
      localStorage.setItem('showedGraduatesIntro', true)
    } else {
      $('.graduates-viewport').addClass('fadeIn')
    }
  })
