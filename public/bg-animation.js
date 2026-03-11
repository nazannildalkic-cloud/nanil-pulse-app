/* NANIL Pulse – Particle Network Background
   Warm dots + connecting lines – premium constellation effect */
(function () {
  var canvas = document.createElement('canvas');
  canvas.id = 'nanil-bg-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d');
  var w, h, particles = [];
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var mouse = { x: -9999, y: -9999 };

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Warme NANIL Farben
  var colors = [
    [224, 112, 48],   // orange
    [240, 140, 60],   // sunset
    [201, 162, 39],   // gold
    [255, 180, 100],  // amber
    [0, 196, 170],    // türkis
    [126, 184, 196],  // teal-light
    [226, 201, 106],  // gold-light
  ];

  var PARTICLE_COUNT = 100;
  var CONNECTION_DIST = 150;
  var MOUSE_DIST = 200;

  function createParticle() {
    var c = colors[Math.floor(Math.random() * colors.length)];
    return {
      x: Math.random() * (w || 1920),
      y: Math.random() * (h || 1080),
      r: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: c,
      alpha: Math.random() * 0.5 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.02,
    };
  }

  function init() {
    particles = [];
    var count = Math.min(PARTICLE_COUNT, Math.floor((w * h) / 12000));
    for (var i = 0; i < count; i++) particles.push(createParticle());
  }

  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Dunkler warmer Hintergrund
    var bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
    bg.addColorStop(0, '#322a30');
    bg.addColorStop(0.5, '#2e2e38');
    bg.addColorStop(1, '#1a1820');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Update & draw particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

      // Bounce
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      p.x = Math.max(0, Math.min(w, p.x));
      p.y = Math.max(0, Math.min(h, p.y));

      // Mouse repel
      var mdx = p.x - mouse.x;
      var mdy = p.y - mouse.y;
      var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < MOUSE_DIST && mDist > 0) {
        var force = (1 - mDist / MOUSE_DIST) * 0.8;
        p.x += (mdx / mDist) * force;
        p.y += (mdy / mDist) * force;
      }

      var glow = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3);

      // Connections
      for (var j = i + 1; j < particles.length; j++) {
        var p2 = particles[j];
        var dx = p.x - p2.x;
        var dy = p.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          var lineAlpha = (1 - dist / CONNECTION_DIST) * 0.25;
          // Mischfarbe zwischen beiden Partikeln
          var mc = [
            Math.round((p.color[0] + p2.color[0]) / 2),
            Math.round((p.color[1] + p2.color[1]) / 2),
            Math.round((p.color[2] + p2.color[2]) / 2),
          ];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(' + mc[0] + ',' + mc[1] + ',' + mc[2] + ',' + lineAlpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Mouse connections
      if (mDist < MOUSE_DIST) {
        var mAlpha = (1 - mDist / MOUSE_DIST) * 0.4;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(' + p.color[0] + ',' + p.color[1] + ',' + p.color[2] + ',' + mAlpha + ')';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Glow
      var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grad.addColorStop(0, 'rgba(' + p.color[0] + ',' + p.color[1] + ',' + p.color[2] + ',' + (glow * 0.6) + ')');
      grad.addColorStop(1, 'rgba(' + p.color[0] + ',' + p.color[1] + ',' + p.color[2] + ',0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + Math.min(p.color[0] + 50, 255) + ',' + Math.min(p.color[1] + 50, 255) + ',' + Math.min(p.color[2] + 50, 255) + ',' + glow + ')';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  resize();
  init();
  window.addEventListener('resize', function () { resize(); init(); });
  draw();
})();
