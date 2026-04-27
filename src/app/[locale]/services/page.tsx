import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, Minus } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five priced steps from a free Self-Check to a fully-mandated tokenization. Transparent scope and price at every tier.",
};

type Tier = {
  key: string;
  name: string;
  price: string;
  priceCadence?: string;
  oneLine: string;
  forWhom: string;
  includes: string[];
  excludes: string[];
  ctaLabel: string;
  ctaHref: "/start" | "/diagnostic" | "/about";
  ctaDisabled?: boolean;
  emphasis?: boolean;
};

const TIERS: Tier[] = [
  {
    key: "self_check",
    name: "Self-Check",
    price: "Free",
    oneLine: "A 5-minute structured questionnaire. We come back with a written fit assessment.",
    forWhom: "Owners trying to figure out whether tokenization is a serious option for their asset.",
    includes: [
      "Ten-question structured intake",
      "Written fit assessment within 1–2 business days",
      "Indicative price band for the full Diagnostic",
      "Recommended next step",
    ],
    excludes: [
      "No legal, tax, or financial recommendation",
      "No structuring, no introductions, no listing",
    ],
    ctaLabel: "Start the Self-Check",
    ctaHref: "/start",
  },
  {
    key: "diagnostic",
    name: "Diagnostic",
    price: "$400",
    priceCadence: "one-time",
    oneLine:
      "A 60–90 minute call with our experts and a 6–8 page written assessment of whether — and how — your asset can be tokenized.",
    forWhom:
      "Owners ready to spend a small fraction of legal fees ($5K–$50K elsewhere) to get a clear, written go / no-go.",
    includes: [
      "60–90 min working session with the advisory team",
      "6–8 page written diagnostic — structure options, jurisdiction routing, indicative timeline and cost",
      "Pre-call checklist (deck, deed, financials, prior valuations)",
      "Written follow-up with recommended next steps",
      "15-minute money-back guarantee if the call doesn't deliver useful clarity",
    ],
    excludes: [
      "No legal opinion (we route to a jurisdictional partner if needed)",
      "No execution or listing — that's the Mandate",
    ],
    ctaLabel: "Book a Diagnostic",
    ctaHref: "/diagnostic",
    ctaDisabled: true,
    emphasis: true,
  },
  {
    key: "promotion",
    name: "Promotion Boost",
    price: "$200",
    priceCadence: "one-time, post-Diagnostic",
    oneLine:
      "A marketing add-on for owners who want their tokenized asset to land cleanly with the right audience.",
    forWhom: "Owners who've done the Diagnostic and want help reaching qualified investors.",
    includes: [
      "Listing copy — written for the asset, not against a template",
      "One published article on the Demonopol publishing channel",
      "One announcement to the Demonopol community",
      "One newsletter slot",
      "One press-pitch attempt to a sector publication",
    ],
    excludes: [
      "No paid ad spend",
      "No KOL push (deferred — see press strategy)",
      "No guaranteed coverage",
    ],
    ctaLabel: "Available after Diagnostic",
    ctaHref: "/start",
    ctaDisabled: true,
  },
  {
    key: "mandate",
    name: "Mandate",
    price: "Custom",
    priceCadence: "scoped per asset",
    oneLine:
      "Full structuring and execution: legal routing, compliance, distribution to qualified investors.",
    forWhom: "Owners with a clear go from the Diagnostic, ready to execute.",
    includes: [
      "Jurisdiction selection and legal partner routing",
      "Structuring and compliance setup (KYC/AML)",
      "Investor-ready documentation",
      "Distribution to the relevant investor pool",
      "Project management through close",
    ],
    excludes: [
      "Not a fixed-fee product — scoped after the Diagnostic",
      "No guarantees on placement or price discovery",
    ],
    ctaLabel: "Discuss after Diagnostic",
    ctaHref: "/diagnostic",
    ctaDisabled: true,
  },
  {
    key: "express",
    name: "Express",
    price: "{{TBD: Express price}}",
    priceCadence: "fast-track",
    oneLine:
      "A condensed Mandate for owners with a hard deadline and a clean documentation pack.",
    forWhom:
      "Owners with a deal already shaped — closing pressure, jurisdictional clock, or an investor circle ready to commit.",
    includes: [
      "Same Mandate scope, compressed timeline",
      "Priority access to the advisory team",
      "Daily status during the active window",
    ],
    excludes: [
      "Not a way to skip the Diagnostic — feasibility is still gated",
      "Capacity-limited — not always available",
    ],
    ctaLabel: "Discuss after Diagnostic",
    ctaHref: "/diagnostic",
    ctaDisabled: true,
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container max-w-4xl py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Services
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Five priced steps. Transparent at every tier.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            We sell the whole ladder, but most owners only need the first two
            rungs to make a decision. Pricing is published. Scope is published.
            What you don&apos;t get is also published.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start with the Self-Check
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-6xl py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <TierCard key={tier.key} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container max-w-5xl py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            How the tiers compare
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Each tier is a self-contained product. You don&apos;t need to buy
            the next one — most owners stop after the Diagnostic.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    What you get
                  </th>
                  {TIERS.map((t) => (
                    <th
                      key={t.key}
                      className="px-4 py-3 text-left font-medium"
                    >
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <ComparisonRow label="Written assessment" values={[true, true, false, true, true]} />
                <ComparisonRow label="Live working session" values={[false, true, false, true, true]} />
                <ComparisonRow label="Indicative pricing" values={[true, true, false, true, true]} />
                <ComparisonRow label="Marketing assets" values={[false, false, true, true, true]} />
                <ComparisonRow label="Legal partner routing" values={[false, false, false, true, true]} />
                <ComparisonRow label="Distribution to investors" values={[false, false, false, true, true]} />
                <ComparisonRow label="Money-back guarantee" values={[false, true, false, false, false]} />
                <tr className="border-b border-border/50">
                  <td className="px-4 py-3 font-medium">Price</td>
                  {TIERS.map((t) => (
                    <td key={t.key} className="px-4 py-3 font-mono text-xs">
                      {t.price}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="container max-w-3xl py-20 md:py-24">
          <div className="rounded-xl border border-border bg-elevated p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              The honest path
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Start free. Decide with a written assessment in your hand.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The Self-Check costs nothing. If we can help, the Diagnostic gives
              you a written go / no-go for $400 — refundable in the first 15
              minutes if the call doesn&apos;t deliver useful clarity. Anything
              beyond that is a deliberate decision, never the default.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start the Self-Check
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-primary/40"
              >
                Who we are
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border bg-elevated p-6 transition-colors",
        tier.emphasis ? "border-primary/40 shadow-sm" : "border-border",
      )}
    >
      <header className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {tier.name}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-semibold tracking-tight">
            {tier.price}
          </span>
          {tier.priceCadence ? (
            <span className="text-xs text-muted-foreground">{tier.priceCadence}</span>
          ) : null}
        </div>
        <p className="text-sm text-foreground/90">{tier.oneLine}</p>
      </header>

      <p className="mt-6 text-xs uppercase tracking-wide text-muted-foreground">
        For
      </p>
      <p className="mt-1 text-sm">{tier.forWhom}</p>

      <ul className="mt-6 space-y-2 text-sm">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check
              className="mt-0.5 h-4 w-4 flex-none text-primary"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {tier.excludes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Minus
              className="mt-0.5 h-4 w-4 flex-none text-muted-foreground/60"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        {tier.ctaDisabled ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex w-full items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium opacity-60"
          >
            {tier.ctaLabel}
          </button>
        ) : (
          <Link
            href={tier.ctaHref}
            className={cn(
              "inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-opacity",
              tier.emphasis
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "border border-border bg-background hover:border-primary/40",
            )}
          >
            {tier.ctaLabel}
          </Link>
        )}
      </div>
    </article>
  );
}

function ComparisonRow({
  label,
  values,
}: {
  label: string;
  values: boolean[];
}) {
  return (
    <tr className="border-b border-border/50">
      <td className="px-4 py-3 font-medium">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="px-4 py-3">
          {v ? (
            <Check className="h-4 w-4 text-primary" aria-hidden="true" />
          ) : (
            <Minus className="h-4 w-4 text-muted-foreground/40" aria-hidden="true" />
          )}
        </td>
      ))}
    </tr>
  );
}
