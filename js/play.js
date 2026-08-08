// Apply saved theme before render to avoid flash
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
})();

// ─── Shared arcade plumbing ───────────────────────────────────────────────────
// Chiptune beeper — lazy AudioContext, created on first gesture
let _audioCtx = null;
function beep(freq, dur, type) {
  try {
    _audioCtx = _audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (_audioCtx.state === "suspended") _audioCtx.resume();
    const osc = _audioCtx.createOscillator();
    const gain = _audioCtx.createGain();
    osc.type = type || "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.03, _audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, _audioCtx.currentTime + dur);
    osc.connect(gain).connect(_audioCtx.destination);
    osc.start();
    osc.stop(_audioCtx.currentTime + dur);
  } catch (e) { /* no sound, no problem */ }
}

// Keyboard routing — keys go to the cabinet under the cursor (or last clicked)
let activeGame = "kern";
function bindCabinet(canvas, name) {
  const cab = canvas.closest(".play__crt");
  cab.addEventListener("mouseenter", () => { activeGame = name; });
  cab.addEventListener("click", () => { activeGame = name; });
}

// ─── Page section ─────────────────────────────────────────────────────────────
function PlaySection() {
  return `
    <section class="play" id="top">
      <div class="cs-topbar">
        <a class="cs-topbar__back" href="index.html">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Back to home
        </a>
        <span class="cs-topbar__crumb">06 MACHINES · NO QUARTERS</span>
      </div>

      <header class="play__head">
        <p class="play__eyebrow">The arcade · Insert coin, it's free</p>
        <h1 class="play__title">Play here.</h1>
        <p class="play__sub">Six machines, no quarters — a tiny museum of UX laws you can lose to. Spot the off pixel, fix the kerning, race <em>Fitts</em>, decide under <em>Hick</em>, stretch <em>Miller's</em> 7±2, and judge contrast like a WCAG auditor. High scores stick around.</p>
      </header>

      <div class="play__arcade">
        <div class="play__crt play__crt--amber">
          <div class="play__hud">
            <span>PIXEL·PERFECT</span>
            <span id="pp-score">SCORE 00000</span>
            <span id="pp-lives">■■■</span>
          </div>
          <div class="play__screen">
            <canvas id="pp-canvas" width="400" height="400"></canvas>
            <div class="play__scanlines" aria-hidden="true"></div>
          </div>
          <p class="play__hint">ONE TILE IS OFF — CLICK IT BEFORE THE BAR DIES</p>
        </div>

        <div class="play__crt play__crt--cyan">
          <div class="play__hud">
            <span>KERN·TYPE</span>
            <span id="kt-score">SCORE 0000</span>
            <span id="kt-round">ROUND 0/8</span>
          </div>
          <div class="play__screen">
            <canvas id="kt-canvas" width="400" height="400"></canvas>
            <div class="play__scanlines" aria-hidden="true"></div>
          </div>
          <p class="play__hint">ONE LETTER DRIFTED — ARROWS NUDGE &nbsp;·&nbsp; ENTER LOCKS</p>
        </div>

        <div class="play__crt play__crt--violet">
          <div class="play__hud">
            <span>TAP·TARGET</span>
            <span id="tt-count">TARGET 0/15</span>
            <span id="tt-best">BEST 0.00</span>
          </div>
          <div class="play__screen">
            <canvas id="tt-canvas" width="400" height="400"></canvas>
            <div class="play__scanlines" aria-hidden="true"></div>
          </div>
          <p class="play__hint">CLICK THE RINGS — FITTS'S LAW IS TIMING YOU</p>
        </div>

        <div class="play__crt">
          <div class="play__hud">
            <span>HICK'S·LAW</span>
            <span id="hk-round">ROUND 0/10</span>
            <span id="hk-best">BEST 0000</span>
          </div>
          <div class="play__screen">
            <canvas id="hk-canvas" width="400" height="400"></canvas>
            <div class="play__scanlines" aria-hidden="true"></div>
          </div>
          <p class="play__hint">FIND THE NAMED BUTTON — CHOICES MULTIPLY</p>
        </div>

        <div class="play__crt play__crt--rose">
          <div class="play__hud">
            <span>MILLER'S·LAW</span>
            <span id="ml-span">SPAN 0</span>
            <span id="ml-best">BEST 0</span>
          </div>
          <div class="play__screen">
            <canvas id="ml-canvas" width="400" height="400"></canvas>
            <div class="play__scanlines" aria-hidden="true"></div>
          </div>
          <p class="play__hint">WATCH THE SEQUENCE — REPLAY IT — 7±2 AWAITS</p>
        </div>

        <div class="play__crt play__crt--white">
          <div class="play__hud">
            <span>CONTRAST·COP</span>
            <span id="cc-score">SCORE 00000</span>
            <span id="cc-round">ROUND 0/12</span>
          </div>
          <div class="play__screen">
            <canvas id="cc-canvas" width="400" height="400"></canvas>
            <div class="play__scanlines" aria-hidden="true"></div>
          </div>
          <p class="play__hint">DOES IT PASS WCAG AA (4.5:1)? &nbsp;✗ OR ✓</p>
        </div>
      </div>
    </section>`;
}

