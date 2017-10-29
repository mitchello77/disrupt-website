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
var scrollPosition = document.documentElement.scrollTop,
    boxPositions = [-750, -500, -250, -50];
function scrollDelta() {
  var newScrollPosition = document.documentElement.scrollTop,
      delta = newScrollPosition - scrollPosition;
  scrollPosition = document.documentElement.scrollTop;
  return delta;
}
function moveCamera() {
  var boxes = document.getElementsByClassName("graduate-group"),
      delta = scrollDelta();
  for (var i=0,l=boxes.length;i<l;i++) {
    boxPositions[i] += parseInt(delta);
    boxes[i].style["transform"] = "translateZ("+boxPositions[i]+"px)";
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

$(document).ready(function() {
  showGraduateName();
})
