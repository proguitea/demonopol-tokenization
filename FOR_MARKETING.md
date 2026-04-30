# Demonopol TaaS — Marketing & Content Handoff

> **Who this is for:** Copywriters, translators, PR/marketing team, and
> anyone producing content for `tokenize.demonopol.com`.
>
> **Live preview:** https://demonopol-tokenization.vercel.app
> **Production URL (when DNS is pointed):** tokenize.demonopol.com
>
> Last updated by Claude Code: 2026-05-01 (commit f816618)

---

## 1 · Brand assets on the server

All brand files live in `/public/brand/` — they are served as
`https://tokenize.demonopol.com/brand/<filename>`.

| File | Use |
|------|-----|
| `demonopol-logo-dark.webp` | Header logo in **light theme** (navy mark + wordmark on transparent) |
| `demonopol-logo-white.webp` | Header logo in **dark theme** (white mark + wordmark on transparent) |

**Important:** Both WebPs include the "The future of decentralized Real
Estate" tagline at the bottom. That tagline is **cropped out** in the
site header (Q-005 forbids it on this property). When a clean, tagline-
free variant of the logo is available, hand it to the developer and the
header crop hack can be removed.

**Brand colours (CSS variables, but as hex for design tools):**

| Role | Light theme | Dark theme |
|------|-------------|------------|
| Background | `#F7F4EE` (warm ivory) | `#0E1210` (deep forest) |
| Text | `#181A1D` | `#EDE8DF` |
| Primary (forest green) | `#1A3C2E` | `#1F4C3A` |
| Accent (brass/gold) | `#C9A96E` | `#C9A96E` |
| Muted text | `#595048` | `#A89F90` |

**Typography:**
- Display: `font-display` (used for all headings — verify font stack in `tailwind.config.ts`)
- Body: `font-sans` (system stack)
- Labels / UI mono: `font-mono` (system monospace)

---

## 2 · Pages live now and what's on each

| Route | Status | Key content |
|-------|--------|-------------|
| `/` | ✅ Live | Hero · stats strip · service ladder · how-it-works · trust · insights teaser · final CTA |
| `/services` | ✅ Live | Five-tier pricing table (Self-Check → Express), comparison grid |
| `/diagnostic` | ✅ Live | Full diagnostic page + Stripe pay button + FAQ |
| `/diagnostic/success` | ✅ Live | Post-payment page with Cal.com booking link |
| `/start` | ✅ Live | 5-step self-check form → email notification |
| `/start/submitted` | ✅ Live | Confirmation / rejection outcome page |
| `/insights` | ✅ Live | Article index — 4 cards in "drafting" state (see §4) |
| `/about` | ✅ Live | Mission · advisors · press placeholders · jurisdiction reach |
| `/legal` | ✅ Scaffolded | Terms · Privacy · Risk Disclosure — all placeholder framing |

---

## 3 · Placeholder content that needs real copy

Search for `{{TBD:` in the codebase to find every unfilled slot.
Current open items:

### High-priority (blocks full launch)

**A. Advisor LinkedIn URLs** — in `src/app/[locale]/about/page.tsx`:
```
"{{TBD: Luc Villeneuve LinkedIn URL}}"
"{{TBD: Costa LinkedIn URL}}"
```
When you have the real URLs, give them to the developer — one-line swap.

**B. Express tier price** — in `src/app/[locale]/services/page.tsx`:
```
"{{TBD: Express price}}"
```
The Express tier is the fifth service tier. The founder needs to decide
the fee before this populates. Until then the card shows the placeholder.

**C. Legal text** — `/legal` currently shows structured placeholder
framing with section headers. Needs counsel-reviewed:
- Terms of Service
- Privacy Policy
- Risk Disclosure (especially important for a financial-adjacent product)

Legal entity for all three: **Demonopol LLC · 4008 LLC · P.O. Box 2897,
Kingstown, St. Vincent and the Grenadines · legal@demonopol.com**

### Medium-priority (pre-launch)

**D. Press / "as seen in" logos** — `/about` has a "Coverage" section
with four dashed placeholder boxes. Drop real publication logos here when
coverage is secured. Preferred: SVG or PNG with transparent background,
dark version (the section has a light background).
Contact to place: `legal@demonopol.com` (the press mailto on the page).

**E. Cal.com slug** — the Diagnostic success page links to the founder's
calendar. Set `NEXT_PUBLIC_CAL_LINK` in Vercel env vars to the actual
slug (e.g., `demonopol/diagnostic`). Until set, the link is broken.

---

## 4 · Insights articles — all need writing

The `/insights` index shows four article cards in "drafting" state.
None of them have actual article pages yet — clicking the cards leads
nowhere in V1. The developer has left slugs and metadata scaffolded.
Each article needs a founder or expert draft, then the developer can
wire up the MDX route.

