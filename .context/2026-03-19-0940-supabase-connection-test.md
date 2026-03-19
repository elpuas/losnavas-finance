# Change Log

## Task summary

Validate Supabase connection on application load.

## Files created or modified

- `/src/app/App.tsx`

## Description of changes

- Imported the existing Supabase client into the root component
- Executed a one-time query against the `periods` table on initial load
- Logged the result as `Supabase connection test` with both `data` and `error`

## Assumptions

- Supabase environment variables are present and valid
- The `periods` table is accessible with the current client key

## Next steps

- Confirm the query result in the browser console
- Replace the test query with real data integration when ready
