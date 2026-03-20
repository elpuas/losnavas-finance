# Change Log

## Task summary

Added inline editing for fixed expense amounts in the dashboard.

## Files created or modified

- `/src/app/screens/Dashboard.tsx`
- `.context/2026-03-20-0837-inline-edit-expenses.md`

## Description of changes

- Loaded fixed expense rows with `id`, `name`, and `amount` into dashboard state
- Added inline amount inputs for fixed expenses only
- Updated Supabase on blur when a valid amount changed
- Skipped updates when the amount did not change
- Reverted invalid or failed updates to the previous value
- Updated totals locally after successful edits so the UI recalculates immediately

## Assumptions

- Inline editing should be limited to fixed expenses in the selected period
- Negative amounts are considered invalid for this flow

## Next steps

- Verify blur-based updates against live Supabase data
- Confirm totals and charts stay in sync after repeated edits
