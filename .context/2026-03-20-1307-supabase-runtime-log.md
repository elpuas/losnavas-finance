# Change Log

## Task summary

Added temporary console logging for Supabase runtime env values and verified them in the browser.

## Files created or modified

- `/src/lib/supabase.js`
- `/.context/2026-03-20-1307-supabase-runtime-log.md`

## Description of changes

- Added `console.log` statements for `supabaseUrl` and `supabaseKey` in the shared Supabase client file
- Ran the local app and captured browser console output to verify the runtime values
- Confirmed both env values resolve in the browser runtime

## Assumptions

- Logging the publishable key is acceptable for this verification task because it is a public client key
- Any remaining runtime issue is separate from env resolution because both values are defined

## Next possible steps

- Remove the temporary console logs after verification if they are no longer needed
- Investigate the Supabase `503` responses if data loading is still failing
