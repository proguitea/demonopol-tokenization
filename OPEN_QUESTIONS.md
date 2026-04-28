# Open questions

Running list of decisions, ambiguities, and missing inputs that block or
risk the build. The agent appends to this file whenever it would otherwise
be tempted to fabricate.

> **Format:** every entry has an ID, a status, an owner, the question, the
> blocking impact, and the proposed default. When resolved, change status to
> ✅ and record the decision and date below the entry. Do not delete
> resolved entries — they are the audit trail.

---

## Status legend

- 🟥 **Blocking** — work cannot proceed without this.
- 🟧 **Soft-blocking** — work can proceed with the default, but needs
  resolution before launch.
- 🟨 **Pre-launch** — only required before going live.
- ✅ **Resolved** — decision recorded.

---

## From Part M of the spec (founder decisions)

### Q-001 · Subdomain
**Status:** ✅ Resolved (2026-04-26)
**Decision:** `tokenize.demonopol.com`. Alternates dropped.
**Decided by:** Founder.

---

### Q-002 · Diagnostic delivery model
**Status:** ✅ Resolved (2026-04-26)
**Decision:** Corporate voice only on operating-side. Public copy refers to
"our experts" / "our team" — no founder or operator names anywhere on the
service-delivery surface.
**Caveat (introduced 2026-04-26 with Q-011 below):** named **advisors**
(non-operating, with prior-firm credentials) are exempt and appear on
`/about` under an Advisors strip.
**Decided by:** Founder.

---

### Q-003 · Stripe entity
**Status:** ✅ Resolved (2026-04-26)
**Decision:**
- Legal name: **Demonopol LLC**
- Company No.: **4008 LLC**
- Registered address: **P.O. Box 2897, Kingstown, St. Vincent and the Grenadines**
- Legal email: **legal@demonopol.com**

This is the entity on receipts, invoices, ToS, refund policy, NDA, and
all Stripe-side metadata.
**Decided by:** Founder.

---

### Q-004 · Wise USD account
**Status:** ✅ Resolved (2026-04-26) → see Q-013 for follow-up
**Decision:** No personal Wise. Corporate Wise only, or no Wise at all.
**Knock-on:** see Q-013 — does Demonopol LLC currently have a corporate
Wise USD account? If yes, use it. If no, V1 ships Stripe-only and any
bank-transfer requests route to `legal@demonopol.com` for manual handling.

---

### Q-005 · $MONO payment acceptance
**Status:** ✅ Resolved (2026-04-26)
**Decision:** Not in V1, **not in V2 either as currently scoped**. Deeper
than the original question: the public-facing site removes all crypto,
blockchain, $MONO, Sui, DAO, smart-contract, on-chain, and DeFi language
entirely. The product is sold as a **global liquidity service for private
real estate**, with "tokenization" retained as the product noun.
**Decided by:** Founder.

---

### Q-006 · NDA template
**Status:** ✅ Resolved (2026-04-26)
**Decision:** Draft a new TaaS-specific NDA **and** refresh the
demonopol.com NDA. Agent delivers both as `.md` templates for counsel
review before launch. NDA delivered with Diagnostic confirmation email.
**Decided by:** Founder.

---

### Q-007 · Legal counsel referral partners
**Status:** ✅ Resolved (2026-04-26)
**Decision:** Worldwide reach. Named legal-partner jurisdictions:
- Spain (luxury real estate)
- Morocco
- Thailand
- Hong Kong
- Switzerland
- **Vietnam** (added — was missed in initial answer)
- USA (added — implied by "create opportunities for clients in Vietnam, USA, etc.")

`/insights` jurisdictional pillar articles realign to this list. Specific
legal partner firms are still **{{TBD}}** per jurisdiction — copy ships
with `"to be introduced via our local counsel network"` until partners
are confirmed.
**Decided by:** Founder.

---

### Q-008 · Imagery sourcing
**Status:** ✅ Resolved (2026-04-26)
**Decision:** Agent has free hand within the brief. Light-premium real-estate
aesthetic, properly-licensed stock from Unsplash / Pexels / Pixabay for V1,
no handshakes, no Manhattan skylines, no crypto iconography. Original
photography deferred to V2.
**Decided by:** Founder.

---

### Q-009 · KOL launch wave
**Status:** ✅ Resolved (2026-04-26)
**Decision:** No KOL launch wave at all. Replaced with **press + editorial**
strategy: outreach to luxury real-estate trade publications and a
downloadable press kit on `/about`.
**Knock-on:** the spec's $200 Promotion Boost product includes a "1 KOL
network push" component which is no longer in scope. See Q-015.
**Decided by:** Founder.

---

### Q-010 · Newsletter integration
**Status:** ✅ Resolved (2026-04-26)
**Decision:** Dedicated TaaS newsletter list (`taas-issuers`). Also stand
up a fresh list for Demonopol main (`demonopol-main`) — list creation
only; integration into demonopol.com is out of scope for this repo.
**Decided by:** Founder.

