# System Analysis

## Scope

This document reflects the current implementation only.

- UI analysis is based on the current React code.
- Database field lists are based on fields readable through the current Supabase publishable key.
- Exact SQL column types are not exposed through the current public API, so types below are listed as observed runtime/API value types rather than PostgreSQL definitions.

## 1. Database Schema

### `periods`

Observed fields:

| Field | Observed type | Notes |
| --- | --- | --- |
| `id` | string | UUID-like identifier |
| `name` | string | Example: `2026-03-01 to 2026-03-15` |
| `start_date` | string | ISO date string |
| `end_date` | string | ISO date string |

Relationship:

- `periods.id` is referenced by `expenses.period_id`
- `periods.id` is referenced by `income.period_id`

### `expenses`

Observed fields:

| Field | Observed type | Notes |
| --- | --- | --- |
| `id` | string | UUID-like identifier |
| `name` | string | Expense label |
| `amount` | number | Numeric amount |
| `category` | string | Example: `general` |
| `user_name` | string | Example: `family` |
| `type` | string | `fixed` or `extra` |
| `active` | boolean | Currently present in DB rows |
| `created_at` | string | ISO datetime string |
| `period_id` | string | Foreign key to `periods.id` |
| `note` | null or string | Currently null in sampled rows |
| `expense_date` | null or string | Currently null in sampled rows |

Relationship:

- Many `expenses` belong to one `period` through `period_id`

### `income`

Observed fields:

| Field | Observed type | Notes |
| --- | --- | --- |
| `id` | string | UUID-like identifier |
| `name` | string | Income label or person name |
| `amount` | number | Numeric amount |
| `user_name` | null or string | Currently null in sampled rows |
| `created_at` | string | ISO datetime string |
| `period_id` | string | Foreign key to `periods.id` |
| `income_date` | null or string | Currently null in sampled rows |

Relationship:

- Many `income` rows belong to one `period` through `period_id`

## 2. Transaction Flow (UI -> DB)

### Current "Add Transaction" form fields

The form currently collects:

- `type` with values `income` or `expense`
- `name`
- `amount`
- `date`
- `user` for income only
- `expenseType` for expense only
- `category` for expense only
- `notes`

### Current behavior

The form does not write to Supabase.

- On submit it only logs `console.log('Adding:', { type, ...formData })`
- Then it navigates to `/income` or `/expenses`

There is currently no implemented UI -> DB transaction flow.

### Field-to-column mapping

#### Expense form

| Form field | Intended DB column | Current status |
| --- | --- | --- |
| `name` | `expenses.name` | Collected, not persisted |
| `amount` | `expenses.amount` | Collected as string in form state, not persisted |
| `category` | `expenses.category` | Collected, not persisted |
| `expenseType` | `expenses.type` | Collected, naming mismatch in UI vs DB |
| `notes` | `expenses.note` | Collected as `notes`, DB field appears to be `note` |
| `date` | `expenses.expense_date` | Collected, not persisted |
| `type` = `expense` | none | UI control only |
| `user` | possibly `expenses.user_name` | Not used for expenses in current form |
| period selection | `expenses.period_id` | Missing from form |

#### Income form

| Form field | Intended DB column | Current status |
| --- | --- | --- |
| `name` | `income.name` | Collected, not persisted |
| `amount` | `income.amount` | Collected as string in form state, not persisted |
| `user` | `income.user_name` | Collected, not persisted |
| `date` | `income.income_date` | Collected, not persisted |
| `notes` | none visible in current DB sample | Collected in UI but no observed DB field |
| `type` = `income` | none | UI control only |
| period selection | `income.period_id` | Missing from form |

### Mismatches and missing mappings

- The Add form has no `period_id` input or derived mapping, but both `expenses` and `income` require `period_id`.
- The expense form field is named `expenseType`, while the DB column is `type`.
- The expense form uses `notes`, while the DB field appears to be `note`.
- The income form collects `notes`, but no corresponding `income` field is visible in the current readable schema.
- The form collects `date`, but the DB uses table-specific fields: `expense_date` and `income_date`.
- The form keeps `amount` as a string, while DB rows store numeric amounts.
- The expense flow currently does not collect or derive `active`, even though the DB table includes it.

## 3. Business Logic

### Expense classification

Expenses are classified by `type`:

- `fixed`
- `extra`

Current calculation code filters expense rows by `type` and sums each group separately.

### Income storage

Income is stored as one row per income item for a period.

Currently used columns in the dashboard:

- `amount`
- `period_id`

Rows inserted earlier also used:

- `name`

### Calculations

Current dashboard logic performs:

- `total_fixed = sum(expenses where type === 'fixed')`
- `total_extra = sum(expenses where type === 'extra')`
- `total_income = sum(income.amount)`
- `remaining = total_income - total_fixed - total_extra`
- `split = remaining / 2`

The dashboard fetches:

- all `periods`
- selected period `expenses` with `amount` and `type`
- selected period `income` with `amount`

## 4. Gaps and Inconsistencies

### Gaps

- No Add Transaction persistence to Supabase exists yet.
- No form support exists for selecting or deriving `period_id`.
- Expenses and income screens still rely on mock data, while the dashboard uses Supabase.
- The database includes fields like `active`, `created_at`, `expense_date`, and `income_date`, but most are not used in the live dashboard calculations.

### Inconsistencies

- UI naming and DB naming differ:
  - `expenseType` vs `type`
  - `notes` vs `note`
  - shared `date` field vs table-specific `expense_date` and `income_date`
- UI types differ from DB/runtime types:
  - form `amount` is a string
  - DB `amount` is numeric
- Income rows currently support both `name` and `user_name`, which may overlap conceptually.
- Expense rows also store both `name` and `category`; current sample data uses `category = general`, which reduces the usefulness of category-based reporting.

### Potential improvements

- Add explicit `period_id` handling in the form flow before any DB insert is implemented.
- Normalize field naming between UI and DB:
  - `expenseType` -> `type`
  - `notes` -> `note`
  - `date` -> `expense_date` or `income_date`
- Decide whether `income.name` and `income.user_name` have distinct roles.
- Decide whether `expenses.user_name` is required for all expense rows.
- Align all screens to Supabase-backed data so the app has one consistent source of truth.
