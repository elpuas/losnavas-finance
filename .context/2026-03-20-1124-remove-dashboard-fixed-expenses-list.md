# Change Log

## Task summary

Removed the fixed expenses list from the Dashboard to simplify the UI.

## Files created or modified

- `/src/app/screens/Dashboard.tsx`
- `.context/2026-03-20-1124-remove-dashboard-fixed-expenses-list.md`

## Description of changes

- Removed the entire fixed expenses list block from the dashboard
- Removed the local fixed-expense editing state and handler that only supported that list
- Kept the summary totals, expense breakdown chart, remaining balance, and split sections unchanged
- Preserved all database loading and calculation logic needed for dashboard summary data

## Assumptions

- Detailed expense item management belongs on the Expenses screen rather than the Dashboard

## Next steps

- Verify the dashboard spacing remains clean with the list removed
- Continue using the Expenses screen for item-level expense management
