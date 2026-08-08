-- ─── Remove retired projects ─────────────────────────────────────────────────
-- Run in Supabase SQL Editor. The static fallback in js/data.js no longer
-- carries these, but the DB copy overrides the static list, so they keep
-- appearing in the work grid until these rows are gone.
--
--   01 Dashboard Redesign · 02 Component Library · 03 Onboarding Flow
--   04 Brand Identity     · 05 AI Design Toolkit · 06 LabSaarthi
--
-- project_blocks and project_30sec are ON DELETE CASCADE, so their rows go too.

delete from projects where id in ('01', '02', '03', '04', '05', '06');

-- Sanity check — should return only the projects you still want live.
select id, title, status, sort_order from projects order by sort_order;
