#!/usr/bin/env node
/* Re-capture the ON Court exhibits from the deployed app.
   Run: node scripts/capture-oncourt.js

   Needs Chrome installed and Node 22+ (native WebSocket). Writes straight into
   assets/work/oncourt/ under the filenames js/data.js expects, at 1456×803 with
   device scale 2 — then downscale to 1800 wide, which is the ratio the exhibits
   declare:

     cd assets/work/oncourt && for f in *.png; do sips -Z 1800 "$f" --out "$f"; done

   The two scrutiny shots are sanitised before capture: the rendered document
   page is blurred and the panel's identity-shaped strings are rewritten as
   obviously synthetic. Invented data that reads like a real record does not go
   on a public portfolio in this sector. */

const { launch, connect, newPage, goto, evaluate, shoot, sleep } = require('./cdp');
const path = require('path');

const BASE = 'https://pucar-design-system.vercel.app';
const OUT = path.resolve(__dirname, '..', 'assets/work/oncourt');

const SANITISE = `(() => {
  const pages = [...document.querySelectorAll('div')].filter(d => {
    const r = d.getBoundingClientRect();
    return r.width > 500 && r.width < 760 && r.height > 700;
  });
  pages.forEach(p => { p.style.filter = 'blur(7px)'; });

  let addr = 0;
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let edits = 0;
  while (walk.nextNode()) {
    const n = walk.currentNode, t = n.nodeValue;
    if (!t || !t.trim()) continue;
    let v = t.replace(/\\b(?:\\d{4}|X{4})[-\\s](?:\\d{4}|X{4})[-\\s]\\d{4}\\b/g, 'XXXX-XXXX-0000');
    if (/\\d{6}\\s*$/.test(v.trim()) && /,/.test(v)) v = 'Sample address ' + (++addr) + ', City — 00000' + addr;
    if (v !== t) { n.nodeValue = v; edits++; }
  }
  return { blurred: pages.length, edits };
})()`;

const SET_THEME = mode => `(async () => {
  const btn = document.querySelector('[aria-label="Toggle theme"]');
  const isDark = () => document.documentElement.classList.contains('dark');
  for (let i = 0; i < 4 && isDark() !== ${mode === 'dark'}; i++) { btn && btn.click(); await new Promise(r => setTimeout(r, 350)); }
  return document.documentElement.className;
})()`;

/* Scroll the element's own scroll container. Only ever targets a short label —
   matching a container's concatenated text just scrolls to the top of the page. */
const SCROLL_TO = re => `(() => {
  const rx = ${re};
  let el = [...document.querySelectorAll('h1,h2,h3,h4,dt,legend,summary,label')]
    .find(e => { const t = (e.textContent || '').trim(); return t.length < 80 && rx.test(t) && e.getBoundingClientRect().height > 0; });
  if (!el) el = [...document.querySelectorAll('*')]
    .find(e => { const t = (e.textContent || '').trim(); return e.children.length === 0 && t.length < 40 && rx.test(t); });
  if (!el) return 'NOT FOUND';
  let p = el.parentElement, target = null;
  while (p) {
    const s = getComputedStyle(p);
    if (/(auto|scroll)/.test(s.overflowY) && p.scrollHeight > p.clientHeight + 20) { target = p; break; }
    p = p.parentElement;
  }
  const r = el.getBoundingClientRect();
  if (target) { const tr = target.getBoundingClientRect(); target.scrollTop += (r.top - tr.top) - 28; }
  else { window.scrollBy(0, r.top - 28); }
  return ((el.textContent || '').trim().slice(0, 44)) + (target ? ' [pane]' : ' [window]');
})()`;

const CLICK_TEXT = re => `(() => {
  const rx = ${re};
  const el = [...document.querySelectorAll('button,label,[role="tab"],a')]
    .find(e => rx.test((e.innerText || e.getAttribute('aria-label') || '').trim()));
  if (!el) return 'NOT FOUND';
  el.click();
  return (el.innerText || '').trim().slice(0, 40);
})()`;

const SHOTS = [
  { file: '01-scrutiny-ai-mismatch.png',     route: '/scrutiny',         theme: 'light', after: [SANITISE] },
  { file: '02-scrutiny-ai-unavailable.png',  route: '/scrutiny',         theme: 'light', after: [CLICK_TEXT('/simulate ai unavailable/i'), SANITISE] },
  { file: '03-foundations-light.png',        route: '/foundations',      theme: 'light' },
  { file: '04-foundations-dark.png',         route: '/foundations',      theme: 'dark'  },
  { file: '05-foundations-status-pairs.png', route: '/foundations',      theme: 'light', after: [SCROLL_TO('/^status/i')] },
  { file: '06-foundations-boundaries.png',   route: '/foundations',      theme: 'light', after: [SCROLL_TO('/boundar/i')] },
  { file: '07-filing-documents.png',         route: '/filing/documents', theme: 'light' },
  { file: '08-filing-documents-lower.png',   route: '/filing/documents', theme: 'light', after: [SCROLL_TO('/notice (&|and) service|supporting/i')] },
  { file: '09-test-ui-index.png',            route: '/test-ui',          theme: 'light' },
  { file: '10-dashboard-light.png',          route: '/dashboard',        theme: 'light' },
  { file: '11-dashboard-dark.png',           route: '/dashboard',        theme: 'dark'  },
  { file: '12-dashboard-cause-list.png',     route: '/dashboard',        theme: 'light', after: [SCROLL_TO('/^cause list/i')] },
  { file: '13-case-detail-overview.png',     route: '/case',             theme: 'light' },
  { file: '14-case-detail-hearings.png',     route: '/case',             theme: 'light', after: [CLICK_TEXT('/^hearings$/i')] },
  { file: '15-components-patterns.png',      route: '/',                 theme: 'light', after: [SCROLL_TO('/progressive disclosure|patterns/i')] },
  { file: '16-components-navigation.png',    route: '/',                 theme: 'light', after: [SCROLL_TO('/^navigation/i')] },
  { file: '17-new-case-form.png',            route: '/settings',         theme: 'dark'  },
];

(async () => {
  const { proc, version } = await launch('/tmp/cdp-oncourt');
  const browser = await connect(version.webSocketDebuggerUrl);
  const page = await newPage(browser, 1456, 803, 2);

  for (const s of SHOTS) {
    try {
      await goto(page, BASE + s.route, 4200);
      await evaluate(page, SET_THEME(s.theme));
      const notes = [];
      for (const step of s.after || []) { notes.push(JSON.stringify(await evaluate(page, step)).slice(0, 70)); await sleep(900); }
      await sleep(600);
      const bytes = await shoot(page, path.join(OUT, s.file));
      console.log(`${s.file.padEnd(33)} ${s.theme.padEnd(6)} ${(bytes / 1024).toFixed(0).padStart(5)} KB  ${notes.join(' | ')}`);
    } catch (e) {
      console.log(`${s.file.padEnd(33)} FAILED: ${e.message}`);
    }
  }
  proc.kill();
  process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
