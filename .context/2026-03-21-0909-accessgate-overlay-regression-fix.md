Task summary

- Fixed the AccessGate regression so the app mounts immediately while the phrase gate remains a full-screen visual overlay.

Files created or modified

- .context/2026-03-21-0909-accessgate-overlay-regression-fix.md
- src/app/components/AccessGate.tsx

Description of changes

- Restored the always-mounted child rendering pattern in AccessGate.
- Kept the existing full-screen overlay UI, phrase validation, and localStorage remember behavior unchanged.
- Removed the conditional return that blocked router, layout, and screen effects from mounting before unlock.

Assumptions made

- The intended behavior is a client-side convenience gate only, not authentication.
- Initial data loading should continue behind the overlay so the app is ready immediately after unlock.

Next possible steps

- If needed, manually smoke-test period initialization in the browser with and without a remembered unlock state.
