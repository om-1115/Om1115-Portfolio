-- ─── Portfolio Database Schema ───────────────────────────────────────────────
-- Run this in Supabase SQL Editor first, then run seed.sql

create table projects (
  id            text primary key,
  status        text not null default 'shipped',
  title         text not null,
  category      text,
  year          text,
  description   text,
  tags          jsonb default '[]',
  color         text,
  icon_gradient text,
  accent_color  text,
  detail        jsonb,
  sort_order    int  default 0
);

create table experience (
  id             serial primary key,
  role           text not null,
  company        text not null,
  url            text,
  period         text,
  location       text,
  tags           jsonb default '[]',
  logo_gradient  text,
  logo_id        text,
  logo_url       text,
  points         jsonb default '[]',
  sort_order     int  default 0
);

create table testimonials (
  id         serial primary key,
  quote      text not null,
  name       text not null,
  role       text,
  company    text,
  initials   text,
  sort_order int  default 0
);

-- Enable Row Level Security (read-only for public)
alter table projects    enable row level security;
alter table experience  enable row level security;
alter table testimonials enable row level security;

create policy "public read projects"    on projects    for select using (true);
create policy "public read experience"  on experience  for select using (true);
create policy "public read testimonials" on testimonials for select using (true);
