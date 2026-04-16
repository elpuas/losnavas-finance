Task summary

- Added a local submission guard to the transaction creation form so repeated clicks do not create duplicate expense or income records while Supabase requests are in flight.

Files created or modified

- `src/app/screens/Add.tsx`
- `.context/2026-04-15-1717-prevent-duplicate-submissions.md`

Description of changes

- Added `isSubmitting` state to `Add`.
- Added an early return at the top of `handleSubmit` when a submission is already in progress.
- Set `isSubmitting` to `true` before async submission work begins.
- Wrapped the async submit flow in `try/finally` so `isSubmitting` resets on success, validation exit, or Supabase error.
- Disabled the submit button while saving and changed the label to `Saving...`.
- Added `aria-disabled` and disabled-state styling to the submit button.

Any assumptions made

- Expense and income creation both go through `src/app/screens/Add.tsx`, so no other create form component needed changes.
- Existing insert queries were kept as-is to stay within scope.

Next possible steps

- Manually verify in the app that rapid repeated clicks only create one record for both income and expense submissions.
