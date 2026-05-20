-- ─── Project Content Tables ───────────────────────────────────────────────────
-- Run this in Supabase SQL Editor

-- 30-second recruiter skim for each project
create table project_30sec (
  id         serial primary key,
  project_id text   not null references projects(id) on delete cascade,
  role       text,
  timeline   text,
  live_url   text,
  domain     text,
  platform   text,
  team       text,
  problem    text,
  shipped    text,
  owned      jsonb  default '[]',   -- ["UX strategy", "Research", ...]
  bullets    jsonb  default '[]'    -- ["Lead Product Designer on...", ...]
);

-- Flexible content blocks for the full case study body
-- type values: heading | paragraph | image | stats | two_col | quote | embed | list | divider
-- content shape varies by type (see examples below):
--
--   heading  → {"text": "The Problem", "level": 2}
--   paragraph→ {"text": "Long form copy here..."}
--   image    → {"url": "...", "caption": "...", "full_width": false}
--   stats    → {"items": [{"value": "40%", "label": "Cognitive load reduced"}]}
--   two_col  → {"left": {"type": "image", "url": "..."}, "right": {"type": "paragraph", "text": "..."}}
--   quote    → {"text": "...", "author": "Arjun Mehta", "role": "Frontend Engineer"}
--   embed    → {"url": "https://figma.com/...", "platform": "figma", "caption": "Prototype"}
--   list     → {"items": ["...", "..."], "ordered": false}
--   divider  → {}

create table project_blocks (
  id         serial primary key,
  project_id text   not null references projects(id) on delete cascade,
  type       text   not null,
  content    jsonb  not null default '{}',
  sort_order int    default 0
);

-- RLS
alter table project_30sec   enable row level security;
alter table project_blocks  enable row level security;

create policy "public read project_30sec"  on project_30sec  for select using (true);
create policy "public read project_blocks" on project_blocks for select using (true);

-- Indexes for fast project lookups
create index on project_30sec  (project_id);
create index on project_blocks (project_id, sort_order);
