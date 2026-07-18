(function () {
  'use strict';

  /* Mobile nav toggle — must work regardless of motion preference */
  var navEl = document.querySelector('nav[aria-label="Main"]');
  var navToggle = navEl && navEl.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = navEl.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    navEl.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        navEl.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

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

  /* Hero claims rotator — one claim at a time, scrolling bottom to top */
  var claims = document.getElementById('claims');
  if (claims) {
    document.documentElement.classList.add('js-rotate');
    var count = claims.children.length;
    claims.appendChild(claims.children[0].cloneNode(true));
    var idx = 0;
    setInterval(function () {
      idx += 1;
      var rowH = claims.children[0].offsetHeight;
      claims.style.transform = 'translateY(-' + (idx * rowH) + 'px)';
      if (idx === count) {
        setTimeout(function () {
          claims.style.transition = 'none';
          claims.style.transform = 'translateY(0)';
          void claims.offsetHeight;
          claims.style.transition = '';
          idx = 0;
        }, 550);
      }
    }, 2200);
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
