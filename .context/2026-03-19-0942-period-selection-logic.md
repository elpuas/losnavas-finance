# Change Log

## Task summary

Implement period selection logic using Supabase.

## Files created or modified

- `/src/app/App.tsx`

## Description of changes

- Fetched all records from the `periods` table on initial application load
- Selected the most recent period using `start_date` descending order
- Stored the selected record as the current period in local application state
- Logged the selected period as `Current period selected`

## Assumptions

- `start_date` exists on the `periods` table and can be used for ordering
- The most recent period should be treated as the active current period

## Next steps

- Use the current period to scope expense and income queries
- Surface the selected period in the UI when needed
