# Change Log

## Task summary

Added period filtering and category-based icon coverage to the Expenses screen.

## Files created or modified

- `/src/app/screens/Expenses.tsx`
- `/src/app/components/ExpenseItem.tsx`
- `.context/2026-03-20-1031-expenses-period-filter-and-icons.md`

## Description of changes

- Added a period selector to the Expenses screen using shared current-period state
- Loaded available periods from Supabase for selector options
- Filtered rendered expenses by the selected period
- Excluded zero-value expenses before grouping and total calculations
- Recomputed fixed, extra, and total values from the visible filtered data
- Added `utilities` to the category-to-icon mapping and preserved fallback to `Other`

## Assumptions

- Zero-value expenses should be hidden from both lists and totals
- `utilities` may appear as a stored expense category from Supabase data

## Next steps

- Verify the selector stays in sync with the dashboard period
- Confirm utilities expenses render with the intended icon and zero-value rows stay hidden
