# Sample data

**Everything in `/content/*.ts` is placeholder seed data** created so the site
looks complete during development. None of it is verified business information.

| File | Count | Status |
|---|---|---|
| `materials.ts` | 4 | Copy is accurate to natural stone in general; safe to keep/edit. |
| `collections.ts` | 6 | Invented, non-trademarked names + stories. Replace as desired. |
| `stones.ts` | 24 | Invented names; origins & thicknesses are `TODO(client)`. |
| `locations.ts` | 6 | Cities/brands are real; addresses, phones, hours, geo are `TODO(client)`. |
| `services.ts` | 6 | Plausible services; scope marked `TODO(client)` where uncertain. |
| `faqs.ts` | 8 | Answers accurate & general; specifics `TODO(client)`. |
| `journal.ts` | 3 | Genuinely accurate, useful articles. Safe to keep. |

## Rules honoured
- No invented addresses, phone numbers, licences, awards, testimonials, project
  names or statistics.
- Only verified facts used as fact: **established 2011**, six locations, the
  InStyle/Avani relationship, StoneProfitsWeb inventory URLs.
- Every unverifiable specific is a `TODO(client)` marker; see
  `docs/TODO-CLIENT.md`.

## Swapping for a CMS later
The exported shapes in `content/types.ts` are CMS-agnostic. A headless source
(Sanity/Payload) can populate the same getters (`getMaterial`, `getCollection`,
`getStone`, `getRecentJournal`, …) without changing components.