// ─── Pixel Perfect — spot the tile that's off by a hair ──────────────────────
function initPixelPerfect() {
  const canvas = document.getElementById("pp-canvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("pp-score");
  const livesEl = document.getElementById("pp-lives");
  bindCabinet(canvas, "pp");

  const W = canvas.width, H = canvas.height;
  const PAD = 26;
  const GAP = 10;
  const AREA_TOP = 34;
  const MAX_LIVES = 3;

  const COL = {
    bg: "#0c0a08",
    amber: "#ffb000",
    dim: "rgba(255, 176, 0, 0.55)",
    faint: "rgba(255, 176, 0, 0.16)",
    bad: "#f90000",
  };

  const TYPES = ["bright", "size", "radius", "offset", "tilt"];
  const lerp = (a, b, t) => a + (b - a) * t;
  const pad5 = (n) => String(n).padStart(5, "0");

  let state, round, score, lives, tiles, oddIndex, deadline, roundTime;
  let hovered = -1, flash = null, reveal = null, rafId = null, hiddenAt = null;
  let best = parseInt(localStorage.getItem("pp-best"), 10) || 0;

  function gridSize() { return Math.min(3 + Math.floor((round - 1) / 3), 6); }

  function newRound() {
    const n = gridSize();
    const t = Math.min(1, round / 14);
    const type = round === 1 ? "bright" : TYPES[Math.floor(Math.random() * TYPES.length)];

    const tileW = (W - PAD * 2 - GAP * (n - 1)) / n;
    const tileH = (H - AREA_TOP - PAD - GAP * (n - 1)) / n;
    oddIndex = Math.floor(Math.random() * n * n);
    tiles = [];

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        const i = row * n + col;
        const tile = {
          x: PAD + col * (tileW + GAP),
          y: AREA_TOP + row * (tileH + GAP),
          w: tileW,
          h: tileH,
          r: Math.min(tileW, tileH) * 0.14,
          bright: 0.52,
          rot: 0,
        };
        if (i === oddIndex) {
          if (type === "bright") tile.bright += (Math.random() < 0.5 ? -1 : 1) * lerp(0.30, 0.08, t);
          if (type === "size") { const d = Math.min(tileW, tileH) * lerp(0.18, 0.05, t); tile.x += d / 2; tile.y += d / 2; tile.w -= d; tile.h -= d; }
          if (type === "radius") tile.r = Math.min(tileW, tileH) * (Math.random() < 0.5 ? 0.42 : 0.02);
          if (type === "offset") { const d = lerp(9, 3, t); tile.x += (Math.random() < 0.5 ? -d : d); tile.y += (Math.random() < 0.5 ? -d : d) * 0.6; }
          if (type === "tilt") tile.rot = (Math.random() < 0.5 ? -1 : 1) * lerp(0.10, 0.035, t);
        }
        tiles.push(tile);
      }
    }
    roundTime = Math.max(3500, 6200 - round * 140);
    deadline = performance.now() + roundTime;
  }

  function updateHud() {
    scoreEl.textContent = "SCORE " + pad5(score);
    livesEl.textContent = "■".repeat(lives) + "·".repeat(MAX_LIVES - lives);
  }

  function start() {
    state = "running";
    round = 1; score = 0; lives = MAX_LIVES;
    flash = null; reveal = null;
    newRound();
    updateHud();
    beep(523, 0.07, "triangle");
    cancelAnimationFrame(rafId);
    loop();
  }

  function gameOver() {
    state = "over";
    if (score > best) {
      best = score;
      localStorage.setItem("pp-best", best);
    }
    beep(196, 0.14, "triangle");
    setTimeout(() => beep(131, 0.3, "triangle"), 120);
    cancelAnimationFrame(rafId);
    draw();
  }

  function loseLife(revealOdd) {
    lives -= 1;
    updateHud();
    beep(110, 0.15);
    if (lives <= 0) {
      if (revealOdd) reveal = { until: performance.now() + 700 };
      gameOver();
      return;
    }
    if (revealOdd) {
      reveal = { until: performance.now() + 700 };
      deadline = performance.now() + 700 + roundTime;
      setTimeout(() => { if (state === "running") { reveal = null; newRound(); } }, 700);
    } else {
      newRound();
    }
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawTile(tile, i) {
    ctx.save();
    if (tile.rot) {
      ctx.translate(tile.x + tile.w / 2, tile.y + tile.h / 2);
      ctx.rotate(tile.rot);
      ctx.translate(-(tile.x + tile.w / 2), -(tile.y + tile.h / 2));
    }
    ctx.fillStyle = `rgba(255, 176, 0, ${tile.bright})`;
    roundRect(tile.x, tile.y, tile.w, tile.h, tile.r);
    ctx.fill();
    ctx.fillStyle = "rgba(12, 10, 8, 0.55)";
    ctx.fillRect(tile.x + tile.w * 0.16, tile.y + tile.h * 0.26, tile.w * 0.5, Math.max(2, tile.h * 0.07));
    ctx.fillRect(tile.x + tile.w * 0.16, tile.y + tile.h * 0.46, tile.w * 0.68, Math.max(2, tile.h * 0.05));
    ctx.fillRect(tile.x + tile.w * 0.16, tile.y + tile.h * 0.60, tile.w * 0.36, Math.max(2, tile.h * 0.05));
    if (i === hovered && state === "running") {
      ctx.strokeStyle = COL.amber;
      ctx.lineWidth = 1.5;
      roundRect(tile.x - 2, tile.y - 2, tile.w + 4, tile.h + 4, tile.r + 2);
      ctx.stroke();
    }
    if (flash && flash.i === i && performance.now() < flash.until) {
      ctx.strokeStyle = COL.bad;
      ctx.lineWidth = 2.5;
      roundRect(tile.x - 2, tile.y - 2, tile.w + 4, tile.h + 4, tile.r + 2);
      ctx.stroke();
    }
    if (reveal && i === oddIndex) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      roundRect(tile.x - 3, tile.y - 3, tile.w + 6, tile.h + 6, tile.r + 3);
      ctx.stroke();
    }
    ctx.restore();
  }

  function overlayText(lines) {
    ctx.fillStyle = "rgba(12, 10, 8, 0.78)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    lines.forEach(([text, size, color, dy]) => {
      ctx.fillStyle = color;
      ctx.font = size + 'px "JetBrains Mono", monospace';
      ctx.fillText(text, W / 2, H / 2 + dy);
    });
  }

  function draw() {
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, W, H);

    if (state === "running" || reveal) {
      const left = Math.max(0, deadline - performance.now());
      const frac = Math.min(1, left / roundTime);
      ctx.fillStyle = COL.faint;
      ctx.fillRect(PAD, 12, W - PAD * 2, 8);
      ctx.fillStyle = frac < 0.25 ? COL.bad : COL.amber;
      ctx.fillRect(PAD, 12, (W - PAD * 2) * frac, 8);

      tiles.forEach((tile, i) => drawTile(tile, i));

      ctx.fillStyle = COL.dim;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = "right";
      ctx.fillText("ROUND " + round, W - PAD, H - 9);
    }

    if (state === "idle") {
      overlayText([
        ["PIXEL·PERFECT", 22, COL.amber, -40],
        ["NINE TILES. ONE IS WRONG.", 12, COL.dim, -8],
        ["SHADE · SIZE · RADIUS · NUDGE · TILT", 11, COL.dim, 14],
        ["CLICK TO START", 13, COL.amber, 44],
      ]);
    } else if (state === "over") {
      overlayText([
        ["EYES NEED COFFEE", 20, COL.bad, -44],
        ["YOU SURVIVED " + (round - 1) + " ROUND" + (round - 1 === 1 ? "" : "S"), 12, COL.dim, -14],
        ["SCORE " + pad5(score) + (score === best && score > 0 ? "  ·  NEW BEST!" : ""), 13, COL.amber, 12],
        ["CLICK TO RESTART", 12, COL.dim, 40],
      ]);
    }
  }

  function loop() {
    if (state !== "running") return;
    if (!reveal && performance.now() > deadline) {
      loseLife(true);
    }
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function tileAt(px, py) {
    for (let i = 0; i < tiles.length; i++) {
      const t = tiles[i];
      if (px >= t.x && px <= t.x + t.w && py >= t.y && py <= t.y + t.h) return i;
    }
    return -1;
  }

  function canvasPoint(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (W / rect.width),
      y: (e.clientY - rect.top) * (H / rect.height),
    };
  }

  canvas.addEventListener("mousemove", (e) => {
    if (state !== "running") { hovered = -1; return; }
    const p = canvasPoint(e);
    hovered = tileAt(p.x, p.y);
    canvas.style.cursor = hovered >= 0 ? "pointer" : "default";
  });

  canvas.addEventListener("click", (e) => {
    if (state === "idle" || state === "over") { start(); return; }
    if (state !== "running" || reveal) return;
    const p = canvasPoint(e);
    const i = tileAt(p.x, p.y);
    if (i < 0) return;
    if (i === oddIndex) {
      const secsLeft = Math.max(0, (deadline - performance.now()) / 1000);
      score += 100 + Math.ceil(secsLeft) * 10;
      round += 1;
      updateHud();
      beep(784, 0.06, "triangle");
      setTimeout(() => beep(1047, 0.07, "triangle"), 60);
      newRound();
    } else {
      flash = { i, until: performance.now() + 450 };
      loseLife(false);
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (state !== "running") return;
    if (document.hidden) {
      hiddenAt = performance.now();
    } else if (hiddenAt) {
      deadline += performance.now() - hiddenAt;
      hiddenAt = null;
    }
  });

  state = "idle";
  updateHud();
  draw();
}

