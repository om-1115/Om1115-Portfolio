#!/usr/bin/env node
/* Build the HPC case-study exhibits as device mockups.
   Run: node scripts/build-hpc-mockups.js [source-dir]

   Source is the Figma export (default ~/Downloads/hpc/Screens/HP). Each mockup
   is composed as HTML, rendered with headless Chrome, and written to
   assets/work/hpc/ under the filenames js/data.js expects.

   The student-profile exhibit blurs everything below the header on purpose: the
   point of that exhibit is the shape of the schema — how many child-level fields
   the drill-down reaches — not the values sitting in them. */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SRC = process.argv[2] || path.join(os.homedir(), 'Downloads/hpc/Screens/HP');
const OUT = path.resolve(__dirname, '..', 'assets/work/hpc');
const BUILD = fs.mkdtempSync(path.join(os.tmpdir(), 'hpc-mockups-'));

const SCREEN_W = 1648;          // every export is 1648 wide
const ONE_SCREEN = 3668;        // the natural single-screen height

// phone: [source file, crop offset in source px, visible height in source px]
const P = (file, offsetY = 0, height = ONE_SCREEN) => ({ file, offsetY, height });

const MOCKUPS = [
  {
    out: '01-home-class-overview.png',
    phones: [P('8.1.png', 0, 4820)],
    scale: 0.30,
  },
  {
    out: '02-live-hpc-flow.png',
    phones: [P('11.png'), P('12.png'), P('13.png')],
    scale: 0.19,
  },
  {
    out: '03-student-report.png',
    phones: [P('13.png', 0, ONE_SCREEN), P('13.png', 3300, ONE_SCREEN)],
    scale: 0.24,
  },
  {
    out: '04-student-profile-schema.png',
    phones: [P('14.png', 0, 4400)],
    scale: 0.30,
    blurBelow: 1300,   // source px — everything under the dark header
  },
  {
    out: '05-grade-selection-flow.png',
    phones: [P('Grade Selection 01.png'), P('Grade Selection 02.png', 0, 4300), P('Grade Selection 03.png')],
    scale: 0.19,
  },
];

const PAD = 90;      // canvas padding around the phones
const GAP = 56;      // gap between phones
const BEZEL = 14;    // device bezel thickness, in output px

function html(m) {
  const phones = m.phones.map(p => {
    const w = Math.round(SCREEN_W * m.scale);
    const h = Math.round(p.height * m.scale);
    const top = Math.round(-p.offsetY * m.scale);
    const blur = m.blurBelow != null
      ? `<div class="blur" style="top:${Math.round((m.blurBelow - p.offsetY) * m.scale)}px"></div>`
      : '';
    return `<div class="phone" style="width:${w + BEZEL * 2}px;height:${h + BEZEL * 2}px">
      <div class="screen" style="width:${w}px;height:${h}px">
        <img src="${encodeURIComponent(p.file)}" style="width:${w}px;margin-top:${top}px">
        ${blur}
      </div>
    </div>`;
  }).join('');

  const maxH = Math.max(...m.phones.map(p => Math.round(p.height * m.scale)));
  const totalW = m.phones.length * Math.round(SCREEN_W * m.scale + BEZEL * 2) + (m.phones.length - 1) * GAP;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${totalW + PAD * 2}px;
      height: ${maxH + BEZEL * 2 + PAD * 2}px;
      display: flex; align-items: flex-start; justify-content: center; gap: ${GAP}px;
      padding: ${PAD}px;
      background:
        radial-gradient(120% 90% at 20% 0%, #fbfbfc 0%, rgba(251,251,252,0) 60%),
        linear-gradient(160deg, #fafafb 0%, #f1f3f0 100%);
      font-family: -apple-system, system-ui, sans-serif;
    }
    .phone {
      background: #14171a;
      border-radius: 30px;
      padding: ${BEZEL}px;
      box-shadow: 0 26px 60px rgba(28,34,24,0.20), 0 4px 14px rgba(28,34,24,0.12),
                  inset 0 0 0 1px rgba(255,255,255,0.10);
      flex: none;
    }
    .screen { position: relative; overflow: hidden; border-radius: 18px; background: #fff; }
    .screen img { display: block; }
    .blur {
      position: absolute; left: 0; right: 0; bottom: 0;
      backdrop-filter: blur(9px); -webkit-backdrop-filter: blur(9px);
      background: rgba(255,255,255,0.04);
    }
  </style></head><body>${phones}</body></html>`;
}

// stage sources next to the html so file:// image loads are same-directory
for (const f of new Set(MOCKUPS.flatMap(m => m.phones.map(p => p.file)))) {
  const from = path.join(SRC, f);
  if (!fs.existsSync(from)) { console.error(`missing source: ${from}`); process.exit(1); }
  fs.copyFileSync(from, path.join(BUILD, f));
}
fs.mkdirSync(OUT, { recursive: true });

for (const m of MOCKUPS) {
  const page = path.join(BUILD, m.out.replace(/\.png$/, '.html'));
  fs.writeFileSync(page, html(m));
  const maxH = Math.max(...m.phones.map(p => Math.round(p.height * m.scale)));
  const w = m.phones.length * Math.round(SCREEN_W * m.scale + BEZEL * 2) + (m.phones.length - 1) * GAP + PAD * 2;
  const h = maxH + BEZEL * 2 + PAD * 2;
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=2',
    `--window-size=${w},${h}`,
    `--screenshot=${path.join(OUT, m.out)}`,
    '--virtual-time-budget=4000',
    'file://' + page,
  ], { stdio: 'ignore' });
  const size = fs.statSync(path.join(OUT, m.out)).size;
  console.log(`${m.out.padEnd(34)} ${w}x${h} @2x  ${(size / 1024).toFixed(0)} KB`);
}
console.log('build dir:', BUILD);
