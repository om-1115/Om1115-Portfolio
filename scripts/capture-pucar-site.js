#!/usr/bin/env node
/* Capture the pucar.org audit exhibits.
   Run: node scripts/capture-pucar-site.js

   Scans scroll offsets for any interactive element intersecting the fixed nav
   pill's rect — that is finding 2, reproduced rather than eyeballed — then
   captures at the offset where the most of a control is covered. Downscale
   afterwards with `sips -Z 1800`. */
const { launch, connect, newPage, goto, evaluate, shoot } = require('./cdp');
const path = require('path');
const OUT = '/Users/om1115/Desktop/Coding me/portfolio/assets/work/pucar-site';
(async () => {
  const { proc, version } = await launch('/tmp/cdp-pucar-find');
  const browser = await connect(version.webSocketDebuggerUrl);
  const d = await newPage(browser, 1440, 820, 2);
  await goto(d, 'https://pucar.org/', 6500);

  const found = await evaluate(d, `(async () => {
    const pill = document.querySelector('.header-right');
    const hits = [];
    for (let y = 300; y < document.body.scrollHeight - 820; y += 40) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 130));
      const pr = pill.getBoundingClientRect();
      for (const e of document.querySelectorAll('a,button')) {
        if (pill.contains(e)) continue;
        const r = e.getBoundingClientRect();
        if (r.width < 60 || r.height < 20) continue;
        const over = r.top < pr.bottom - 6 && r.bottom > pr.top + 6 && r.left < pr.right - 6 && r.right > pr.left + 6;
        if (over) {
          const label = ((e.innerText||'').trim().split('\\n')[0] || e.className.toString()).slice(0, 34);
          hits.push({ y, label, covered: Math.round(Math.min(r.bottom, pr.bottom) - Math.max(r.top, pr.top)) });
        }
      }
      if (hits.length > 24) break;
    }
    window.scrollTo(0, 0);
    return hits;
  })()`);
  // pick the offset where the most of an element is covered
  const best = found.sort((a, b) => b.covered - a.covered)[0];
  console.log('best overlap:', JSON.stringify(best), 'of', found.length, 'hits');
  console.log('sample:', JSON.stringify(found.slice(0, 6)));

  if (best) {
    await evaluate(d, `(async () => { window.scrollTo(0, ${best.y}); await new Promise(r=>setTimeout(r,1400)); })()`);
    console.log('03', await shoot(d, path.join(OUT, '03-nav-pill-over-cta.png')) / 1024 | 0, 'KB');
  }

  const nav = await evaluate(d, `[...document.querySelectorAll('.header-right a')].map(a => a.textContent.trim() + ' -> ' + a.getAttribute('href'))`);
  console.log('nav:', JSON.stringify(nav));
  proc.kill(); process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
