/* Footer wordmark: dots and bars morph into the letters of the name.

   GSAP + MorphSVG are fetched only when the footer is close to the viewport, so
   nothing is downloaded on a visit that never scrolls that far. Everything about
   this is optional — the SVG already contains the finished wordmark, and any
   failure path (reduced motion, blocked CDN, no JS) simply leaves it there. */

(function () {
  const GSAP = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js';
  const MORPH = 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/MorphSVGPlugin.min.js';

  const load = src => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.async = true;
    s.onload = resolve; s.onerror = () => reject(new Error('failed to load ' + src));
    document.head.appendChild(s);
  });

  function initWordmarkMorph() {
    const svg = document.querySelector('[data-wordmark]');
    if (!svg || svg.dataset.morphed) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const glyphs = [...svg.querySelectorAll('.ft__glyph')];
    const ghost = svg.querySelector('.ft__svg-ghost');
    if (!glyphs.length) return;

    // Collapse to the start shapes. The footer is below the fold everywhere on
    // this site, so this is never seen as a pop.
    const restore = () => {
      glyphs.forEach(g => g.setAttribute('d', g.dataset.to));
      svg.classList.remove('is-seeded');
    };
    glyphs.forEach(g => g.setAttribute('d', g.dataset.from));
    svg.classList.add('is-seeded');

    let started = false;
    const run = async () => {
      if (started) return;
      started = true;
      svg.dataset.morphed = '1';
      try {
        if (!window.gsap) await load(GSAP);
        if (!window.MorphSVGPlugin) await load(MORPH);
        gsap.registerPlugin(MorphSVGPlugin);
      } catch (e) {
        restore();               // CDN blocked — show the wordmark and move on
        return;
      }

      // One tween per glyph with an explicit target. A single tween over the
      // set with a function-based value looked right but morphed every glyph
      // to a re-indexed version of itself, so each target is stated outright.
      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
      glyphs.forEach((g, i) => {
        tl.to(g, { duration: 0.9, morphSVG: { shape: g.dataset.to, shapeIndex: 'auto' } }, i * 0.075);
      });

      // the offset impression only arrives once the letters have, so the
      // transition never shows two legible wordmarks at the same time
      tl.fromTo(ghost, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '>-0.2')
        .add(() => svg.classList.remove('is-seeded'));
    };

    if (!('IntersectionObserver' in window)) return run();
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { io.disconnect(); run(); }
    }, { rootMargin: '200px 0px', threshold: 0 });
    io.observe(svg);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initWordmarkMorph, 0));
  } else {
    setTimeout(initWordmarkMorph, 0);
  }
  window.initWordmarkMorph = initWordmarkMorph;
})();
