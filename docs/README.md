# InStyle Granite & Marble — website

Custom-coded, premium-classic marketing site for InStyle Granite & Marble
(Houston, TX; sister brand Avani Granite & Marble). Hand-written Next.js — no
page builders.

> The repo root `README.md` is the owner's GitHub **profile** and is left as-is.
> This file is the project README.

## Stack
- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v3.4 (design tokens → CSS variables)
- Framer Motion · lucide-react
- Fonts self-hosted via `next/font` (Cormorant Garamond + Inter)

## Getting started
```bash
pnpm install
cp .env.example .env.local   # optional in dev — site degrades gracefully
pnpm dev                     # http://localhost:3000
```

## Scripts
| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the build |
| `pnpm lint` | ESLint (next/core-web-vitals + strict TS) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm format` | Prettier write |

## Environment
See `.env.example`. Everything is optional in dev. Notably:
- `NEXT_PUBLIC_INVENTORY_URL_*` — external StoneProfitsWeb inventory links.
- `RESEND_API_KEY` — quote email (unset in dev = logs to console).
- `NEXT_PUBLIC_GA_ID` — analytics, only loaded after cookie consent.

## Project structure
```
app/         routes, layout, metadata (sitemap/robots in a later phase)
components/  ui/ (primitives), sections/ (Header, Footer, …), forms/ (later)
content/     typed content data (CMS-agnostic shapes in content/types.ts)
lib/         env, fonts, site config, utils, adapters (inventory — later)
docs/        this README, ASSUMPTIONS, TODO-CLIENT, DESIGN-TOKENS
public/      images, video, fonts, catalogue.pdf (assets — later)
```

## Design system
Tokens live in `app/globals.css` and `tailwind.config.ts`; documented in
`docs/DESIGN-TOKENS.md` and viewable at **`/_design`**. Do not use raw hex in
components — use the semantic Tailwind classes.

## Adding content (once data files land in later phases)
- **Stone:** add an entry to `content/stones.ts` (unique `slug`) and reference
  its slug from a collection's `stoneSlugs`.
- **Collection:** add to `content/collections.ts`; set `material` and `featured`.
- **Journal post:** add to `content/journal.ts` with `slug`, `date`, `body`.

## Build phases (all complete)
1. **Foundation** ✅ — tokens, fonts, layout, header/footer, Button, Reveal,
   SectionHeading, content types, `/_design`.
2. **Home** ✅ — video hero + all sections.
3. **Catalog** ✅ — Materials, Collections, Stone detail (filtering + lightbox).
4. **Content** ✅ — Showrooms, Services, About, Gallery, Journal, FAQ.
5. **Forms** ✅ — Quote/Contact flow (RHF + Zod + Resend, file upload).
6. **SEO** ✅ — JSON-LD, sitemap, robots, analytics + consent, 404, legal.
7. **Polish** ✅ — mobile bottom bar, back-to-top, hero-media gating, a11y and
   console pass, docs.

### Verified here vs. verify-on-deploy
`pnpm build`, `pnpm lint`, `pnpm typecheck` pass, and every route renders 200
with the expected content and no missing-asset requests. **Lighthouse/axe
targets (95+, LCP <2.5s, CLS <0.05) cannot be certified in this environment** —
they depend on the real fonts, video and photography and a real deployment.
Run them against the Vercel preview once assets land (see `docs/TODO-CLIENT.md`).

## Deployment
Target **Vercel**. Set env vars from `.env.example` in the project settings.
