# Assumptions

Decisions made without asking, per the brief ("do not ask me questions you can
resolve with a sensible default"). Challenge any of these and I'll change them.

## Repository
- This is an existing GitHub **profile** repo (`yeeettt8/yeeettt8`) whose root
  `README.md` renders the user's GitHub profile. To avoid clobbering it, the
  **project README lives at `docs/README.md`**, not the repo root, and all work
  is on the feature branch `claude/ecstatic-keller-s41taa`. `main` is untouched.

## Stack
- **Tailwind v3.4**, not v4 — the brief asks for `tailwind.config.ts` with a
  theme extension mapping to CSS variables, which is v3's model.
- **Next.js 15 / React 19 / App Router / TypeScript strict** as specified.
- **Framer Motion** chosen as the single animation library (over GSAP).
- **Fonts:** Cormorant Garamond (display) + Inter (body), self-hosted via
  `next/font/google`. If the build host cannot reach Google Fonts, switch to
  `next/font/local` with bundled `.woff2` in `/public/fonts`.
- Package manager: **pnpm** (per the brief's `pnpm build/lint/typecheck`).

## Design
- Brass (`#A8865A`) fails WCAG AA for small body text on ivory (~2.9:1). It is
  used only for large eyebrows (via a darker `--brass-ink #806034`), rules and
  numerals. See `DESIGN-TOKENS.md`.
- The logo wordmark is rendered as styled text (`in` + red `style`) until the
  real logo SVG is supplied.

## Header / layout
- The header floats transparent only over routes with a dark hero (home in v1)
  and is solid elsewhere. Hero pages position content clear of the fixed header;
  inner pages add their own top padding (documented convention).

## Content
- All addresses, phone numbers, emails, origins, thicknesses, awards,
  testimonials and statistics are **placeholders** marked `TODO(client)` — never
  invented. Collected in `TODO-CLIENT.md`.
- Six locations across two brands (InStyle: Houston; Avani: Memphis, Nashville,
  Denver; plus Atlanta, Columbus) modelled in one `locations` data file
  (added in a later phase).

## Not built yet (later phases)
- Home page in full, inner routes, forms/email, SEO/JSON-LD, analytics/consent.
  Nav links to those routes exist now and will 404 until their phase lands.
