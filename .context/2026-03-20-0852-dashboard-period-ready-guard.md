# Change Log

## Task summary

Prevented dashboard calculations from running before the selected period is fully available.

## Files created or modified

- `/src/app/screens/Dashboard.tsx`
- `.context/2026-03-20-0852-dashboard-period-ready-guard.md`

## Description of changes

- Added a guard so financial calculations only run when `periods` have loaded
- Added a guard so calculations stop if the current period id does not yet resolve to a valid period
- Removed the temporary fallback log path that produced `current_period_name: "Unknown period"`
- Kept the existing insert, refresh, and selected-period behavior unchanged

## Assumptions

- The correct fix is to wait for the resolved selected period instead of logging a fallback placeholder

## Next steps

- Verify transaction submit no longer produces the transient `Unknown period` log
- Confirm dashboard refreshes still recalculate totals after inserts and edits
