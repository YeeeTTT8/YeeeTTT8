# TODO — client-supplied content

Every placeholder the client must replace before launch. Nothing here is
invented; each is a factual gap awaiting real data.

## Brand assets
- [ ] Logo SVG (red/black "instyle" wordmark) → `/public/` (currently styled text)
- [ ] Warehouse hero video `warehouse-tour.mp4` + poster image → `/public/`
- [ ] Real slab photography (close-ups: veining, texture) to replace placeholders

## Contact details
- [ ] Company phone number (`NEXT_PUBLIC_PHONE`)
- [ ] WhatsApp number (`NEXT_PUBLIC_WHATSAPP`)
- [ ] Contact email (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] Quote recipient / from emails (`QUOTE_RECIPIENT_EMAIL`, `QUOTE_FROM_EMAIL`)

## Locations (×6 — added in a later phase)
For each of Houston, Memphis, Nashville, Denver, Atlanta, Columbus:
- [ ] Street address
- [ ] Phone number
- [ ] Opening hours
- [ ] Geo coordinates (for LocalBusiness JSON-LD)
- [ ] Showroom photo

## Stone / product data
- [ ] Real stone names, materials, colour families, finishes
- [ ] Thickness options actually stocked
- [ ] Origin (quarry / country) per stone
- [ ] Confirm which services apply (prefab tops, vanity tops, sills, thresholds)

## Trust / proof
- [ ] Verified statistics (only "established 2011" and location count are known)
- [ ] Any licences, certifications, awards (only if real)
- [ ] Testimonials / project references (only if real)

## Legal
- [ ] Privacy policy copy
- [ ] Terms copy
- [ ] Catalogue PDF → `/public/catalogue.pdf`

## Config
- [ ] Production `NEXT_PUBLIC_SITE_URL`
- [ ] GA4 measurement ID (`NEXT_PUBLIC_GA_ID`)
- [ ] Resend API key (`RESEND_API_KEY`) + `QUOTE_RECIPIENT_EMAIL` / `QUOTE_FROM_EMAIL`
- [ ] Set `NEXT_PUBLIC_HERO_MEDIA="true"` after adding the hero video + poster
- [ ] Confirm StoneProfitsWeb inventory URLs are current

## Engineering follow-ups (not blocking launch, but recommended)
- [ ] Rate limiting is in-memory (per serverless instance). For production,
      back `lib/rate-limit.ts` with a shared store (e.g. Upstash Redis).
- [ ] Legal pages (Privacy, Terms) are placeholder skeletons — replace with
      copy reviewed by qualified counsel.
- [ ] Verify Lighthouse (Performance/A11y/SEO/Best-Practices ≥95, LCP <2.5s,
      CLS <0.05) on the deployed URL with real fonts, video and photography —
      these targets can only be certified against a real deployment.
