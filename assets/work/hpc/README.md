# HPC — case study exhibits

Device mockups built from the HPC app designs (`~/Downloads/hpc/Screens/HP`,
exported from the Figma file). Rebuild with:

    node scripts/build-hpc-mockups.js [source-dir]

That script composes each mockup in HTML — phone frame, tinted ground, crop
offsets — renders it with headless Chrome at 2×, and writes here. Downscale
afterwards with `sips -Z 1800`.

| File | Source screens | Where it appears |
|------|----------------|------------------|
| `01-home-class-overview.png` | 8.1 | The premise |
| `02-live-hpc-flow.png` | 11, 12, 13 | Matter 002 |
| `03-student-report.png` | 13 (two crops) | Matter 001 |
| `04-student-profile-schema.png` | 14, values blurred | Matter 002 |
| `05-grade-selection-flow.png` | Grade Selection 01–03 | Matter 002 |

## The blurred one

`04` blurs everything below the header on purpose. That exhibit exists to show
how many child-level fields the schema carries and that a drill-down reaches
them — not what sits in the fields. The blur is applied at build time by the
script (`blurBelow`), so it cannot be forgotten on a rebuild, and the exhibit
declares `clearance: 'redacted'` with a note, which `check:content` enforces.

## Clearance

These are internal product screens. Row 14 of `CLEARANCE.md` covers them, and
it is `pending` — they should not go public until that is signed off.
