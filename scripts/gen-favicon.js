#!/usr/bin/env node
/* Generate the favicon set from Instrument Serif outlines.

   Setup (outside the repo — neither the library nor the font file is committed):
     npm install opentype.js
     curl -o InstrumentSerif-Regular.ttf \
       "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf"
     python3 -m http.server 8080 &          # canvas taints an SVG from file://
     node scripts/gen-favicon.js            # PORT= to use a different one

   The server has to be rooted at the repo, because the rasteriser loads the
   generated SVGs over http — drawing a file:// SVG into a canvas taints it and
   toDataURL then throws.

   Instrument Serif is SIL Open Font License 1.1, which permits redistributing
   outlines. It is the same face the footer wordmark is cut from, so the tab
   icon and the signature are the same letterforms.

   Two marks, not one. Rasterising "om" at a true 16px and magnifying it shows
   the m's stems merging with the o into an unreadable bar — the face is a
   display serif and its hairlines fall under one device pixel. So 16px carries
   a single "o" and everything from 32px up carries "om", and the pages let the
   browser pick by size. Nothing links favicon.svg: browsers prefer an SVG icon
   when offered and would scale the two-letter mark straight back down into the
   mush this split exists to avoid. It is written anyway, as the scalable master.

   Re-run after changing the accent colour — ACCENT below must track
   --accent-red in css/style.css. */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const opentype = require('opentype.js');

const ROOT = path.join(__dirname, '..');
const ICONS = path.join(ROOT, 'assets', 'icons');
const TMP = path.join(ROOT, '.favicon-tmp');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = process.env.PORT || 8080;   // the repo's usual dev server

const ACCENT = '#c2410c';           // must track --accent-red in css/style.css
const FONT = './InstrumentSerif-Regular.ttf';

const font = opentype.parse(fs.readFileSync(FONT).buffer);
const SIZE = 1000;
const scale = SIZE / font.unitsPerEm;

/* Lay out a short run of glyphs, with optional extra tracking, and report the
   true ink box so the mark can be optically centred rather than centred on the
   advance width — which would hang a serif off one edge. */
function run(text, track = 0) {
  const glyphs = [...text].map(ch => font.charToGlyph(ch));
  const extra = track * SIZE;
  let x = 0, d = [];
  let x1 = Infinity, x2 = -Infinity, y1 = Infinity, y2 = -Infinity;

  glyphs.forEach((g, i) => {
    const p = g.getPath(x, 0, SIZE);
    d.push(p.toPathData(2));
    const bb = p.getBoundingBox();
    x1 = Math.min(x1, bb.x1); x2 = Math.max(x2, bb.x2);
    y1 = Math.min(y1, bb.y1); y2 = Math.max(y2, bb.y2);
    x += g.advanceWidth * scale;
    if (glyphs[i + 1]) x += font.getKerningValue(g, glyphs[i + 1]) * scale + extra;
  });

  return { d: d.join(' '), x1, y1, w: x2 - x1, h: y2 - y1 };
}

/* `grow` fattens the hairlines with a stroke in the fill colour. Without it the
   thin strokes of a display serif disappear at icon sizes. */
function tile(text, { pad = 9, track = 0, grow = 0, radius = 14 } = {}) {
  const g = run(text, track);
  const box = 64 - pad * 2;
  const s = Math.min(box / g.w, box / g.h);
  const tx = 32 - (g.x1 + g.w / 2) * s;
  const ty = 32 - (g.y1 + g.h / 2) * s;
  const stroke = grow
    ? ` stroke="#fff" stroke-width="${(grow / s).toFixed(1)}" stroke-linejoin="round"`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="${ACCENT}"/>
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})" fill="#fff"${stroke}>
    <path d="${g.d}"/>
  </g>
</svg>`;
}

const SMALL = tile('o',  { pad: 12, grow: 0.9 });
const LARGE = tile('om', { pad: 7, track: 0.06, grow: 0.9 });
// iOS masks the corners itself; a pre-rounded icon leaves black in the gaps.
const APPLE = tile('om', { pad: 11, track: 0.06, radius: 0 });

fs.mkdirSync(TMP, { recursive: true });
fs.mkdirSync(ICONS, { recursive: true });
fs.writeFileSync(path.join(TMP, 'small.svg'), SMALL);
fs.writeFileSync(path.join(TMP, 'large.svg'), LARGE);
fs.writeFileSync(path.join(TMP, 'apple.svg'), APPLE);

const targets = [
  { name: 'favicon-16.png',       src: 'small.svg', size: 16,  out: ICONS },
  { name: 'favicon-32.png',       src: 'large.svg', size: 32,  out: ICONS },
  { name: 'favicon-48.png',       src: 'large.svg', size: 48,  out: ICONS },
  { name: 'apple-touch-icon.png', src: 'apple.svg', size: 180, out: ICONS },
  { name: 'ico32.png',            src: 'large.svg', size: 32,  out: TMP },
];

fs.writeFileSync(path.join(TMP, 'raster.html'), `<!doctype html><body><pre id="out"></pre>
<script>
const jobs = ${JSON.stringify(targets.map(({ name, src, size }) => ({ name, src, size })))};
Promise.all(jobs.map(j => new Promise(res => {
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = c.height = j.size;
    c.getContext('2d').drawImage(img, 0, 0, j.size, j.size);
    res(j.name + ' ' + c.toDataURL('image/png').split(',')[1]);
  };
  img.src = j.src;
}))).then(lines => { document.getElementById('out').textContent = lines.join('\\n'); });
</script>`);

const dom = execFileSync(CHROME, [
  '--headless=new', '--disable-gpu', '--virtual-time-budget=4000',
  '--dump-dom', `http://localhost:${PORT}/${path.basename(TMP)}/raster.html`,
], { maxBuffer: 64 * 1024 * 1024 }).toString();

const body = dom.split('<pre id="out">')[1].split('</pre>')[0];
if (!body.trim()) {
  console.error(`nothing rasterised — is a server running on ${PORT} at the repo root?`);
  process.exit(1);
}

for (const line of body.split('\n')) {
  const [name, b64] = line.trim().split(' ');
  if (!name || !b64) continue;
  const t = targets.find(t => t.name === name);
  fs.writeFileSync(path.join(t.out, name), Buffer.from(b64, 'base64'));
  console.log('  ', name);
}

/* An .ico wrapping a single 32x32 PNG: 6-byte header, one 16-byte directory
   entry, then the PNG bytes verbatim. It lives at the site root so that bare
   /favicon.ico requests — which browsers and crawlers make regardless of the
   link tags — get an icon instead of a 404. */
const png = fs.readFileSync(path.join(TMP, 'ico32.png'));
const ico = Buffer.alloc(22 + png.length);
ico.writeUInt16LE(1, 2);            // type: icon
ico.writeUInt16LE(1, 4);            // one image
ico.writeUInt8(32, 6);              // width
ico.writeUInt8(32, 7);              // height
ico.writeUInt16LE(1, 10);           // colour planes
ico.writeUInt16LE(32, 12);          // bits per pixel
ico.writeUInt32LE(png.length, 14);
ico.writeUInt32LE(22, 18);          // offset to the PNG
png.copy(ico, 22);
fs.writeFileSync(path.join(ROOT, 'favicon.ico'), ico);
console.log('   favicon.ico');

fs.writeFileSync(path.join(ICONS, 'favicon.svg'), LARGE);
console.log('   favicon.svg (master, deliberately not linked)');

fs.rmSync(TMP, { recursive: true, force: true });
