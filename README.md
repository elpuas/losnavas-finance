# Los Navas Finance

Los Navas Finance is a small family finance app built with React, Vite, and Supabase. It is designed to track biweekly periods, record income and expenses, and calculate how much money remains after fixed and extra spending.

This is a personal finance tracking app and can be customized for other households, budgeting styles, or categories.

## Features

- Biweekly periods with automatic period lookup and creation
- Income tracking by period
- Expense tracking with `fixed` and `extra` types
- Expense categories such as food, education, health, home, transport, travel, and other
- Remaining balance calculation
- Split calculation based on:

```text
remaining = income - fixed - extra
split = remaining / 2
```

- Transaction templates for repeated income and expense entries
- Optional client-side access phrase gate for lightweight privacy

## Tech Stack

- React
- Vite
- React Router
- Supabase
- Tailwind CSS

## Project Structure

```text
.
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── routes.tsx
│   │   └── App.tsx
│   ├── lib/
│   │   └── supabase.js
│   └── main.tsx
├── supabase/
│   └── migrations/
├── index.html
└── README.md
```

## Local Development

### Prerequisites

- Node.js 18+ recommended
- npm
- A Supabase project

### Install

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-publishable-key
LOS_NAVAS_APP_ACCESS=your-optional-access-phrase
```

Notes:

- `VITE_SUPABASE_URL` is the Supabase project URL.
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` is the public client key for browser access.
- `LOS_NAVAS_APP_ACCESS` is optional. If set, the app shows a client-side access overlay.
- Do not commit real secrets or project-specific keys to the repository.

### Run Locally

```bash
npm run dev
```

The app will be available at the local Vite development URL shown in the terminal.

### Production Build

```bash
npm run build
```

Vite outputs the production build to:

```text
dist/
```

## Supabase Setup

The app expects the following tables:

- `periods`
- `income`
- `expenses`
- `transaction_templates`

### Supabase SQL Schema

The SQL below is copy-paste ready for the Supabase SQL editor.

```sql
create extension if not exists pgcrypto;

create table if not exists public.periods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_date date not null,
  end_date date not null,
  created_at timestamptz not null default now(),
  unique (start_date, end_date)
);

create table if not exists public.income (
  id uuid primary key default gen_random_uuid(),
  period_id uuid not null references public.periods(id) on delete cascade,
  name text not null,
  amount numeric(12, 2) not null check (amount >= 0),
  user_name text null,
  income_date date null,
  created_at timestamptz not null default now()
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  period_id uuid not null references public.periods(id) on delete cascade,
  name text not null,
  amount numeric(12, 2) not null check (amount >= 0),
  category text not null default 'other',
  type text not null check (type in ('fixed', 'extra')),
  active boolean not null default true,
  note text null,
  expense_date date null,
  user_name text null,
  created_at timestamptz not null default now()
);

create table if not exists public.transaction_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('income', 'expense')),
  subtype text null check (subtype in ('fixed', 'extra')),
  user_name text null,
  category text null,
  created_at timestamptz not null default now()
);

create index if not exists periods_start_date_idx
  on public.periods (start_date desc);

create index if not exists income_period_id_idx
  on public.income (period_id);

create index if not exists expenses_period_id_idx
  on public.expenses (period_id);

create index if not exists expenses_type_idx
  on public.expenses (type);

create index if not exists transaction_templates_type_idx
  on public.transaction_templates (type, subtype);
```

### Table Purpose

#### `periods`

Stores biweekly date ranges used across the app.

Key columns:

- `start_date`
- `end_date`
- `name`

Example:

```text
2026-03-01 to 2026-03-15
```

#### `income`

Stores income records linked to a period.

Key columns:

- `period_id`
- `name`
- `amount`
- `user_name`
- `income_date`

#### `expenses`

Stores expense records linked to a period.

Key columns:

- `period_id`
- `name`
- `amount`
- `category`
- `type`
- `active`
- `note`
- `expense_date`
- `user_name`

#### `transaction_templates`

Stores reusable income and expense templates for faster entry.

Key columns:

- `name`
- `type`
- `subtype`
- `user_name`
- `category`

## Database Notes

- UUID primary keys are used for all tables.
- `income.period_id` and `expenses.period_id` reference `periods.id`.
- Deleting a period cascades to its linked income and expense records.
- The schema intentionally stays simple and easy to customize.

If you want to extend it, common additions would be:

- Row Level Security policies
- household/user ownership
- audit fields
- currencies
- recurring transaction automation

## Deployment

### Netlify

This app is compatible with Netlify static deployment.

Recommended settings:

- Build command: `npm run build`
- Publish directory: `dist`

Set the same environment variables in Netlify:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `LOS_NAVAS_APP_ACCESS` if you want the access overlay enabled

Because the app uses client-side routing, Netlify also needs an SPA fallback rule so direct navigation to routes like `/expenses`, `/income`, or `/add` does not return `404`.

Example `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## How the App Works

1. The app resolves or creates a biweekly period from the selected transaction date.
2. Income and expenses are stored against that period.
3. The dashboard loads period data and calculates:

```text
remaining = total income - fixed expenses - extra expenses
split = remaining / 2
```

4. Fixed expense templates can be reused across periods.

## Customization

This project is intentionally simple. You can adapt it for:

- different expense categories
- different split logic
- shared family budgets
- personal finance dashboards
- small household bookkeeping tools

## License

Private internal project by default. Add your preferred license before publishing publicly.