---

## Discovered during build

### Q-011 · Named advisors strip on /about
**Status:** ✅ Resolved (2026-04-26)
**Decision:** Operating side stays corporate (per Q-002). Advisors are
named, with verifiable prior-firm credentials:
- **Luc Villeneuve** — 30 years brokering & international real estate, ex-Century21
- **Costa** *(full name {{TBD}})* — 30 years brokering & international real estate, ex-Group1Vest

Each card carries: name, prior firm, region, years, LinkedIn link.
**Open sub-items:**
- Costa's full name and LinkedIn URL — Q-011a.
- Written permission from Luc and Costa to publish their names + tenure
  + prior firms — Q-011b.
- Optional headshot — `{{TBD: optional advisor headshot}}`.

---

### Q-012 · Brokerage track record figures
**Status:** ✅ Resolved (2026-04-26)
**Decision:** **No numerical trust claims anywhere on the site.** No "30+
years", no transaction volume, no deal count, no geography count, no
sourced market-size citations on the home trust strip. Trust is built by
the quality of the site itself — typography discipline, clarity of
process, visible money-back guarantee, deliverable transparency, no
crypto noise — and by the message that real benefits to the owner are
real (liquidity, partial exit, global investor reach).
**Knock-on:** see Q-018 for revised advisor card and home-trust copy.
**Decided by:** Founder.

---

### Q-013 · Corporate Wise USD account
**Status:** 🟧 Soft-blocking
**Owner:** Founder
**Question:** Does Demonopol LLC have a corporate Wise USD account? If
yes, provide account details. If no, V1 ships Stripe-only and bank
transfer requests route to legal@demonopol.com.
**Default:** Stripe-only V1; bank transfer copy says "available on
request — contact legal@demonopol.com".
**Blocks:** `/diagnostic` payment options copy.

---

### Q-014 · Sample Diagnostic report (sanitized)
**Status:** 🟧 Soft-blocking
**Owner:** Founder
**Question:** Provide one sanitized example of a 6–8 page Diagnostic
report (real or representative) for use as a free PDF gated download. This
is the highest-impact trust artifact for the $400 product per the
conversion analysis.
**Default:** Ship `/diagnostic` without sample-report gate; add when
material is provided. Replace with a "What's inside the Diagnostic" tile
showing the section headings only.
**Blocks:** Sample-report download component on `/diagnostic` and
exit-intent modal.

---

### Q-015 · Promotion Boost ($200) without KOL component
**Status:** 🟧 Soft-blocking
**Owner:** Founder
**Question:** Per Q-009, no KOL push exists in V1. The spec's $200
Promotion Boost product is defined as "listing copy + 1 Medium article + 1
KOL push + 1 community announcement + 1 newsletter slot." Without KOL,
should Promotion Boost (a) ship with revised deliverables (e.g. listing
copy + 1 article + 1 community announcement + 1 newsletter slot, plus a
press-mention attempt), (b) be deferred until KOL or press partners
exist, or (c) keep priced at $200 with reduced scope?
**Default:** (a) Revised deliverables, $200 unchanged. Listing copy +
1 article on the Demonopol publishing channel + 1 community announcement
+ 1 newsletter slot + 1 press-pitch attempt.
**Blocks:** `/services` Promotion Boost tier copy.

---

### Q-016 · Email aliases on demonopol.com domain
**Status:** 🟨 Pre-launch
**Owner:** Founder
**Question:** Confirm `tokenize@demonopol.com` and `legal@demonopol.com`
inboxes are provisioned and forwarded appropriately.
**Default:** Both go live before public launch; intake emails go to
`tokenize@demonopol.com`, payments / NDA / ToS to `legal@demonopol.com`.
**Blocks:** Footer copy, contact page, transactional email FROM/REPLY-TO
addresses.

---

### Q-017 · i18n locale rollout cadence
**Status:** 🟧 Soft-blocking (updated 2026-04-27)
**Update (2026-04-27):** Founder asked the agent to populate FR / VI /
TH translations as a starting point. The agent did so for the global
UI keys (header, footer, nav, theme, 404, locale switcher, home hero
strings). These are **agent-quality** translations, not native, and
need a native-speaker pass before any paid marketing pushes traffic to
the localised routes. ES and ZH remain placeholder-only.
**Page-body copy** (the long blocks of text inside /services, /about,
/diagnostic, /insights, /legal) is **not** in `messages/*.json` — it's
inlined in EN inside the page components. Localising that body copy is
a separate, larger pass that requires either: (a) extracting all body
strings to message files, or (b) duplicating the page components per
locale. Deferred until a native copywriter is engaged.

**Plan:**
- **V1 launch** — UI keys translated to FR / VI / TH (agent quality).
  Body copy in EN with non-EN routes inheriting via the placeholder-
  fallback merge.
- **V1.1** — native pass on FR / VI / TH UI keys; body copy extraction
  begins for the highest-trafficked locale.
