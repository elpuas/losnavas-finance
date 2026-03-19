# Change Log

## Task summary

Connected the Add Transaction form to Supabase persistence using the currently selected period.

## Files created or modified

- `/src/app/components/Layout.tsx`
- `/src/app/screens/Dashboard.tsx`
- `/src/app/screens/Add.tsx`
- `.context/2026-03-19-1250-transaction-persistence.md`

## Description of changes

- Created shared route-level state for the currently selected period and a refresh trigger
- Updated the dashboard to read and update the shared current period state
- Connected the Add Transaction form to Supabase inserts for `expenses` and `income`
- Mapped form fields explicitly to database columns, including date and note fields
- Navigated back to the dashboard after insert and triggered a refresh for the current period data

## Assumptions

- The selected period is established from the dashboard before navigating to the Add form
- `period_id` is required for both `expenses` and `income` inserts

## Next steps

- Test expense and income inserts from the form against multiple periods
- Connect the expenses and income list screens to Supabase so the entire app reflects persisted data
