# Continuation notes — 5 August 2026

Implemented the remaining application work from `CODEX_BRIEF.md`:

- project create, edit, delete, publish, feature and ordering
- multi-image upload, validation, deletion, alt text, ordering and cover selection
- D1-driven homepage portfolio and service-page filtering
- project detail pages with canonical/Open Graph metadata and related work
- resilient Instagram cache fallback and admin sync diagnostic
- Turnstile verification and Resend quote delivery
- mobile navigation, focus states and reduced-motion handling

Verified locally:

- `npx tsc --noEmit`
- `npm run build`
- all three local D1 migrations
- OpenNext Cloudflare bundle generation
- workerd preview routes returned HTTP 200
- unauthenticated admin API returned HTTP 401
- invalid quote input returned HTTP 400

Production remains intentionally undeployed. Replace the placeholder D1 ID, admin allowlist and Turnstile site key; authenticate Wrangler; configure R2 public delivery and secrets; apply remote migrations; then deploy.

`npm audit --omit=dev` currently reports advisories inherited from the supported Next.js 15/OpenNext/Wrangler dependency chain. npm's suggested automatic remediation crosses major versions, so it was not applied silently. Reassess a coordinated Next.js 16 upgrade before launch.
