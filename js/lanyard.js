/* Hanging ID card — verlet rope with a rigid card on the end.

   The rope is a chain of point masses solved with distance constraints. The card
   is three of those points (two top corners and the bottom centre) held in a
   rigid triangle, so it tilts and rotates rather than staying flat, and the two
   strands meet it in a V like a real lanyard.

   Everything here is an enhancement: the markup already hangs correctly from
   CSS, so reduced motion, a blocked script and no JS all leave a finished card.
   The loop sleeps when the card is still, off-screen, or the tab is hidden. */

(function () {
  const GRAVITY   = 1500;   // px/s²
  const DAMP      = 0.987;  // velocity retained per step
  const ITER      = 5;      // constraint passes per step
  const STEP      = 1 / 60; // fixed timestep
  const SEGMENTS  = 10;
  const BAR       = 126;    // width of the bar the strap hangs over
  const CLASP_GAP = 30;     // clasp to the card's top edge
  const SLEEP_EPS = 0.006;  // per-point movement below this and we stop drawing

  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

  function makeLanyard(root) {
    const cardEl = root.querySelector('[data-lanyard-card]');
    const strands = [...root.querySelectorAll('.lanyard__strand')];
    const clasp = root.querySelector('.lanyard__clasp');
    const clipStrap = root.querySelector('.lanyard__clip-strap');
    if (!cardEl || strands.length < 2) return null;

    let W, H, cardW, cardH, ropeLen, segLen, anchor;
    const ropeL = [], ropeR = [];   // the two bands of the strap
    let K;                  // the clasp where they converge
    let cA, cB, cC;         // card corners: top-left, top-right, bottom-centre
    let diag, clipLen;      // card rigidity + clasp-to-corner length

    const pt = (x, y) => ({ x, y, px: x, py: y, pinned: false });

    function measure() {
      const r = root.getBoundingClientRect();
      W = r.width; H = r.height;
      cardW = cardEl.offsetWidth;
      cardH = cardEl.offsetHeight;
      anchor = { x: W / 2, y: 10 };
      // leave room for the card at rest without touching the bottom edge
      ropeLen = clamp(H - cardH - CLASP_GAP - 70, 70, 250);
      // each band runs from its end of the bar down to the clasp, so it is
      // longer than the drop by the half-width it has to travel inward
      segLen = Math.hypot(ropeLen, BAR / 2) / SEGMENTS;
      diag = Math.hypot(cardW / 2, cardH);
      clipLen = Math.hypot(cardW / 2, CLASP_GAP);
    }

    function build() {
      measure();
      ropeL.length = ropeR.length = 0;
      const drop = ropeLen / SEGMENTS;
      for (let i = 0; i <= SEGMENTS; i++) {
        const t = i / SEGMENTS;
        ropeL.push(pt(anchor.x - (BAR / 2) * (1 - t), anchor.y + drop * i));
        ropeR.push(pt(anchor.x + (BAR / 2) * (1 - t), anchor.y + drop * i));
      }
      ropeL[0].pinned = ropeR[0].pinned = true;
      ropeL[0].x = anchor.x - BAR / 2; ropeL[0].px = ropeL[0].x;
      ropeR[0].x = anchor.x + BAR / 2; ropeR[0].px = ropeR[0].x;

      const top = anchor.y + ropeLen;
      K  = pt(anchor.x, top);
      cA = pt(anchor.x - cardW / 2, top + CLASP_GAP);
      cB = pt(anchor.x + cardW / 2, top + CLASP_GAP);
      cC = pt(anchor.x, top + CLASP_GAP + cardH);
    }

    const points = () => [...ropeL, ...ropeR, K, cA, cB, cC];

    function integrate(dt) {
      for (const p of points()) {
        if (p.pinned) continue;
        const vx = (p.x - p.px) * DAMP;
        const vy = (p.y - p.py) * DAMP;
        p.px = p.x; p.py = p.y;
        p.x += vx;
        p.y += vy + GRAVITY * dt * dt;
      }
    }

    function link(a, b, len, stiff = 1) {
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 0.0001;
      const diff = ((d - len) / d) * 0.5 * stiff;
      const ox = dx * diff, oy = dy * diff;
      if (!a.pinned) { a.x += ox; a.y += oy; }
      if (!b.pinned) { b.x -= ox; b.y -= oy; }
    }

    function solve() {
      for (let k = 0; k < ITER; k++) {
        for (let i = 0; i < ropeL.length - 1; i++) link(ropeL[i], ropeL[i + 1], segLen);
        for (let i = 0; i < ropeR.length - 1; i++) link(ropeR[i], ropeR[i + 1], segLen);
        // both bands terminate in the clasp
        link(ropeL[ropeL.length - 1], K, 3);
        link(ropeR[ropeR.length - 1], K, 3);
        // and the card hangs off the clasp
        link(K, cA, clipLen);
        link(K, cB, clipLen);
        // the card itself, held rigid
        link(cA, cB, cardW);
        link(cA, cC, diag);
        link(cB, cC, diag);
        // keep it inside the box so it cannot be thrown out of the section
        for (const p of points()) {
          p.x = clamp(p.x, 6, W - 6);
          p.y = clamp(p.y, 0, H - 6);
        }
      }
    }

    function draw() {
      const path = chain => {
        let d = `M${chain[0].x.toFixed(1)} ${chain[0].y.toFixed(1)}`;
        for (let i = 1; i < chain.length; i++) d += ` L${chain[i].x.toFixed(1)} ${chain[i].y.toFixed(1)}`;
        return d + ` L${K.x.toFixed(1)} ${K.y.toFixed(1)}`;
      };
      strands[0].setAttribute('d', path(ropeL));
      strands[1].setAttribute('d', path(ropeR));

      if (clipStrap) {
        clipStrap.setAttribute('d',
          `M${cA.x.toFixed(1)} ${cA.y.toFixed(1)} L${K.x.toFixed(1)} ${K.y.toFixed(1)} L${cB.x.toFixed(1)} ${cB.y.toFixed(1)}`);
      }

      if (clasp) {
        // the clasp sits on the clasp point, square to the card below it
        const a = Math.atan2(cB.y - cA.y, cB.x - cA.x) * 180 / Math.PI;
        clasp.setAttribute('transform',
          `translate(${K.x.toFixed(2)} ${K.y.toFixed(2)}) rotate(${a.toFixed(2)})`);
      }

      const angle = Math.atan2(cB.y - cA.y, cB.x - cA.x);
      cardEl.style.transform =
        `translate(${cA.x.toFixed(2)}px, ${cA.y.toFixed(2)}px) rotate(${angle.toFixed(4)}rad)`;
    }

    // ── drag ────────────────────────────────────────────────────────────────
    let dragging = false, grabA = null, grabB = null, pid = null;

    const local = e => {
      const r = root.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    cardEl.addEventListener('pointerdown', e => {
      const p = local(e);
      dragging = true; pid = e.pointerId;
      grabA = { x: cA.x - p.x, y: cA.y - p.y };
      grabB = { x: cB.x - p.x, y: cB.y - p.y };
      cA.pinned = cB.pinned = true;
      cardEl.setPointerCapture(pid);
      root.classList.add('is-held');
      wake();
      e.preventDefault();
    });

    cardEl.addEventListener('pointermove', e => {
      if (!dragging || e.pointerId !== pid) return;
      let p = local(e);
      // the strap has a length; pulling past it would detach the card
      const reach = ropeLen + CLASP_GAP + 46;
      const dx = p.x - anchor.x, dy = p.y - anchor.y;
      const d = Math.hypot(dx, dy);
      if (d > reach) p = { x: anchor.x + (dx / d) * reach, y: anchor.y + (dy / d) * reach };
      // move, but keep the previous position so the throw inherits velocity
      cA.px = cA.x; cA.py = cA.y;
      cB.px = cB.x; cB.py = cB.y;
      cA.x = p.x + grabA.x; cA.y = p.y + grabA.y;
      cB.x = p.x + grabB.x; cB.y = p.y + grabB.y;
      wake();
    });

    const release = e => {
      if (!dragging || (e && e.pointerId !== pid)) return;
      dragging = false;
      cA.pinned = cB.pinned = false;
      root.classList.remove('is-held');
      wake();
    };
    cardEl.addEventListener('pointerup', release);
    cardEl.addEventListener('pointercancel', release);

    // ── loop ────────────────────────────────────────────────────────────────
    let raf = 0, acc = 0, last = 0, visible = true, idle = 0;

    // per-point, so the threshold does not shift when the rig gains points
    function movement() {
      const all = points();
      let m = 0;
      for (const p of all) m += Math.abs(p.x - p.px) + Math.abs(p.y - p.py);
      return m / all.length;
    }

    function frame(now) {
      raf = 0;
      const dt = Math.min((now - last) / 1000 || STEP, 0.05);
      last = now;
      acc += dt;
      let steps = 0;
      while (acc >= STEP && steps < 5) { integrate(STEP); solve(); acc -= STEP; steps++; }
      draw();

      // stop drawing once it has settled; any interaction wakes it again
      idle = movement() < SLEEP_EPS && !dragging ? idle + 1 : 0;
      if (idle < 30 && visible) schedule();
    }

    function schedule() { if (!raf) raf = requestAnimationFrame(frame); }
    function wake() { idle = 0; last = performance.now(); schedule(); }

    const io = new IntersectionObserver(es => {
      visible = es.some(x => x.isIntersecting);
      if (visible) wake(); else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { rootMargin: '120px' });
    io.observe(root);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
      else if (visible) wake();
    });

    let rz;
    window.addEventListener('resize', () => {
      clearTimeout(rz);
      rz = setTimeout(() => { build(); wake(); }, 150);
    });

    build();
    draw();
    root.classList.add('is-live');
    // a small nudge so it settles into place instead of appearing frozen
    cA.px += 6; cB.px += 6;
    wake();
    return true;
  }

  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('[data-lanyard]').forEach(makeLanyard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0));
  } else {
    setTimeout(init, 0);
  }
  window.initLanyard = init;
})();
