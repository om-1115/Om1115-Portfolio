function initHeroParticles() {
  const canvas = document.getElementById('page-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -9999, y: -9999 };
  let raf;

  const SPACING  = 52;
  const RADIUS   = 140;
  const SPRING   = 0.042;
  const FRICTION = 0.80;
  const REPEL    = 5.5;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    build(w, h);
  }

  function build(w, h) {
    particles = [];
    const cols = Math.ceil(w / SPACING) + 1;
    const rows = Math.ceil(h / SPACING) + 1;
    const sx = (w - (cols - 1) * SPACING) / 2;
    const sy = (h - (rows - 1) * SPACING) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = sx + c * SPACING;
        const oy = sy + r * SPACING;
        particles.push({
          x:  ox + (Math.random() - 0.5) * 8,
          y:  oy + (Math.random() - 0.5) * 8,
          ox, oy,
          vx: 0, vy: 0,
          size: Math.random() * 1.2 + 0.4,
          base: Math.random() * 0.22 + 0.10,
        });
      }
    }
  }

  function tick() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const rgb = isDark ? '240,237,232' : '26,26,24';

    for (const p of particles) {
      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      if (dist < RADIUS) {
        const f = (1 - dist / RADIUS) * REPEL;
        p.vx += (dx / dist) * f;
        p.vy += (dy / dist) * f;
      }

      p.vx += (p.ox - p.x) * SPRING;
      p.vy += (p.oy - p.y) * SPRING;
      p.vx *= FRICTION;
      p.vy *= FRICTION;
      p.x  += p.vx;
      p.y  += p.vy;

      const glow = dist < RADIUS
        ? p.base + (1 - p.base) * (1 - dist / RADIUS) * 0.75
        : p.base;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${glow.toFixed(2)})`;
      ctx.fill();
    }

    raf = requestAnimationFrame(tick);
  }

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  document.addEventListener('touchmove', e => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    resize();
    tick();
  });

  resize();
  tick();
}
