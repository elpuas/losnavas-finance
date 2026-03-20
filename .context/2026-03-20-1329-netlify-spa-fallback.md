# Change Log

## Task summary

Added Netlify SPA fallback configuration so client-side routes resolve to `index.html`.

## Files created or modified

- `/netlify.toml`
- `/.context/2026-03-20-1329-netlify-spa-fallback.md`

## Description of changes

- Added a Netlify redirect rule that rewrites all paths to `/index.html`
- Kept the change isolated to deployment configuration without modifying app code or routing logic

## Assumptions

- Netlify will use the root `netlify.toml` file during deployment
- A global SPA fallback is sufficient for the current route structure

## Next possible steps

- Configure Netlify build settings to use `npm run build` and publish `dist` if not already set