| Slug | Category | Scheduled | Brief |
|------|----------|-----------|-------|
| `liquidity-without-selling` | Primer | May 2026 | What owners mean when they ask about tokenization. Three things that change when you stop framing it as a sale. |
| `what-structuring-actually-costs` | Primer | May 2026 | Real cost breakdown of structuring a tokenized real estate deal. Demystify the process. |
| `spain-luxury-fractional-pathways` | Jurisdiction | June 2026 | Spain-specific pathways for fractionalized luxury real estate. Which legal vehicle, which jurisdiction layer. |
| `real-benefits-real-risks` | Risk | June 2026 | The list nobody publishes. What goes wrong, what's overstated, how to read the boilerplate. |

**Voice guidelines for articles:**
- Corporate ("our team", "we"), never first-person founder
- No numbers as trust signals ("30 years", "$X transacted") — see Q-012
- No crypto vocabulary: blockchain, Sui, $MONO, DAO, smart contract,
  on-chain, DeFi — the site CI will fail the build if any of these appear
- "Tokenization" as a noun is fine
- Tone: direct, practitioner, not salesy — like a well-written legal memo

---

## 5 · Translation status

| Locale | Quality | Notes |
|--------|---------|-------|
| EN | ✅ Canonical | Final. All edits should start here. |
| FR | 🟧 Agent-quality | Full translation, needs native-speaker pass. Flag: `[[FR:` strings are not present — FR is mostly complete. |
| VI | 🟨 Partial | Some strings are `[[VI: english placeholder]]` — these render in EN and are waiting for a Vietnamese copywriter. |
| TH | 🟨 Partial | Same as VI, using `[[TH: english placeholder]]` markers. |
| ES | 🔴 Scaffold only | Falls back to EN entirely. Needs a Spanish copywriter. |
| ZH | 🔴 Scaffold only | Falls back to EN entirely. Needs a Chinese copywriter. |

**How translations work:** Message files live in `/messages/`. Each is a
JSON file: `en.json`, `fr.json`, `vi.json`, `th.json`, `es.json`, `zh.json`.
To fix a translation, edit the JSON value for the relevant key and give
the file to the developer (or submit a PR).

---

## 6 · Stats strip — copy to confirm

The homepage now has a four-cell strip directly below the hero. The
values are factual product specs — confirm these are accurate before
launch:

| Display | Label | Sublabel |
|---------|-------|----------|
| Free | Self-Check | No card · 5 minutes |
| $400 | Diagnostic | Flat fee · fully scoped |
| Written | Deliverable | Every engagement, same structure |
| 15 min | Guarantee | Into the call · full refund |

The "15 min" guarantee: the Diagnostic call fee is refunded in full if
the first 15 minutes aren't delivering useful clarity. This is already
stated on `/diagnostic` and in the trust section of the homepage.

---

## 7 · What the developer still needs from the founder / team

(From `OPEN_QUESTIONS.md` — copying the actionables here for visibility)

1. **Vercel env vars** — set in the Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL` = `https://tokenize.demonopol.com`
   - `RESEND_API_KEY` + `EMAIL_INTERNAL_NOTIFY` (email for /start alerts)
   - `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_CAL_LINK` (Cal.com booking slug)

2. **Custom domain** `tokenize.demonopol.com` → Cloudflare CNAME → Vercel

3. **LinkedIn URLs** for Luc Villeneuve and Costa (item A above)

4. **Counsel-reviewed legal text** (item C above)

5. **First Insights article** — the founder's draft

6. **Express tier price** (item B above)

---

## 8 · Hero visual — what it shows

The homepage hero now has a right-column animated graphic (desktop only)
showing the core concept: one property block → fractionalised token grid.
It uses the brand's forest green (primary) for the asset and brass/gold
(accent) for the token cells. It floats gently with a 6-second CSS
animation, no JavaScript, and goes static for users who prefer reduced
motion.

If the founder or marketing team wants to replace this with a real photo
or a branded illustration, that slot is `lg:w-[288px]` in the hero — any
asset (Next.js `<Image>`, SVG, or Lottie) can drop in.

---

## 9 · How to ship copy changes quickly

For changes to existing copy (no new pages):

1. Open the right `messages/en.json` file in GitHub
2. Find the key you want to change (use Ctrl+F on the key name)
3. Edit the value string
4. Commit directly to `main`
5. Vercel auto-deploys in ~60 seconds

For new pages or layout changes, work with the developer.

---

*This file is maintained by the build agent. The developer updates it after
significant feature drops. Check `ongoing.md` for the technical handoff and
`OPEN_QUESTIONS.md` for every founder decision recorded.*
