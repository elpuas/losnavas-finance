Task summary

- Debugged and hardened the `Add` submit lifecycle so the loading guard always resets after async submission work.

Files created or modified

- `src/app/screens/Add.tsx`
- `.context/2026-04-21-1244-submit-stuck-debug.md`

Description of changes

- Kept validation before setting the ref/state submission lock.
- Removed early `return` paths after `setIsSubmitting(true)`.
- Converted post-lock failure paths into thrown errors handled by a local `catch`.
- Destructured `{ data, error }` from the income and expense insert responses.
- Added temporary debug logs for submit start, period resolution, pre-insert, post-insert response, failure handling, and cleanup.
- Moved navigation until after the `finally` cleanup has reset both `isSubmittingRef.current` and `isSubmitting`.

Assumptions made

- The stuck state was caused by submit lifecycle control flow after the lock was set, not by the Supabase insert query itself.
- `refreshCurrentPeriodData()` is synchronous and was not the source of a pending async hang.

Next possible steps

- Reproduce the submit flow in the browser and confirm the `[Add] submit cleanup` log appears after both successful and failed submissions.
- Remove temporary debug logs once the production issue is confirmed fixed.
