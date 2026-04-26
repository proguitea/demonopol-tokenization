# Sprint plan (Part K) and acceptance criteria (Part F)

> Drafted by the agent on 2026-04-26 because Part K and Part F are absent
> from `Demonopol_TaaS_Master_Prompt_V2.docx`. Reviewed and approved by the
> founder. Treat this file as the working substitute for those parts.

Six dependency-ordered sprint weeks. At the end of each week the agent
shows progress, ticks the relevant ☐ from §"Acceptance" below, flags
divergence, and stops for founder review.

---

## Week 1 — Foundations and design system

**Goal:** an empty but production-grade shell at `tokenize.demonopol.com`,
on Vercel, with the design tokens, type system, and i18n scaffolding
applied. No business logic yet.

### Tasks
- Initialize Next.js 14 (App Router) + TypeScript + Tailwind + ESLint + Prettier.
- Install shadcn/ui; customize primitives to design tokens.
- Apply Part G design tokens (light-premium variant — see token table below).
- Wire fonts: Inter (body), IBM Plex Sans (headlines), IBM Plex Mono
  (numbers). Self-host via `next/font/google`.
- `next-intl` setup. Locale routes: `/`, `/vi`, `/es`, `/fr`, `/th`, `/zh`.
  V1 ships EN populated, others scaffolded with `{{LANG: …}}` placeholders.
- Global layout: header (logo + nav + locale switcher + back-link to
  demonopol.com), footer (legal links, contact, newsletter signup, social).
