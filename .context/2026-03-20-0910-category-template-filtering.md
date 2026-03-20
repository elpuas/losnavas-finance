# Change Log

## Task summary

Improved the Add Expense flow so category selection filters expense templates.

## Files created or modified

- `/src/app/screens/Add.tsx`
- `/supabase/migrations/202603200910_add_category_to_transaction_templates.sql`
- `.context/2026-03-20-0910-category-template-filtering.md`

## Description of changes

- Added `category` to `transaction_templates` via migration
- Loaded template category data in the Add screen
- Filtered fixed and extra expense templates by the selected category
- Kept category buttons as the primary selector and templates as a separate secondary choice
- Auto-filled the expense name when a matching fixed template is selected
- Preserved the `Add new` option even when no templates exist for the selected category

## Assumptions

- Expense templates should be scoped by category
- Income templates remain independent from category selection

## Next steps

- Apply the new migration before testing category-filtered templates
- Verify fixed template selection and extra template suggestions across multiple categories
