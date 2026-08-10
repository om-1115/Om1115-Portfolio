/* The footer wordmark as a harmonium.

   Each letter of the name is a key. Hover one and it sounds that degree of the
   sargam — Sa Re Ga Ma Pa Dha Ni — and holds while the pointer stays on it,
   the way a reed keeps sounding while the key is down. Leave and it releases.

   Tuning is just intonation from Sa rather than equal temperament: the ratios
   below are the ones the scale is actually built from, and the thirds and sixths
   land noticeably sweeter than their tempered equivalents. Sa sits at middle C.

   The timbre is a reed organ, not a sine wave. A harmonium's voice comes from
   air over a metal reed: rich in odd harmonics, slightly buzzy, and never
   perfectly steady. So each note is two detuned sawtooths plus a triangle for
   body, run through a lowpass to take the edge off, with a slow breathy attack
   and a little vibrato once the note settles.

   Browsers will not let a page make sound before the visitor has interacted with
   it, and hovering does not count as interaction. So the context is created on
   the first real gesture — a pointer press, a key, a touch — and until then the
   keys light up silently rather than appearing broken. */

(function () {
  if (typeof document === 'undefined' || window.__sargam) return;
  window.__sargam = true;

  const RATIOS = [1, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 15 / 8];   // Sa … Ni
  const SA = 261.63;                                                // middle C
  const GLYPH = '[data-note]';

  let ctx = null;
  let master = null;
  const voices = new Map();     // path element → running voice

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ensureContext() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.14;          // quiet by default; this is a footer, not a demo
    master.connect(ctx.destination);
    return ctx;
  }

  // Unlock on the first genuine gesture. Hover is deliberately not in this list
  // — it is not user activation, and asking for the context on mousemove just
  // logs a warning in every browser.
  const unlock = () => {
    const c = ensureContext();
    if (c && c.state === 'suspended') c.resume();
    document.documentElement.classList.add('sargam-ready');
  };
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
    document.addEventListener(ev, unlock, { once: true, passive: true })
  );

  function press(el) {
    const c = ctx;
    if (!c || c.state !== 'running') return;      // silent until unlocked
    if (voices.has(el)) return;

    const degree = parseInt(el.dataset.note, 10);
    if (!Number.isFinite(degree)) return;
    const freq = SA * RATIOS[degree % RATIOS.length];
    const t = c.currentTime;

    const gain = c.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(1, t + 0.05);   // reed takes a moment to speak

    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1900, t);
    filter.Q.value = 0.7;

    // two saws a few cents apart give the beating a single reed cannot
    const oscs = [
      { type: 'sawtooth', detune: -6, level: 0.5 },
      { type: 'sawtooth', detune: +7, level: 0.5 },
      { type: 'triangle', detune: 0, level: 0.75 },
    ].map(spec => {
      const o = c.createOscillator();
      o.type = spec.type;
      o.frequency.value = freq;
      o.detune.value = spec.detune;
      const g = c.createGain();
      g.gain.value = spec.level;
      o.connect(g).connect(filter);
      o.start(t);
      return o;
    });

    // vibrato, faded in — a held harmonium note wavers, it does not from the first instant
    const lfo = c.createOscillator();
    lfo.frequency.value = 5.2;
    const lfoGain = c.createGain();
    lfoGain.gain.setValueAtTime(0, t);
    lfoGain.gain.linearRampToValueAtTime(3.2, t + 0.6);
    lfo.connect(lfoGain);
    oscs.forEach(o => lfoGain.connect(o.detune));
    lfo.start(t);

    filter.connect(gain).connect(master);
    voices.set(el, { oscs, lfo, gain });
  }

  function release(el) {
    const v = voices.get(el);
    if (!v) return;
    voices.delete(el);
    const t = ctx.currentTime;
    v.gain.gain.cancelScheduledValues(t);
    v.gain.gain.setValueAtTime(Math.max(v.gain.gain.value, 0.0001), t);
    v.gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);   // reeds do not stop dead
    v.oscs.concat(v.lfo).forEach(o => { try { o.stop(t + 0.32); } catch (e) {} });
  }

  // ── wiring ─────────────────────────────────────────────────────────────────
  // Delegated, because the footer is rendered from script and the wordmark can
  // be replaced by the morph animation after load.
  document.addEventListener('pointerover', e => {
    const el = e.target.closest && e.target.closest(GLYPH);
    if (!el) return;
    el.classList.add('is-playing');
    showLabel(el);
    if (!reduced()) press(el);
  });

  document.addEventListener('pointerout', e => {
    const el = e.target.closest && e.target.closest(GLYPH);
    if (!el) return;
    el.classList.remove('is-playing');
    hideLabel(el);
    release(el);
  });

  // A press on a key is both the unlock gesture and a note, so the very first
  // letter someone clicks actually sounds instead of being swallowed.
  document.addEventListener('pointerdown', e => {
    const el = e.target.closest && e.target.closest(GLYPH);
    if (!el) return;
    unlock();
    setTimeout(() => { if (!reduced()) press(el); }, 0);
  });

  // Keyboard: the wordmark is not a control, so this only serves someone who has
  // tabbed to it. Focus sounds the note, blur releases it.
  document.addEventListener('focusin', e => {
    const el = e.target.closest && e.target.closest(GLYPH);
    if (el) { el.classList.add('is-playing'); showLabel(el); if (!reduced()) press(el); }
  });
  document.addEventListener('focusout', e => {
    const el = e.target.closest && e.target.closest(GLYPH);
    if (el) { el.classList.remove('is-playing'); hideLabel(el); release(el); }
  });

  /* The sargam syllable, floated over the letter being held. Positioned from the
     glyph's own bounding box in SVG user units so it tracks the letter at any
     size the wordmark is rendered. */
  function showLabel(el) {
    const svg = el.ownerSVGElement;
    if (!svg) return;
    let label = svg.querySelector('.ft__sargam');
    if (!label) {
      label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('class', 'ft__sargam');
      label.setAttribute('text-anchor', 'middle');
      svg.appendChild(label);
    }
    const box = el.getBBox();
    label.setAttribute('x', box.x + box.width / 2);
    label.setAttribute('y', box.y - 40);
    label.textContent = el.dataset.sargam || '';
    label.classList.add('is-on');
  }

  function hideLabel(el) {
    const svg = el.ownerSVGElement;
    const label = svg && svg.querySelector('.ft__sargam');
    if (label) label.classList.remove('is-on');
  }

  // Never leave a reed sounding into a hidden tab.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) [...voices.keys()].forEach(release);
  });
})();