- Theme toggle (light default, dark variant per Q-018 decision; the dark
  variant retains Part G tokens `#0E1110` / `#F0EDE8` so we don't lose them).
- Vercel project, custom domain `tokenize.demonopol.com`.
- Cloudflare DNS + Cloudflare Turnstile site key.
- Plausible analytics (cookie-free).
- Sentry error tracking.
- CI: GitHub Actions running `lint`, `typecheck`, `build` on PR.

### Design tokens (light-premium)

| Token | Light surface | Dark surface (toggle) | Use |
|-------|---------------|----------------------|-----|
| `--bg-canvas` | `#F7F4EE` ivory | `#0E1110` near-black | Primary surface |
| `--bg-elevated` | `#FFFFFF` | `#1A1C1E` | Cards, panels |
| `--bg-muted` | `#EFEAE0` | `#2B2D2F` anthracite | Section bands |
| `--fg-primary` | `#1A1C1E` | `#F0EDE8` | Body text |
| `--fg-muted` | `#5A5754` | `#A8A39B` | Secondary text |
| `--accent-forest` | `#1A3C2E` | `#1A3C2E` | Primary CTAs, trust |
| `--accent-brass` | `#C9A96E` | `#C9A96E` | Headline accents, premium tier |
| `--accent-alert` | `#C24A2C` | `#C24A2C` | Risk language, errors |

### Acceptance ☐
- [ ] Site responds at `tokenize.demonopol.com` with the shell (header,
      footer, an empty home placeholder).
- [ ] EN locale renders. `/vi` renders with `{{LANG: …}}` placeholders.
- [ ] Lighthouse > 95 on the empty page (Performance, Accessibility, Best
      Practices, SEO).
- [ ] LCP < 2.0s on simulated 4G mobile.
- [ ] Total JS < 50KB gzipped at this stage (well under the 150KB launch budget).
- [ ] Fonts load with `font-display: swap`; no FOUT.
- [ ] Theme toggle persists across reloads.
- [ ] Plausible event "page_view" firing.
- [ ] Sentry capturing a deliberate test error.
- [ ] CI green on a representative PR.

---

## Week 2 — Self-Check intake (the conversion engine)

**Goal:** a working `/start` form that captures, scores, stores, and
auto-replies to leads end-to-end. This is the hardest week and the most
load-bearing piece of the site.

### Tasks
- Postgres schema (Supabase). Tables: `leads`, `lead_score_events`,
  `auto_report_runs`, `email_log`, `magic_links`.
- `/start` form — single page, 10 fields per spec §6, `react-hook-form` + `zod`.
- localStorage save & resume (debounced).
- Magic-link resume flow (Supabase auth, email-only, no password).
- Server action submission. Cloudflare Turnstile + honeypot field +
  Upstash Redis rate limit (3/hour/IP, 10/day/email).
- Lead scoring per spec §6 — server-side compute, stored on row.
- Auto-rejection rules per spec §6 — sub-$50K/$25K, < 200 chars
  reasoning, missing docs+jurisdiction, disposable email, throttle.
- Anthropic API integration. Default model `claude-sonnet-4-6` (cheaper
  than Opus 4.7 at production volume; Opus available as fallback for
  high-score leads if desired). Prompt template lives at
  `lib/anthropic/diagnostic-prelim-prompt.md`.
- PDF generation via `react-pdf` (1-page bilingual preliminary report).
  V1 = EN body + VN placeholder; locales filled in V1.1.
- Resend transactional email setup. Templates: `applicant-confirmation`,
  `auto-rejection`, `priority-reply` (internal Slack notify on score ≥ 50).
- Slack webhook for new high-score leads.

### Acceptance ☐
- [ ] All 10 fields validated client + server. Vietnamese diacritics work.
- [ ] localStorage save survives reload, partial submissions resumable
      via magic link.
- [ ] Lead score correctly computed on representative test cases (manual
      table of 10 inputs → expected scores in the test file).
- [ ] Auto-rejection rules trigger correctly for all 5 conditions.
- [ ] Successful submission → confirmation page → email arrives within
      30s with PDF attached.
- [ ] PDF renders correctly: cover, intake summary, preliminary
      assessment paragraph, next-step CTA, risk disclaimer.
- [ ] High-score lead (≥ 50) triggers Slack notification.
- [ ] Disposable-email blocklist active.
- [ ] Rate limit returns 429 with friendly retry copy after threshold.
- [ ] Lead row written to Postgres with all metadata.
- [ ] PII handled per privacy policy: no logs of free-text reasoning,
      hashed email in analytics.

---

## Week 3 — Marketing pages: Home, Services, About

**Goal:** the public-facing surface, in EN, with all CTAs routing to
`/start` and `/diagnostic`. No payment yet.

### Tasks
- `/` Home:
  - Hero: "Tokenize what you own." + subhead + dual CTA (Self-Check /
    Diagnostic). Light-premium aesthetic, brass headline accent.
  - 3-card service ladder (Self-Check, Diagnostic, Promotion Boost),
    visual hierarchy on Diagnostic.
  - "How it works" 4-step horizontal scroll band — neutral language, no
    crypto terminology (Self-Check → Diagnostic → Structuring →
    Distribution).
  - Trust strip: **no figures**. Composed of (a) advisor strip teaser
    (names + prior firms only, no metrics), (b) a 4-step process
    micro-band reinforcing transparency, (c) money-back guarantee
    micro-tile, (d) "what's inside the Diagnostic" deliverable headings
    teaser linking to `/diagnostic`. Trust is conveyed by clarity and
    craft, not numerical claims (per Q-012).
  - Final CTA repeat + newsletter capture.
- `/services`:
  - Comparison table from spec Table 2 (5 tiers).
  - Per-tier expanded card: what you get / what you don't / who for /
    price / what comes next.
  - Per-tier FAQ accordion (4–6 Qs each).
- `/about`:
  - Corporate operating intro paragraph — no founder name, "our team."
  - **Advisors strip:** Luc Villeneuve (ex-Century21) and Costa
    (ex-Group1Vest). Each card shows **name, prior firm, region, LinkedIn
    link** — no years, no transaction volume, no aggregate metrics
    (per Q-012 / Q-018). One short prose intro frames the team as drawn
    from international real-estate practice, without numbers.
  - Ecosystem map: links to demonopol.com (back-link), partner network
    (placeholder), press kit download (Week 6).
  - Contact block: `tokenize@demonopol.com` (general),
    `legal@demonopol.com` (legal/payments).
- Sticky bottom-right "Start Self-Check" pill on mobile.
- Exit-intent modal on `/` and `/services`: "Decision Guide" PDF gated
  by email. PDF content TBD (Q-014 sister deliverable).
- Image curation: light-premium real estate. No handshakes.

### Acceptance ☐
- [ ] Home, Services, About ship in EN at parity with spec §8.
- [ ] No mention of Sui, $MONO, blockchain, DAO, smart contract,
      on-chain, DeFi anywhere in copy (grep test in CI).
- [ ] No numerical trust claims on Home or About (no "X years",
      no transaction volume, no market-size citations on trust surfaces).
- [ ] Comparison table matches spec Table 2 exactly.
- [ ] Advisor strip renders Luc + Costa cards, with `{{TBD}}` markers
      where data is pending Q-011a/b/Q-012.
- [ ] Sticky mobile pill appears below 768px.
- [ ] Exit-intent fires once per session.
- [ ] Each page Lighthouse > 95.
- [ ] WCAG 2.1 AA — contrast, focus rings, alt text, landmark roles.
- [ ] All CTAs route to `/start` or `/diagnostic`.
- [ ] No CTA section that doesn't drive to one of those — flagged in PR review.

---

## Week 4 — Diagnostic checkout

**Goal:** end-to-end paid Diagnostic flow with Cal.com + Stripe, post-
payment confirmation, and the legal scaffolding to support it.

### Tasks
- `/diagnostic` page:
  - Hero with money-back tile (15-min refund) prominent above pay button.
  - Deliverable list — exact 6–8 page report headings (drafted from
    spec §8 Diagnostic block).
  - Pre-call checklist (deck, deed, financials, prior valuation) above
    the pay button.
  - "Who runs the call" — corporate voice ("our experts").
  - Sample report download tile — `{{TBD: sample sanitized PDF}}` per Q-014.
- Stripe Checkout for $400 USD (Demonopol LLC entity, address from Q-003
  on receipts).
- Stripe webhook → Postgres `payments` row → confirmation email.
- Cal.com integration: post-payment booking link in confirmation email.
- Pre-fill: if intake completed, skip duplicate fields, go straight to
  Cal + Stripe.
- Post-payment confirmation page + email containing: receipt, booking
  link, pre-call checklist, NDA template attachment, Wise instructions
  if applicable (Q-013).
- Legal scaffolding (drafts for counsel review):
  - Terms of Service
  - Privacy Policy
  - Refund Policy (matches the 15-min guarantee)
  - TaaS-specific NDA template (Q-006)
- Cal.com event configured: 60–90 min slot, calendar capacity per Q-002
  decision.

### Acceptance ☐
- [ ] Stripe test purchase end-to-end works; receipt shows Demonopol LLC,
      Co. No. 4008 LLC, P.O. Box 2897 Kingstown SVG.
- [ ] Webhook reliably writes payment row, idempotent on retry.
- [ ] Confirmation email arrives < 30s with all attachments.
- [ ] Cal.com booking link valid, books into the right calendar.
- [ ] Refund flow exercised in Stripe test mode.
- [ ] ToS, Privacy, Refund, NDA `.md` drafts checked into `/legal/drafts/`
      and routed to counsel.
- [ ] Pre-fill works for users who completed `/start` first.
- [ ] Money-back tile is visually dominant on `/diagnostic`.
- [ ] Pre-call checklist appears before payment, not after.

---

## Week 5 — Insights blog and SEO

**Goal:** four pillar articles live, schema markup correct, sitemap
submitted, indexable.

### Tasks
- Sanity CMS setup. Schema: `article`, `author`, `category`,
  `jurisdiction`, with bilingual fields (EN required, VN/ES/FR/TH/ZH
  optional).
- `/insights` index page (filterable by category and jurisdiction).
- `/insights/[slug]` template with article-end CTA (Self-Check or
  Diagnostic).
- Four pillar articles drafted (EN), no crypto language, real-estate-led:
  1. *"Liquidity for private real estate without selling: a 2026 primer"*
     (replaces "What is RWA tokenization?")
  2. *"What does structuring private real estate for global investors
     actually cost?"* (replaces "How much does tokenization cost?")
  3. *"Spain's luxury real-estate landscape: legal pathways for fractional
     foreign ownership"* (jurisdiction)
  4. *"Real-estate fractionalization: real benefits, real risks"* (risk
     transparency — strong trust play)
- Schema.org markup: `Article` + `FAQPage` on insights, `Service` +
  `Offer` on services and diagnostic, `Organization` on about.
- `sitemap.xml`, `robots.txt`, canonical tags, hreflang for locale routes.
- OG images per page (templated via `@vercel/og`).
- Internal linking: every article CTA, every service tier links to
  next-step page.

### Acceptance ☐
- [ ] 4 pillar articles published in EN.
- [ ] No crypto language in any article (CI grep test extended to MDX/Sanity).
- [ ] Schema validates via Google Rich Results Test on each page.
- [ ] Sitemap submitted to Google Search Console.
- [ ] Hreflang tags correct on all locale variants.
- [ ] OG images render correctly when shared on LinkedIn / X / WhatsApp.
- [ ] Each article ends with a Self-Check or Diagnostic CTA.

---

## Week 6 — Press kit, multilingual scaffolding, accessibility, launch

**Goal:** ship.

### Tasks
- Press kit page or downloadable PDF (replaces KOL push per Q-009):
  - Press release boilerplate
  - Logos (PNG + SVG)
  - Founder quote (corporate voice, no name) + advisor quotes (named)
  - Sourced market context
  - Contact: `legal@demonopol.com`
- VN, ES, FR locale scaffolding finalized (still placeholders, but
  routes ship and look intentional).
- Newsletter signup component live: dual list (`taas-issuers` and
  `demonopol-main`) via Resend Audiences API.
- `/legal` route: Terms, Privacy, Risk Disclosure as anchored sections
  on a single page (`#terms`, `#privacy`, `#risk`).
- Accessibility audit (axe DevTools + manual screen-reader pass).
- Performance audit: enforce LCP < 2.0s, JS < 150KB gzipped budget.
- Pre-launch checklist (see below) executed.
- Soft launch announcement on demonopol.com main + new newsletter list.
- Production cutover.

### Acceptance ☐
- [ ] Press kit downloadable from `/about` and `/legal`.
- [ ] Newsletter signups land in correct Resend audiences (test both lists).
- [ ] `/legal` page anchors land on the right sections.
- [ ] Axe scan: 0 critical, 0 serious issues across all pages.
- [ ] Lighthouse > 95 on every page (Home, Services, Diagnostic, Start,
      Insights index, an article, About, Legal).
- [ ] LCP < 2.0s mobile 4G on every page.
- [ ] JS budget < 150KB gzipped per route.
- [ ] All locale routes resolve (placeholders are acceptable for non-EN).
- [ ] All `{{TBD: …}}` and `{{LANG: …}}` markers are tracked in
      OPEN_QUESTIONS.md or scheduled for V1.1.
- [ ] Production smoke test passes: place a $400 test purchase, complete
      a Self-Check, verify both PDFs and emails arrive correctly.

---

## Pre-launch checklist (run during Week 6)

- [ ] All Q-001 through Q-018 entries are ✅ Resolved or 🟨 Pre-launch
      with a known plan.
- [ ] All ☐ across Weeks 1–6 ticked.
- [ ] No `{{TBD: …}}` placeholder appears in the rendered EN site (grep
      pass over the built `_next` output).
- [ ] No mention of Sui, $MONO, blockchain, DAO, smart contract,
      on-chain, DeFi in built EN output (grep pass).
- [ ] Stripe live keys swapped in, test keys removed.
- [ ] Cal.com event live and connected to founder calendar.
- [ ] Resend DNS records (DKIM, SPF, DMARC) green for the
      `tokenize.demonopol.com` domain.
- [ ] Cloudflare Turnstile in production mode.
- [ ] Plausible domain registered.
- [ ] Sentry release tagged.
- [ ] Counsel-reviewed Terms, Privacy, Refund, NDA in place.
- [ ] Founder has done one end-to-end purchase as a real customer.
- [ ] OPEN_QUESTIONS.md has zero 🟥 Blocking entries.
