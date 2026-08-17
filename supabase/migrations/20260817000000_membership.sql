create extension if not exists pgcrypto;

create table public.members (
  id uuid primary key default gen_random_uuid(),

  first_name text not null check (char_length(first_name) between 1 and 80),
  last_name text not null check (char_length(last_name) between 1 and 80),
  email text not null unique check (
    email = lower(trim(email)) and char_length(email) <= 254
  ),

  gender text check (
    gender is null or gender in (
      'male',
      'female',
      'non_binary',
      'self_describe',
      'prefer_not_to_say'
    )
  ),
  gender_self_description text check (
    gender_self_description is null or char_length(gender_self_description) <= 80
  ),

  school text check (school is null or char_length(school) <= 160),
  graduation_year integer check (graduation_year is null or graduation_year between 2000 and 2100),
  city text check (city is null or char_length(city) <= 100),
  country text check (country is null or char_length(country) <= 100),
  discord_username text check (discord_username is null or char_length(discord_username) <= 80),
  interests text[] not null default '{}',
  how_heard text check (how_heard is null or char_length(how_heard) <= 160),

  email_consent boolean not null default false,
  email_consent_at timestamptz,
  membership_status text not null default 'active' check (
    membership_status in ('active', 'unsubscribed', 'removed')
  ),
  source text not null default 'website' check (char_length(source) between 1 and 50),

  resend_contact_id text,
  resend_sync_status text not null default 'pending' check (
    resend_sync_status in ('synced', 'pending', 'failed')
  ),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  check (email_consent = false or email_consent_at is not null),
  check (gender = 'self_describe' or gender_self_description is null)
);

create index members_created_at_idx on public.members (created_at desc);
create index members_status_idx on public.members (membership_status);
create index members_resend_contact_idx on public.members (resend_contact_id)
  where resend_contact_id is not null;

create or replace function public.set_members_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger members_set_updated_at
before update on public.members
for each row execute function public.set_members_updated_at();

alter table public.members enable row level security;
alter table public.members force row level security;

revoke all on table public.members from anon, authenticated;
grant select, insert, update, delete on table public.members to service_role;

-- Intentionally no anon or authenticated policies: all membership access occurs
-- through server-side routes using the service-role key.
