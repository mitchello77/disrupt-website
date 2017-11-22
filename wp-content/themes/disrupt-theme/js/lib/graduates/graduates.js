/* Z AXIS SCROLL
  ------------------------------------------------------------------------------------------------- */

const scrollZoomStart = 100000
var scrollData = {
  top: scrollZoomStart,
  offset: 0,
  target: 0
};
var graduateLayers = document.getElementsByClassName("graduate-group")
// var graduateCircle = document.getElementsByClassName("graduate")
var boxPositions = [-50];
var dotClass = 'collapsed'
var dotClassCutoff = -175
var zoomSpeed = 0.2 // 1 is 1:1 with scroll speed

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
        scrollTop: Math.abs(boxPositions[index] + 50) / zoomSpeed
      }, 200);
    });
  });
}

function updateScrollOffset() {
  scrollData.target = window.pageYOffset - scrollData.top
}

let limiter = 0
let lowPower = true
const isMac = (navigator.platform.toLowerCase().indexOf('mac') > -1)

// Limit performance if on battery power
try {
  navigator.getBattery().then(batteryManager => {
    if (batteryManager) {
      lowPower = (!batteryManager.charging)
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
  if (!lowPower || limiter++ === 1) {
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
      if (!lowPower) {
        graduateLayers[i].style.filter = `blur(${blur}px)`
      }
    } else {
      // Catch-all effect reset
      graduateLayers[i].style.opacity = 1
      if (!lowPower) {
        graduateLayers[i].style.filter = 'none';
      }
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


function handleFilters() {
  $(window).scroll(function() {

    var scrollPos = $(window).scrollTop();

    $('.filters li').each(function(index){
      if (scrollPos >= Math.abs(boxPositions[index] + 100) / zoomSpeed && scrollPos < Math.abs(boxPositions[index + 1] + 100) / zoomSpeed) {
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

      // Start graduate zoom animation
      $(scrollData).animate({ top: 0 }, {
        duration: 1500,
        easing: 'easeOutSine',
        done: removeScrollBlockers
      })
    }, 9500)
    setTimeout(function() {
      scrollPrompt.addClass('fadeIn')
      scrollPrompt.removeClass('hidden')

      window.onscroll = function (e) {
        scrollPrompt.addClass('fadeOut')
      }
    }, 10000)
}

function blockScroll (event) {
  event = (event || window.event)
  if (event.preventDefault) {
    event.preventDefault()
  }
  event.returnValue = false
  return false
}

function addScrollBlockers () {
  window.addEventListener("wheel", blockScroll)
  window.addEventListener("mousewheel", blockScroll)
  window.addEventListener("DOMMouseScroll", blockScroll)
  window.addEventListener("touchmove", blockScroll)
}

function removeScrollBlockers () {
  window.removeEventListener("wheel", blockScroll)
  window.removeEventListener("mousewheel", blockScroll)
  window.removeEventListener("DOMMouseScroll", blockScroll)
  window.removeEventListener("touchmove", blockScroll)
}

// For animating scrambled texts
let scrambledTexts = []
function animateScrambledTexts () {
  for (let text of scrambledTexts) {
    if (text.scrambler.update()) {
      text.elem.innerHTML = text.scrambler.value
    }
  }
  window.requestAnimationFrame(animateScrambledTexts)
}

/* call all the functions
  ------------------------------------------------------------------------------------------------- */
$(document).ready(function() {
  // ALL GRADUATES
  if (document.querySelector('body').classList.contains('page-graduates')) {
    setBoxPositions();
    setFilterMovement();
    moveCamera();
    showGraduateName();
    filterHoverEffects();
    // mouseMoveGradName();
    handleFilters();
    addScrollBlockers()

    // Uncomment next line for testing intro
    // localStorage.removeItem('showedGraduatesIntro')

    // Only play this once!
    if (!localStorage.getItem('showedGraduatesIntro')) {
      playIntroduction();
      localStorage.setItem('showedGraduatesIntro', true)
    } else {
      // Skip intro
      scrollData.top = 0
      scrollData.offset = -1000
      $('.filters').addClass('fadeIn')
      $('.graduates-viewport').addClass('fadeIn')
      removeScrollBlockers()
    }
  }

  // SINGLE GRADUATE
  if (document.querySelector('body').classList.contains('page-graduate')) {
    window.DISRUPT.addDisruptions()
    // Scramble text in

    const gradName = document.querySelector('.graduate-single .text > h2')
    const gradDesc = Array.from(document.querySelectorAll('.graduate-single .text > p'))

    // Add and show title
    gradName.classList.remove('hidden')
    scrambledTexts.push({
      elem: gradName,
      scrambler: new DisruptedText(gradName.innerHTML, 50, 0.5, false)
    })

    // Add and show descriptions
    for (let p of gradDesc) {
      p.classList.remove('hidden')
      scrambledTexts.push({
        elem: p,
        scrambler: new DisruptedText(p.innerHTML, 100, 0.25, false, true)
      })
    }

    window.requestAnimationFrame(animateScrambledTexts)
  }
})