// ─── Kern Type — nudge the drifted letter back into place ────────────────────
function initKernType() {
  const canvas = document.getElementById("kt-canvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("kt-score");
  const roundEl = document.getElementById("kt-round");
  bindCabinet(canvas, "kern");

  const W = canvas.width, H = canvas.height;
  const ROUNDS = 8;
  const WORDS = [
    "kerning", "baseline", "whitespace", "ligature", "hierarchy",
    "contrast", "rhythm", "grids", "typeface", "serif", "x-height", "widow",
  ];

  const COL = {
    bg: "#0c0a08",
    cyan: "#4dd8ff",
    bright: "#bdeeff",
    dim: "rgba(77, 216, 255, 0.55)",
    faint: "rgba(77, 216, 255, 0.18)",
    bad: "#f90000",
    good: "#33ff66",
  };

  const BTN_Y = 318, BTN_H = 56;
  const BTNS = [
    { x: 26, w: 100, label: "◀", action: "left" },
    { x: 138, w: 124, label: "LOCK", action: "lock" },
    { x: 274, w: 100, label: "▶", action: "right" },
  ];

  let state, round, score, word, letterIdx, offset, layout, feedback;
  let usedWords = [];
  let best = parseInt(localStorage.getItem("kern-best"), 10) || 0;

  const pad4 = (n) => String(n).padStart(4, "0");

  function measureWord(w) {
    let size = 54;
    ctx.font = `600 ${size}px Georgia, serif`;
    let widths = [...w].map((ch) => ctx.measureText(ch).width);
    let total = widths.reduce((a, b) => a + b, 0);
    if (total > 340) {
      size = Math.floor(size * (340 / total));
      ctx.font = `600 ${size}px Georgia, serif`;
      widths = [...w].map((ch) => ctx.measureText(ch).width);
      total = widths.reduce((a, b) => a + b, 0);
    }
    const startX = (W - total) / 2;
    const xs = [];
    let acc = startX;
    for (const wd of widths) { xs.push(acc); acc += wd; }
    return { size, xs, widths };
  }

  function newRound() {
    const pool = WORDS.filter((w) => !usedWords.includes(w));
    word = pool[Math.floor(Math.random() * pool.length)];
    usedWords.push(word);
    layout = measureWord(word);
    letterIdx = 1 + Math.floor(Math.random() * (word.length - 2));
    const dirSign = Math.random() < 0.5 ? -1 : 1;
    offset = dirSign * (14 + Math.floor(Math.random() * 15));
    feedback = null;
    updateHud();
  }

  function updateHud() {
    scoreEl.textContent = "SCORE " + pad4(score);
    roundEl.textContent = "ROUND " + (state === "running" ? round : 0) + "/" + ROUNDS;
  }

  function start() {
    state = "running";
    round = 1; score = 0; usedWords = [];
    newRound();
    beep(523, 0.07, "sine");
    draw();
  }

  function lock() {
    if (feedback) return;
    const err = Math.abs(offset);
    const pts = err <= 1 ? 100 : err <= 3 ? 75 : err <= 6 ? 50 : err <= 10 ? 25 : 0;
    score += pts;
    const grade = err <= 1 ? "PERFECT!" : err <= 3 ? "SHARP" : err <= 6 ? "CLOSE" : err <= 10 ? "LOOSE" : "OUCH";
    feedback = { pts, err, grade, until: performance.now() + 1100 };
    updateHud();
    if (pts >= 75) { beep(784, 0.06, "sine"); setTimeout(() => beep(1175, 0.09, "sine"), 70); }
    else if (pts > 0) beep(587, 0.08, "sine");
    else beep(131, 0.2);
    draw();
    setTimeout(() => {
      if (state !== "running") return;
      if (round >= ROUNDS) {
        gameOver();
      } else {
        round += 1;
        newRound();
        draw();
      }
    }, 1100);
  }

  function gameOver() {
    state = "over";
    if (score > best) {
      best = score;
      localStorage.setItem("kern-best", best);
    }
    updateHud();
    beep(392, 0.1, "sine");
    setTimeout(() => beep(523, 0.18, "sine"), 110);
    draw();
  }

  function nudge(d) {
    if (feedback) return;
    offset = Math.max(-40, Math.min(40, offset + d));
    beep(330, 0.025, "sine");
    draw();
  }

  function overlayText(lines) {
    ctx.fillStyle = "rgba(12, 10, 8, 0.78)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    lines.forEach(([text, size, color, dy]) => {
      ctx.fillStyle = color;
      ctx.font = size + 'px "JetBrains Mono", monospace';
      ctx.fillText(text, W / 2, H / 2 + dy);
    });
  }

  function draw() {
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, W, H);

    if (state === "running") {
      ctx.strokeStyle = COL.faint;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(26, 208); ctx.lineTo(W - 26, 208); ctx.stroke();

      ctx.font = `600 ${layout.size}px Georgia, serif`;
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      [...word].forEach((ch, i) => {
        const x = layout.xs[i] + (i === letterIdx ? offset : 0);
        ctx.fillStyle = i === letterIdx ? COL.bright : COL.cyan;
        ctx.fillText(ch, x, 200);
      });

      if (feedback) {
        ctx.strokeStyle = feedback.pts >= 50 ? COL.good : COL.bad;
        ctx.lineWidth = 1;
        ctx.strokeText(word[letterIdx], layout.xs[letterIdx], 200);
        ctx.textAlign = "center";
        ctx.font = '15px "JetBrains Mono", monospace';
        ctx.fillStyle = feedback.pts >= 50 ? COL.good : COL.bad;
        ctx.fillText(`+${feedback.pts} · ${feedback.err}PX OFF · ${feedback.grade}`, W / 2, 254);
      } else {
        const cx = layout.xs[letterIdx] + offset + layout.widths[letterIdx] / 2;
        ctx.fillStyle = COL.dim;
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.fillText("▲", cx, 232);
      }

      BTNS.forEach((b) => {
        ctx.strokeStyle = COL.dim;
        ctx.lineWidth = 1;
        ctx.strokeRect(b.x, BTN_Y, b.w, BTN_H);
        ctx.fillStyle = COL.cyan;
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.label, b.x + b.w / 2, BTN_Y + BTN_H / 2);
      });
      ctx.textBaseline = "alphabetic";

      ctx.fillStyle = COL.dim;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = "right";
      ctx.fillText("ROUND " + round + "/" + ROUNDS, W - 26, 30);
    }

    if (state === "idle") {
      overlayText([
        ["KERN·TYPE", 22, COL.cyan, -40],
        ["ONE LETTER HAS DRIFTED.", 12, COL.dim, -8],
        ["NUDGE IT HOME. PIXELS COUNT.", 12, COL.dim, 14],
        ["CLICK TO START", 13, COL.cyan, 44],
      ]);
    } else if (state === "over") {
      const verdict = score >= 700 ? "OPTICAL PERFECTION" : score >= 500 ? "SHARP EYE" : score >= 300 ? "GETTING THERE" : "USE MORE WHITESPACE";
      overlayText([
        [verdict, 19, COL.cyan, -44],
        ["SCORE " + pad4(score) + " / 800" + (score === best && score > 0 ? "  ·  NEW BEST!" : ""), 13, COL.bright, -10],
        ["TYPE IS WHAT FEELS RIGHT", 11, COL.dim, 18],
        ["CLICK TO RESTART", 12, COL.dim, 44],
      ]);
    }
  }

  document.addEventListener("keydown", (e) => {
    if (activeGame !== "kern" || state !== "running") return;
    if (e.key === "ArrowLeft") { e.preventDefault(); nudge(-2); }
    else if (e.key === "ArrowRight") { e.preventDefault(); nudge(2); }
    else if (e.key === "Enter") { e.preventDefault(); lock(); }
  });

  canvas.addEventListener("click", (e) => {
    if (state === "idle" || state === "over") { start(); return; }
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (W / rect.width);
    const y = (e.clientY - rect.top) * (H / rect.height);
    if (y >= BTN_Y && y <= BTN_Y + BTN_H) {
      const btn = BTNS.find((b) => x >= b.x && x <= b.x + b.w);
      if (!btn) return;
      if (btn.action === "left") nudge(-2);
      if (btn.action === "right") nudge(2);
      if (btn.action === "lock") lock();
    }
  });

  state = "idle";
  updateHud();
  draw();
}

