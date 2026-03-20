# Change Log

## Task summary

Connected the Expenses screen to Supabase and filtered it by the selected period.

## Files created or modified

- `/src/app/screens/Expenses.tsx`
- `/src/app/components/ExpenseItem.tsx`
- `.context/2026-03-20-0956-expenses-wiring.md`

## Description of changes

- Replaced mock expense data in the Expenses screen with Supabase data
- Filtered all rendered expenses by the shared `currentPeriodId`
- Kept fixed and extra expense groups based on the database `type` field
- Recalculated totals and counts from the filtered period data
- Mapped database fields into the existing `ExpenseItem` props shape
- Normalized category-based icon selection and fell back to `Other` when category is missing

## Assumptions

- The selected period in shared layout context is the source of truth for filtering
- Expense rows may have nullable `category`, `active`, `expense_date`, or `note`

## Next steps

- Verify expenses refresh after adding or editing a transaction
- Consider persisting the active toggle if it should be saved to Supabase later
