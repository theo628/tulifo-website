(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  document.documentElement.classList.add('js-motion');

  /* Frame timecode — ticks up every second from 00:04:12 */
  var timecode = document.getElementById('timecode');
  if (timecode) {
    var seconds = 4 * 60 + 12;
    var pad = function (n) { return String(n).padStart(2, '0'); };
    setInterval(function () {
      seconds += 1;
      var h = Math.floor(seconds / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = seconds % 60;
      timecode.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    }, 1000);
  }

  /* Waveform — subtle randomized heights, as if listening */
  var wave = document.getElementById('wave');
  if (wave) {
    var bars = wave.querySelectorAll('i');
    setInterval(function () {
      bars.forEach(function (bar) {
        bar.style.height = (4 + Math.round(Math.random() * 14)) + 'px';
      });
    }, 160);
  }

  /* Scroll reveals — fade + rise once on entry */
  var revealed = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add('in'); });
  }
})();
