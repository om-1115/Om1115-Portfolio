#!/usr/bin/env node
/* HPC case study — Phase 0 arithmetic.
   Run: node scripts/hpc-arithmetic.js

   Every number the case study publishes as `computed` comes from here, so the
   page can never drift from its own arithmetic (BRIEF §10.6 check 3). Inputs are
   only the published scoring model and the NCF-FS competency list; nothing is
   estimated.

   Sources for the inputs:
   - Competency counts: NCF-FS 2022, Section 2.4 (pp. 59-63), counted directly.
   - Levels 33 / 66 / 100 and bands 70 / 85: HPC concept note §4 (as quoted in
     BRIEF §5.1 — reverify against the note itself before publishing).
   - Six reporting groups: concept note §3, which promotes CG-13 to group status.
*/

const LEVELS = { notYet: 33, emerging: 66, achieved: 100 };
const BANDS = { advanced: 85, proficient: 70 }; // proficient = 70 .. 84.9

// NCF-FS 2022 §2.4 — competencies per curricular goal, counted from the source
const CG = {
  'CG-1': 6, 'CG-2': 6, 'CG-3': 4,            // Physical Development
  'CG-4': 7, 'CG-5': 1, 'CG-6': 1,            // Socio-Emotional and Ethical
  'CG-7': 3, 'CG-8': 13,                      // Cognitive
  'CG-9': 7, 'CG-10': 9, 'CG-11': 2,          // Language and Literacy
  'CG-12': 5,                                 // Aesthetic and Cultural
  'CG-13': 4,                                 // Positive Learning Habits
};

// The concept note's six reporting groups (five NCF-FS domains + CG-13)
const GROUPS = [
  { name: 'Physical Development',           goals: ['CG-1', 'CG-2', 'CG-3'] },
  { name: 'Socio-Emotional and Ethical',    goals: ['CG-4', 'CG-5', 'CG-6'] },
  { name: 'Cognitive Development',          goals: ['CG-7', 'CG-8'] },
  { name: 'Language and Literacy',          goals: ['CG-9', 'CG-10', 'CG-11'] },
  { name: 'Aesthetic and Cultural',         goals: ['CG-12'] },
  { name: 'Positive Learning Habits',       goals: ['CG-13'] },
];

const r1 = x => Math.round(x * 10) / 10;
const r2 = x => Math.round(x * 100) / 100;

for (const g of GROUPS) {
  g.goalCount = g.goals.length;
  g.n = g.goals.reduce((s, k) => s + CG[k], 0);
}
const totalComp = GROUPS.reduce((s, g) => s + g.n, 0);
const bandWidth = BANDS.advanced - BANDS.proficient - 0.1; // 70 .. 84.9
const step = n => (LEVELS.achieved - LEVELS.emerging) / n;  // one Emerging→Achieved flip

// (a) the unreachable floor
const floor = LEVELS.notYet;
const reachable = 100 - floor;

// Achievable domain scores are means of per-competency level values
function achievable(n) {
  const set = new Set();
  for (let a = 0; a <= n; a++) for (let b = 0; a + b <= n; b++) {
    const c = n - a - b;
    set.add(r2((LEVELS.notYet * a + LEVELS.emerging * b + LEVELS.achieved * c) / n));
  }
  return [...set].sort((x, y) => x - y);
}
const band = s => s >= BANDS.advanced ? 'Advanced' : s >= BANDS.proficient ? 'Proficient' : 'Emerging';

const out = [];
const say = (...a) => out.push(a.join(' '));

say('── Inputs ─────────────────────────────────────────────────────────────');
say(`Levels: Not Yet ${LEVELS.notYet} · Emerging ${LEVELS.emerging} · Achieved ${LEVELS.achieved}`);
say(`Bands: Advanced ${BANDS.advanced}+ · Proficient ${BANDS.proficient}-84.9 · Emerging <${BANDS.proficient}`);
say(`NCF-FS competencies counted: ${totalComp} across 13 curricular goals`);
say('');

say('── (a) The unreachable floor ──────────────────────────────────────────');
say(`Lowest achievable domain score = ${floor}% (every competency at Not Yet)`);
say(`Reachable range = ${reachable} of 100 points; ${floor} points of the scale are dead`);
say(`Share of the 0-100 bar that can never be used = ${r1(floor)}%`);
say(`Emerging band occupies ${r1(((BANDS.proficient - floor) / reachable) * 100)}% of the reachable range`);
say(`Proficient ${r1((bandWidth / reachable) * 100)}% · Advanced ${r1(((100 - BANDS.advanced) / reachable) * 100)}%`);
say('');

