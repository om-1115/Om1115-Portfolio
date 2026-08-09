/* Loading screen — the full one on arrival, a quick wipe between pages.

   The overlay is injected by this script rather than written into each HTML
   file, which means a visitor with JavaScript off never gets an overlay that
   only JavaScript could remove. Load this first, right after <body>, so it
   covers the page before anything paints.

   First visit in a session gets the full treatment: the name animating in
   character by character over a progress bar. Every navigation after that gets
   a short fade, because a two-second loader on your fourth page view is an
   affectation rather than a courtesy. Under prefers-reduced-motion there is no
   loader at all. */

(function () {
  const NAME = 'Om Kumar';
  const MIN_FULL   = 8000;   // first visit in a session — hold the landing screen
  const MIN_QUICK  = 110;    // between pages — a glimpse, not a wait
  /* The ceiling has to sit above MIN_FULL or it wins: it is an absolute timer
     started at the same moment, so a 5s ceiling under an 8s floor would dismiss
     the loader at 5s and the floor would never be reached. Kept 4s clear of the
     floor so it still does its real job — releasing the page when an asset
     hangs — rather than becoming the thing that ends the loader normally. */
  const MAX_WAIT   = 12000;
  const OUT_MS     = 820;    // must match the #loader transition in the CSS

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { document.documentElement.classList.add('no-loader'); return; }

  /* The eight-second landing screen is for reloads only. Arriving from a link,
     a typed URL or another page on the site gets the short wipe instead — a
     visitor who has not asked for anything yet should not be held at the door,
     and a reload is the one navigation the person deliberately triggered.

     Read from the Navigation Timing entry, which reports how this document was
     reached: 'navigate', 'reload', 'back_forward' or 'prerender'. The old
     performance.navigation.type is the fallback for anything that predates it.
     Back/forward is not a reload — bfcache restores are cleared in pageshow. */
  const isReload = (() => {
    try {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav && nav.type) return nav.type === 'reload';
      return performance.navigation && performance.navigation.type === 1;
    } catch (e) { return false; }
  })();

  // `seen` now only decides whether the session has been visited at all; the
  // full loader is gated on the reload above, not on this.
  const seen = !isReload;


  // A running figure, articulated rather than flip-booked: each limb is a group
  // rotating about its own joint, so a short overlay still shows a real stride.
  const RUNNER =
    `<svg class="runner" viewBox="0 0 64 74" aria-hidden="true">
       <g class="runner__body">
         <circle class="runner__head" cx="35" cy="11" r="6"/>
         <path class="runner__torso" d="M34 18 L28 41"/>
         <g class="runner__arm runner__arm--a"><path d="M32 24 L21 33"/></g>
         <g class="runner__arm runner__arm--b"><path d="M32 24 L43 31"/></g>
         <g class="runner__leg runner__leg--a"><path d="M28 41 L19 56"/><path d="M19 56 L25 67"/></g>
         <g class="runner__leg runner__leg--b"><path d="M28 41 L38 53"/><path d="M38 53 L37 67"/></g>
       </g>
       <path class="runner__ground" d="M8 70 H56"/>
     </svg>`;

  // ── build the overlay ──────────────────────────────────────────────────────
  const el = document.createElement('div');
  el.id = 'loader';
  el.setAttribute('aria-hidden', 'true');

  if (seen) {
    el.className = 'is-quick';
    el.innerHTML = RUNNER;
  } else {
    const chars = [...NAME].map((ch, i, all) => {
      if (ch === ' ') return '<span style="display:inline-block;width:0.28em;animation:none"></span>';
      const weight = Math.round(200 + 700 * (i / (all.length - 1)));
      return `<span style="font-weight:${weight};animation-delay:${(i * 0.032).toFixed(3)}s">${ch}</span>`;
    }).join('');
    // Isometric tower — four blocks falling in alternately and stacking down.
    // Adapted from Uiverse.io by csozidev (MIT); recoloured from its blue to
    // the site's accent so it follows the palette instead of fighting it.
    el.innerHTML =
      `<div class="loader__content">
         <div class="tower" aria-hidden="true">
           ${[1, 2, 3, 4].map(n =>
             `<div class="tower__box tower__box--${n}">
                <div class="tower__left"></div>
                <div class="tower__right"></div>
                <div class="tower__top"></div>
              </div>`).join('')}
         </div>
         <div class="loader__text">${chars}</div>
       </div>`;
  }

  (document.body || document.documentElement).appendChild(el);

  // ── dismiss ────────────────────────────────────────────────────────────────
  const start = performance.now();
  let done = false;

  function dismiss() {
    if (done) return;
    done = true;
    // Nothing to record any more — which loader runs is decided by the
    // navigation type, not by whether this session has been here before.
    el.classList.add('is-done');
    setTimeout(() => el.remove(), OUT_MS);
  }

  function ready() {
    const held = performance.now() - start;
    const floor = seen ? MIN_QUICK : MIN_FULL;
    setTimeout(dismiss, Math.max(0, floor - held));
  }

  if (document.readyState === 'complete') ready();
  else window.addEventListener('load', ready, { once: true });
  setTimeout(dismiss, MAX_WAIT);

  // ── transition out on internal navigation ─────────────────────────────────
  // Cover the page before the browser starts painting the next one, so the two
  // documents never flash white between them.
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;

    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    const url = new URL(href, location.href);
    if (url.origin !== location.origin) return;
    // same page, different anchor — that is a scroll, not a navigation
    if (url.pathname === location.pathname && url.search === location.search) return;

    e.preventDefault();
    const out = document.createElement('div');
    out.id = 'loader';
    out.className = 'is-quick is-entering';
    out.setAttribute('aria-hidden', 'true');
    out.innerHTML = RUNNER;
    document.body.appendChild(out);
    requestAnimationFrame(() => out.classList.remove('is-entering'));
    setTimeout(() => { location.href = url.href; }, 130);
  });

  // Coming back via the back button restores from cache with the overlay still
  // painted — clear it.
  window.addEventListener('pageshow', e => {
    if (e.persisted) document.querySelectorAll('#loader').forEach(n => n.remove());
  });
})();
