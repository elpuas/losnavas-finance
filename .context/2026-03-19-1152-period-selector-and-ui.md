# Change Log

## Task summary

Added period selection and live financial totals to the dashboard UI.

## Files created or modified

- `/src/app/App.tsx`
- `/src/app/screens/Dashboard.tsx`
- `.context/2026-03-19-1152-period-selector-and-ui.md`

## Description of changes

- Removed duplicated financial-loading logic from `App` so routing stays simple
- Fetched all periods from Supabase inside `Dashboard`
- Added a simple period selector to choose the active period
- Re-fetched `expenses` and `income` whenever the selected period changed
- Reused one local calculation function to derive `total_fixed`, `total_extra`, `total_income`, `remaining`, and `split`
- Displayed the selected period and calculated values in the existing dashboard cards

## Assumptions

- The `periods` table includes `id`, `name`, and `start_date`
- Expense rows include `amount`, `type`, and `period_id`
- Income rows include `amount` and `period_id`

## Next steps

- Verify period switching in the browser against Supabase data
- Replace remaining mock-data screens when those sections are connected to live data
