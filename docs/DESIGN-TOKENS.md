# Design tokens

Single source of truth lives in `app/globals.css` (`:root`) and is mapped into
Tailwind in `tailwind.config.ts`. **Never use raw hex in components** — always
the semantic Tailwind class (`bg-ivory`, `text-stone-600`, `border-hairline`…).

View them live at `/_design`.

## Colour

| Token | Hex | Tailwind | Role |
|---|---|---|---|
| `--ivory` | `#F6F2EA` | `ivory` | Page background |
| `--paper` | `#FBF9F4` | `paper` | Raised surfaces |
| `--stone-900` | `#1A1816` | `stone-900` | Primary text, dark bands |
| `--stone-600` | `#5A554D` | `stone-600` | Secondary text |
| `--stone-300` | `#D9D2C5` | `stone-300` / `hairline` | Hairlines, borders |
| `--brass` | `#A8865A` | `brass` | Accent — large/decorative only |
| `--brass-ink` | `#806034` | (via `.eyebrow`) | Brass text that must meet AA |
| `--brand-red` | `#C8102E` | `brand-red` | Primary CTA, tiny highlights |

### Contrast audit (WCAG AA)
Approximate ratios; verify with a checker when final photography/logo land.

| Pair | Ratio | AA body | AA large | Verdict |
|---|---|---|---|---|
| stone-900 on ivory | ~13.5:1 | ✅ | ✅ | Primary text |
| stone-600 on ivory | ~6.4:1 | ✅ | ✅ | Secondary text |
| paper on stone-900 | ~13.5:1 | ✅ | ✅ | Text on dark bands |
| brand-red on ivory | ~4.9:1 | ✅ | ✅ | OK for text/CTAs |
| paper on brand-red | ~4.3:1 | ⚠️ borderline | ✅ | Button label OK (large/medium) |
| **brass on ivory** | **~2.9:1** | ❌ | ⚠️ | **Decorative/large only** |
| brass-ink on ivory | ~4.6:1 | ✅ | ✅ | Small eyebrow text |
| brass on stone-900 | ~4.7:1 | ✅ | ✅ | Brass eyebrows on dark bands |

**Rule:** brass never carries small body text on light backgrounds. Eyebrows on
ivory use `--brass-ink`; on dark bands plain `brass` is fine.

## Type
- Display: **Cormorant Garamond** (`--font-display`, `font-display`), tight tracking.
- Body/UI: **Inter** (`--font-sans`, `font-sans`), 17–18px, 1.7 line-height.
- Fluid scale via `clamp()`: `display-xl/lg/md/sm`, `fluid-lg/base/sm`, `eyebrow`.

## Spacing & layout
- 8px-based scale; band rhythm via `py-band` (6rem) and `py-band-lg` (9rem).
- Max content width `max-w-content` = 1320px; gutters 16px (phone) → 40px (lg).

## Motion
- Easing: `ease-editorial` = `cubic-bezier(0.16, 1, 0.3, 1)`.
- Reveal: 700ms fade + 24px translate-up on scroll into view.
- All motion respects `prefers-reduced-motion` (Reveal and MobileMenu render
  statically; parallax/count-ups are disabled in later phases).

## Focus
- `:focus-visible` → 2px brass outline, 2px offset (globals.css).
