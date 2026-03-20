# Change Log

## Task summary

Rewrote the project README with setup, deployment, and Supabase schema documentation for public use.

## Files created or modified

- `/README.md`
- `/.context/2026-03-20-1352-readme-supabase-setup.md`

## Description of changes

- Added a full project overview and feature summary
- Documented local development and environment variable setup
- Added Netlify deployment instructions
- Added a copy-paste ready Supabase SQL schema for `periods`, `income`, `expenses`, and `transaction_templates`
- Included notes about customization and project purpose

## Assumptions

- The documented SQL is intended to match the app's current queries and expected columns
- Netlify deployment guidance is documentation-only and does not imply config files already exist in every branch

## Next possible steps

- Add RLS policies documentation if the app is intended for multi-user or public access
- Add sample seed data if you want faster first-run onboarding
