# Change Log

## Task summary

Added local financial calculations for the selected current period.

## Files created or modified

- `/src/app/App.tsx`
- `.context/2026-03-19-1031-financial-calculations.md`

## Description of changes

- Kept the current period selection in the root component using the most recent `start_date`
- Fetched `expenses` and `income` for the selected period only
- Classified expenses into `fixed` and `extra`
- Calculated `total_fixed`, `total_extra`, `total_income`, `remaining`, and `split`
- Logged the calculated values without changing the UI or introducing global state

## Assumptions

- The `income` table stores one or more records with `amount` and `period_id`
- Expense records include `type` values of `fixed` or `extra`

## Next steps

- Verify the logged totals against the seeded Supabase data
- Reuse these calculations when connecting the dashboard to live data
