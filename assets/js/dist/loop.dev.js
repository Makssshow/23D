"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// https://gist.github.com/gre/1650294
var EasingFunctions = {
  // no easing, no acceleration
  linear: function linear(t) {
    return t;
  },
  // accelerating from zero velocity
  easeInQuad: function easeInQuad(t) {
    return t * t;
  },
  // decelerating to zero velocity
  easeOutQuad: function easeOutQuad(t) {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function easeInOutQuad(t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity 
  easeInCubic: function easeInCubic(t) {
    return t * t * t;
  },
  // decelerating to zero velocity 
  easeOutCubic: function easeOutCubic(t) {
    return --t * t * t + 1;
  },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function easeInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity 
  easeInQuart: function easeInQuart(t) {
    return t * t * t * t;
  },
  // decelerating to zero velocity 
  easeOutQuart: function easeOutQuart(t) {
    return 1 - --t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function easeInOutQuart(t) {
    return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  // accelerating from zero velocity
  easeInQuint: function easeInQuint(t) {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuint: function easeOutQuint(t) {
    return 1 + --t * t * t * t * t;
  },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function easeInOutQuint(t) {
    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};
var slider = document.querySelector('.slider__inner');
var sliderWidth = slider.clientWidth;

var slides = _toConsumableArray(slider.querySelectorAll('.slide')).map(function (el) {
  return {
    el: el,
    r: (sliderWidth - el.clientWidth) / 2 / el.clientWidth * 100
  };
});

var rafId = null;
var rotAngle = 0;

function animate() {
  var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var closestAngle = Math.PI / 2;
  var from = rotAngle;
  var to = angle;
  var begin = 0;

  var loop = function loop(now) {
    begin = begin || now;
    var t = Math.min(1, (now - begin) / duration);
    var ease = EasingFunctions.easeInQuad(t);
    rotAngle = lerp(from, to, ease);

    for (var i = 0; i < slides.length; i++) {
      var slide = slides[i];

      var _angle = 2 * Math.PI * i / slides.length + rotAngle;

      var x = Math.cos(_angle) * slide.r;
      var y = Math.sin(_angle) * slide.r;
      var aDist = Math.abs(Math.abs(_angle) % (Math.PI * 2) - closestAngle) / Math.PI;
      slide.el.style.transform = "translate3d(".concat(x, "%, ").concat(y, "%, ").concat(-aDist * 100, "px)");
    }

    rafId = t === 1 ? null : requestAnimationFrame(loop);
  };

  rafId = requestAnimationFrame(loop);
}

function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}

function autoPlay() {
  var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  if (!document.hidden) {
    var angle = Math.PI * 2 * c / 4;
    animate(angle, 1000);
    c++;
  }

  setTimeout(autoPlay, 3000, c);
}

autoPlay();