say('── (b) Band fragility, with real competency counts ────────────────────');
say('group                          goals   n   one flip   flips to cross');
say('                                                       Proficient band');
for (const g of GROUPS) {
  const s = step(g.n);
  say(
    g.name.padEnd(30),
    String(g.goalCount).padStart(5),
    String(g.n).padStart(4),
    (r1(s) + ' pts').padStart(11),
    String(r1(bandWidth / s)).padStart(12)
  );
}
say('');
say(`Formula: one flip = (100 - 66) / n ; flips to cross = ${bandWidth} / (34 / n)`);
say('Fragile (one or two judgments cross a whole band):');
for (const g of GROUPS) if (bandWidth / step(g.n) < 2.5) say(`  · ${g.name} (n=${g.n})`);
say('Stable (a band needs a real shift in the child, not one judgment):');
for (const g of GROUPS) if (bandWidth / step(g.n) >= 2.5) say(`  · ${g.name} (n=${g.n})`);
say('');

say('── (b2) How many achievable scores sit in each band ───────────────────');
say('group                            n   achievable   Emerging Proficient Advanced');
for (const g of GROUPS) {
  const vals = achievable(g.n);
  const c = { Emerging: 0, Proficient: 0, Advanced: 0 };
  vals.forEach(v => c[band(v)]++);
  say(
    g.name.padEnd(30),
    String(g.n).padStart(4),
    String(vals.length).padStart(12),
    String(c.Emerging).padStart(10),
    String(c.Proficient).padStart(10),
    String(c.Advanced).padStart(9)
  );
}
say('');

say('── (c) Weighting distortion (equal 100 points per group) ──────────────');
const perComp = GROUPS.map(g => ({ name: g.name, n: g.n, w: 100 / g.n }));
for (const p of perComp) {
  say(`${p.name.padEnd(30)} n=${String(p.n).padStart(2)}  one competency = ${r1(p.w)} of 100 group points`);
}
const hi = perComp.reduce((a, b) => (a.w > b.w ? a : b));
const lo = perComp.reduce((a, b) => (a.w < b.w ? a : b));
say(`Ratio: one judgment in ${hi.name} counts ${r1(hi.w / lo.w)}x one in ${lo.name}`);
say('');
say('If all competencies were weighted equally instead, group weights would be:');
for (const g of GROUPS) {
  const equal = (g.n / totalComp) * 100;
  const diff = equal - 100 / GROUPS.length;
  say(`${g.name.padEnd(30)} ${r1(equal)}%  (${diff >= 0 ? '+' : ''}${r1(diff)} pts vs equal-domain ${r1(100 / GROUPS.length)}%)`);
}
say('');

say('── (d) Teacher judgment load ─────────────────────────────────────────');
const CLASS = 25, CYCLES = 3;   // ILLUSTRATIVE — replace with Om's field inputs
say(`Formula: children x competencies x cycles`);
say(`Illustrative: ${CLASS} x ${totalComp} x ${CYCLES} = ${CLASS * totalComp * CYCLES} developmental judgments per teacher per year`);
say(`(competency count is sourced; class size and cycles are illustrative until Om supplies them)`);
say('');

say('── (e) Small-cell suppression threshold ──────────────────────────────');
say('A gender gap is mean(girls) - mean(boys). One competency flip for one girl');
say('moves the girls mean by (34 / n) / g, so it moves the published gap by the same.');
say('');
say('group                            n   flip moves one child   subgroup size g needed');
say('                                     by (pts)               to keep gap shift < 1 pt');
for (const g of GROUPS) {
  const s = step(g.n);
  say(g.name.padEnd(30), String(g.n).padStart(4), (r1(s) + '').padStart(18), String(Math.ceil(s)).padStart(24));
}
const worst = Math.max(...GROUPS.map(g => Math.ceil(step(g.n))));
say('');
say(`Worst case across groups: g >= ${worst}. Rounding to the reporting convention gives`);
say(`a suppression threshold of 10 children per subgroup — arithmetically justified,`);
say(`not borrowed. Below that the tile shows the cohort size and no gap figure.`);

console.log(out.join('\n'));
