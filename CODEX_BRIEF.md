# Codex implementation brief

## Objective
Finish and deploy the approved **Option 1 / V3** Apex Frameless Glass website on Cloudflare Workers. Preserve the light editorial design exactly. Do not redesign it into a dark construction template, card grid, glassmorphism interface or generic AI landing page.

## Architecture already scaffolded
- Next.js App Router and TypeScript
- `@opennextjs/cloudflare`
- D1 database binding: `DB`
- R2 bucket binding: `PORTFOLIO_BUCKET`
- Cloudflare Access for `/admin*`
- Portfolio APIs and basic admin forms
- Instagram API proxy with D1 caching

## Required completion work
1. Run `npm install`, then fix all TypeScript/build issues without changing the approved design.
2. Run D1 migrations and verify CRUD against local and remote D1.
3. Complete project editing, deleting, publishing, featuring and drag-to-reorder.
4. Complete multi-image uploads, deletion, alt text editing and cover-image selection.
5. Replace static homepage project entries with D1-driven featured projects, retaining the current editorial composition.
6. Build `/projects/[slug]` pages with metadata and related projects.
7. Add project filtering to `/services#projects` without pill-shaped controls.
8. Keep Instagram as a secondary feed, never the source of truth for portfolio projects.
9. Add graceful handling for expired Instagram tokens and an admin diagnostic showing last successful sync.
10. Add Cloudflare Turnstile and email delivery to the quote form.
11. Validate image type, dimensions and size server-side. Strip unsafe filenames.
12. Protect every `/api/admin/*` route by Cloudflare Access email allowlist.
13. Verify keyboard accessibility, reduced motion and mobile layouts.
14. Run `npm run preview` and production deployment through Workers.

## Non-negotiable visual rules
- Warm white `#F7F5F0` is dominant.
- Charcoal `#1E2526` and slate `#394244` for typography.
- Blue-grey `#91A8AA` only for small accents and focus states.
- Square corners, fine rules, generous whitespace.
- No rounded card grids, pills, bubble UI, large gradients or glassmorphism.
- Preserve the serif accent only in selected editorial statements.
- Real Apex images must remain the focus.

## Admin UX target
A non-technical user should be able to:
- sign in using their approved email
- create a project
- upload multiple photos
- select service and location
- add a short description and alt text
- feature/unfeature a project
- change display order
- publish/unpublish
- remove an image or project with confirmation

## Acceptance criteria
- `npm run build` succeeds.
- `npm run preview` works in `workerd`.
- Admin is inaccessible without Cloudflare Access.
- Uploaded images persist in R2 and metadata persists in D1.
- Public project content updates without code changes.
- Instagram failure never breaks page rendering.
- Quote form has validation, spam protection and working email delivery.
- Domain and canonical metadata use `https://apexframelessglass.com.au`.
