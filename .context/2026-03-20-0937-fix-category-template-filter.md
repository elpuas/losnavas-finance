# Change Log

## Task summary

Fixed category-based template filtering in the Add screen.

## Files created or modified

- `/src/app/screens/Add.tsx`
- `.context/2026-03-20-0937-fix-category-template-filter.md`

## Description of changes

- Added explicit `selectedCategory` state at component scope
- Filtered expense templates from `selectedCategory` instead of relying on implicit references
- Reset fixed template selection to `Add new` when category changes
- Kept category buttons as the source of truth for the selected expense category
- Preserved the existing UI structure and transaction logic

## Assumptions

- Expense template filtering should be driven by category selection state
- Income templates should remain unaffected by category changes

## Next steps

- Verify category switching updates the fixed template dropdown instantly
- Confirm no runtime errors occur when templates have not loaded yet