- **V1.2** — ES, ZH UI keys translated.

All locales use `next-intl` with `/{locale}/...` URL structure.

---

### Q-020 · Canonical brand assets
**Status:** ✅ Resolved (2026-04-27)
**Decision:** Founder supplied two WebP lockups (dark + white). Both
include the "decentralized Real Estate" tagline at the bottom. Files
live at:
- `public/brand/demonopol-logo-dark.webp` (light-theme header)
- `public/brand/demonopol-logo-white.webp` (dark-theme header)

Per Q-005 the tagline is **not** shown on the TaaS site. We crop it
visually at display time via `aspect-[4.5/1] overflow-hidden` so the
tagline portion is rendered outside the visible window. The source
assets are unmodified — when a tagline-free variant lands, we drop it
in and remove the crop.

The favicon at `src/app/icon.svg` remains a simplified 32px recreation
(the full lockup is too detailed for tab-size rendering).

**Open follow-ups (low priority):**
- Q-020a: a tagline-free SVG lockup would let us remove the CSS crop
  and serve a smaller asset. No urgency — current setup is fine.
- Q-020b: a horizontally-tighter "icon-only" mark variant would let us
  keep the mark visible on very small viewports where the full lockup
  doesn't fit.

---

### Q-019 · V1-essential cut
**Status:** ✅ Resolved (2026-04-27)
**Decision:** Drop the heavy infrastructure layer from V1 and ship a
working sales site faster. Specifically:

- **Drop Postgres / Drizzle / Supabase.** Replace with form-to-email via
  Resend. The founder triages from inbox until volume justifies a DB.
- **Drop Anthropic auto-report PDF.** Replace with the inline
  outcome-aware confirmation page already shipped on `/start/submitted`.
- **Drop magic-link resume.** localStorage save/restore is enough for a
  ~5-minute form.
- **Drop Cloudflare Turnstile.** Honeypot + disposable-email blocklist is
  enough at V1 volume.
- **Drop Upstash rate limit.** Vercel handles DDoS at the edge.
- **Drop Slack webhook.** Founder reads email.
- **Drop Sanity CMS** for Insights. Author articles as MDX in-repo for V1.

The lead-scoring + auto-rejection libraries remain — they drive the email
subject line and the outcome shown to the visitor.

**Re-enable trigger:** any one of: > 100 leads/month sustained, second
operator on intake, copywriter wants WYSIWYG editor, or auditor demands
structured persistence.
**Decided by:** Founder (2026-04-27, in response to agent's overbuild
flag).

---

### Q-018 · Trust line wording
**Status:** ✅ Resolved (2026-04-26, superseded by Q-012)
**Decision:** No quantified trust claim, on the operating side or on
advisor cards. Advisor cards carry **name, prior firm, region, LinkedIn
link** — no years, no transaction volume, no aggregate metrics. Public
copy frames the firm as "an advisory team drawn from international
real-estate practice" without numbers. Trust is conveyed by how the site
is made, not by what it claims.

---

## Resolved decisions log

| ID | Resolved on | Decision | Decided by |
|----|-------------|----------|------------|
| Q-001 | 2026-04-26 | Subdomain = `tokenize.demonopol.com` | Founder |
| Q-002 | 2026-04-26 | Corporate voice on operating side; named advisors exempt | Founder |
| Q-003 | 2026-04-26 | Stripe entity = Demonopol LLC, SVG | Founder |
| Q-004 | 2026-04-26 | No personal Wise; corporate or none | Founder |
| Q-005 | 2026-04-26 | No crypto/blockchain/$MONO/Sui language anywhere on the public site | Founder |
| Q-006 | 2026-04-26 | Draft new TaaS NDA + refresh Demonopol NDA | Founder |
| Q-007 | 2026-04-26 | Worldwide; legal-partner jurisdictions = ES, MA, TH, HK, CH, VN, US | Founder |
| Q-008 | 2026-04-26 | Free hand on imagery within light-premium real-estate brief | Founder |
| Q-009 | 2026-04-26 | No KOL; press + editorial strategy instead | Founder |
| Q-010 | 2026-04-26 | Dedicated TaaS newsletter + new Demonopol-main list | Founder |
| Q-011 | 2026-04-26 | Named advisors strip with Luc Villeneuve and Costa | Agent + Founder |
| Q-012 | 2026-04-26 | No numerical trust claims; trust through site quality | Founder |
| Q-017 | 2026-04-27 | i18n: agent-quality FR/VI/TH UI keys shipped V1; native pass + body-copy extraction deferred | Agent + Founder |
| Q-018 | 2026-04-26 | Advisor cards = name + prior firm + region + LinkedIn; no figures | Founder |
| Q-019 | 2026-04-27 | V1-essential cut: drop DB/Anthropic/Turnstile/Upstash/Slack/Sanity; form-to-email via Resend | Founder |
| Q-020 | 2026-04-27 | Canonical lockup WebPs in public/brand/; tagline cropped at display per Q-005 | Founder |
