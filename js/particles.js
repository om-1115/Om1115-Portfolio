/* The particle field behind the page.

   A grid of spring-loaded points that the pointer pushes around and scrolling
   drags a wake through. Scroll velocity is only a force — the spring that was
   already here is what carries everything home, so there is one physics system
   rather than two.

   The loop sleeps: once the field settles and nothing is moving it stops
   scheduling frames and waits for a pointer move, a scroll, or a resize. Under
   prefers-reduced-motion it never starts at all. */

function initHeroParticles() {
  const canvas = document.getElementById('page-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -9999, y: -9999 };
  let raf = 0;

  const SPACING    = 52;
  const SPACING_SM = 76;    // far fewer points on a phone
  const RADIUS     = 140;
  const SPRING     = 0.042;
  const FRICTION   = 0.80;
  const REPEL      = 5.5;

  // scroll wake
  const DRAG   = 0.42;      // how hard scroll velocity pulls the field
  const MAX_V  = 90;        // clamp, so a flung wheel cannot fire it off screen
  const SHEAR  = 0.35;      // sideways curl, scaled by distance from the middle
  const SETTLE = 0.05;      // per-particle movement under which we call it still

  const scroller = document.getElementById('scroll-wrap');
  let lastScroll = scroller ? scroller.scrollTop : 0;
  let scrollV = 0;

  const spacing = w => (w < 640 ? SPACING_SM : SPACING);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    // setTransform, not scale — resize runs more than once and scale compounds
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build(w, h);
  }

  function build(w, h) {
    particles = [];
    const gap = spacing(w);
    const cols = Math.ceil(w / gap) + 1;
    const rows = Math.ceil(h / gap) + 1;
    const sx = (w - (cols - 1) * gap) / 2;
    const sy = (h - (rows - 1) * gap) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox = sx + c * gap;
        const oy = sy + r * gap;
        particles.push({
          x:  ox + (Math.random() - 0.5) * 8,
          y:  oy + (Math.random() - 0.5) * 8,
          ox, oy,
          vx: 0, vy: 0,
          size: Math.random() * 1.4 + 0.7,
          base: Math.random() * 0.30 + 0.20,
        });
      }
    }
  }

  function tick() {
    raf = 0;
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const rgb = isDark ? '240,237,232' : '26,26,24';

    // The page scrolls #scroll-wrap, not the window, so read the delta from the
    // element. Smoothed and clamped: a flung wheel would otherwise be one huge
    // spike in a single frame.
    if (scroller) {
      const now = scroller.scrollTop;
      const raw = now - lastScroll;
      lastScroll = now;
      scrollV = Math.max(-MAX_V, Math.min(MAX_V, scrollV * 0.82 + raw * 0.18));
    }

    const midY = h / 2;
    let moving = 0;

    for (const p of particles) {
      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      if (dist < RADIUS) {
        const f = (1 - dist / RADIUS) * REPEL;
        p.vx += (dx / dist) * f;
        p.vy += (dy / dist) * f;
      }

      if (scrollV) {
        // the wake drags against the scroll and curls away from the centre line
        p.vy -= scrollV * DRAG;
        p.vx += scrollV * SHEAR * ((p.oy - midY) / midY) * 0.5;
      }

      p.vx += (p.ox - p.x) * SPRING;
      p.vy += (p.oy - p.y) * SPRING;
      p.vx *= FRICTION;
      p.vy *= FRICTION;
      p.x  += p.vx;
      p.y  += p.vy;

      moving += Math.abs(p.vx) + Math.abs(p.vy);

      const glow = dist < RADIUS
        ? p.base + (1 - p.base) * (1 - dist / RADIUS) * 0.75
        : p.base;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${glow.toFixed(2)})`;
      ctx.fill();
    }

    // keep drawing only while something is actually happening
    const still = !particles.length ||
      (moving / particles.length < SETTLE && Math.abs(scrollV) < 0.4);
    if (!still) schedule();
  }

  function schedule() {
    if (!raf && !document.hidden) raf = requestAnimationFrame(tick);
  }

  function wake() {
    // resync the baseline, or a long pause reads as one enormous scroll delta
    if (scroller) lastScroll = scroller.scrollTop;
    schedule();
  }

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    schedule();
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
    schedule();
  });

  document.addEventListener('touchmove', e => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    schedule();
  }, { passive: true });

  if (scroller) scroller.addEventListener('scroll', schedule, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else wake();
  });

  let rz;
  window.addEventListener('resize', () => {
    clearTimeout(rz);
    rz = setTimeout(() => { resize(); wake(); }, 150);
  });

  resize();
  schedule();
}