// ─── Tap Target — your pointing throughput, in actual bits per second ────────
function initTapTarget() {
  const canvas = document.getElementById("tt-canvas");
  const ctx = canvas.getContext("2d");
  const countEl = document.getElementById("tt-count");
  const bestEl = document.getElementById("tt-best");
  bindCabinet(canvas, "tap");

  const W = canvas.width, H = canvas.height;
  const TOTAL = 15;

  const COL = {
    bg: "#0c0a08",
    violet: "#c882ff",
    bright: "#e8ccff",
    dim: "rgba(200, 130, 255, 0.55)",
    faint: "rgba(200, 130, 255, 0.15)",
    bad: "#f90000",
  };

  let state, idx, target, shownAt, prevClick, samples, misses, rafId;
  let best = parseFloat(localStorage.getItem("tt-best")) || 0;

  function updateHud() {
    countEl.textContent = "TARGET " + idx + "/" + TOTAL;
    bestEl.textContent = "BEST " + best.toFixed(2);
  }

  function newTarget() {
    const r = 9 + Math.random() * 17;
    target = {
      x: 40 + Math.random() * (W - 80),
      y: 40 + Math.random() * (H - 80),
      r,
    };
    shownAt = performance.now();
  }

  function start() {
    state = "running";
    idx = 0; samples = []; misses = 0;
    prevClick = { x: W / 2, y: H / 2 };
    newTarget();
    updateHud();
    beep(523, 0.07, "sawtooth");
    cancelAnimationFrame(rafId);
    loop();
  }

  function throughput() {
    if (!samples.length) return 0;
    const sum = samples.reduce((acc, s) => acc + s.id / s.secs, 0);
    return sum / samples.length;
  }

  function gameOver() {
    state = "over";
    const tp = throughput();
    if (tp > best) {
      best = tp;
      localStorage.setItem("tt-best", String(tp));
    }
    updateHud();
    beep(659, 0.09, "sawtooth");
    setTimeout(() => beep(880, 0.16, "sawtooth"), 100);
    cancelAnimationFrame(rafId);
    draw();
  }

  function overlayText(lines) {
    ctx.fillStyle = "rgba(12, 10, 8, 0.78)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    lines.forEach(([text, size, color, dy]) => {
      ctx.fillStyle = color;
      ctx.font = size + 'px "JetBrains Mono", monospace';
      ctx.fillText(text, W / 2, H / 2 + dy);
    });
  }

  function draw() {
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, W, H);

    if (state === "running" && target) {
      ctx.strokeStyle = COL.faint;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(target.x, 0); ctx.lineTo(target.x, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, target.y); ctx.lineTo(W, target.y); ctx.stroke();

      const pulse = Math.sin(performance.now() / 140) * 2;
      ctx.strokeStyle = COL.violet;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(target.x, target.y, target.r + pulse, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(target.x, target.y, Math.max(2, (target.r + pulse) * 0.55), 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = COL.bright;
      ctx.beginPath(); ctx.arc(target.x, target.y, 2.5, 0, Math.PI * 2); ctx.fill();

      ctx.fillStyle = COL.dim;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = "right";
      ctx.fillText("MISSES " + misses, W - 26, H - 9);
    }

    if (state === "idle") {
      overlayText([
        ["TAP·TARGET", 22, COL.violet, -52],
        ["15 TARGETS. CLICK FAST.", 12, COL.dim, -20],
        ["WE COMPUTE YOUR POINTING", 11, COL.dim, 4],
        ["THROUGHPUT — FITTS'S LAW, LIVE", 11, COL.dim, 22],
        ["CLICK TO START", 13, COL.violet, 52],
      ]);
    } else if (state === "over") {
      const tp = throughput();
      const verdict = tp > 5.5 ? "ARE YOU A CURSOR?" : tp > 4.5 ? "FAST HANDS" : tp > 3.5 ? "CERTIFIED HUMAN" : "COFFEE FIRST";
      overlayText([
        ["THROUGHPUT", 13, COL.dim, -62],
        [tp.toFixed(2) + " BITS/S", 30, COL.bright, -24],
        [verdict + (tp === best && tp > 0 ? "  ·  NEW BEST!" : ""), 13, COL.violet, 8],
        ["HUMAN AVERAGE ≈ 4–5 BITS/S", 11, COL.dim, 34],
        [misses + " MISS" + (misses === 1 ? "" : "ES") + "  ·  CLICK TO RESTART", 11, COL.dim, 56],
      ]);
    }
  }

  function loop() {
    if (state !== "running") return;
    draw();
    rafId = requestAnimationFrame(loop);
  }

  canvas.addEventListener("click", (e) => {
    if (state === "idle" || state === "over") { start(); return; }
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (W / rect.width);
    const y = (e.clientY - rect.top) * (H / rect.height);
    const d = Math.hypot(x - target.x, y - target.y);
    if (d <= target.r + 3) {
      const secs = Math.max(0.08, (performance.now() - shownAt) / 1000);
      const D = Math.hypot(target.x - prevClick.x, target.y - prevClick.y);
      const id = Math.log2(D / (target.r * 2) + 1);
      samples.push({ id, secs });
      prevClick = { x, y };
      idx += 1;
      updateHud();
      beep(440 + idx * 35, 0.05, "sawtooth");
      if (idx >= TOTAL) gameOver();
      else newTarget();
    } else {
      misses += 1;
      beep(110, 0.1);
    }
  });

  state = "idle";
  idx = 0;
  updateHud();
  draw();
}

