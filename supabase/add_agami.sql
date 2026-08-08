-- ─── Add Agami experience (Design Lead, part-time) ──────────────────────────
-- Run in Supabase SQL Editor. Mirrors the static fallback in js/data.js.
-- Agami slots in right after ConveGenius.AI, so later roles shift down one.

update experience set sort_order = sort_order + 1 where sort_order >= 2;

insert into experience (role, company, url, period, location, tags, logo_gradient, logo_id, logo_url, points, sort_order) values
(
  'Design Lead', 'Agami', 'https://agami.in/', 'Sep 2025 — Present', 'Part-Time',
  '["Judiciary", "Service Delivery", "AI Design", "Systems", "Research", "Product"]',
  'linear-gradient(135deg,#047857 0%,#10b981 100%)',
  'agami', null,
  '["Leading design for a completely codeless user experience, live across four states — Kerala, Haryana, Punjab and Sikkim.", "Defined the complex user journeys for resolving cases, currently solving for the S138 case."]',
  2
);
