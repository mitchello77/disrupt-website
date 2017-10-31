/* DO THIS STUFF RIGHT AWAY
------------------------------------------------------------------------------------------------------------------------ */
// Pass $_GET variables to JS
var $_GET = {};
document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
	function decode(s) {
		return decodeURIComponent(s.split("+").join(" "));
	}
	$_GET[decode(arguments[1])] = decode(arguments[2]);
});



/* HELPER FUNCTIONS
------------------------------------------------------------------------------------------------------------------------ */
function helper_isIE(userAgent) {
	userAgent = userAgent || navigator.userAgent;
	return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
}

function helper_isIE10OrBelow() {
	return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 11;
}

function helper_isTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints;
}

function helper_isNumeric(n) {
	return /^[0-9.,]+$/.test(n); // Allows 0-9 and .
}

function helper_isDate(n) {
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	return n.match(regEx) != null; // Allows YYYY-MM-DD
}

function helper_isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function helper_isPhoneNumber(value) {
	return (/^\d{6,}$/).test(value.replace(/[\s()+\-\.]|ext/gi, ''));
}

function helper_isCreditCard(value) {
	// accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm. It's so pretty.
	var nCheck = 0,
		nDigit = 0,
		bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			nDigit = parseInt(cDigit, 10);

		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}

