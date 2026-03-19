# Change Log

## Task summary

Finalized financial calculations using the current period logic.

## Files created or modified

- `/src/app/App.tsx`
- `.context/2026-03-19-1144-finalize-current-period-financial-calculations.md`

## Description of changes

- Removed the temporary hardcoded period override used for debugging
- Restored current-period selection using the most recent `start_date`
- Fetched `expenses` and `income` for the selected current period
- Re-ran `total_fixed`, `total_extra`, `total_income`, `remaining`, and `split`
- Logged the current period name together with the calculated totals
- Added clear console messages for missing current period data

## Assumptions

- The most recent `start_date` represents the active current period
- Empty-state handling only needs to report missing data in the console

## Next steps

- Verify the current-period totals in the browser console
- Reuse these values when connecting live data to the dashboard
