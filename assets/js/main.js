// ========== Particle Flower Animation ==========
// Converted from React component to vanilla JS
function initParticleFlower() {
  var canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var width = canvas.width = 550;
  var height = canvas.height = 550;
  var centerX = width / 2;
  var centerY = height / 2;

  var PARTICLE_COUNT = 30000;
  var FORM_SCALE = 2.4;
  var particles = [];
  var time = 0;

  // Initialize particles
  for (var i = 0; i < PARTICLE_COUNT; i++) {
    var theta = Math.random() * Math.PI * 2;
    var r = Math.pow(Math.random(), 0.5) * FORM_SCALE * 0.5 * 150;
    var h = (Math.random() * 2 - 1) * FORM_SCALE * 0.3;

    var angle = theta;
    var dist = r / 150;
    var flow = Math.sin(angle * 2 + h * 2) * 0.03;
    var counterFlow = Math.cos(angle * 2 - h * 2) * 0.03;
    var blend = (Math.sin(h * Math.PI) + 1) * 0.5;
    var combinedFlow = flow * blend + counterFlow * (1 - blend);

    var dx = r * Math.cos(theta);
    var dy = r * Math.sin(theta);
    var containment = Math.pow(Math.min(1, dist / (FORM_SCALE * 0.8)), 4);
    var pull = containment * 0.1;

    particles.push({
      x: centerX + dx + (dx * combinedFlow) - (dx * pull),
      y: centerY + dy + (dy * combinedFlow) - (dy * pull),
      z: h
    });
  }

  var lastFrameTime = 0;
  var targetFPS = 10;
  var frameInterval = 1000 / targetFPS;

  // Fill initial background
  ctx.fillStyle = '#F0EEE6';
  ctx.fillRect(0, 0, width, height);

  function animate(currentTime) {
    if (!lastFrameTime) lastFrameTime = currentTime;
    var deltaTime = currentTime - lastFrameTime;

    if (deltaTime >= frameInterval) {
      time += 0.0005;

      // Clear with slight trails for ghosting effect
      ctx.fillStyle = 'rgba(240, 238, 230, 0.05)';
      ctx.fillRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var dx = p.x - centerX;
        var dy = p.y - centerY;
        var dist = Math.sqrt(dx * dx + dy * dy) / 150;
        var angle = Math.atan2(dy, dx);
        var h = p.z / (FORM_SCALE * 0.4);

        var flow = Math.sin(angle * 2 - time * 0.5 + h * 2) * 0.015;
        var counterFlow = Math.cos(angle * 2 + time * 0.5 - h * 2) * 0.015;

        var blend = (Math.sin(h * Math.PI) + 1) * 0.5;
        var combinedFlow = flow * blend + counterFlow * (1 - blend);

        var containment = Math.pow(Math.min(1, dist / (FORM_SCALE * 0.8)), 4);
        var pull = containment * 0.1;

        p.x = p.x + (dx * combinedFlow) - (dx * pull);
        p.y = p.y + (dy * combinedFlow) - (dy * pull);
        p.z = p.z + Math.sin(time * 0.15 + dist * 2) * 0.01;

        var depthFactor = 1 + p.z * 0.5;
        var opacity = 0.35 * depthFactor;
        var size = Math.max(0.001, 0.6 * depthFactor);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(51, 51, 51, ' + opacity + ')';
        ctx.fill();
      }

      lastFrameTime = currentTime - (deltaTime % frameInterval);
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// ========== Mobile Nav Toggle (inner pages) ==========
var navToggle = document.getElementById('navToggle');
var siteNav = document.getElementById('siteNav');

if (navToggle) {
  navToggle.addEventListener('click', function() {
    siteNav.classList.toggle('open');
  });
}

// ========== Back to Top Button ==========
var backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== Close mobile nav on outside click ==========
document.addEventListener('click', function(e) {
  if (siteNav && siteNav.classList.contains('open') &&
      !siteNav.contains(e.target) && navToggle && !navToggle.contains(e.target)) {
    siteNav.classList.remove('open');
  }
});

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', function() {
  initParticleFlower();
});
