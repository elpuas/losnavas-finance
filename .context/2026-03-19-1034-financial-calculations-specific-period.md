# Change Log

## Task summary

Debugged financial calculations using the historical period `2026-03-01 to 2026-03-15`.

## Files created or modified

- `/src/app/App.tsx`
- `.context/2026-03-19-1034-financial-calculations-specific-period.md`

## Description of changes

- Replaced current-period selection with a direct fetch by period name
- Used the selected period `id` to fetch `expenses` and `income`
- Re-ran `total_fixed`, `total_extra`, `total_income`, `remaining`, and `split`
- Logged the selected period separately from the financial totals for easier debugging

## Assumptions

- The target period name is unique in the `periods` table
- The selected historical period has the expense and income data needed for verification

## Next steps

- Check the browser console for the selected period and calculated totals
- Switch back to dynamic current-period logic after the values are verified
