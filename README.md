# Demonopol Tokenization-as-a-Service

B2B website for the Demonopol tokenization service. Sister site to
[demonopol.com](https://demonopol.com); deployed at `tokenize.demonopol.com`.

> **Source of truth:** [`Demonopol_TaaS_Master_Prompt_V2.docx`](./Demonopol_TaaS_Master_Prompt_V2.docx).
> All product, design, copy, and technical decisions trace back to that
> document. Current sprint plan and acceptance criteria live in
> [`SPRINT_PLAN.md`](./SPRINT_PLAN.md). Open decisions in
> [`OPEN_QUESTIONS.md`](./OPEN_QUESTIONS.md). Account / env-var inventory in
> [`PROVISIONING.md`](./PROVISIONING.md).

## Status

🚧 **Sprint Week 1 — Foundations.** Empty production-grade shell at
`tokenize.demonopol.com`: design tokens, type system, i18n scaffolding
(EN canonical + non-EN fallback), layout shell, theme toggle. Business
pages land in Weeks 2–6.

## Stack

- **Framework** — Next.js 15 (App Router) + React 19 + TypeScript
- **Styling** — Tailwind CSS 3 with shadcn-compatible CSS variables
- **i18n** — `next-intl`, EN canonical, scaffolded for VI / ES / FR / TH / ZH
- **Theme** — `next-themes` light (default) / dark toggle
- **Forms (Week 2)** — react-hook-form + zod
- **CMS (Week 5)** — Sanity (multilingual)
- **DB (Week 2)** — Postgres via Supabase
- **Email (Week 2)** — Resend
- **Booking (Week 4)** — Cal.com
- **Payments (Week 4)** — Stripe (primary), Wise USD (manual)
- **Analytics & errors** — Vercel runtime logs + Web Analytics (V1).
  Plausible / Sentry deferred until volume justifies the spend.
- **Hosting** — Vercel + Cloudflare

## Getting started

```bash
pnpm install
cp .env.example .env.local       # fill values from PROVISIONING.md
pnpm dev                         # http://localhost:3000
```

Useful scripts:

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Start the dev server. |
| `pnpm build` | Production build. |
| `pnpm start` | Run the production build locally. |
| `pnpm lint` | Run Next.js + ESLint. |
| `pnpm typecheck` | TypeScript strict check. |
| `pnpm format` | Prettier write across the repo. |

## Repo structure

```
.
├── src/
│   ├── app/
│   │   ├── [locale]/                  # localized routes (real layout lives here)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               # home (Week 1 placeholder)
│   │   │   └── not-found.tsx
│   │   ├── globals.css                # design tokens (light / dark)
│   │   ├── icon.svg
│   │   ├── layout.tsx                 # root pass-through
│   │   └── not-found.tsx              # global fallback
│   ├── components/
│   │   ├── layout/                    # Header, Footer, Logo, ThemeToggle, LocaleSwitcher
│   │   └── providers/Providers.tsx
│   ├── i18n/                          # routing + request config + nav helpers
│   ├── lib/utils.ts
│   └── middleware.ts                  # next-intl locale routing
├── messages/                          # en.json populated; others use [[LANG: …]]
│   ├── en.json
│   └── vi.json | es.json | fr.json | th.json | zh.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs                    # next-intl plugin wrap
├── tsconfig.json
├── .env.example
├── Demonopol_TaaS_Master_Prompt_V2.docx
├── SPRINT_PLAN.md                     # Part K + Part F (drafted by agent)
├── OPEN_QUESTIONS.md                  # decisions log
└── PROVISIONING.md                    # accounts + env-var inventory
```

## How to work in this repo

The build is structured as 6 weekly sprints (see [`SPRINT_PLAN.md`](./SPRINT_PLAN.md)).
At the end of each sprint:

1. Show progress against the sprint checklist.
2. Tick off the ☐ items in the sprint plan that are now complete.
3. Flag any spec divergence in [`OPEN_QUESTIONS.md`](./OPEN_QUESTIONS.md).
4. Wait for founder review before starting the next sprint.

## Anti-patterns (do not do)

- Do not invent market figures, partner names, testimonials, or team
  bios. Per Q-012, the public site carries **no numerical trust claims**.
- Do not mention Sui, $MONO, blockchain, DAO, smart contracts, on-chain,
  or DeFi anywhere in copy (Q-005). The CI build fails if these appear in
  the rendered output.
- Do not use dark backgrounds as the primary surface. Light-premium
  ivory (`#F7F4EE`) is the canvas; the dark theme is a user-toggled
  alternative, not the default.
- Do not ship machine-translated VI/ES/FR/TH/ZH copy. Use
  `[[LANG: english source]]` placeholders until a native copywriter
  delivers (e.g. `[[VI: Book a Diagnostic]]`). Brackets are findable via
  grep and ICU-safe.
- Do not add tracking that requires a consent banner. If product
  analytics return, default to a cookie-free option (Plausible / Vercel
  Web Analytics).
- Do not hardcode secrets. Everything goes through `.env.local` or
  Vercel env vars.

## Design tokens

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--background` | `#F7F4EE` ivory | `#0E1110` near-black | Primary surface |
| `--card`, `--elevated` | `#FFFFFF` | `#1A1C1E` | Cards, panels |
| `--muted` | `#EFEAE0` | `#2B2D2F` anthracite | Section bands |
| `--foreground` | `#1A1C1E` | `#F0EDE8` | Body text |
| `--muted-foreground` | `#5A5754` | `#A8A39B` | Secondary text |
| `--primary` (forest) | `#1A3C2E` | `#1A3C2E` | Primary CTAs |
| `--accent` (brass) | `#C9A96E` | `#C9A96E` | Headline accents |
| `--destructive` (alert) | `#C24A2C` | `#C24A2C` | Risk language, errors |

## Acceptance criteria

The site is not done until every ☐ across Weeks 1–6 of
[`SPRINT_PLAN.md`](./SPRINT_PLAN.md) is ticked and the pre-launch
checklist passes.

## Contact

- Inbound — `tokenize@demonopol.com`
- Legal / payments — `legal@demonopol.com`
