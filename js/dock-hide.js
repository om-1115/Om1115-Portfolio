/* Get the dock out of the way while someone is reading.

   The pill is fixed over the bottom of the page, which is fine on a hero and
   actively bad over a project card — it sat across the card's own description.
   So it tucks away on downward scroll and comes back the moment the reader
   scrolls up, which is when they are looking for navigation rather than content.

   Reads scrollTop from #scroll-wrap, not the window: this page scrolls an inner
   element, so a window scroll listener never fires. */

(function () {
  if (typeof document === 'undefined' || window.__dockHide) return;
  window.__dockHide = true;

  const TOP_SAFE = 120;   // never hide near the top of the page
  const DEADZONE = 6;     // ignore sub-pixel jitter and trackpad noise

  function init() {
    const scroller = document.getElementById('scroll-wrap');
    const wrap = document.getElementById('dock-wrap');
    if (!scroller || !wrap) return;

    let last = scroller.scrollTop;
    let queued = false;

    const read = () => {
      queued = false;
      const y = scroller.scrollTop;
      const delta = y - last;
      if (Math.abs(delta) < DEADZONE) return;
      last = y;

      // Bottom of the page: keep it up, or it can never be reached again.
      const atBottom = y + scroller.clientHeight >= scroller.scrollHeight - 4;
      wrap.classList.toggle('is-tucked', delta > 0 && y > TOP_SAFE && !atBottom);
    };

    scroller.addEventListener('scroll', () => {
      if (!queued) { queued = true; requestAnimationFrame(read); }
    }, { passive: true });

    // A pointer heading for the dock should bring it back, not chase it away.
    wrap.addEventListener('pointerenter', () => wrap.classList.remove('is-tucked'));
  }

  // The dock is rendered from script, so wait for the page to assemble.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.addEventListener('load', init);
})();
