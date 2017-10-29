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
var boxPositions = [-500, -250, -50];
var dotClass = 'collapsed'
var dotClassCutoff = -175
var zoomSpeed = 0.1 // 1 is 1:1 with scroll speed

var fadeoutThreshold = {
  min: 20,
  max: 100
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
    // $(this).find('.graduate-name').addClass('disrupt dsrpt-rgb-shift loop');
  }, function () {
    $(this).find('.graduate-name').addClass('hidden');
  })
}

$(document).ready(function() {
  moveCamera();
  showGraduateName();
})

/* SHOW NAME
  ------------------------------------------------------------------------------------------------- */

  function filterHoverEffects() {
    var graduatesFilter = $('.filter')

    graduateFilter.hover(function () {

    })
  }
