-- ===========================================================================
-- Supabase Schema for "Simulasi Interaktif Tata Letak Kantor"
-- Run this in the Supabase SQL editor.
-- ===========================================================================

create extension if not exists "uuid-ossp";

-- =========================
-- materi (pembelajaran)
-- =========================
create table if not exists public.materi (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  summary     text not null,
  icon        text not null default 'BookOpen',
  body        text[] not null default '{}',
  layouts     jsonb,
  sort_order  integer not null default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- =========================
-- quiz_questions
-- =========================
create table if not exists public.quiz_questions (
  id             uuid primary key default uuid_generate_v4(),
  question       text not null,
  options        text[] not null,
  correct_index  integer not null check (correct_index >= 0),
  explanation    text not null,
  sort_order     integer not null default 0,
  created_at     timestamptz default now()
);

-- =========================
-- quiz_results
-- =========================
create table if not exists public.quiz_results (
  id          uuid primary key default uuid_generate_v4(),
  score       integer not null check (score >= 0 and score <= 100),
  total       integer not null check (total >= 0),
  correct     integer not null check (correct >= 0),
  created_at  timestamptz default now()
);

create index if not exists quiz_results_created_at_idx
  on public.quiz_results (created_at desc);

-- =========================
-- user_progress
-- =========================
create table if not exists public.user_progress (
  id                uuid primary key default uuid_generate_v4(),
  module            text not null check (module in ('materi','simulasi','drag-drop','quiz')),
  completed         boolean not null default false,
  progress_percent  integer not null default 0 check (progress_percent between 0 and 100),
  updated_at        timestamptz default now()
);

-- =========================
-- Row Level Security
-- =========================
alter table public.materi enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_results enable row level security;
alter table public.user_progress enable row level security;

-- Public read for materi & quiz_questions
create policy "Public read materi" on public.materi for select to anon using (true);
create policy "Public read quiz_questions" on public.quiz_questions for select to anon using (true);

-- Authenticated (admin) full access
create policy "Admin full materi" on public.materi for all to authenticated using (true) with check (true);
create policy "Admin full quiz_questions" on public.quiz_questions for all to authenticated using (true) with check (true);

-- Quiz results & progress (anon insert/select)
create policy "Anon insert quiz_results" on public.quiz_results for insert to anon with check (true);
create policy "Anon select quiz_results" on public.quiz_results for select to anon using (true);
create policy "Auth full quiz_results" on public.quiz_results for all to authenticated using (true) with check (true);

create policy "Anon all user_progress" on public.user_progress for all to anon using (true) with check (true);
create policy "Auth full user_progress" on public.user_progress for all to authenticated using (true) with check (true);
