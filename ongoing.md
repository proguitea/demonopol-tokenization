# Ongoing — handoff for the next session

> Use this file to resume work in a new chat after clearing context. The
> agent reading this should treat it as authoritative for "where we are."
> Anything contradicted by [`OPEN_QUESTIONS.md`](./OPEN_QUESTIONS.md) or
> [`SPRINT_PLAN.md`](./SPRINT_PLAN.md) wins — those are canonical; this
> file is a checkpoint summary.

---

## Project at a glance

- **Repo:** [proguitea/demonopol-tokenization](https://github.com/proguitea/demonopol-tokenization)
- **Live preview:** [demonopol-tokenization.vercel.app](https://demonopol-tokenization.vercel.app)
- **Production domain (planned):** `tokenize.demonopol.com`
- **Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind 3,
  next-intl, next-themes, Stripe, Resend.
- **Spec:** [`Demonopol_TaaS_Master_Prompt_V2.docx`](./Demonopol_TaaS_Master_Prompt_V2.docx)
  — read first if you're new to the project.
- **Sprint plan:** [`SPRINT_PLAN.md`](./SPRINT_PLAN.md). The original
  plan was trimmed by the **V1-essential cut** (see Q-019 below).
- **Decisions log:** [`OPEN_QUESTIONS.md`](./OPEN_QUESTIONS.md) — every
  founder decision and follow-up. Read this before making product
  judgments.

---

## What's already done

### Routes shipped
| Route | Status |
|-------|--------|
| `/` (home) | Hero · service ladder · how-it-works · trust strip · insights teaser · final CTA |
| `/services` | Five-tier ladder, comparison table, ItemList schema |
| `/diagnostic` | Pay flow wired (Stripe), deliverables, pre-call checklist, FAQs (FAQPage schema), money-back tile |
| `/diagnostic/success` | Stripe-verified post-payment page with Cal.com booking link |
| `/start` | Self-Check form, scoring, rejection logic, server action → email via Resend |
| `/start/submitted` | Outcome-aware confirmation |
| `/insights` | Index of 4 queued articles (no published articles yet) |
| `/about` | Corporate ops voice + named advisors strip + jurisdiction reach |
| `/legal` | Anchored Terms / Privacy / Risk with placeholder framing |
| `/sitemap.xml` | All 7 routes × 6 locales with hreflang alternates |
| `/robots.txt` | Disallows confirmation pages |
| `/opengraph-image` | Edge-rendered branded OG card (1200×630) |
| `/icon.svg` | 32px brand mark favicon |
| `/api/stripe/webhook` | Signature-verified, logs `checkout.session.completed` and `charge.refunded` |

### Functionality wired

- **Stripe Diagnostic checkout** — server action creates a Checkout
  Session with inline `price_data` ($400 USD), redirects, success page
  verifies via Stripe API. Falls back to a `mailto:` when Stripe isn't
  configured so the page never dead-ends.
- **Resend form-to-email** for /start submissions. Best-effort: logs to
  console if `RESEND_API_KEY` isn't set, never blocks the visitor.
- **Stripe webhook** verifies signature, logs to runtime console. No
  custom email on payment yet (Stripe sends customer receipts).

### SEO

- Per-page `metadata.title`, `description`, `openGraph` overrides.
- `alternates.canonical` + `alternates.languages` hreflang on the five
  marketing pages via [`src/lib/seo/alternates.ts`](./src/lib/seo/alternates.ts).
- JSON-LD Organization + WebSite on every page.
- Service + Offer + FAQPage + BreadcrumbList on /diagnostic.
- ItemList of priced services on /services.
- BreadcrumbList on /services and /about.
- Sitemap with hreflang alternates per route.

### Brand & i18n

- Demonopol lockup (canonical WebPs at `public/brand/`) wired in the
  header, with the "decentralized Real Estate" tagline visually
  cropped at display time per Q-005.
- Light-premium ivory canvas; dark theme available via toggle.
- UI keys translated to FR / VI / TH (agent-quality, pending native
  review per Q-017). EN is canonical and unchanged.
- ES and ZH remain placeholder-only; routes resolve to EN via the
  placeholder-strip + EN-fallback merge in
  [`src/i18n/request.ts`](./src/i18n/request.ts).

### CI / DX

- GitHub Actions on push: lint, typecheck, build, plus a forbidden-
  vocabulary grep guard (no `blockchain`, `Sui`, `$MONO`, `DAO`,
  `smart contract`, `on-chain`, `DeFi` in built output — Q-005 enforcer).
- Vercel auto-deploys main.

---

## What was deliberately cut from V1 (Q-019)

The spec specified a much heavier stack. The founder asked the agent to
trim to V1-essential on 2026-04-27. Removed:

- **Postgres / Drizzle / Supabase** — replaced by form-to-email
- **Anthropic API** auto-report PDF — outcome page is enough for V1
- **Magic-link resume** — localStorage save is enough
- **Cloudflare Turnstile** — honeypot + disposable-email blocklist suffice
- **Upstash Redis** rate limit — Vercel handles edge DDoS
- **Slack webhook** — founder reads email
- **Sanity CMS** — Insights articles will be MDX in-repo for V1
- **Plausible & Sentry** (deferred earlier on cost grounds)

**Re-enable trigger** (any one): >100 leads/month sustained, second
operator on intake, copywriter wants WYSIWYG, or auditor demands
structured persistence.

---

## Open work the next session should pick from

In rough priority order. None of these are blocking launch on their own.

### Founder-blocking (need their input or action)

1. **Vercel env vars** — set in project settings:
   - `NEXT_PUBLIC_SITE_URL` (production URL)
   - `RESEND_API_KEY` + `EMAIL_INTERNAL_NOTIFY` (without these /start
     submissions log only)
   - `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` (without these the
     pay button shows a `mailto:` fallback)
   - `NEXT_PUBLIC_CAL_LINK` (Cal.com slug, e.g. `demonopol/diagnostic`)
2. **Custom domain** `tokenize.demonopol.com` → Cloudflare CNAME → Vercel.
3. **LinkedIn URLs** for Luc Villeneuve and Costa (currently `{{TBD}}`
   on /about).
4. **Counsel-reviewed legal text** for /legal (Q-014 / Q-016 territory).
5. **Native-speaker pass on FR / VI / TH** translations (Q-017).
6. **First Insights article** — converts the queue cards from "drafting"
   to credible. Founder draft, not the model.

### Aesthetics & content (in scope of the current phase)

7. ~~**Per-page hreflang on home (`/`)**~~ — **DONE (2026-04-29, commit 23127b7).** `metadata` export with `localeAlternates("/")` added to `src/app/[locale]/page.tsx`.
8. ~~**Origin / philosophy paragraph on /about**~~ — **DONE (2026-04-29, commit 23127b7).** "Why we exist" section inserted between hero and howBuilt. Corporate voice, no founder names. Translated FR/VI/TH.
9. ~~**/insights structure — visual filters**~~ — **DONE (2026-04-29, commit 23127b7).** Category chip rail (All/Primer/Jurisdiction/Asset class/Risk) above the article grid. Display-only for V1, "All" aria-current. Translated FR/VI/TH.
10. ~~**Footer polish**~~ — **DONE (2026-04-29, commit 23127b7).** Jurisdiction reach chip rail added above the footer grid; mailto-based newsletter CTA card added alongside the brand copy. Both fully translated.
11. ~~**Translation depth**~~ — **DONE (2026-04-29, commit f3d32b0).**
    All page-body strings extracted into message files. FR is full quality.
    VI/TH are agent-quality, flagged for native review (Q-017). The
    `i18n/request.ts` `Messages` type was extended to support `string[]`
    values (needed for tier includes/excludes, FAQ items, etc.).
12. ~~**Per-route OG image variants**~~ — **DONE (2026-04-30, commit 5eed369).**
    Shared template at `src/lib/og/template.tsx`. Route-level
    `opengraph-image.tsx` files live under `[locale]/diagnostic`,
    `[locale]/services`, `[locale]/about`, `[locale]/insights`. Each
    card has its own eyebrow badge, headline, subhead, and footer strip.
13. ~~**Accessibility audit**~~ — **DONE (2026-04-30, commit c15bfb7).**
    TierCard name `<p>` → `<h3>`, comparison row labels `<td>` →
    `<th scope="row">`, FAQ `+` toggle `aria-hidden`, sr-only
    "(opens in new tab)" on all `target="_blank"` anchors. Global
    `:focus-visible` ring already in `globals.css` — no change needed.
14. ~~**Press / "as seen in" placeholder section**~~ — **DONE (2026-04-30, commit 2efc597).**
    "Coverage" section on /about between advisors and reach. Four dashed
    aspect-ratio placeholder boxes + mailto press CTA. Ready to drop in
    real logos when coverage arrives.

### Functionality (deferred, founder must agree before re-opening)

15. **Custom payment-confirmation Resend email** to the founder when a
    Stripe `checkout.session.completed` arrives. Stripe already sends
    customer receipts automatically.
16. **Cal.com inline embed** instead of a link on the success page.
17. **Refund flow** — currently we'd refund manually via Stripe Dashboard.

---

## Important rules the next agent must respect

These are the load-bearing constraints. Read them before editing copy
or visuals.

1. **No crypto-tribe vocabulary** in any rendered string (Q-005). The
   CI grep guard fails the build if `blockchain`, `Sui`, `$MONO`,
   `DAO`, `smart contract`, `on-chain`, or `DeFi` appears in
   `.next/server` or `.next/static`. The word **tokenization** is fine.
2. **No numerical trust claims** (Q-012). Don't add "30 years",
   "$X transacted", "Y deals", "Z markets". Trust is conveyed by craft,
   not numbers.
3. **No founder names** on the operating side (Q-002). Advisors are
   named (Luc Villeneuve, Costa). Operators are not.
4. **Light-premium aesthetic.** `#F7F4EE` ivory canvas, `#1A3C2E`
   forest, `#C9A96E` brass. Dark theme available via toggle but not
   the default.
5. **`{{TBD: ...}}` placeholders** are findable on purpose. Don't
   invent values to fill them — track in OPEN_QUESTIONS instead.
6. **Stripe pay button must always render.** If keys are missing it
   falls back to a `mailto:legal@demonopol.com`. Don't break this.

---

## Where the bodies are buried

Stuff that surprises if you don't know it:

- Tagline cropping — the canonical Demonopol logo includes "The future
  of decentralized Real Estate". Q-005 forbids that on this site, so
  [`src/components/layout/Logo.tsx`](./src/components/layout/Logo.tsx)
  uses `aspect-[4.5/1]` + `overflow-hidden` + `object-top` to crop the
  tagline visually. The source asset is unmodified.
- `i18n/request.ts` strips placeholder strings (`[[XX: english]]`) at
  request time and falls back to EN. So a non-EN locale with mostly
  placeholders renders mostly EN — by design. The placeholders stay
  in source files so copywriters can grep for them.
- The Stripe API version in `src/lib/stripe/server.ts` is pinned to
  `2025-02-24.acacia` — bumping the SDK requires updating that string
  to the SDK's expected version or TypeScript will fail.
- The CI uses pnpm version from `package.json#packageManager` — don't
  add `version:` back to the action input or it'll throw
  `ERR_PNPM_BAD_PM_VERSION`.

---

## Resume instructions for the next session

If you're a fresh agent: read these in order before doing anything.
1. This file (you're here).
2. [`OPEN_QUESTIONS.md`](./OPEN_QUESTIONS.md) — every decision the
   founder has made. Q-001 → Q-020.
3. [`README.md`](./README.md) — the anti-patterns section especially.
4. [`SPRINT_PLAN.md`](./SPRINT_PLAN.md) — only as historical context;
   the V1-essential cut (Q-019) supersedes it.
5. The most recent ~10 commits via `git log --oneline` for what's
   landed since this file was written.

If the user asks for new functionality, push back: this phase is
**aesthetics, content, SEO, translations** only. Anything that adds
infrastructure (DB, queues, third-party APIs beyond what's wired)
should be flagged and confirmed before building.

If you finish a unit of work, commit on every meaningful step and push
to `main` — Vercel auto-deploys. The founder is watching the staging
URL while you work and prefers small frequent pushes over big drops.
