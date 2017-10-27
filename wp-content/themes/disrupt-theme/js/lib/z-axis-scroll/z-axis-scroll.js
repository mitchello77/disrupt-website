var scrollPosition = document.documentElement.scrollTop,
    boxPositions = [-500, -250, -50];
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
