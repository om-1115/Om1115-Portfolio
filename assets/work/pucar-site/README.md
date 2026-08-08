# pucar.org — audit exhibits

Captured from the live public site on 7 August 2026 at 1440×820 (desktop) and
390×844 (mobile), device scale 2–3, downscaled to 1800px. These evidence the
audit findings in matter 003 of the Encode Pucar case study.

| File | Shows | Finding |
|------|-------|---------|
| `01-home-hero.png` | The homepage at rest, wordmark inside the scrolling hero | 1 |
| `02-scrolled-no-wordmark.png` | Same page scrolled — fixed bar with links, no mark, no route home | 1 |
| `03-nav-pill-over-cta.png` | The fixed pill sitting on a linked card, cutting its subtitle | 2 |
| `04-mobile-nav.png` | Mobile bar at the same depth — a Main Menu control, no mark | 1 |

Re-capture with `scripts/capture-pucar-site.js`. The overlap in `03` was found by
scanning scroll offsets for any interactive element intersecting the fixed pill's
rect, rather than by eye — the script prints the offsets it finds.

## A finding that changed

The original audit note said the fix for finding 1 was cheap "because the correct
pattern already exists in the same codebase — /about pins the wordmark and mobile
has a compact P mark." Re-checked while capturing: neither holds on the live site
today. The fixed nav on `/about` carries no mark either, and the mobile bar shows
only "Main Menu". The case study now says so, and says why that makes the fix a
larger piece of work than first assumed.
