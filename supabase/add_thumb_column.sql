-- ─── Add the work-grid thumbnail column ──────────────────────────────────────
-- Run once against an existing database; schema.sql already includes it for a
-- fresh install. js/db.js spreads every column onto the project object, so the
-- value flows through with no client change.

alter table projects add column if not exists thumb text;

-- Then re-run supabase/add_encode_pucar.sql, add_oncourt.sql and add_hpc.sql,
-- which now carry the thumb path.
