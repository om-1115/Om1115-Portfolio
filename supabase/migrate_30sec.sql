-- ─── Migrate existing recruiter data → project_30sec ─────────────────────────
-- Run AFTER schema_blocks.sql

insert into project_30sec (project_id, role, timeline, live_url, domain, platform, team, problem, shipped, owned, bullets)
select
  id,
  detail->'recruiter'->>'role'      as role,
  detail->'recruiter'->>'timeline'  as timeline,
  detail->'recruiter'->>'liveAt'    as live_url,
  detail->'recruiter'->>'domain'    as domain,
  detail->'recruiter'->>'platform'  as platform,
  detail->'recruiter'->>'team'      as team,
  detail->'recruiter'->>'problem'   as problem,
  detail->'recruiter'->>'shipped'   as shipped,
  detail->'recruiter'->'owned'      as owned,
  detail->'recruiter'->'bullets'    as bullets
from projects
where detail->'recruiter' is not null;
