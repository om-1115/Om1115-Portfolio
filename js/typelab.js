/* Indic Type Lab — measures how Devanagari breaks in the faces designers reach
   for, live, in the visitor's own browser.

   The rule the whole page follows: every number here came out of a measurement
   taken a moment ago, not from a table someone wrote down. Where something
   cannot be measured honestly it is not shown — see TYPELAB-PHASE-0.md, which
   records the technique that failed verification and why the fallback detector
   is therefore not in this build.

   State lives in the URL, because people share the specific broken case and
   never the homepage. */

(function () {
  const $ = sel => document.querySelector(sel);

  // Faces. Latin-only ones are here on purpose — they are the negative case.
  const FACES = [
    { id: 'noto',    name: 'Noto Sans Devanagari', stack: '"Noto Sans Devanagari", sans-serif', indic: true,  note: 'The reference baseline' },
    { id: 'anek',    name: 'Anek Devanagari',      stack: '"Anek Devanagari", sans-serif',      indic: true,  note: 'Ek Type — variable, modern' },
    { id: 'mukta',   name: 'Mukta',                stack: '"Mukta", sans-serif',                indic: true,  note: 'Ek Type' },
    { id: 'poppins', name: 'Poppins',              stack: '"Poppins", sans-serif',              indic: true,  note: 'Indian Type Foundry — Latin face that did the work' },
    { id: 'inter',   name: 'Inter',                stack: '"Inter", sans-serif',                indic: false, note: 'Latin-only — the negative case' },
  ];

  /* Strings from BRIEF §4.8, unchanged. Each exercises a specific failure, so
     swapping in generic text would quietly remove the point of the tool. */
  const STRINGS = [
    { id: 'hindi', text: 'हिंदी',                    lang: 'hi', tests: 'pre-base ि, post-base ी, anusvara ं — the tall-stack case' },
    { id: 'conj',  text: 'क्ष त्र ज्ञ',                lang: 'hi', tests: 'the three conjuncts every face is tested on' },
    { id: 'below', text: 'कृ रु दूध',                 lang: 'hi', tests: 'below-base marks, half forms' },
    { id: 'nukta', text: 'क़ ज़ फ़',                   lang: 'hi', tests: 'nukta composition' },
    { id: 'mixed', text: 'ABHA नंबर 14-1234-5678',   lang: 'hi', tests: 'Latin + Devanagari + digits on one line — the metrics-jump case' },
  ];

  const DEFAULTS = { face: 'noto', str: 'hindi', size: 48, lh: 1.24, track: 0 };

  // ── URL state (BRIEF C5) ───────────────────────────────────────────────────
  function readState() {
    const q = new URLSearchParams(location.search);
    const s = { ...DEFAULTS };
    if (FACES.some(f => f.id === q.get('face'))) s.face = q.get('face');
    if (STRINGS.some(t => t.id === q.get('str'))) s.str = q.get('str');
    const num = (k, min, max) => {
      const v = parseFloat(q.get(k));
      return Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : null;
    };
    const size = num('size', 12, 120); if (size !== null) s.size = size;
    const lh = num('lh', 0.8, 2.4);    if (lh !== null) s.lh = lh;
    const tr = num('track', 0, 0.2);   if (tr !== null) s.track = tr;
    return s;
  }

  function writeState(s) {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(s)) if (v !== DEFAULTS[k]) q.set(k, v);
    const url = q.toString() ? `?${q}` : location.pathname;
    history.replaceState(null, '', url);
  }

  let state = readState();
  const face = () => FACES.find(f => f.id === state.face);
  const str  = () => STRINGS.find(t => t.id === state.str);

  // ── Measurement ────────────────────────────────────────────────────────────
  const mctx = document.createElement('canvas').getContext('2d');

  /* The one technique Phase 0 verified. actualBoundingBox* is the ink of this
     exact string, which is the whole point — font-wide metrics cannot tell you
     that हिंदी is taller than हद. */
  function measure(text, px, stack) {
    mctx.font = `${px}px ${stack}`;
    const m = mctx.measureText(text);
    return {
      inkAscent:  m.actualBoundingBoxAscent,
      inkDescent: m.actualBoundingBoxDescent,
      fontAscent: m.fontBoundingBoxAscent,
      fontDescent: m.fontBoundingBoxDescent,
      width: m.width,
    };
  }

  /* Where the ink sits relative to the CSS line box.

     A line box taller than the content area distributes the difference as
     half-leading, evenly above and below — so the space above the text is
     (lineBox - contentArea) / 2, and ink clips only once it eats through both
     that and the font's own ascent. This is the calculation the page exists to
     show, so it is written out rather than folded into one expression. */
  function clipping(text, px, lh, stack) {
    const m = measure(text, px, stack);
    const lineBox = px * lh;
    const contentArea = m.fontAscent + m.fontDescent;
    const halfLead = (lineBox - contentArea) / 2;
    const roomAbove = halfLead + m.fontAscent;   // line-box top → baseline
    const roomBelow = halfLead + m.fontDescent;  // baseline → line-box bottom
    return {
      ...m, lineBox, contentArea, halfLead, roomAbove, roomBelow,
      overAbove: m.inkAscent - roomAbove,        // positive = clipped on top
      overBelow: m.inkDescent - roomBelow,
      clipped: m.inkAscent > roomAbove || m.inkDescent > roomBelow,
    };
  }

  /* The smallest line-height at which nothing clips, found by measuring rather
     than by consulting a table. Ink is fixed for a given size, so this walks
     line-height upward until both overflows clear. */
  function safeLineHeight(text, px, stack) {
    for (let lh = 0.8; lh <= 3.0; lh += 0.01) {
      const c = clipping(text, px, lh, stack);
      if (!c.clipped) return Math.round(lh * 100) / 100;
    }
    return null;
  }

  // ── The signature graphic: em box, line box, measured ink ───────────────────
  function drawOverlay() {
    const cv = $('#tl-canvas');
    if (!cv) return;
    const wrap = cv.parentElement;
    const W = wrap.clientWidth, H = 260;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    const x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    x.clearRect(0, 0, W, H);

    const px = state.size, f = face().stack, text = str().text;
    const c = clipping(text, px, state.lh, f);
    const baseline = H / 2 + px * 0.35;
    const left = 28;

    const ink = document.documentElement.getAttribute('data-theme') === 'dark' ? '#f0ece5' : '#101012';
    const muted = 'rgba(128,128,140,0.55)';
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-red').trim() || '#c2410c';

    // line box
    x.fillStyle = 'rgba(128,128,140,0.10)';
    x.fillRect(left, baseline - c.roomAbove, c.width, c.lineBox);
    x.strokeStyle = muted; x.setLineDash([4, 4]); x.lineWidth = 1;
    x.strokeRect(left + 0.5, baseline - c.roomAbove + 0.5, c.width, c.lineBox);

    // em box (content area)
    x.setLineDash([]);
    x.strokeStyle = 'rgba(128,128,140,0.85)';
    x.strokeRect(left + 0.5, baseline - c.fontAscent + 0.5, c.width, c.contentArea);

    // the text itself, measured and drawn at the same size
    x.font = `${px}px ${f}`;
    x.fillStyle = ink;
    x.textBaseline = 'alphabetic';
    x.fillText(text, left, baseline);

    // measured ink bounds
    x.strokeStyle = accent; x.lineWidth = 1.5;
    x.strokeRect(left + 0.5, baseline - c.inkAscent + 0.5, c.width, c.inkAscent + c.inkDescent);

    // the overflow region, if any — the thing the page is about
    if (c.overAbove > 0) {
      x.fillStyle = 'rgba(220,38,38,0.22)';
      x.fillRect(left, baseline - c.inkAscent, c.width, c.overAbove);
    }
    if (c.overBelow > 0) {
      x.fillStyle = 'rgba(220,38,38,0.22)';
      x.fillRect(left, baseline + c.roomBelow, c.width, c.overBelow);
    }

    // baseline
    x.strokeStyle = accent; x.setLineDash([2, 3]); x.lineWidth = 1;
    x.beginPath(); x.moveTo(left - 14, baseline + 0.5); x.lineTo(left + c.width + 14, baseline + 0.5); x.stroke();
    x.setLineDash([]);

    return c;
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  function fmt(n) { return (Math.round(n * 10) / 10).toFixed(1); }

  function render() {
    const f = face(), t = str();
    const c = clipping(t.text, state.size, state.lh, f.stack);
    const safe = safeLineHeight(t.text, state.size, f.stack);

    drawOverlay();

    // readout
    const rows = [
      ['ink ascent',       fmt(c.inkAscent) + 'px', 'measured'],
      ['ink descent',      fmt(c.inkDescent) + 'px', 'measured'],
      ['font ascent',      fmt(c.fontAscent) + 'px', 'measured'],
      ['font descent',     fmt(c.fontDescent) + 'px', 'measured'],
      ['line box',         fmt(c.lineBox) + 'px', 'computed'],
      ['half-leading',     fmt(c.halfLead) + 'px', 'computed'],
      ['room above baseline', fmt(c.roomAbove) + 'px', 'computed'],
    ];
    $('#tl-readout').innerHTML = rows.map(([k, v, m]) =>
      `<div class="tl-row"><span class="tl-row__k">${k}</span><span class="tl-row__v">${v}</span><span class="tl-row__m">${m}</span></div>`
    ).join('');

    const verdict = $('#tl-verdict');
    if (c.clipped) {
      verdict.className = 'tl-verdict is-bad';
      verdict.innerHTML = `<strong>Clipping.</strong> Ink overruns the line box by
        ${fmt(Math.max(c.overAbove, 0))}px above and ${fmt(Math.max(c.overBelow, 0))}px below.
        Smallest line-height that clears it in this face at ${state.size}px: <strong>${safe ?? '—'}</strong>.`;
    } else {
      verdict.className = 'tl-verdict is-ok';
      verdict.innerHTML = `<strong>Clears.</strong> ${fmt(c.roomAbove - c.inkAscent)}px of room above the ink.
        It starts clipping below a line-height of <strong>${safe ?? '—'}</strong> at this size in this face.`;
    }

    // live specimen for the tracking module
    const spec = $('#tl-specimen');
    spec.style.fontFamily = f.stack;
    spec.style.fontSize = state.size + 'px';
    spec.style.lineHeight = String(state.lh);
    spec.style.letterSpacing = state.track + 'em';
    spec.textContent = t.text;
    spec.setAttribute('lang', t.lang);

    $('#tl-track-note').textContent = state.track > 0
      ? `The shirorekha is broken in ${Math.max(0, [...t.text].length - 1)} places — letter-spacing inserts space after every cluster, including inside a word.`
      : 'Raise the tracking and watch the shirorekha — Devanagari’s connecting headline — come apart.';

    // grapheme readout, measured live
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const seg = new Intl.Segmenter(t.lang, { granularity: 'grapheme' });
      const clusters = [...seg.segment(t.text)].map(s => s.segment);
      $('#tl-graphemes').innerHTML =
        `<p class="tl-note">
           <code>.length</code> is <strong>${t.text.length}</strong> —
           <code>Intl.Segmenter</code> finds <strong>${clusters.length}</strong> grapheme cluster${clusters.length === 1 ? '' : 's'}.
           <code>.slice(0,1)</code> gives “${t.text.slice(0, 1)}”, which is ${t.text.slice(0, 1) === clusters[0] ? 'the whole first cluster' : 'half of one'}.
         </p>
         <div class="tl-clusters">${clusters.map(g => `<span lang="${t.lang}">${g}</span>`).join('')}</div>`;
    }

    // labels
    $('#tl-size-out').textContent = state.size + 'px';
    $('#tl-lh-out').textContent = state.lh.toFixed(2);
    $('#tl-track-out').textContent = state.track.toFixed(3) + 'em';
    $('#tl-face-note').textContent = f.note;

    for (const [id, label] of [
      ['tl-size', `${state.size} pixels`],
      ['tl-lh', `line height ${state.lh.toFixed(2)}, ink ${c.clipped ? 'clipping' : 'clear'}`],
      ['tl-track', `${state.track.toFixed(3)} em`],
    ]) {
      const el = document.getElementById(id);
      if (el) el.setAttribute('aria-valuetext', label);
    }

    writeState(state);
  }

  // ── Wire up ────────────────────────────────────────────────────────────────
  function init() {
    if (!$('#tl-canvas')) return;

    $('#tl-faces').innerHTML = FACES.map(f =>
      `<button class="tl-chip${f.id === state.face ? ' is-active' : ''}" data-face="${f.id}">${f.name}</button>`
    ).join('');
    $('#tl-strings').innerHTML = STRINGS.map(t =>
      `<button class="tl-chip${t.id === state.str ? ' is-active' : ''}" data-str="${t.id}" lang="${t.lang}" title="${t.tests}">${t.text}</button>`
    ).join('');

    document.addEventListener('click', e => {
      const fb = e.target.closest('[data-face]');
      if (fb) {
        state.face = fb.dataset.face;
        $('#tl-faces').querySelectorAll('.tl-chip').forEach(b => b.classList.toggle('is-active', b === fb));
        render();
      }
      const sb = e.target.closest('[data-str]');
      if (sb) {
        state.str = sb.dataset.str;
        $('#tl-strings').querySelectorAll('.tl-chip').forEach(b => b.classList.toggle('is-active', b === sb));
        render();
      }
    });

    const bind = (id, key, parse) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.value = state[key];
      el.addEventListener('input', () => { state[key] = parse(el.value); render(); });
    };
    bind('tl-size', 'size', v => parseInt(v, 10));
    bind('tl-lh', 'lh', v => parseFloat(v));
    bind('tl-track', 'track', v => parseFloat(v));

    const copy = $('#tl-copy');
    if (copy) copy.addEventListener('click', () => {
      navigator.clipboard.writeText(location.href).then(() => {
        copy.textContent = 'Link copied';
        setTimeout(() => { copy.textContent = 'Copy link to this case'; }, 1800);
      });
    });

    // Fonts must be loaded before anything is measured, or the numbers describe
    // the fallback. font-display:block on the stylesheet keeps the visible text
    // honest for the same reason.
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(render);

    let rz;
    window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(render, 150); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
