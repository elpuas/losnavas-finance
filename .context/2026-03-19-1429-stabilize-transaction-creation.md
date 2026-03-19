# Change Log

## Task summary

Stabilized transaction creation by making template creation atomic, initializing current period in shared context, and validating amount before insert.

## Files created or modified

- `/src/app/components/Layout.tsx`
- `/src/app/screens/Add.tsx`
- `.context/2026-03-19-1429-stabilize-transaction-creation.md`

## Description of changes

- Initialized `currentPeriodId` in shared layout context from the latest Supabase period
- Updated `createTemplate()` to return success or failure
- Blocked transaction inserts when a required new template cannot be created
- Added explicit numeric validation for `amount` before insert
- Kept the changes localized to the existing shared context and Add screen

## Assumptions

- The latest period by `start_date` is the correct fallback current period
- Direct navigation to `/add` should still use the globally initialized current period

## Next steps

- Verify direct entry to `/add` works without first visiting the dashboard
- Test failed template creation and invalid amount inputs in the browser
