# Deployment

Two auto-deploy paths. **Pick one** — do not run both, they overlap.

## Option A — Vercel Git integration (recommended, zero secrets)

Truly automatic preview + production deploys, no CI tokens to manage.

1. Go to [vercel.com/new](https://vercel.com/new) and import `YeeeTTT8/YeeeTTT8`.
2. Framework preset auto-detects **Next.js**. Leave build/install as-is
   (`vercel.json` pins them anyway).
3. Deploy. From then on:
   - every push to **any branch** → a **preview** deployment (a URL per PR),
   - every push to the **default branch** → the **production** deployment.
4. (Optional) Add environment variables in **Project → Settings → Environment
   Variables** from `.env.example`. None are required to boot.
5. If you use this, **delete `.github/workflows/deploy.yml`** so deploys don't
   run twice.

## Option B — GitHub Actions → Vercel (CI-driven)

Use this if you want deploys gated behind CI or prefer everything in Actions.

1. Create a token at [vercel.com/account/tokens](https://vercel.com/account/tokens).
2. Locally, once: `npx vercel link` — this writes `.vercel/project.json` with
   your `orgId` and `projectId`.
3. In the repo: **Settings → Secrets and variables → Actions → New secret**, add:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
4. `.github/workflows/deploy.yml` then deploys on every push (production from
   the default branch, preview elsewhere). Until the secrets exist, the job
   **no-ops safely** — no failures.

## CI (always on)

`.github/workflows/ci.yml` runs `typecheck`, `lint` and `build` on every push
and PR regardless of which deploy path you choose. It needs no secrets.

## Environment variables

See `.env.example`. All optional in dev/preview; for a real launch set at least
`NEXT_PUBLIC_SITE_URL`, the inventory URLs, `RESEND_API_KEY` +
`QUOTE_RECIPIENT_EMAIL`, and (once assets exist) `NEXT_PUBLIC_HERO_MEDIA=true`.
