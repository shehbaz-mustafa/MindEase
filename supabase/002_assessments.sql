-- Run this in the Supabase SQL Editor after 001_profiles.sql

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  score integer not null,
  category text not null check (category in ('thriving', 'steady', 'needs_support')),
  breakdown jsonb not null default '{}'::jsonb,
  responses jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now()
);

alter table public.assessments enable row level security;

create index if not exists assessments_user_id_completed_at_idx
  on public.assessments (user_id, completed_at desc);

-- Students may only read their own assessments
create policy "Assessments: select own"
  on public.assessments for select
  using (auth.uid() = user_id);

-- Students may only insert assessments under their own user id
create policy "Assessments: insert own"
  on public.assessments for insert
  with check (auth.uid() = user_id);

-- No update/delete policy: assessments are immutable historical records.
