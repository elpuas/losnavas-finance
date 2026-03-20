# Change Log

## Task summary

Fixed expense template dropdown filtering so it updates correctly from the selected category.

## Files created or modified

- `/src/app/screens/Add.tsx`
- `.context/2026-03-20-0942-expense-template-category-filter-debug.md`

## Root cause

- Category filtering used raw string equality, which is fragile when template category values differ by case or whitespace.
- The dropdown options were derived through multiple similar filter paths, which made the final fixed-template list less explicit than it should be.

## Description of changes

- Added normalized category comparison using `trim().toLowerCase()`
- Derived expense templates from a single filtered category source
- Kept the fixed template dropdown tied to the selected expense type and selected category
- Preserved `Add new` as the first option and left the UI structure unchanged

## Expected outcome

- Education can match templates stored as `education`, `Education`, or values with surrounding whitespace
- Fixed template dropdown updates immediately when category changes
- When no category-matching template exists, only `Add new` remains in the dropdown
