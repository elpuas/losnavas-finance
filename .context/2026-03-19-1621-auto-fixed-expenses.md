# Change Log

## Task summary

Added automatic fixed-expense creation for a selected period based on fixed expense templates.

## Files created or modified

- `/src/app/screens/Dashboard.tsx`
- `.context/2026-03-19-1621-auto-fixed-expenses.md`

## Description of changes

- Added template-aware fixed-expense initialization inside the dashboard data flow
- Checked whether fixed expenses already exist for the selected period before inserting anything
- Loaded fixed expense templates from `transaction_templates`
- Created one zero-amount fixed expense per template only when the period had no existing fixed expenses
- Re-fetched expenses after the insert attempt before recalculating totals
- Logged insert failures clearly without overwriting existing expense data

## Assumptions

- Template rows currently provide `name` and optional `user_name`
- When template category is unavailable, the created fixed expense uses `general`

## Next steps

- Verify first-load behavior on a period with no fixed expenses
- Confirm repeated visits do not create duplicate fixed expenses
