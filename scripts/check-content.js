#!/usr/bin/env node
/* Content integrity checks for Case File projects (projects with detail.caseFile).
   Run: node scripts/check-content.js
   These are the rules the case study claims to hold itself to, enforced instead
   of assumed — a one-liner that grows past the cause-list column, a decision
   with no stated cost, or a matter with nothing rejected all fail here. */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
// Optional path argument so the checks can be run against a mutated copy —
// which is how the checks themselves get tested.
const dataFile = process.argv[2] || path.join(root, 'js/data.js');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync(dataFile, 'utf8') + '\nglobalThis.__p = portfolio;',
  ctx
);
const portfolio = ctx.__p;

const MODES = ['Designed', 'Contributed', 'Audited', 'Proposed'];
const ONE_LINE_MAX = 90;
const FORBIDDEN = [/lorem ipsum/i, /\[\?\]/, /\bTBD\b/, /\bTODO\b/];

const errors = [];
const warnings = [];
let checked = 0;

function walkStrings(value, at, fn) {
  if (typeof value === 'string') return fn(value, at);
  if (Array.isArray(value)) return value.forEach((v, i) => walkStrings(v, `${at}[${i}]`, fn));
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) walkStrings(v, `${at}.${k}`, fn);
  }
}

for (const project of portfolio.projects) {
  const cf = project.detail && project.detail.caseFile;
  if (!cf) continue;
  const p = `${project.id} ${project.title}`;
  checked++;

  // Placeholder copy must never reach a rendered string
  walkStrings(cf, 'caseFile', (str, at) => {
    for (const re of FORBIDDEN) {
      if (re.test(str)) errors.push(`${p} — ${at} contains placeholder copy (${re})`);
    }
  });

  for (const m of cf.matters || []) {
    const label = `${p} · matter ${m.no}`;

    if (!m.oneLine) errors.push(`${label} — no oneLine for the cause list`);
    else if (m.oneLine.length > ONE_LINE_MAX) {
      errors.push(`${label} — oneLine is ${m.oneLine.length} chars, max ${ONE_LINE_MAX}`);
    }

    if (!m.state) errors.push(`${label} — no state; the cause list needs a factual state`);
    if (!MODES.includes(m.mode)) {
      errors.push(`${label} — mode "${m.mode}" is not one of ${MODES.join(' / ')}`);
    }

    (m.decisions || []).forEach((d, i) => {
      const dl = `${label} · decision ${i + 1}`;
      if (!d.constraint) errors.push(`${dl} — no constraint`);
      if (!d.chose) errors.push(`${dl} — nothing chosen`);
      if (!d.why) errors.push(`${dl} — no reason given`);
      if (!d.cost || !d.cost.trim()) errors.push(`${dl} — no stated cost (every tradeoff gave something up)`);
      if ((d.options || []).length < 2) warnings.push(`${dl} — fewer than two options considered`);
    });

    if (!(m.rejected || []).length) {
      errors.push(`${label} — no rejected direction; a matter with no discarded work reads as fiction`);
    }
    (m.rejected || []).forEach((r, i) => {
      if (!r.whyNot) errors.push(`${label} · rejected ${i + 1} — no reason it was dropped`);
    });

    // Contrast pairs: headroom is derived, never stored, and a pair with almost
    // no room left must carry its risk note — so the 4.54:1 finding cannot be
    // quietly dropped later. Same instinct as the page it describes.
    const RISK_BELOW = 0.25;
    for (const cp of (m.contrast && m.contrast.pairs) || []) {
      const cl = `${label} · pair "${cp.pair}"`;
      if (![4.5, 3].includes(cp.floor)) {
        errors.push(`${cl} — floor ${cp.floor} is neither the 4.5:1 text floor nor the 3:1 non-text floor`);
      }
      if (typeof cp.light !== 'number') { errors.push(`${cl} — no measured light value`); continue; }
      if (!cp.tokens) errors.push(`${cl} — no token names; a ratio without its pair is unverifiable`);
      const headroom = cp.light - cp.floor;
      if (headroom < 0) errors.push(`${cl} — measures ${cp.light} against a ${cp.floor} floor and fails`);
      else if (headroom < RISK_BELOW && !cp.risk) {
        errors.push(`${cl} — headroom ${headroom.toFixed(2)} is under ${RISK_BELOW} and carries no risk note`);
      }
      if (cp.risk && headroom >= RISK_BELOW) {
        warnings.push(`${cl} — carries a risk note but has ${headroom.toFixed(2)} of headroom`);
      }
      if (typeof cp.dark === 'number' && cp.dark - cp.floor < 0) {
        errors.push(`${cl} — dark theme measures ${cp.dark} against a ${cp.floor} floor and fails`);
      }
    }

    // Exhibits: real files, decision-describing alt text, clearance stated
    for (const x of m.exhibits || []) {
      const xl = `${label} · exhibit ${x.id || x.src}`;
      if (!x.src) errors.push(`${xl} — no src`);
      else if (!fs.existsSync(path.join(root, x.src))) {
        errors.push(`${xl} — file missing at ${x.src}; the slot will render as a placeholder`);
      }
      if (!x.clearance) errors.push(`${xl} — clearance not set`);
      if (x.clearance && x.clearance !== 'public' && !x.redactionNote) {
        errors.push(`${xl} — clearance "${x.clearance}" needs a redactionNote`);
      }
      if (!x.alt || x.alt.length < 40) errors.push(`${xl} — alt text under 40 chars`);
      if (/^(screenshot|image|photo|screen of)/i.test(x.alt || '')) {
        errors.push(`${xl} — alt describes the artefact, not the design decision`);
      }
    }

    for (const s of (m.surfaces && m.surfaces.items) || []) {
      if (!s.route) errors.push(`${label} · surface "${s.name}" — no route`);
      if (!s.tests) errors.push(`${label} · surface "${s.name}" — no statement of what it tests`);
    }

    if (m.loop && !m.loop.gap) {
      errors.push(`${label} — the loop diagram has no stated gap; an automation claim needs its limit`);
    }

    for (const idx of m.figureIdx || []) {
      const frame = (project.detail.frames || [])[idx];
      if (!frame) { errors.push(`${label} — figureIdx ${idx} has no matching frame`); continue; }
      const cap = frame.label || '';
      if (cap.length < 40) {
        errors.push(`${label} — figure caption under 40 chars: "${cap}"`);
      }
      if (/^(screenshot|image|screen of)/i.test(cap)) {
        errors.push(`${label} — figure caption describes the artefact, not the decision: "${cap}"`);
      }
    }
  }

  for (const x of cf.heroExhibits || []) {
    const xl = `${p} · hero exhibit ${x.id || x.src}`;
    if (!x.src || !fs.existsSync(path.join(root, x.src))) errors.push(`${xl} — file missing at ${x.src}`);
    if (!x.clearance) errors.push(`${xl} — clearance not set`);
    if (!x.alt || x.alt.length < 40) errors.push(`${xl} — alt text under 40 chars`);
  }

  // Placeholder numbers must not slip into a published page. This warns rather
  // than fails so the site still builds while they are being replaced.
  for (const st of (project.detail && project.detail.stats) || []) {
    if (st.provisional) warnings.push(`${p} — stat "${st.value} ${st.label}" is PROVISIONAL (invented; replace before publishing)`);
  }

  // Ledger modes must use the same vocabulary as the matters
  for (const row of (cf.ledger && cf.ledger.rows) || []) {
    if (!MODES.includes(row.mode)) {
      errors.push(`${p} — ledger row ${row.no} mode "${row.mode}" is not one of ${MODES.join(' / ')}`);
    }
    if (!row.scope) errors.push(`${p} — ledger row ${row.no} has no scope`);
  }

  /* Personas must be research before they can ship. A portfolio that presents
     invented personas as findings fails the moment an interviewer asks how many
     people were spoken to, so a placeholder is a build failure rather than a
     warning — the one check here allowed to block on unfinished thinking rather
     than on a formatting slip. */
  if (cf.personas) {
    const items = cf.personas.items || [];
    if (!items.length) errors.push(`${p} — personas block with no personas`);
    const fake = items.filter(x => x.source === 'placeholder');
    if (fake.length && !cf.personas.hidden) {
      // visible + invented is the failure case: nothing on the page tells a
      // reader these are not findings
      errors.push(
        `${p} — ${fake.length} of ${items.length} personas are source:'placeholder' and VISIBLE ` +
        `(${fake.map(x => x.name.split(',')[0]).join(', ')}). Replace with real research, or set hidden: true.`
      );
    } else if (fake.length) {
      warnings.push(
        `${p} — ${fake.length} placeholder persona(s) held back by hidden: true; ` +
        `replace with real research to publish the section`
      );
    }
  }

  /* A block that leans on someone else's published position needs a live
     citation. The requirement follows the claim, not the block name: a premise
     arguing from a count of the designer's own file is attributing nothing and
     has nothing to cite. Mark the ones that borrow with attributed: true.
     A citation that is present is validated either way. */
  for (const [key, block] of [['premise', cf.premise], ['levers', cf.levers]]) {
    if (!block) continue;
    const c = block.citation;
    if (block.attributed && (!c || !c.href || !c.label)) {
      errors.push(`${p} — ${key} is marked attributed but has no citation URL`);
    }
    if (c && c.href && !/^https?:\/\//.test(c.href)) {
      errors.push(`${p} — ${key} citation href is not a URL`);
    }
    if (c && (!c.label || !c.href)) {
      errors.push(`${p} — ${key} has a citation missing its label or href`);
    }
  }

  // Every lever needs both halves of the mapping
  for (const l of (cf.levers && cf.levers.rows) || []) {
    if (!l.friction || !l.response) errors.push(`${p} — lever ${l.n} is missing a side of the mapping`);
  }
}

const out = [];
out.push(`check:content — ${checked} case file project(s) checked`);
for (const w of warnings) out.push(`  warn  ${w}`);
for (const e of errors) out.push(`  FAIL  ${e}`);
out.push(errors.length ? `${errors.length} failure(s)` : 'all checks passed');
console.log(out.join('\n'));
process.exit(errors.length ? 1 : 0);
