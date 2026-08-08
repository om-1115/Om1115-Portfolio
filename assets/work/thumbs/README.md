# Work-grid thumbnails

Composed from screens already captured for the case studies, so the grid and the
case studies show the same artefacts. Rebuild with:

    node scripts/build-thumbs.js
    cd assets/work/thumbs && for f in *.png; do sips -Z 1400 "$f" --out "$f"; done

| File | Project | Built from |
|------|---------|-----------|
| `encode-pucar.png` | 07 Encode Pucar | ON Court filing step, step 3 of 5 |
| `oncourt-sandbox.png` | 08 ON Court Sandbox | Foundations, the measurement page |
| `hpc.png` | 09 Holistic Progress Card | HPC student list + teacher home, two phones |

One treatment across all three — the project's tint as ground, the screen
floating with a soft shadow and bleeding off the bottom edge, 16:10 to match
`.fw-card__thumb`. A card with no `thumb` falls back to the drawn CSS mockup, so
older projects keep working.

The path lives on the project object in `js/data.js` (`thumb:`) and in the
`thumb` column in the database — `supabase/add_thumb_column.sql` adds it to an
existing install.
