# Cloudflare setup

## 1. Accounts and services required
1. Cloudflare account with Workers, D1 and R2 enabled.
2. GitHub repository containing this project.
3. The domain `apexframelessglass.com.au` added to Cloudflare DNS.
4. Cloudflare Access enabled for `/admin*`.
5. A Meta developer app and an Instagram Professional account for the optional live feed.

## 2. Install and authenticate
```bash
npm install
npx wrangler login
```

## 3. Create storage
```bash
npx wrangler d1 create apex-frameless-db
npx wrangler r2 bucket create apex-portfolio
```
Copy the returned D1 `database_id` into `wrangler.jsonc`.

Apply migrations:
```bash
npm run db:remote
```

## 4. R2 public image delivery
Use a custom domain such as `media.apexframelessglass.com.au` for the R2 bucket. Set:
```bash
npx wrangler secret put R2_PUBLIC_BASE_URL
```
Enter `https://media.apexframelessglass.com.au`.

## 5. Admin authentication
Use Cloudflare Zero Trust → Access → Applications → Add application → Self-hosted.
- Domain: `apexframelessglass.com.au`
- Path: `/admin*`
- Policy: allow only Scott, Mason, Joel or selected company emails.

Set the same allowlist in Worker variables:
`ADMIN_EMAILS=scott@...,mason@...,joel@...`

The app checks Cloudflare Access's authenticated email header. Do not build or store a separate password system unless specifically required.

## 6. Local development
Copy `.dev.vars.example` to `.dev.vars` and keep `ADMIN_BYPASS=true` locally only.
```bash
npm run dev
npm run preview
```
Use `preview` before production because it runs in the Workers runtime.

## 7. Deploy
```bash
npm run deploy
```
Or connect the GitHub repository using Cloudflare Workers Builds. Build command: `npm run deploy`.

## 8. Custom domain
In the Worker dashboard add `apexframelessglass.com.au` and `www.apexframelessglass.com.au` as custom domains. Redirect one canonical hostname to the other.

## 9. Instagram feed requirements
The site expects:
- `INSTAGRAM_USER_ID`
- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_API_BASE`
- `INSTAGRAM_API_VERSION`

Create a Meta developer app, add the current Instagram API product, connect the Apex Instagram Professional account, complete the required app/business verification if Meta requests it, and generate a long-lived access token. Exact permissions and token flow depend on whether the app uses Instagram Login or Facebook Login, so confirm them inside the current Meta developer dashboard before production.

Set secrets:
```bash
npx wrangler secret put INSTAGRAM_USER_ID
npx wrangler secret put INSTAGRAM_ACCESS_TOKEN
```

The `/api/instagram` route caches results in D1 for 60 minutes. The main portfolio remains independent of Instagram so the site does not break when a token expires.

## 10. Recommended production improvements for Codex
- Add image resizing/thumbnail generation through Cloudflare Images or an image transformation route.
- Add audit logging for admin changes.
- Add draft preview and project detail pages.

## 11. Quote form delivery
The public quote form submits directly to Web3Forms using the approved access key in `components/quote-form.tsx`. Confirm the destination email inside the Web3Forms dashboard and submit one production test after deployment. No Worker email secrets are required.

## 12. Final production steps
Replace every `REPLACE_*` value in `wrangler.jsonc`, add production secrets, and run:
```bash
npm run db:remote
npm run deploy
```
The remote migration and deployment cannot run until the real D1 database ID and Cloudflare account credentials are available.
