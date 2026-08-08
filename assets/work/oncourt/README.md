# ON Court — case study exhibits

**All 17 are captured and in place.** Taken from the deployed app at 1456×803,
device scale 2, then downscaled to 1800×992 — so `1800 / 992` is the exact
aspect ratio each exhibit declares, and nothing is cropped. The case study is
project.html?id=08 (ON Court Sandbox).

Re-capture with `scripts/capture-oncourt.js` (see the header of that file) if the
app changes. `node scripts/check-content.js` fails if a wired exhibit's file is
missing, so a placeholder can no longer ship by accident.

All demo/synthetic data, so `clearance: 'public'` — and the two scrutiny shots
are sanitised, see below.

| # | File | Shows | Wired |
|---|------|-------|-------|
| A | `01-scrutiny-ai-mismatch.png` | Three-pane scrutiny, two AI mismatch cards, accept/keep/flag | Cause list |
| B | `02-scrutiny-ai-unavailable.png` | Same screen, AI off — banner, collapsed panel | Cause list |
| C | `03-foundations-light.png` | Foundations top, 31 pairs clear AA | Cause list |
| D | `04-foundations-dark.png` | Same page dark, every ratio re-measured | Matter 002 |
| E | `05-foundations-status-pairs.png` | Solid + pill status pairs — where the 4.54:1 pair lives | Matter 002 |
| F | `06-foundations-boundaries.png` | The 3:1 non-text contrast section | Matter 002 |
| G | `07-filing-documents.png` | Step 3 of 5, grouped slots, 5 of 7, disabled primary | Matter 002 |
| H | `08-filing-documents-lower.png` | Notice & service, optional docs, empty slot states | Matter 002 |
| I | `09-test-ui-index.png` | The four experiments — proof this is a rig | Cause list |
| J | `10-dashboard-light.png` | KPI row, filings chart, case status | captured, unwired |
| K | `11-dashboard-dark.png` | Dark parity | captured, unwired |
| L | `12-dashboard-cause-list.png` | Cause list with the CNR column | captured, unwired |
| M | `13-case-detail-overview.png` | Case detail, Overview tab, S.138 summary | captured, unwired |
| N | `14-case-detail-hearings.png` | Hearing timeline, parties and documents rails | captured, unwired |
| O | `15-components-patterns.png` | Progressive disclosure, command palette, charts | captured, unwired |
| P | `16-components-navigation.png` | Menubar, public-surface nav, bounded multi-select | captured, unwired |
| Q | `17-new-case-form.png` | Structured filing form, dark | captured, unwired |

"not yet" = captured but not placed in the case study. Say which ones you want
and where, and they get wired — or add them to `exhibits` on matter 002 in
`js/data.js` with a decision-describing `alt` of 40+ characters (the content
check enforces both).

## What was sanitised in A and B

The scrutiny mock renders plausible identity-document content. Before capture,
the script blurs the rendered document page (7px) and rewrites the panel's
identity-shaped strings so they read as obviously synthetic: any Aadhaar-shaped
number becomes `XXXX-XXXX-0000`, and addresses become `Sample address N,
City — 00000N`. The mismatch cards, the accept/keep/flag triad and the no-AI
banner — the parts the exhibits exist to show — are untouched.

If you fix the mock in the app itself, re-capture and this step becomes a no-op.

## Still to capture

The two in-workspace modals (Complete your profile, Pending payment dialog), the
flag composer and review summary inside `/scrutiny`, the rectangle evidence tool
in use, and **a mobile pass at 390px** — audit findings 3 and 5 are sticky-header
problems and will almost certainly be worse there.
