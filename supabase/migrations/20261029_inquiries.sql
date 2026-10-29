-- HAVELO inquiry storage migration
-- Run this in Supabase Dashboard > SQL Editor for the EXISTING HAVELO project.
-- Safe to re-run: uses IF NOT EXISTS. Does not delete existing rows.

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text not null default 'project',
  full_name text not null,
  email text not null,
  phone text,
  company_name text,
  subject text,
  message text,
  service text,
  project_type text,
  region text,
  currency text,
  currency_name text,
  budget text,
  timeline text,
  academic_details jsonb,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.inquiries add column if not exists inquiry_type text not null default 'project';
alter table public.inquiries add column if not exists full_name text;
alter table public.inquiries add column if not exists email text;
alter table public.inquiries add column if not exists phone text;
alter table public.inquiries add column if not exists company_name text;
alter table public.inquiries add column if not exists subject text;
alter table public.inquiries add column if not exists message text;
alter table public.inquiries add column if not exists service text;
alter table public.inquiries add column if not exists project_type text;
alter table public.inquiries add column if not exists region text;
alter table public.inquiries add column if not exists currency text;
alter table public.inquiries add column if not exists currency_name text;
alter table public.inquiries add column if not exists budget text;
alter table public.inquiries add column if not exists timeline text;
alter table public.inquiries add column if not exists academic_details jsonb;
alter table public.inquiries add column if not exists status text not null default 'new';
alter table public.inquiries add column if not exists created_at timestamptz not null default now();

alter table public.inquiries enable row level security;
-- Public browsers must not be able to read/write inquiries directly.
revoke all on table public.inquiries from anon, authenticated;

comment on table public.inquiries is 'HAVELO contact messages and project inquiries. Write via server-only API; never expose secret keys in frontend.';
