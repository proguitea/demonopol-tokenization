# Demonopol Tokenization-as-a-Service

B2B website for the Demonopol real estate tokenization service. Sister site to
[demonopol.com](https://demonopol.com); deployed at `tokenize.demonopol.com`.

> **Source of truth:** `Demonopol_TaaS_Master_Prompt_V2.docx`. All product,
> design, copy, and technical decisions trace back to that document. Do not
> deviate without updating the spec.

## Status

🚧 In build. See [`OPEN_QUESTIONS.md`](./OPEN_QUESTIONS.md) for blocking decisions.

## Stack

- **Framework** — Next.js 14+ (App Router) + TypeScript
- **Styling** — Tailwind CSS + custom tokens (Part G of spec)
- **UI** — shadcn/ui, customized
- **Forms** — react-hook-form + zod
- **CMS** — Sanity (bilingual EN/VN)
- **DB** — Postgres via Supabase
- **Email** — Resend
- **Booking** — Cal.com
- **Payments** — Stripe (primary), Wise USD (manual), $MONO on Sui (V2)
- **Analytics** — Plausible
- **Errors** — Sentry
- **Hosting** — Vercel + Cloudflare

## Getting started

```bash
pnpm install
cp .env.example .env.local       # fill in real values
pnpm db:push                     # provision Postgres schema
pnpm dev                         # http://localhost:3000
```

## Repo structure

```
.
├── app/                         # Next.js App Router
│   ├── (marketing)/             # Public pages (Home, How It Works, Services, About, Insights)
│   ├── start/                   # Self-Check intake
│   ├── diagnostic/              # Diagnostic checkout
│   ├── legal/                   # Terms, privacy, risk
│   ├── api/                     # Server routes (intake, checkout, webhooks)
│   └── vi/                      # Vietnamese mirror
├── components/                  # Shared UI components
│   ├── ui/                      # shadcn primitives
│   └── sections/                # Page sections (Hero, ServiceLadder, etc)
├── content/                     # MDX or Sanity content
├── lib/                         # Utilities (scoring, validation, anthropic, stripe)
├── styles/                      # Global CSS + design tokens
├── public/                      # Static assets
├── prisma/ or drizzle/          # DB schema and migrations
├── tests/                       # E2E and unit tests
└── Demonopol_TaaS_Master_Prompt_V2.docx
```

## How to work in this repo

The build is structured as 6 weekly sprints (Part K of spec). At the end of
each sprint:

1. Show progress against the sprint checklist.
2. Tick off ☐ items in Part F that are now complete.
3. Flag any spec divergence in `OPEN_QUESTIONS.md`.
4. Wait for founder review before starting the next sprint.

## Anti-patterns (do not do)

- Do not invent market figures, partner names, testimonials, or team bios.
  Only the sourced figures in Part B are usable on the public site.
- Do not use dark backgrounds as a primary surface. Premium light aesthetic
  only — see Part G.
- Do not ship Vietnamese copy from machine translation. Use `{{VN: ...}}`
  placeholders until a native copywriter delivers.
- Do not add tracking that requires consent without wiring the consent
  banner. Plausible is cookie-free; default to that.
- Do not hardcode secrets. Everything goes through `.env.local` /
  Vercel env vars.

## Acceptance criteria

The site is not done until every ☐ in Part F of the spec is ticked and the
pre-launch checklist in Part K (§11.2) passes.

## Contact

- Founder — Guillaume Provent
- Inbound — `issuers@demonopol.com`
- Legal — `legal@demonopol.com`