// ─── Hick's Law — find the named button as the choices multiply ──────────────
function initHicksLaw() {
  const canvas = document.getElementById("hk-canvas");
  const ctx = canvas.getContext("2d");
  const roundEl = document.getElementById("hk-round");
  const bestEl = document.getElementById("hk-best");
  bindCabinet(canvas, "hick");

  const W = canvas.width, H = canvas.height;
  const ROUNDS = 10;
  const NS = [2, 3, 4, 6, 8, 10, 12, 16, 20, 24]; // choices per round
  const LABELS = [
    "SAVE", "EDIT", "UNDO", "COPY", "PASTE", "CUT", "OPEN", "CLOSE",
    "FILE", "VIEW", "HELP", "ZOOM", "PLAY", "STOP", "BACK", "NEXT",
    "HOME", "MENU", "FIND", "SORT", "CROP", "SYNC", "SEND", "DOCK",
  ];

  // Button grid area — mirrored by layout math
  const AX = 26, AY = 92, AW = 348, AH = 272, GAP = 8;

  const COL = {
    bg: "#0c0a08",
    green: "#33ff66",
    bright: "#b8ffcd",
    dim: "rgba(51, 255, 102, 0.55)",
    faint: "rgba(51, 255, 102, 0.18)",
    bad: "#f90000",
  };

  const pad4 = (n) => String(n).padStart(4, "0");

  let state, round, target, buttons, samples, misses, roundStart, score, flash;
  let best = parseInt(localStorage.getItem("hick-best"), 10) || 0;

  function updateHud() {
    roundEl.textContent = "ROUND " + (state === "running" ? round : 0) + "/" + ROUNDS;
    bestEl.textContent = "BEST " + pad4(best);
  }

  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function newRound() {
    const n = NS[round - 1];
    const labels = shuffled(LABELS).slice(0, n);
    target = labels[Math.floor(Math.random() * n)];
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    const bw = (AW - (cols - 1) * GAP) / cols;
    const bh = (AH - (rows - 1) * GAP) / rows;
    buttons = labels.map((label, i) => ({
      label,
      x: AX + (i % cols) * (bw + GAP),
      y: AY + Math.floor(i / cols) * (bh + GAP),
      w: bw,
      h: bh,
    }));
    flash = null;
    roundStart = performance.now();
    updateHud();
  }

  function start() {
    state = "running";
    round = 1; samples = []; misses = 0; score = 0;
    newRound();
    beep(523, 0.07);
    draw();
  }

  // Least-squares fit of reaction time on log2(n) — Hick's law, live
  function fit() {
    const xs = samples.map((s) => s.bits);
    const ys = samples.map((s) => s.ms);
    const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
    const my = ys.reduce((a, b) => a + b, 0) / ys.length;
    let num = 0, den = 0;
    xs.forEach((x, i) => { num += (x - mx) * (ys[i] - my); den += (x - mx) ** 2; });
    const slope = den ? num / den : 0;
    return { slope: Math.round(slope), avg: Math.round(my) };
  }

  function gameOver() {
    state = "over";
    const totalMs = samples.reduce((a, s) => a + s.ms, 0);
    score = Math.max(0, Math.round((ROUNDS * 2600 - totalMs - misses * 800) / 10));
    if (score > best) {
      best = score;
      localStorage.setItem("hick-best", best);
    }
    updateHud();
    beep(659, 0.09);
    setTimeout(() => beep(880, 0.16), 100);
    draw();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function overlayText(lines) {
    ctx.fillStyle = "rgba(12, 10, 8, 0.78)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    lines.forEach(([text, size, color, dy]) => {
      ctx.fillStyle = color;
      ctx.font = size + 'px "JetBrains Mono", monospace';
      ctx.fillText(text, W / 2, H / 2 + dy);
    });
  }

  function draw() {
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, W, H);

    if (state === "running") {
      // The order
      ctx.textAlign = "center";
      ctx.fillStyle = COL.dim;
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText("CLICK:", W / 2, 38);
      ctx.fillStyle = COL.bright;
      ctx.font = '22px "JetBrains Mono", monospace';
      ctx.fillText(target, W / 2, 66);

      // The choices
      buttons.forEach((b) => {
        const isFlash = flash && flash.label === b.label && performance.now() < flash.until;
        ctx.strokeStyle = isFlash ? COL.bad : COL.dim;
        ctx.lineWidth = isFlash ? 2 : 1;
        roundRect(b.x, b.y, b.w, b.h, 6);
        ctx.stroke();
        ctx.fillStyle = COL.green;
        ctx.font = (b.w < 60 ? 9 : 11) + 'px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.label, b.x + b.w / 2, b.y + b.h / 2);
      });
      ctx.textBaseline = "alphabetic";

      ctx.fillStyle = COL.dim;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = "right";
      ctx.fillText(buttons.length + " CHOICES · MISSES " + misses, W - 26, H - 9);
    }

    if (state === "idle") {
      overlayText([
        ["HICK'S·LAW", 22, COL.green, -52],
        ["FIND THE NAMED BUTTON.", 12, COL.dim, -20],
        ["EVERY ROUND ADDS CHOICES —", 11, COL.dim, 4],
        ["YOUR DECISIONS SLOW BY log₂(N)", 11, COL.dim, 22],
        ["CLICK TO START", 13, COL.green, 52],
      ]);
    } else if (state === "over") {
      const { slope, avg } = fit();
      const verdict = slope < 160 ? "RUTHLESSLY DECISIVE" : slope < 280 ? "CERTIFIED HUMAN" : "CHOICE PARALYSIS";
      overlayText([
        ["HICK'S LAW HOLDS", 18, COL.green, -62],
        ["RT = a + b·log₂(N)", 13, COL.dim, -32],
        ["YOUR SLOPE: " + slope + " MS/BIT", 16, COL.bright, -2],
        ["AVG " + avg + "MS · " + misses + " MISSES", 11, COL.dim, 24],
        [verdict + "  ·  SCORE " + pad4(score) + (score === best && score > 0 ? " · NEW BEST!" : ""), 12, COL.green, 48],
        ["CLICK TO RESTART", 11, COL.dim, 72],
      ]);
    }
  }

  canvas.addEventListener("click", (e) => {
    if (state === "idle" || state === "over") { start(); return; }
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (W / rect.width);
    const y = (e.clientY - rect.top) * (H / rect.height);
    const b = buttons.find((bt) => x >= bt.x && x <= bt.x + bt.w && y >= bt.y && y <= bt.y + bt.h);
    if (!b) return;
    if (b.label === target) {
      samples.push({ ms: performance.now() - roundStart, bits: Math.log2(buttons.length) });
      beep(440 + round * 40, 0.05);
      if (round >= ROUNDS) gameOver();
      else { round += 1; newRound(); draw(); }
    } else {
      misses += 1;
      flash = { label: b.label, until: performance.now() + 400 };
      beep(110, 0.1);
      draw();
      setTimeout(() => { if (state === "running") draw(); }, 420);
    }
  });

  state = "idle";
  updateHud();
  draw();
}

