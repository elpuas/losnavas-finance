alter table public.transaction_templates
add column if not exists category text null;
