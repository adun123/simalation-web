-- ===========================================================================
-- Supabase Schema for "Simulasi Interaktif Tata Letak Kantor"
-- Run this in the Supabase SQL editor when you want to enable persistence.
-- The app works fully without Supabase using dummy data.
-- ===========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =========================
-- quiz_results
-- =========================
create table if not exists public.quiz_results (
  id          uuid primary key default uuid_generate_v4(),
  score       integer not null check (score >= 0 and score <= 100),
  total       integer not null check (total >= 0),
  correct     integer not null check (correct >= 0),
  created_at  timestamp with time zone default now()
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
  updated_at        timestamp with time zone default now()
);

-- =========================
-- Row Level Security (open read/write for demo only)
-- Tighten these policies before production!
-- =========================
alter table public.quiz_results enable row level security;
alter table public.user_progress enable row level security;

drop policy if exists "Allow anon insert quiz_results" on public.quiz_results;
create policy "Allow anon insert quiz_results"
  on public.quiz_results for insert to anon with check (true);

drop policy if exists "Allow anon select quiz_results" on public.quiz_results;
create policy "Allow anon select quiz_results"
  on public.quiz_results for select to anon using (true);

drop policy if exists "Allow anon upsert user_progress" on public.user_progress;
create policy "Allow anon upsert user_progress"
  on public.user_progress for all to anon using (true) with check (true);