// ─── Miller's Law — how far past 7±2 can your working memory go? ─────────────
function initMillersLaw() {
  const canvas = document.getElementById("ml-canvas");
  const ctx = canvas.getContext("2d");
  const spanEl = document.getElementById("ml-span");
  const bestEl = document.getElementById("ml-best");
  bindCabinet(canvas, "miller");

  const W = canvas.width, H = canvas.height;
  const START_SPAN = 3;
  // 3×3 pad — mirrored by layout math
  const CELL = 72, GAP = 14;
  const X0 = (W - (CELL * 3 + GAP * 2)) / 2; // 78
  const Y0 = 92;

  const COL = {
    bg: "#0c0a08",
    rose: "#ff7eb6",
    bright: "#ffd2e6",
    dim: "rgba(255, 126, 182, 0.55)",
    faint: "rgba(255, 126, 182, 0.16)",
    bad: "#f90000",
    good: "#33ff66",
  };

  let state, span, seq, inputPos, lit, expect, timers = [];
  let best = parseInt(localStorage.getItem("miller-best"), 10) || 0;
  let completed = 0;

  function cellRect(i) {
    return { x: X0 + (i % 3) * (CELL + GAP), y: Y0 + Math.floor(i / 3) * (CELL + GAP), w: CELL, h: CELL };
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function updateHud() {
    spanEl.textContent = "SPAN " + (state === "idle" ? 0 : span);
    bestEl.textContent = "BEST " + best;
  }

  function note(cell, dur) {
    beep(294 * Math.pow(2, cell * 2 / 12), dur || 0.12, "sine");
  }

  function newSequence() {
    seq = [];
    for (let i = 0; i < span; i++) {
      let c;
      do { c = Math.floor(Math.random() * 9); } while (i > 0 && c === seq[i - 1]);
      seq.push(c);
    }
  }

  function showSequence() {
    state = "showing";
    inputPos = 0;
    lit = -1;
    updateHud();
    draw();
    seq.forEach((cell, i) => {
      timers.push(setTimeout(() => {
        lit = cell;
        note(cell);
        draw();
        timers.push(setTimeout(() => { lit = -1; draw(); }, 330));
      }, 600 + i * 520));
    });
    timers.push(setTimeout(() => {
      state = "input";
      lit = -1;
      draw();
    }, 600 + seq.length * 520 + 100));
  }

  function start() {
    clearTimers();
    span = START_SPAN;
    completed = 0;
    expect = null;
    newSequence();
    beep(523, 0.07, "sine");
    showSequence();
  }

  function levelUp() {
    completed = span;
    span += 1;
    updateHud();
    beep(784, 0.07, "sine");
    timers.push(setTimeout(() => beep(1047, 0.08, "sine"), 80));
    timers.push(setTimeout(() => {
      newSequence();
      showSequence();
    }, 900));
  }

  function gameOver(failedAt) {
    state = "over";
    clearTimers();
    expect = failedAt;
    if (completed > best) {
      best = completed;
      localStorage.setItem("miller-best", best);
    }
    updateHud();
    beep(196, 0.14, "sine");
    setTimeout(() => beep(131, 0.3, "sine"), 120);
    draw();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function overlayText(lines) {
    ctx.fillStyle = "rgba(12, 10, 8, 0.78)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    lines.forEach(([text, size, color, dy]) => {
      ctx.fillStyle = color;
      ctx.font = size + 'px "JetBrains Mono", monospace';
      ctx.fillText(text, W / 2, H / 2 + dy);
    });
  }

  function draw() {
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, W, H);

    if (state === "showing" || state === "input") {
      // Status line
      ctx.textAlign = "center";
      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillStyle = state === "showing" ? COL.dim : COL.bright;
      ctx.fillText(state === "showing" ? "WATCH — " + seq.length + " STEPS" : "YOUR TURN", W / 2, 48);

      // The pad
      for (let i = 0; i < 9; i++) {
        const r = cellRect(i);
        const isLit = i === lit;
        ctx.fillStyle = isLit ? COL.rose : "rgba(255, 126, 182, 0.08)";
        roundRect(r.x, r.y, r.w, r.h, 8);
        ctx.fill();
        ctx.strokeStyle = isLit ? COL.bright : COL.faint;
        ctx.lineWidth = isLit ? 2 : 1;
        roundRect(r.x, r.y, r.w, r.h, 8);
        ctx.stroke();
        ctx.fillStyle = isLit ? "#0c0a08" : COL.dim;
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(i + 1), r.x + r.w / 2, r.y + r.h / 2);
      }
      ctx.textBaseline = "alphabetic";

      // Progress dots
      if (state === "input") {
        const total = seq.length;
        const dotGap = 14;
        const x0 = W / 2 - ((total - 1) * dotGap) / 2;
        for (let i = 0; i < total; i++) {
          ctx.fillStyle = i < inputPos ? COL.rose : COL.faint;
          ctx.beginPath();
          ctx.arc(x0 + i * dotGap, H - 26, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    if (state === "idle") {
      overlayText([
        ["MILLER'S·LAW", 22, COL.rose, -52],
        ["WATCH THE PAD LIGHT UP,", 12, COL.dim, -20],
        ["THEN REPLAY THE SEQUENCE.", 12, COL.dim, 2],
        ["WORKING MEMORY HOLDS 7±2", 11, COL.dim, 26],
        ["CLICK TO START", 13, COL.rose, 56],
      ]);
    } else if (state === "over") {
      const verdict = completed >= 9 ? "CHUNKING WIZARD" : completed >= 7 ? "TEXTBOOK 7±2" : completed >= 5 ? "WITHIN SPEC" : "WRITE THINGS DOWN";
      overlayText([
        ["YOUR SPAN", 13, COL.dim, -58],
        [String(completed) + " ITEMS", 30, COL.bright, -20],
        [verdict + (completed === best && completed > 0 ? "  ·  NEW BEST!" : ""), 13, COL.rose, 10],
        ["MILLER (1956): 7±2 CHUNKS", 11, COL.dim, 36],
        ["CLICK TO RESTART", 11, COL.dim, 58],
      ]);
    }
  }

  canvas.addEventListener("click", (e) => {
    if (state === "idle" || state === "over") { start(); return; }
    if (state !== "input") return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (W / rect.width);
    const y = (e.clientY - rect.top) * (H / rect.height);
    let cell = -1;
    for (let i = 0; i < 9; i++) {
      const r = cellRect(i);
      if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { cell = i; break; }
    }
    if (cell < 0) return;
    if (cell === seq[inputPos]) {
      inputPos += 1;
      lit = cell;
      note(cell, 0.08);
      draw();
      timers.push(setTimeout(() => { lit = -1; draw(); }, 160));
      if (inputPos >= seq.length) levelUp();
    } else {
      gameOver(seq[inputPos]);
    }
  });

  state = "idle";
  updateHud();
  draw();
}

// ─── Contrast Cop — does it pass WCAG AA? ─────────────────────────────────────
function initContrastCop() {
  const canvas = document.getElementById("cc-canvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("cc-score");
  const roundEl = document.getElementById("cc-round");
  bindCabinet(canvas, "cc");

  const W = canvas.width, H = canvas.height;
  const ROUNDS = 12;
  const AA = 4.5;

  const COL = {
    bg: "#0c0a08",
    white: "#e6e6e6",
    dim: "rgba(230, 230, 230, 0.55)",
    faint: "rgba(230, 230, 230, 0.14)",
    bad: "#f90000",
    good: "#33ff66",
  };

  const BTN_Y = 322, BTN_H = 52;
  const BTNS = [
    { x: 26, w: 168, label: "✗ FAIL", pass: false },
    { x: 206, w: 168, label: "✓ PASS", pass: true },
  ];

  let state, round, score, streak, correct, pair, feedback;
  let best = parseInt(localStorage.getItem("cc-best"), 10) || 0;

  const pad5 = (n) => String(n).padStart(5, "0");

  function hslToRgb(h, s, l) {
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
  }
  function relLum({ r, g, b }) {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  }
  function contrastRatio(c1, c2) {
    const a = relLum(c1) + 0.05, b = relLum(c2) + 0.05;
    return a > b ? a / b : b / a;
  }
  const hex = ({ r, g, b }) => "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();

  function makePair() {
    const bg = hslToRgb(Math.random() * 360, 0.2 + Math.random() * 0.55, 0.12 + Math.random() * 0.75);
    const band = Math.random();
    const targetRatio = band < 0.3 ? 1.6 + Math.random() * 1.6
      : band < 0.75 ? 3.1 + Math.random() * 3.4
      : 7 + Math.random() * 5;
    const fh = Math.random() * 360, fs = 0.15 + Math.random() * 0.5;
    let fg = null, bestD = Infinity;
    for (let i = 0; i <= 40; i++) {
      const c = hslToRgb(fh, fs, i / 40);
      const d = Math.abs(contrastRatio(c, bg) - targetRatio);
      if (d < bestD) { bestD = d; fg = c; }
    }
    return { bg, fg, ratio: contrastRatio(fg, bg) };
  }

  function newRound() {
    pair = makePair();
    feedback = null;
    updateHud();
  }

  function updateHud() {
    scoreEl.textContent = "SCORE " + pad5(score);
    roundEl.textContent = "ROUND " + (state === "running" ? round : 0) + "/" + ROUNDS;
  }

  function start() {
    state = "running";
    round = 1; score = 0; streak = 0; correct = 0;
    newRound();
    beep(523, 0.07, "square");
    draw();
  }

  function gameOver() {
    state = "over";
    if (score > best) {
      best = score;
      localStorage.setItem("cc-best", best);
    }
    updateHud();
    beep(392, 0.1, "square");
    setTimeout(() => beep(523, 0.18, "square"), 110);
    draw();
  }

  function guess(saidPass) {
    if (feedback) return;
    const isPass = pair.ratio >= AA;
    const right = saidPass === isPass;
    if (right) {
      streak += 1;
      correct += 1;
      score += 100 + (streak - 1) * 25;
      beep(784, 0.06, "square");
    } else {
      streak = 0;
      beep(131, 0.18);
    }
    feedback = { right, isPass, until: performance.now() + 1100 };
    updateHud();
    draw();
    setTimeout(() => {
      if (state !== "running") return;
      if (round >= ROUNDS) gameOver();
      else { round += 1; newRound(); draw(); }
    }, 1100);
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function overlayText(lines) {
    ctx.fillStyle = "rgba(12, 10, 8, 0.78)";
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    lines.forEach(([text, size, color, dy]) => {
      ctx.fillStyle = color;
      ctx.font = size + 'px "JetBrains Mono", monospace';
      ctx.fillText(text, W / 2, H / 2 + dy);
    });
  }

  function draw() {
    ctx.fillStyle = COL.bg;
    ctx.fillRect(0, 0, W, H);

    if (state === "running") {
      ctx.fillStyle = `rgb(${pair.bg.r}, ${pair.bg.g}, ${pair.bg.b})`;
      roundRect(48, 38, W - 96, 190, 10);
      ctx.fill();

      ctx.fillStyle = `rgb(${pair.fg.r}, ${pair.fg.g}, ${pair.fg.b})`;
      ctx.textAlign = "center";
      ctx.font = "600 64px Georgia, serif";
      ctx.fillText("Aa", W / 2, 140);
      ctx.font = "14px Inter, sans-serif";
      ctx.fillText("The quick brown fox jumps over it", W / 2, 188);

      ctx.fillStyle = COL.dim;
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(hex(pair.fg) + "  ON  " + hex(pair.bg), W / 2, 254);

      if (feedback) {
        ctx.fillStyle = feedback.right ? COL.good : COL.bad;
        ctx.font = '14px "JetBrains Mono", monospace';
        ctx.fillText(
          (feedback.right ? "CORRECT — " : "WRONG — ") + pair.ratio.toFixed(2) + ":1 " + (feedback.isPass ? "PASSES" : "FAILS") + " AA",
          W / 2, 290
        );
      } else {
        ctx.fillStyle = COL.faint;
        ctx.fillRect(26, 286, W - 52, 1);
      }

      BTNS.forEach((b) => {
        ctx.strokeStyle = COL.dim;
        ctx.lineWidth = 1;
        ctx.strokeRect(b.x, BTN_Y, b.w, BTN_H);
        ctx.fillStyle = b.pass ? COL.good : COL.bad;
        ctx.font = '15px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.label, b.x + b.w / 2, BTN_Y + BTN_H / 2);
      });
      ctx.textBaseline = "alphabetic";

      ctx.fillStyle = COL.dim;
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = "right";
      ctx.fillText("STREAK " + streak, W - 26, 30);
    }

    if (state === "idle") {
      overlayText([
        ["CONTRAST·COP", 22, COL.white, -44],
        ["REAL COLORS. REAL MATH.", 12, COL.dim, -12],
        ["CALL PASS OR FAIL ON WCAG AA", 12, COL.dim, 10],
        ["CLICK TO START", 13, COL.white, 44],
      ]);
    } else if (state === "over") {
      const acc = Math.round((correct / ROUNDS) * 100);
      const verdict = acc >= 92 ? "HIRE THIS AUDITOR" : acc >= 75 ? "SOLID INSTINCTS" : acc >= 50 ? "SQUINT HARDER" : "RUN THE PLUGIN";
      overlayText([
        [verdict, 19, COL.white, -48],
        ["ACCURACY " + acc + "%  ·  SCORE " + pad5(score) + (score === best && score > 0 ? " · NEW BEST!" : ""), 12, COL.dim, -14],
        ["BODY TEXT NEEDS 4.5:1 FOR AA —", 11, COL.dim, 14],
        ["WHEN IN DOUBT, MEASURE", 11, COL.dim, 32],
        ["CLICK TO RESTART", 12, COL.dim, 58],
      ]);
    }
  }

  canvas.addEventListener("click", (e) => {
    if (state === "idle" || state === "over") { start(); return; }
    if (feedback) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (W / rect.width);
    const y = (e.clientY - rect.top) * (H / rect.height);
    if (y >= BTN_Y && y <= BTN_Y + BTN_H) {
      const btn = BTNS.find((b) => x >= b.x && x <= b.x + b.w);
      if (btn) guess(btn.pass);
    }
  });

  state = "idle";
  updateHud();
  draw();
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  app.innerHTML = [
    PlaySection(),
    Footer(portfolio, { contact: true }),
    BottomDock(portfolio, { page: "play" }),
  ].join("");

  // Theme toggle
  const toggleBtn = document.getElementById("theme-toggle");
  const moonIcon = document.getElementById("theme-icon-moon");
  const sunIcon = document.getElementById("theme-icon-sun");

  function applyTheme(dark) {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    moonIcon.style.display = dark ? "none" : "";
    sunIcon.style.display = dark ? "" : "none";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  applyTheme(document.documentElement.getAttribute("data-theme") === "dark");
  toggleBtn.addEventListener("click", () => {
    applyTheme(document.documentElement.getAttribute("data-theme") !== "dark");
  });

  initPixelPerfect();
  initKernType();
  initTapTarget();
  initHicksLaw();
  initMillersLaw();
  initContrastCop();
});
