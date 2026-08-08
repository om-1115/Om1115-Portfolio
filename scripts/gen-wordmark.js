#!/usr/bin/env node
/* Outline the footer wordmark once, so the letters are real geometry rather
   than a font the visitor may or may not have.

   Setup (outside the repo — neither the library nor the font file is committed):
     npm install opentype.js
     curl -o InstrumentSerif-Regular.ttf \
       "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf"
     node scripts/gen-wordmark.js > js/wordmark.js

   Instrument Serif is SIL Open Font License 1.1, which permits redistributing
   outlines. Change TEXT below and regenerate if the name ever changes. */

const opentype = require('opentype.js');
const font = opentype.parse(require('fs').readFileSync('./InstrumentSerif-Regular.ttf').buffer);

const TEXT = 'Om Kumar';
const SIZE = 1000;                  // em units for the path data
const upm  = font.unitsPerEm;
const scale = SIZE / upm;

// Look glyphs up per character rather than via stringToGlyphs — this font's
// ccmp lookup hits an unsupported substitution format in opentype.js, and the
// wordmark needs no shaping beyond kerning.
const glyphs = [...TEXT].map(ch => font.charToGlyph(ch));
let x = 0;
const letters = [];
glyphs.forEach((g, i) => {
  const ch = TEXT[i];
  const path = g.getPath(x, 0, SIZE);
  const d = path.toPathData(2);
  const adv = g.advanceWidth * scale;
  if (d) {
    const bb = path.getBoundingBox();
    letters.push({ ch, d, x, adv, x1: bb.x1, x2: bb.x2, y1: bb.y1, y2: bb.y2 });
  }
  x += adv;
  const next = glyphs[i + 1];
  if (next) x += font.getKerningValue(g, next) * scale;
});

const totalW = x;
const asc = font.ascender * scale, desc = font.descender * scale;
const minY = Math.min(...letters.map(l => l.y1));
const maxY = Math.max(...letters.map(l => l.y2));

// The shapes the letters morph out of: a dot or a bar per letter, sized from
// that letter's own box so the morph starts somewhere plausible.
const round2 = n => Math.round(n * 100) / 100;
function seedShape(l, i) {
  const cx = round2((l.x1 + l.x2) / 2);
  const w  = l.x2 - l.x1;
  const midY = round2((minY + maxY) / 2);
  if (i % 2 === 0) {                       // dot
    const r = round2(Math.min(w, 150) / 2.6);
    return { kind: 'dot', d: circlePath(cx, midY, r) };
  }
  const bw = round2(Math.min(w * 0.55, 90));   // bar
  const bh = round2((maxY - minY) * 0.42);
  return { kind: 'bar', d: roundedRectPath(cx - bw / 2, midY - bh / 2, bw, bh, Math.min(bw, bh) / 2) };
}

function circlePath(cx, cy, r) {
  const k = r * 0.5522847498;
  return [
    `M${round2(cx)} ${round2(cy - r)}`,
    `C${round2(cx + k)} ${round2(cy - r)} ${round2(cx + r)} ${round2(cy - k)} ${round2(cx + r)} ${round2(cy)}`,
    `C${round2(cx + r)} ${round2(cy + k)} ${round2(cx + k)} ${round2(cy + r)} ${round2(cx)} ${round2(cy + r)}`,
    `C${round2(cx - k)} ${round2(cy + r)} ${round2(cx - r)} ${round2(cy + k)} ${round2(cx - r)} ${round2(cy)}`,
    `C${round2(cx - r)} ${round2(cy - k)} ${round2(cx - k)} ${round2(cy - r)} ${round2(cx)} ${round2(cy - r)}Z`,
  ].join('');
}

function roundedRectPath(x, y, w, h, r) {
  const R = Math.min(r, w / 2, h / 2), k = R * 0.5522847498;
  return [
    `M${round2(x + R)} ${round2(y)}`, `L${round2(x + w - R)} ${round2(y)}`,
    `C${round2(x + w - R + k)} ${round2(y)} ${round2(x + w)} ${round2(y + R - k)} ${round2(x + w)} ${round2(y + R)}`,
    `L${round2(x + w)} ${round2(y + h - R)}`,
    `C${round2(x + w)} ${round2(y + h - R + k)} ${round2(x + w - R + k)} ${round2(y + h)} ${round2(x + w - R)} ${round2(y + h)}`,
    `L${round2(x + R)} ${round2(y + h)}`,
    `C${round2(x + R - k)} ${round2(y + h)} ${round2(x)} ${round2(y + h - R + k)} ${round2(x)} ${round2(y + h - R)}`,
    `L${round2(x)} ${round2(y + R)}`,
    `C${round2(x)} ${round2(y + R - k)} ${round2(x + R - k)} ${round2(y)} ${round2(x + R)} ${round2(y)}Z`,
  ].join('');
}

const out = letters.map((l, i) => ({
  ch: l.ch,
  d: l.d,
  from: seedShape(l, i).d,
}));

const pad = 40;
const vb = [round2(-pad), round2(minY - pad), round2(totalW + pad * 2), round2(maxY - minY + pad * 2)];

console.log(`/* GENERATED — do not hand-edit.
   Source: Instrument Serif Regular (SIL Open Font License 1.1), outlined once
   with scripts/gen-wordmark.js so the footer wordmark is real geometry rather
   than a font the visitor may not have. Only these glyphs are included.
   Regenerate: node scripts/gen-wordmark.js > js/wordmark.js */
const WORDMARK = {
  text: ${JSON.stringify(TEXT)},
  viewBox: ${JSON.stringify(vb.join(' '))},
  letters: ${JSON.stringify(out, null, 2)}
};`);
console.error(`glyphs: ${out.length} · viewBox ${vb.join(' ')} · asc ${round2(asc)} desc ${round2(desc)}`);
