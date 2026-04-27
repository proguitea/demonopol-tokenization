# Account provisioning checklist

External services to provision before Sprint Week 1 starts. Each row
specifies which env vars it produces. Pair with `env.example.txt`.

> **Owner conventions** — *Founder* = needs founder/operator action;
> *Agent* = agent can self-provision once founder has access. Most
> billing-bearing accounts are Founder-owned.

---

## Critical path (must exist before Week 1)

| Service | Owner | Plan | Env vars produced | Notes |
|---------|-------|------|-------------------|-------|
| **Vercel** | Founder | Hobby V1, Pro before launch | n/a (deploy keys via CLI/GitHub) | Connect GitHub repo. Add `tokenize.demonopol.com` as a custom domain. |
| **Cloudflare** | Founder | Free | n/a | DNS for `tokenize.demonopol.com` + Turnstile site key. |
| **Cloudflare Turnstile** | Founder | Free | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Domain-restricted to tokenize.demonopol.com + localhost. |
| **GitHub** | Founder | n/a | n/a | Repo for the codebase + Actions for CI. |

---

## Week 2 dependencies (intake + auto-report + email)

| Service | Owner | Plan | Env vars produced | Notes |
|---------|-------|------|-------------------|-------|
| **Supabase** | Founder | Free V1, Pro before 1k leads | `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Region `eu-central` (Frankfurt) for EU data residency. Storage bucket `reports`. |
| **Anthropic API** | Founder | Pay-as-you-go | `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `ANTHROPIC_MAX_TOKENS` | **Recommend `claude-sonnet-4-6` (default), not Opus 4.7**, for cost at production volume on a 1-page templated report. Opus 4.7 (`claude-opus-4-7`) reserved for high-score lead deep-dive (optional). |
| **Resend** | Founder | Free V1, paid before 100 leads/month | `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO`, `EMAIL_INTERNAL_NOTIFY` | Verify `tokenize.demonopol.com` sender domain. DKIM, SPF, DMARC. |
| **Upstash Redis** | Founder | Free V1 | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Rate-limit storage. EU region. |
| **Slack** | Founder | n/a | `SLACK_WEBHOOK_LEADS` | Incoming webhook to a `#leads` channel. High-score notifications only. |

---

## Week 3 dependencies (marketing + analytics)

> **Plausible and Sentry are deferred** (founder direction, 2026-04-27).
> V1 relies on Vercel runtime logs for errors and Vercel Web Analytics
> (free tier) for traffic. Re-enable the rows below if/when volume or
> debugging needs justify the spend.

| Service | Owner | Plan | Env vars produced | Notes |
|---------|-------|------|-------------------|-------|
| ~~Plausible~~ | _deferred_ | — | — | Re-evaluate post-launch. |
| ~~Sentry~~ | _deferred_ | — | — | Re-evaluate post-launch. |

---

## Week 4 dependencies (payments + booking)

| Service | Owner | Plan | Env vars produced | Notes |
|---------|-------|------|-------------------|-------|
| **Stripe** | Founder | Standard | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_DIAGNOSTIC_PRICE_ID` | Account in name of **Demonopol LLC** (per Q-003). Address: P.O. Box 2897, Kingstown, SVG. Single one-time price product = $400 USD. |
| **Cal.com** | Founder | Free V1 | `CAL_API_KEY`, `CAL_WEBHOOK_SECRET`, `NEXT_PUBLIC_CAL_LINK` | Self-host considered for V2. V1 = Cal.com cloud (EU region). 60–90 min event type, buffers, calendar limits per Q-002. |
| **Wise (corporate)** | Founder | n/a | none | Conditional on Q-013. If account doesn't exist, V1 ships Stripe-only and `/diagnostic` shows "bank transfer on request" → `legal@demonopol.com`. |

---

## Week 5 dependencies (CMS + SEO)

| Service | Owner | Plan | Env vars produced | Notes |
|---------|-------|------|-------------------|-------|
| **Sanity** | Founder | Free V1 | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`, `SANITY_STUDIO_PREVIEW_SECRET` | Bilingual (multilingual, actually) schema. EN required, others optional fields. |
| **Google Search Console** | Founder | Free | n/a | Verify `tokenize.demonopol.com`. Submit `sitemap.xml`. |

---

## Week 6 dependencies (newsletters + production)

| Service | Owner | Plan | Env vars produced | Notes |
|---------|-------|------|-------------------|-------|
| **Resend Audiences** (already covered above) | Founder | Free V1 | n/a (managed via API) | Two audiences: `taas-issuers` (this site) and `demonopol-main` (new fresh list per Q-010, list creation only). |

---

## Email aliases (DNS / email host)

To be configured on the `demonopol.com` mail provider (Q-016):

- `tokenize@demonopol.com` — inbound service inquiries; auto-forward to founder.
- `legal@demonopol.com` — legal, payments, NDA; auto-forward to founder + counsel.
- (Existing `realty.hub@demonopol.com` and `issuers@demonopol.com` are
  not used by this site.)

---

## Provisioning order (suggested by founder calendar)

1. Vercel + GitHub + Cloudflare (under 1 hour).
2. Stripe account (1–3 days, requires Demonopol LLC docs).
3. Supabase + Anthropic + Resend (under 1 hour each).
4. Cal.com + Sentry + Plausible + Upstash + Slack (under 30 min each).
5. Sanity (under 30 min).
6. Email aliases on demonopol.com (depends on registrar).

---

## Env-var inventory

The full list lives in [`env.example.txt`](env.example.txt). Two
deviations the agent recommends:

- `ANTHROPIC_MODEL` — currently set to `claude-opus-4-7`. Recommend
  switching to **`claude-sonnet-4-6`** as the default for the auto-report
  call. Sonnet 4.6 is materially cheaper and produces equivalent quality
  on a 1-page templated report. Opus 4.7 can be opt-in for high-score
  leads via a separate env var (e.g. `ANTHROPIC_MODEL_HIGH_SCORE`) if
  you want the upgrade path. Will not change without your sign-off.
- `EMAIL_FROM` — currently set to `Demonopol <issuers@demonopol.com>`.
  Will switch to **`Demonopol <tokenize@demonopol.com>`** per Q-016
  during Week 1.

No secrets are committed. All real values go in Vercel env settings and
local `.env.local` (gitignored).
