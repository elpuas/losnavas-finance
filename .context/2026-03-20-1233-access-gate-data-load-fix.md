# Change Log

## Task summary

Fixed the access gate integration so the app continues initializing periods and dashboard data behind the gate.

## Files created or modified

- `/src/app/components/AccessGate.tsx`
- `.context/2026-03-20-1233-access-gate-data-load-fix.md`

## Root cause

- The initial access gate implementation blocked rendering of the router tree until the phrase was accepted
- That delayed mounting of the original layout and screens, so current-period initialization and subsequent dashboard data loading did not start until after unlock

## Description of changes

- Changed `AccessGate` from a hard render gate into a full-screen blocking overlay
- Kept the original app tree mounted at all times so layout state, period fetching, and dashboard effects continue to initialize normally
- Preserved the existing localStorage-based unlock behavior and gate UI

## Assumptions

- A visual blocking overlay is sufficient for this lightweight client-side access gate
- Existing route and data-loading behavior should remain unchanged once the overlay is dismissed

## Verification

- `npm run build` passed successfully
