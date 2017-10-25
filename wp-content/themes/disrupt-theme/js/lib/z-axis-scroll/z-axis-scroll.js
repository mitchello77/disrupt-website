// document.onload = function(){
//     var scrollPosition = document.body.scrollTop,
//             boxPositions = [-500, -25];
//         function scrollDelta() {
//           var newScrollPosition = document.body.scrollTop,
//               delta = newScrollPosition - scrollPosition;
//           scrollPosition = document.body.scrollTop;
//           return delta;
//         }
//         function moveCamera() {
//           var graduates = document.getElementsByClassName("frame"),
//               delta = scrollDelta();
//           for (var i=0,l=graduates.length;i<l;i++) {
//             graduatesPositions[i] += parseInt(delta);
//             graduates[i].style["transform"] = "translateZ("+graduatesPositions[i]+"px)";
//           }
//         }
//         window.addEventListener("scroll", moveCamera, false);
// };


document.onload = function(){
var lastPos = document.documentElement.scrollTop,
    perspective = 300,
    zSpacing = -1000;
    zVals = [],
    $frames = $(".frame"),
    frames = $frames.toArray();
    numFrames = $frames.length;

for(var i=0; i<numFrames;i++) { zVals.push((numFrames-i)*zSpacing);}

$(window).scroll(function(d,e) {
  var top = document.documentElement.scrollTop,
      delta = lastPos - top;
  lastPos = top;
  for(var i=0;i<numFrames;i++){
    var newZVal = (zVals[i]+=(delta*-1.5)),
        frame = frames[i],
        transform = "translateZ("+newZVal+"px)",
        opacity = newZVal < 200 ? 1 : 1 - parseInt((newZVal-200)/(perspective-200)*10)/10,
        display = newZVal > perspective ? "none" : "block";
    frame.setAttribute("style",
      "transform:"+transform+";display:"+display+";opacity:"+opacity);
    if(scrollMsg && zVals[numFrames-1] > 200) {
      scrollMsg.parentNode.removeChild(scrollMsg);
      scrollMsg = null;
    }
  }
});
];
