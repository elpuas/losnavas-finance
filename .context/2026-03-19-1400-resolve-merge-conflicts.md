# Resolve Merge Conflicts — Add.tsx

## Task Summary
Resolved all merge conflicts in `src/app/screens/Add.tsx` resulting from a merge between `feature/transaction-templates` (HEAD) and `feature/transaction-persistence` (@{-1}).

## Files Modified
- `src/app/screens/Add.tsx`

## Description of Changes

### Conflict 1 — Duplicate React imports
- **Before:** `import { useState } from 'react'` and `import { useEffect } from 'react'` were split across a conflict marker
- **After:** Merged into a single `import { useState, useEffect } from 'react'`

### Conflict 2 — handleSubmit and template logic
- **Before:** Two diverging implementations of `handleSubmit`, with HEAD containing full template support and @{-1} having a simpler version without templates
- **After:** Kept the HEAD version, which includes:
  - `useEffect` to load transaction templates from Supabase
  - Template filtering (`incomeTemplates`, `fixedExpenseTemplates`, `extraExpenseTemplates`)
  - `createTemplate()` function to persist new templates
  - `resolveTransactionName()` to derive the transaction name from selected template or form input
  - Full `handleSubmit` with template-aware income and expense insertion

## Assumptions
- HEAD (`feature/transaction-templates`) represents the more complete and intended state
- The @{-1} (`feature/transaction-persistence`) changes were already incorporated into HEAD

## Next Steps
- Run the app to verify templates load and transactions save correctly
- Consider adding UI feedback (toast/alert) for transaction save errors
