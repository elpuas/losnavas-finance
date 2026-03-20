# Change Log

## Task summary

Added biweekly period resolution and creation to transaction submit flow.

## Files created or modified

- `/src/app/screens/Add.tsx`
- `.context/2026-03-20-0858-biweekly-period-resolution.md`

## Description of changes

- Derived the target biweekly range from the form date during submit
- Queried `periods` by matching `start_date` and `end_date`
- Created a new period when no matching period existed
- Retried the lookup after insert failure as a best-effort guard for concurrent submissions
- Used the resolved `period_id` for both income and expense inserts
- Updated shared current-period state to the resolved period before returning to the dashboard

## Assumptions

- Biweekly periods follow `1-15` and `16-end-of-month`
- The selected form date is the source of truth for transaction-to-period assignment

## Next steps

- Verify inserts on both halves of the month create or reuse the correct periods
- Confirm repeated submissions on the same date range reuse the existing period
