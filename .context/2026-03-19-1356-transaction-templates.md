# Change Log

## Task summary

Added reusable transaction templates for income and expenses.

## Files created or modified

- `/supabase/migrations/202603191356_create_transaction_templates.sql`
- `/src/app/components/Layout.tsx`
- `/src/app/screens/Dashboard.tsx`
- `/src/app/screens/Add.tsx`
- `.context/2026-03-19-1356-transaction-templates.md`

## Description of changes

- Added a migration for the `transaction_templates` table
- Introduced shared current-period state so Add transactions can use the selected dashboard period
- Loaded templates from Supabase in the Add screen
- Added template selection for income and fixed expenses, with an `Add new` path that inserts new templates
- Kept extra expenses as free text and added template-backed suggestions
- Preserved explicit transaction inserts for `income` and `expenses`

## Assumptions

- The migration will be applied before the Add screen queries `transaction_templates`
- The currently selected dashboard period is the source of truth for new transactions

## Next steps

- Apply the new migration to Supabase before testing the Add screen
- Verify template creation and transaction inserts for income, fixed expenses, and extra expenses
