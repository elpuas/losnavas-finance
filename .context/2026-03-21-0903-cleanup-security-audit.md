Task summary

- Performed a minimal cleanup and basic security audit pass.

Files created or modified

- .context/2026-03-21-0903-cleanup-security-audit.md
- .env
- src/app/components/AccessGate.tsx
- src/app/components/ErrorBoundary.tsx
- src/app/types.ts
- src/main.tsx

Description of changes

- Updated AccessGate to use a Vite-exposed env variable name and to avoid mounting the app until access is granted.
- Replaced raw error message rendering in ErrorBoundary with a generic message.
- Removed an unused interface from shared types.
- Cleaned up formatting in main entry file.

Assumptions made

- The access phrase is intended as a lightweight client-side gate, not a secure authentication mechanism.
- Renaming the local env variable is acceptable because `.env` is gitignored and the gate lives in frontend code.

Next possible steps

- Add an `.env.example` with non-sensitive placeholders.
- Consider reducing the large production bundle reported by Vite.
