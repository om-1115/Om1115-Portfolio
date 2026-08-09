# Indic Type Lab — Phase 0 findings

Run in Chrome 151 against `__p0.html`, after `await document.fonts.ready`, with
Noto Sans Devanagari, Poppins and Inter loaded at `display=block`. Every number
below came out of the browser; none is quoted from the brief.

BRIEF §8 says to verify the four techniques before building because the design
depends on them. It was right to: **three of the four do not behave as the brief
assumes**, and one of the brief's own illustrative numbers does not reproduce.

## 1. Ink extents (§3.2) — WORKS, and it is the foundation

`measureText('हिंदी')` at 100px in Noto Sans Devanagari:

| Metric | Value |
|---|---|
| `actualBoundingBoxAscent` | 92.5 |
| `actualBoundingBoxDescent` | 8.3 |
| `fontBoundingBoxAscent` | 92 |
| `fontBoundingBoxDescent` | 23 |

Populated, non-zero, and — the useful part — `actualBoundingBoxAscent` (92.5)
exceeds `fontBoundingBoxAscent` (92). The string's ink genuinely escapes the
font's own declared ascent, which is the mechanism behind matra clipping. This
technique is sound and the ink-extent overlay is built on it.

## 2. The brief's headline clipping example reproduces — once the test is right

BRIEF §1 offers "at 1.24 line-height the matra's ink extends above the line box
and is being clipped". My first probe said it did not, and my first probe was
wrong. Recording both, because the mistake is the useful part.

The wrong test compared **total ink height against the line box**: 100.8px of
ink inside a 124px box at 100px, therefore no overflow. That question is
meaningless. Ink is not centred in the line box, so a total that fits says
nothing about whether the top of it fits.

The right test is per side. A line box taller than the content area distributes
the surplus as half-leading, evenly above and below, so the room above the
baseline is `halfLead + fontAscent`, and ink clips when `inkAscent` exceeds it:

```
lineBox     = size × lineHeight
contentArea = fontAscent + fontDescent
halfLead    = (lineBox − contentArea) / 2
roomAbove   = halfLead + fontAscent
clipped     = inkAscent > roomAbove
```

Run that way on हिंदी in Noto Sans Devanagari at 48px / 1.24: **ink overruns the
line box by 1.7px above.** The brief was right and the crude test hid it.

The tool ships the per-side calculation, written out in `clipping()` rather than
folded into one expression, and reports the crossover live — 1.32 for this face,
this string, this size. That number is still measured rather than quoted: the
brief's "3px" is an illustration, not a recommendation, and does not appear
anywhere in the build.

## 3. Width-comparison inference (§3.1) — FAILS AS SPECIFIED

The four-way probe returns identical widths for every stack:

| Probe | `sans-serif` | `monospace` | `"Target", sans-serif` | `"Target", monospace` |
|---|---|---|---|---|
| Inter on क | 77 | 77 | 77 | 77 |
| Noto Sans Devanagari on क | 77 | 77 | 77 | 77 |

The rule `w3 === w1 && w4 === w2 → substituted` therefore reports **substituted
for Noto Sans Devanagari**, a face that certainly renders क. A test that cannot
tell a font with the glyph from a font without it is worse than no test.

Both generic families resolve to the same physical face for Devanagari here, so
the two baselines are not independent and the comparison has nothing to compare.

**Consequence for the build:** the fallback detector does not ship as specified.
It is out of Phase 1. Shipping it would put a confidently wrong badge next to a
correct font, which breaks C2 more badly than omitting the module does.

## 4. `document.fonts.check()` — CONFIRMED USELESS, worse than the brief says

```
document.fonts.check('16px "Helvetica Neue"')   → true
document.fonts.check('16px "ZzzNotARealFont"')  → true
```

It returns true for a font name invented on the spot. The brief warns it reports
load state rather than coverage; in practice it does not even do that
usefully. Never use it for any claim on this page.

## 5. `Intl.Segmenter` (§3.4) — WORKS, and the brief's conjunct nuance is stale

| Input | Clusters | Note |
|---|---|---|
| कि | 1 | `.length` is 2, `.slice(0,1)` is "क" — the teaching point holds |
| क्ष | **1** | brief predicts 3 |
| हिंदी | 2 | |

Chrome 151 already applies the Unicode 15.1 Indic conjunct-break rules, so क्ष
is a single grapheme cluster rather than three. The brief's "check what the
visitor's browser actually does and show it" is the right instruction and the
answer has moved — which is itself worth showing, so the segmenter readout
reports the live cluster count rather than an expected one.

## What Phase 1 ships as a result

- **Ink-extent overlay** (§6.2) — verified, and the centre of the page
- **Line-height lab** (§4.3) — with the clipping threshold measured live, not
  the brief's 3px
- **Letter-spacing destroyer** (§4.2) — needs no measurement API beyond layout
- **Grapheme readout** (§4.5, partial) — cluster counts measured live

Deferred, with cause:

- **Fallback detector** (§4.1) — the inference method is unsound here (§3 above).
  Needs either `fontkit` parsing of self-hosted binaries for ground truth, or a
  probe whose two baselines are genuinely independent. Not shipped rather than
  shipped wrong.
- **Vertical metrics tuner, payload comparison** — both need font binaries
  parsed or subset at build time; this site has no build step.

## Deviation from the brief, stated plainly

BRIEF §7 specifies Vite + TypeScript in a new repo. This is being built as a tab
inside an existing hand-written static site with no build step, so: plain JS, no
bundler, and fonts served from Google Fonts with `display=block` rather than
self-hosted. `display=block` matters — `swap` would render the fallback and
corrupt every measurement. Google Fonts serves these faces under the OFL; no
font binary is redistributed from this repo, which keeps C3 intact.
