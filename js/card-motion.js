/* Pointer motion on the project thumbnails.

   The thumbnail tilts toward the cursor, the artwork inside slides the other
   way, and a soft highlight tracks the pointer. The counter-slide is what sells
   it — art and frame moving together would just be a tilted picture, whereas
   moving them against each other reads as depth.

   Everything is eased toward a target rather than snapped to the pointer, so
   a fast flick across the grid glides instead of jerking. One loop serves the
   whole grid, because a pointer can only be over one card at a time, and it
   stops itself once the card has settled back to rest.

   Hover-capable fine pointers only. A touch device has no hover state to drive
   this and would only get a lurch on tap, and under prefers-reduced-motion the
   module never installs, leaving the plain CSS hover in place. */

(function () {
  if (typeof document === 'undefined' || window.__cardMotion) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine    = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced || !fine) return;
  window.__cardMotion = true;

  const TILT  = 5;      // degrees at the corners
  const SHIFT = 10;     // px the artwork slides inside its frame
  const LIFT  = 1.04;   // scale at full engagement
  const EASE  = 0.15;   // per-frame approach to the target
  const REST  = 0.0006; // below this, call it settled and stop

  let card = null, thumb = null, art = null;
  let tX = 0, tY = 0, tK = 0;   // target: pointer x/y in -1..1, engagement 0..1
  let cX = 0, cY = 0, cK = 0;   // current
  let raf = 0;

  function schedule() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function frame() {
    raf = 0;
    cX += (tX - cX) * EASE;
    cY += (tY - cY) * EASE;
    cK += (tK - cK) * EASE;

    if (thumb) {
      thumb.style.transform =
        `rotateX(${(-cY * TILT * cK).toFixed(3)}deg) ` +
        `rotateY(${( cX * TILT * cK).toFixed(3)}deg) ` +
        `scale(${(1 + (LIFT - 1) * cK).toFixed(4)})`;
      thumb.style.setProperty('--mx', `${(50 + cX * 32).toFixed(1)}%`);
      thumb.style.setProperty('--my', `${(50 + cY * 32).toFixed(1)}%`);
      thumb.style.setProperty('--sheen', (cK * 0.9).toFixed(3));
      if (art) {
        art.style.transform =
          `translate3d(${(-cX * SHIFT * cK).toFixed(2)}px, ${(-cY * SHIFT * cK).toFixed(2)}px, 0) ` +
          `scale(${(1 + 0.055 * cK).toFixed(4)})`;
      }
    }

    const moving =
      Math.abs(tX - cX) + Math.abs(tY - cY) + Math.abs(tK - cK) > REST;

    if (moving) schedule();
    else if (tK === 0) release();   // fully back at rest — hand the card back
  }

  // Strip the inline transforms so the stylesheet owns the card again.
  function release() {
    if (thumb) {
      thumb.style.transform = '';
      thumb.style.removeProperty('--mx');
      thumb.style.removeProperty('--my');
      thumb.style.removeProperty('--sheen');
    }
    if (art) art.style.transform = '';
    if (card) card.classList.remove('is-live');
    card = thumb = art = null;
    cX = cY = cK = 0;
  }

  function engage(next) {
    if (next === card) return;
    release();
    card  = next;
    thumb = card.querySelector('.fw-card__thumb');
    art   = card.querySelector('.fw-card__thumb-img, .wss');
    if (!thumb) { card = null; return; }
    card.classList.add('is-live');
    tK = 1;
    schedule();
  }

  document.addEventListener('pointerover', e => {
    const next = e.target.closest && e.target.closest('.fw-card');
    if (next) engage(next);
  });

  document.addEventListener('pointermove', e => {
    if (!card) return;
    const r = card.getBoundingClientRect();
    // -1..1 from the card's centre, clamped so a corner never overshoots
    tX = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width  - 0.5) * 2));
    tY = Math.max(-1, Math.min(1, ((e.clientY - r.top)  / r.height - 0.5) * 2));
    schedule();
  }, { passive: true });

  document.addEventListener('pointerout', e => {
    if (!card) return;
    // ignore moves between the card's own children
    if (e.relatedTarget && card.contains(e.relatedTarget)) return;
    tX = tY = tK = 0;
    schedule();
  });

  // A card can't stay lit if it's scrolled away from or the tab is left.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && card) { tX = tY = tK = 0; cX = cY = cK = 0; release(); }
  });

  /* Tell the stylesheet JS is driving, so its own hover transform stands down.
     The flag goes on the root element, not on the grid: the grid is rendered
     from script and re-rendered again when the data call settles, so anything
     that marks it at a fixed moment ends up marking an element that is about
     to be replaced. The root is here before any of that. */
  document.documentElement.classList.add('card-motion');
})();
