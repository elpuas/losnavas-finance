create table if not exists public.transaction_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('income', 'expense')),
  subtype text null check (subtype in ('fixed', 'extra')),
  user_name text null,
  created_at timestamptz not null default now()
);
