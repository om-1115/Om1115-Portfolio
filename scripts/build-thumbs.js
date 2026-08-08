#!/usr/bin/env node
/* Build the work-grid thumbnails from screens already captured for the case
   studies. Run: node scripts/build-thumbs.js

   One treatment for all three so the grid reads as a set: the project's own
   tint as ground, the screen floating on it with a soft shadow, bleeding off
   the bottom edge. 16:10 to match .fw-card__thumb. */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'assets/work/thumbs');
const BUILD = fs.mkdtempSync(path.join(os.tmpdir(), 'thumbs-'));

const W = 1400, H = 875;   // 16:10

const THUMBS = [
  {
    out: 'encode-pucar.png',
    tint: ['#fbfbfc', '#f2f4f4'],
    kind: 'screen',
    src: path.join(ROOT, 'assets/work/oncourt/07-filing-documents.png'),
    inset: 0.86,        // width of the screen relative to the canvas
    top: 0.24,          // top edge — the screen bleeds off the bottom
  },
  {
    out: 'oncourt-sandbox.png',
    tint: ['#fbfbfc', '#f1f4f5'],
    kind: 'screen',
    src: path.join(ROOT, 'assets/work/oncourt/03-foundations-light.png'),
    inset: 0.86,
    top: 0.24,
  },
  {
    out: 'hpc.png',
    tint: ['#fbfbfc', '#f2f4f0'],
    kind: 'phones',
    src: [
      { file: path.join(os.homedir(), 'Downloads/hpc/Screens/HP/12.png'), x: 0.25, top: 0.20, w: 0.24 },
      { file: path.join(os.homedir(), 'Downloads/hpc/Screens/HP/8.1.png'), x: 0.52, top: 0.30, w: 0.21 },
    ],
  },
];

function screenHTML(t) {
  const w = Math.round(W * t.inset);
  return `<img class="screen" src="${path.basename(t.src)}"
    style="width:${w}px; left:${Math.round((W - w) / 2)}px; top:${Math.round(H * t.top)}px">`;
}

function phonesHTML(t) {
  return t.src.map((p, i) => {
    const w = Math.round(W * p.w);
    return `<div class="phone" style="width:${w}px; left:${Math.round(W * p.x)}px; top:${Math.round(H * p.top)}px; z-index:${10 - i}">
      <img src="${path.basename(p.file)}" style="width:${w - 12}px">
    </div>`;
  }).join('');
}

function html(t) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:${W}px; height:${H}px; overflow:hidden; position:relative;
      background: radial-gradient(110% 80% at 22% 0%, ${t.tint[0]} 0%, rgba(255,255,255,0) 62%),
                  linear-gradient(158deg, ${t.tint[0]} 0%, ${t.tint[1]} 100%); }
    .screen { position:absolute; border-radius:12px; display:block;
      box-shadow: 0 30px 60px rgba(26,38,34,0.18), 0 6px 16px rgba(26,38,34,0.10),
                  0 0 0 1px rgba(20,30,26,0.06); }
    .phone { position:absolute; background:#14171a; border-radius:22px; padding:6px;
      box-shadow: 0 26px 54px rgba(26,38,34,0.22), 0 4px 12px rgba(26,38,34,0.12); }
    .phone img { display:block; border-radius:16px; }
  </style></head><body>${t.kind === 'phones' ? phonesHTML(t) : screenHTML(t)}</body></html>`;
}

fs.mkdirSync(OUT, { recursive: true });
for (const t of THUMBS) {
  const files = t.kind === 'phones' ? t.src.map(p => p.file) : [t.src];
  for (const f of files) {
    if (!fs.existsSync(f)) { console.error('missing source:', f); process.exit(1); }
    fs.copyFileSync(f, path.join(BUILD, path.basename(f)));
  }
  const page = path.join(BUILD, t.out.replace(/\.png$/, '.html'));
  fs.writeFileSync(page, html(t));
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=2', `--window-size=${W},${H}`,
    `--screenshot=${path.join(OUT, t.out)}`, '--virtual-time-budget=4000',
    'file://' + page,
  ], { stdio: 'ignore' });
  console.log(`${t.out.padEnd(24)} ${(fs.statSync(path.join(OUT, t.out)).size / 1024).toFixed(0)} KB`);
}
console.log('downscale with: cd assets/work/thumbs && for f in *.png; do sips -Z 1400 "$f" --out "$f"; done');
