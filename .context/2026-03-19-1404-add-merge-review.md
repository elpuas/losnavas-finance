# Add.tsx Merge Review

## Reviewed

- `src/app/screens/Add.tsx`
- `src/app/components/Layout.tsx`
- `src/app/screens/Dashboard.tsx`

## Checks performed

- Verified `Add.tsx` contains no merge markers
- Reviewed imports for duplication and obvious unused items
- Reviewed template loading, filtering, template creation, transaction name resolution, and submit flow
- Verified the branch still builds successfully with `npm run build`
- Confirmed the submit flow still depends on route-level current-period state and dashboard refresh signaling

## Safety assessment

The merge resolution is mostly safe.

What is intact:

- No leftover conflict markers were found
- Imports are clean and the file builds
- Template loading and filtering are wired correctly
- Existing transaction insert mapping remains intact for `income` and `expenses`
- Navigation back to dashboard still occurs after successful submit
- Dashboard refresh signaling still exists through `refreshCurrentPeriodData()`

## Risks detected

1. Template insert failure does not block transaction submit
- If `createTemplate()` fails, the transaction insert still proceeds
- Result: the transaction may be saved without the reusable template being saved

2. Add form depends on previously established current period state
- If the user reaches `/add` before the dashboard has populated `currentPeriodId`, submit fails with `No current period selected`
- This is inherited from the shared-state design, but it remains a runtime dependency

3. Amount conversion has no explicit numeric validation
- `Number(formData.amount)` is used directly
- Browser validation reduces risk, but there is no explicit `NaN` guard before insert

## Recommended minimal fixes

- Make `createTemplate()` return success/failure and stop submit when a required new template cannot be saved
- Add an explicit `Number.isFinite(amount)` check before insert
- Consider initializing current period state earlier than the dashboard if direct entry to `/add` must be supported
