#!/usr/bin/env node
/* Put a screenshot inside a laptop, properly.

   Run: node scripts/build-laptop-mockups.js

   The work grid's fallback thumbnail is a browser chrome drawn in CSS with
   nothing in it. This composes real screens into a laptop — lid, bezel, screen,
   base with the tapered foot — and writes the results where data.js expects
   them. Same approach as build-thumbs.js: compose in HTML, render at 2x with
   headless Chrome, downscale after.

   The screen aperture is 16:10, which is the aspect the captures already use
   (1800x1125), so nothing is cropped. */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'assets/work/bharat');
const BUILD = fs.mkdtempSync(path.join(os.tmpdir(), 'laptop-'));

// canvas, laptop and screen geometry (output px before the 2x render)
const W = 1500, H = 940;
const LID_W = 1180;                       // outer lid width
const BEZEL = 13, LIP = 26;               // bezel around the screen, chin below it
const SCREEN_W = LID_W - BEZEL * 2;
const SCREEN_H = Math.round(SCREEN_W / 1.6);   // 16:10 aperture
const BASE_H = 15, FOOT_W = LID_W + 96;

const MOCKUPS = [
  { out: 'laptop-studio.png',   src: '09-studio.png',       tint: ['#fbfbfc', '#eef1f4'] },
  { out: 'laptop-bots.png',     src: '01-bots-default.png', tint: ['#fbfbfc', '#f0f2f5'] },
  { out: 'laptop-ai-down.png',  src: '05-ai-down.png',      tint: ['#fdfbfa', '#f5efe9'] },
];

function html(m) {
  const lidH = SCREEN_H + BEZEL * 2 + LIP;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:${W}px; height:${H}px; display:flex; align-items:center; justify-content:center;
    background:
      radial-gradient(120% 80% at 20% 0%, ${m.tint[0]} 0%, rgba(255,255,255,0) 60%),
      linear-gradient(158deg, ${m.tint[0]} 0%, ${m.tint[1]} 100%);
  }
  .rig { position:relative; }
  .lid {
    width:${LID_W}px; height:${lidH}px; background:#1b1e22; border-radius:16px 16px 10px 10px;
    padding:${BEZEL}px ${BEZEL}px ${LIP}px; position:relative;
    box-shadow: 0 34px 70px rgba(20,26,32,0.26), 0 8px 20px rgba(20,26,32,0.14),
                inset 0 0 0 1px rgba(255,255,255,0.10);
  }
  .cam { position:absolute; top:6px; left:50%; width:5px; height:5px; margin-left:-2.5px;
         border-radius:50%; background:#3b4046; }
  .screen { width:${SCREEN_W}px; height:${SCREEN_H}px; border-radius:5px; overflow:hidden; background:#fff; }
  .screen img { display:block; width:100%; height:100%; object-fit:cover; object-position:top center; }
  /* the reflection has to stay faint — it must not fight the UI underneath */
  .glare { position:absolute; inset:${BEZEL}px ${BEZEL}px ${LIP}px; border-radius:5px; pointer-events:none;
           background:linear-gradient(103deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 26%, rgba(255,255,255,0) 46%); }
  .hinge { position:absolute; left:50%; bottom:8px; width:78px; height:5px; margin-left:-39px;
           border-radius:3px; background:#2a2e33; }
  .base { width:${FOOT_W}px; height:${BASE_H}px; margin:0 auto; border-radius:0 0 12px 12px;
          background:linear-gradient(#c9ced4, #9aa1a9);
          box-shadow: 0 16px 26px rgba(20,26,32,0.20); position:relative; }
  .notch { position:absolute; left:50%; top:0; width:120px; height:6px; margin-left:-60px;
           border-radius:0 0 7px 7px; background:#b3b9c0; }
</style></head><body>
  <div class="rig">
    <div class="lid">
      <div class="cam"></div>
      <div class="screen"><img src="${path.basename(m.src)}"></div>
      <div class="glare"></div>
      <div class="hinge"></div>
    </div>
    <div class="base"><div class="notch"></div></div>
  </div>
</body></html>`;
}

const OUT = SRC;
for (const m of MOCKUPS) {
  const from = path.join(SRC, m.src);
  if (!fs.existsSync(from)) { console.error('missing source:', from); process.exit(1); }
  fs.copyFileSync(from, path.join(BUILD, path.basename(m.src)));
  const page = path.join(BUILD, m.out.replace(/\.png$/, '.html'));
  fs.writeFileSync(page, html(m));
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=2',
    `--window-size=${W},${H}`, `--screenshot=${path.join(OUT, m.out)}`,
    '--virtual-time-budget=4000', 'file://' + page,
  ], { stdio: 'ignore' });
  console.log(`${m.out.padEnd(24)} ${W}x${H} @2x  ${(fs.statSync(path.join(OUT, m.out)).size / 1024).toFixed(0)} KB`);
}
console.log('downscale: cd assets/work/bharat && for f in laptop-*.png; do sips -Z 1600 "$f" --out "$f"; done');
