# Change Log

## Task summary

Set up Supabase client and environment variables.

## Files created or modified

- `/src/lib/supabase.js`
- `.env`

## Description of changes

- Created Supabase client using `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- Configured environment variables for client-side usage

## Assumptions

- Supabase project is already created
- Tables exist (`periods`, `expenses`, `income`)

## Next steps

- Test connection by fetching data from `periods`
- Integrate data into UI
