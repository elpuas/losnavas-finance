Task summary

- Added initial-load skeletons for the main data screens to avoid blank states during fetches.
- Refined the loading UX to keep layouts visible and show skeletons only for inline dynamic values.

Files created or modified

- .context/2026-03-21-0924-loading-skeletons.md
- src/app/components/ScreenSkeletons.tsx
- src/app/screens/Dashboard.tsx
- src/app/screens/Expenses.tsx
- src/app/screens/Income.tsx
- src/styles/index.css

Description of changes

- Replaced the full-screen skeleton components with a reusable inline value skeleton.
- Added minimal loading state tracking to Dashboard, Expenses, and Income.
- Limited skeleton rendering to inline numeric/text values so cards and layout stay visible.

Assumptions made

- Only the main data-driven screens needed this UX improvement.
- Existing empty states should remain visible after the first load completes, even when there is no data.

Next possible steps

- Optionally add a smaller inline loading treatment for explicit user-triggered refreshes later.
