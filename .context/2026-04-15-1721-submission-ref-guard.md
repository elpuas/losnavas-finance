Task summary

- Hardened the transaction submit guard in `Add` by adding a synchronous ref-based lock so extremely fast repeated submits cannot race past React state updates.

Files created or modified

- `src/app/screens/Add.tsx`
- `.context/2026-04-15-1721-submission-ref-guard.md`

Description of changes

- Added `useRef` and `isSubmittingRef` in `Add`.
- Updated `handleSubmit` to return immediately when `isSubmittingRef.current` is already `true`.
- Kept synchronous form validation before locking so invalid submissions do not set submission state.
- Set both `isSubmittingRef.current = true` and `setIsSubmitting(true)` immediately before the async submit flow starts.
- Reset both the ref lock and React state in `finally`.
- Preserved the existing disabled button behavior and `Saving...` label.

Why state alone was not enough

- React state updates are asynchronous, so two very fast submit events can both read the previous `isSubmitting` value before the disabled state is committed to the DOM.

How the ref prevents race conditions

- `useRef` updates synchronously and does not wait for a re-render, so the first submit sets the lock immediately and any subsequent submit in the same render window is blocked by `isSubmittingRef.current`.

Any assumptions made

- The expense and income create flows are still both handled in `src/app/screens/Add.tsx`.
- Supabase insert queries were intentionally left unchanged.

Next possible steps

- Manually verify rapid repeated clicks on both income and expense submits only create one record.