function helper_isInViewport(elem, navElement) {
	var navHeight = 0;
	if (typeof navElement !== 'undefined') {
		var navHeight = $(navElement).outerHeight();
	}

	var $elem = $(elem);
	var $window = $(window);

	if(!$elem.length){ return; }

	var docViewTop = $window.scrollTop() + navHeight;
	var docViewBottom = docViewTop + $window.height();

	var elemTop = $elem.offset().top;
	var elemBottom = elemTop + $elem.height();

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function helper_debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function helper_escapeHtml(text) {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function helper_stringToJson(string) {
	try {
		var data = eval('(' + string + ')');
	} catch (e) {
		var data = {};
	}
	return data;
}

function helper_nl2br(str) {
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
}

function helper_timeWithin(date, mins) {
	if (typeof mins === 'undefined') {
		mins = 10;
	}

	date = new Date(('' + date).replace(/-/g, "/").replace(/[TZ]/g, " "));
	compareTo = new Date;
	seconds = (compareTo - date + (compareTo.getTimezoneOffset()) * 60000 ) / 1000;
	if (seconds < 60*mins) {
		return true;
	}
	return false;
}

function helper_humaneDate(date, compareTo) {
	if (!date) {
		return 'Unknown';
	}

	var lang = {
			ago: 'ago',
			from: '',
			now: 'Just now',
			minute: 'minute',
			minutes: 'minutes',
			hour: 'hour',
			hours: 'hours',
			day: 'day',
			days: 'days',
			week: 'week',
			weeks: 'weeks',
			month: 'month',
			months: 'months',
			year: 'year',
			years: 'years'
		},
		formats = [
			[60, lang.now],
			[3600, lang.minute, lang.minutes, 60], // 60 minutes, 1 minute
			[82800, lang.hour, lang.hours, 3600], // 24 hours, 1 hour
			[604800, lang.day, lang.days, 82800], // 7 days, 1 day - minus 1 hour so it doesnt say 24 hours
			[2628000, lang.week, lang.weeks, 604800], // ~1 month, 1 week
			[31536000, lang.month, lang.months, 2628000], // 1 year, ~1 month
			[Infinity, lang.year, lang.years, 31536000] // Infinity, 1 year
		],
		isString = typeof date == 'string',
		date = isString ? new Date(('' + date).replace(/-/g, "/").replace(/[TZ]/g, " ")) : date,
		compareTo = (compareTo || new Date),
		seconds = (compareTo - date +
			(compareTo.getTimezoneOffset() -
				// if we received a GMT time from a string, doesn't include time zone bias
				// if we got a date object, the time zone is built in, we need to remove it.
				(isString ? 0 : date.getTimezoneOffset())
			) * 60000
		) / 1000,
		token;

	if (seconds < 0) {
		seconds = Math.abs(seconds);
		token = lang.from ? ' ' + lang.from : '';
	} else {
		token = lang.ago ? ' ' + lang.ago : '';
	}

	/*
	 * 0 seconds && < 60 seconds        Now
	 * 60 seconds                       1 Minute
	 * > 60 seconds && < 60 minutes     X Minutes
	 * 60 minutes                       1 Hour
	 * > 60 minutes && < 24 hours       X Hours
	 * 24 hours                         1 Day
	 * > 24 hours && < 7 days           X Days
	 * 7 days                           1 Week
	 * > 7 days && < ~ 1 Month          X Weeks
	 * ~ 1 Month                        1 Month
	 * > ~ 1 Month && < 1 Year          X Months
	 * 1 Year                           1 Year
	 * > 1 Year                         X Years
	 *
	 * Single units are +10%. 1 Year shows first at 1 Year + 10%
	 */

	function normalize(val, single) {
		var margin = 0.1;
		if (val >= single && val <= single * (1 + margin)) {
			return single;
		}
		return val;
	}

	for (var i = 0, format = formats[0]; formats[i]; format = formats[++i]) {
		if (seconds < format[0]) {
			if (i === 0) {
				// Now
				return format[1];
			}

			var val = Math.ceil(normalize(seconds, format[3]) / (format[3]));
			return val +
				' ' +
				(val != 1 ? format[2] : format[1]) +
				(i > 0 ? token : '');
		}
	}
}

function helper_ucfirst(string) {
	if(typeof(string)!=='string'){ string=''; }
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function helper_pad(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

function helper_displayTime(mins) {
	mins = parseFloat(mins);
	var hours = Math.trunc(mins/60);
	var minutes = mins % 60;
	var hoursPrefix = 'hr';
	if (hours > 1) {
		var hoursPrefix = 'hrs';
	}
	var minutesPrefix = 'min';
	if (minutes > 1) {
		var minutesPrefix = 'mins';
	}
	if (hours > 0 && minutes > 0) {
		return hours+hoursPrefix+' '+minutes+minutesPrefix
	}
	else if (hours > 0 && minutes === 0) {
		return hours+hoursPrefix
	}
	else if (minutes > 0 && hours === 0) {
		return minutes+minutesPrefix
	}
	else if (minutes === 0 && hours === 0) {
		return 'Unknown';
	}
}

function helper_compareJson(obj1, obj2) {
	var ret = {};
	for (var i in obj2) {
		if (!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) {
			ret[i] = obj2[i];
		}
	}
	return ret;
}

function helper_getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function helper_isInArray(value, array) {
	return array.indexOf(value) > -1;
}

$.fn.extend({
	ensureLoad: function(handler) {
		return this.each(function() {
			if (this.complete) {
				handler.call(this);
			}
			else {
				$(this).off('load.ensureLoad').on('load.ensureLoad', handler);
			}
		});
	}
});



/* COMMON FUNCTIONS
------------------------------------------------------------------------------------------------------------------------ */
var common_slideTo_sliding = false;
function common_slideTo(target, extraOffset, speed) {
	if (!$(target).length) {
		return;
	}

	if (typeof extraOffset === 'undefined') {
		extraOffset = 0;
	}

	if (typeof speed === 'undefined') {
		speed = 750;
	}

	var scrollPos = $(target).offset().top - extraOffset + 1;

	if (common_slideTo_sliding === true) {
		$('html, body').stop(); // Stop previous animation halfway through if needed
	}

	common_slideTo_sliding = true;

	$('html, body').animate({ scrollTop: scrollPos }, speed, 'easeOutQuad', function() { common_slideTo_sliding = false; });
}

/* Example usage:
<form id='someForm'>
	<input type='text'>
</form>

common_initEnterKeypress(
	function(event, obj) {
		obj.blur();
		$('#someForm').submit();
	},
	'#someForm',
	['input', 'select', 'textarea']
);
*/
function common_initEnterKeypress(callback, parent, children) {
	for (var i = 0; i < children.length; i++) {
		$(children[i], parent).off('keypress.enter').on('keypress.enter', function(event) {
			if ((event.keyCode === 13 && $(this).prop('tagName') !== 'TEXTAREA') || ($(this).prop('tagName') === 'TEXTAREA' && (event.ctrlKey || event.metaKey) && (event.keyCode == 13 || event.keyCode == 10) && !event.shiftKey)) {
				if (helper_touchDevice && event.target && $(event.target).is(':focus')) {
					$(event.target).trigger('blur');
				}
				callback(event, $(this));
			}
		});
	}
}

function common_escBlurFields() {
	$(document.body).off('keyup.escFields').on('keyup.escFields', 'input, textarea, select', function(event) {
		if (event.keyCode === 27) {
			$(this).blur();
			$(this).val($(this).attr('prevValue'));
		}
	});

	$(document.body).off('focus.escFields').on('focus.escFields', 'input, textarea, select', function(event) {
		$(this).attr('prevValue', $(this).val());
	});
}



/* CALL THE API
------------------------------------------------------------------------------------------------------------------------ */
var common_callAPI_runningCalls = {};
var common_callAPI_queuedCalls = {};
function common_callAPI(handle, endpoint, postData, dataType, success, error, synchronousCalls, cache) {
	if (typeof dataType === 'undefined') {
		var dataType = 'json';
	}
	if (typeof success === 'undefined' || success === false) {
		var success = function(data) {};
	}
	if (typeof error === 'undefined' || error === false) {
		var error = function(data) {};
	}
	if (typeof synchronousCalls === 'undefined' || synchronousCalls === false) {
		var synchronousCalls = 'one';
	}
	if (typeof cache === 'undefined') {
		var cache = false;
	}


	if (dataType === 'json') {
		var headers = {'Accept': 'application/json'}
	}
	else {
		var headers = {}
	}


	if (synchronousCalls === 'multiple' || synchronousCalls === 'cancelPrevious' || synchronousCalls === 'queue' || (synchronousCalls === 'one' && typeof common_callAPI_runningCalls[handle] === 'undefined')) {

		if (synchronousCalls === 'cancelPrevious') {
			common_abortAPI(handle);
		}

		// If there's one running
		if (synchronousCalls === 'queue' && typeof common_callAPI_runningCalls[handle] !== 'undefined') {
			// Add to queue
			if (typeof common_callAPI_queuedCalls[handle] === 'undefined') {
				common_callAPI_queuedCalls[handle] = [];
			}

			common_callAPI_queuedCalls[handle].push({
				"endpoint": endpoint,
				"postData": postData,
				"dataType": dataType,
				"success": success,
				"error": error,
				"synchronousCalls": synchronousCalls,
				"cache": cache
			});
		}
		// Otherwise, do it
		else {
			$.support.cors = true;
			common_callAPI_runningCalls[handle] = $.ajax({
				url: endpoint,
				method: 'POST',
				dataType: dataType,
				data: postData,
				cache: cache,
				timeout: 30000, // 30 second timeout
				headers: headers,
				success: function(data) {
					success(data);
					delete common_callAPI_runningCalls[handle];

					// When done, check the queue and call next if needed
					if (typeof common_callAPI_queuedCalls[handle] !== 'undefined' && common_callAPI_queuedCalls[handle].length > 0) {
						common_callAPI(
							handle,
							common_callAPI_queuedCalls[handle][0].endpoint,
							common_callAPI_queuedCalls[handle][0].postData,
							common_callAPI_queuedCalls[handle][0].dataType,
							common_callAPI_queuedCalls[handle][0].success,
							common_callAPI_queuedCalls[handle][0].error,
							common_callAPI_queuedCalls[handle][0].synchronousCalls,
							common_callAPI_queuedCalls[handle][0].cache
						);
						common_callAPI_queuedCalls[handle].shift();
					}
					else {
						delete common_callAPI_queuedCalls[handle];
					}

					return;
				},
				error: function(data) {
					if (data.statusText === 'abort') {
						return;
					}

					console.log('API error:');
					console.log(endpoint);
					console.log('Data sent:');
					console.log(postData);
					console.log('Data returned:');
					console.log(data);

					error(data);
					delete common_callAPI_runningCalls[handle];

					// When done, check the queue and call next if needed
					if (typeof common_callAPI_queuedCalls[handle] !== 'undefined' && common_callAPI_queuedCalls[handle].length > 0) {
						common_callAPI(
							handle,
							common_callAPI_queuedCalls[handle][0].endpoint,
							common_callAPI_queuedCalls[handle][0].postData,
							common_callAPI_queuedCalls[handle][0].dataType,
							common_callAPI_queuedCalls[handle][0].success,
							common_callAPI_queuedCalls[handle][0].error,
							common_callAPI_queuedCalls[handle][0].synchronousCalls,
							common_callAPI_queuedCalls[handle][0].cache
						);
						common_callAPI_queuedCalls[handle].shift();
					}
					else {
						delete common_callAPI_queuedCalls[handle];
					}

					return;
				}
			});

		}
	}
}

function common_abortAPI(handle) {
	if (typeof common_callAPI_runningCalls[handle] !== 'undefined') {
		common_callAPI_runningCalls[handle].abort();
		delete common_callAPI_runningCalls[handle];
	}
}




/* STICKY FOOTER
------------------------------------------------------------------------------------------------------------------------ */
// function footer_sticky() {
// 	var footerHeight = $('footer').outerHeight() + parseFloat($('body').css('padding-top').replace('px', ''));
// 	$('.contentWrapper').css('min-height', 'calc(100vh - '+footerHeight+'px)');
// }
//
// $(document).ready(footer_sticky);
// $(window).on('resize.footer', helper_debounce(function() {
// 	footer_sticky();
// }, 100));


/* SNAPCHAT MODAL
------------------------------------------------------------------------------------------------------------------------ */

var showSnapcode = function() {
    $('.snapchatCodeContainer').removeClass('hidden');
    $('main').addClass('blur');
  }
  var hideSnapcode = function() {
    $('.snapchatCodeContainer').addClass('hidden');
    $('main').removeClass('blur');
  }


	$(document).ready(function(){
		$('.snapchat').click(showSnapcode);
	  $('.snapchatCodeContainer').click(hideSnapcode);

	  $('.snapchatCodeContainer .modal').click(event => {
	    event.preventDefault();
	    event.stopPropagation();
	  })
	});



/* GRADUATE SLIDER
------------------------------------------------------------------------------------------------------------------------ */
function init_graduateSlider() {
	var slider = $('.graduate-single .slider');

	if (slider.length) {
		slider.slick({
			fade: true,
			dots: false,
			nextArrow: '<span class="slick-arrow slick-next"><i class="far fa-chevron-right slick-prev" data-fa-transform="grow-8"></i></span>',
  		prevArrow: '<span class="slick-arrow slick-prev"><i class="far fa-chevron-left slick-next" data-fa-transform="grow-8"></i></span>',
		});
	}
}

$(document).ready(function(){
	init_graduateSlider();
});

/* THROTTLE
------------------------------------------------------------------------------------------------------------------------ */
function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function() {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
  }

/* DEBOUNCE
------------------------------------------------------------------------------------------------------------------------ */
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/* NAVIGATION
------------------------------------------------------------------------------------------------------------------------ */
$(document).ready(function() {

	$('header nav a').on('click', function() {
		var section = $('#' + $(this).data('hash'));

		if ($('body').hasClass('front-page')) {
			$('html,body').animate({
			  scrollTop: (section.offset().top + (section.outerHeight() / 2) - $(window).outerHeight() / 2)
			}, 600);
		} else {
			window.open(ROOT_URL + '#' + $(this).data('hash'), '_self');
		}
	});
});


/* FLOATING ORB
------------------------------------------------------------------------------------------------------------------------ */
function init_floatingOrb() {

	if ($('.floatingOrb').length < 1) {
		return;
	}

	var scrollBottom = $(window).scrollTop() + ($(window).innerHeight());
	var sponsors = $('.sponsors').offset().top + ($('.sponsors').innerHeight() / 2);
	var exhibition = $('.exhibition-info').offset().top + ($('.exhibition-info').innerHeight() / 2);
	var graduates = $('.graduates-cta').offset().top + ($('.graduates-cta').innerHeight() / 2);

	if (scrollBottom < exhibition) {
		$('.floatingOrb').css({
			left: ($(window).width() / 2) - 250,
			top: ($('.landing').innerHeight() / 2) - 250,
			transform: 'scale(1.2)',
			opacity: 1
		});

		$('header nav a').removeClass('current');
		$('header nav a[data-hash=home]').addClass('current');
	}

	if (scrollBottom > exhibition) {
		$('.floatingOrb').css({
			left: $('.exhibition-info .container').offset().left + ($('.exhibition-info .container').width()),
			top: (exhibition / 2),
			transform: 'scale(1.5)',
			opacity: .4
		});

		$('header nav a').removeClass('current');
		$('header nav a[data-hash=exhibition]').addClass('current');
	}

	if (scrollBottom > sponsors) {
		$('.floatingOrb').css({
			left: $('.sponsors .container').offset().left + ($('.sponsors .container').width()),
			top: (sponsors - 250),
			transform: 'scale(2)'
		});

		$('header nav a').removeClass('current');
		$('header nav a[data-hash=sponsors]').addClass('current');
	}

	if (scrollBottom > graduates) {
		$('.floatingOrb').css({
			left: $('.graduates-cta .container').offset().left - 250,
			top: (graduates + 250),
			transform: 'scale(2.5)'
		});

		$('header nav a').removeClass('current');
		$('header nav a[data-hash=graduates]').addClass('current');
	}
}

$(document).ready(function(){
	init_floatingOrb();

	$(document).scroll(debounce(function() {
		init_floatingOrb();
	}, 50));
});


/* WINDOW EVENTS
------------------------------------------------------------------------------------------------------------------------ */
// Load
$(document).ready(function() {

	if (helper_isIE()) {
		$('body').addClass('ie');
	}
	if (helper_isIE10OrBelow()) {
		$('body').addClass('ie10');
	}

	if (helper_isTouchDevice()) {
		$('body').addClass('touchDevice');
	}

	retinajs();
	common_escBlurFields();
});

// Resize
$(window).off('resize.generic').on('resize.generic', helper_debounce(function() {
	// Resize stuff
}, 100));

// Keypress
$(document).off('keyup.generic').on('keyup.generic', function(evt) {
	// Esc
	if (evt.keyCode == 27) {
		// Functions that close things go here. Eg - hideMenu() or hideNav() sorta thing
	}
});

// Click
$(document).off('click.generic swipeRight.generic').on('click.generic tap.generic', function(event) {
	// Functions that need clicks and taps go here. Usually used for clicking off an element to close it.

	/* Example usage:
	if (!$(event.target).closest('.someOpenElement').length) {
		// Close it
	}
	*/
});
