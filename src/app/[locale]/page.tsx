import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  FileText,
  Globe2,
  ShieldCheck,
} from "lucide-react";

import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");

  return (
    <>
      <Hero t={t} />
      <ServiceLadder />
      <HowItWorks />
      <TrustStrip />
      <InsightsTeaser />
      <FinalCta />
    </>
  );
}

function Hero({
  t,
}: {
  t: ReturnType<typeof useTranslations<"home">>;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="container py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl animate-fade-in space-y-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {t("headline")}
          </h1>
          <p className="text-pretty max-w-prose text-lg text-muted-foreground md:text-xl">
            {t("subhead")}
          </p>
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("ctaPrimary")}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/diagnostic"
              className="inline-flex items-center justify-center rounded-md border border-border bg-elevated px-6 py-3 font-medium text-foreground transition-colors hover:border-primary/40"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Free Self-Check · $400 Diagnostic · 15-min money-back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}

function ServiceLadder() {
  const cards = [
    {
      eyebrow: "Free",
      title: "Self-Check",
      body: "A 5-minute structured questionnaire. We come back with a written fit assessment and the recommended next step.",
      cta: "Start the Self-Check",
      href: "/start" as const,
      emphasis: false,
    },
    {
      eyebrow: "$400 · one-time",
      title: "Diagnostic",
      body: "60–90 minute working session and a 6–8 page written go / no-go. Refundable in the first 15 minutes.",
      cta: "See what's inside",
      href: "/diagnostic" as const,
      emphasis: true,
    },
    {
      eyebrow: "Custom",
      title: "Mandate & Express",
      body: "Full structuring, jurisdictional routing, and distribution to qualified investors. Scoped after the Diagnostic.",
      cta: "Compare all five tiers",
      href: "/services" as const,
      emphasis: false,
    },
  ];

  return (
    <section className="border-b border-border/60 bg-muted/40">
      <div className="container max-w-6xl py-20 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Services
            </p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Five priced steps. Most owners need only the first two.
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex"
          >
            See all five
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className={`flex h-full flex-col rounded-xl border bg-elevated p-6 transition-colors ${
                card.emphasis
                  ? "border-primary/40 shadow-sm"
                  : "border-border"
              }`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {card.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{card.body}</p>
              <div className="mt-auto pt-6">
                <Link
                  href={card.href}
                  className={`inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-opacity ${
                    card.emphasis
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border bg-background hover:border-primary/40"
                  }`}
                >
                  {card.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: ClipboardCheck,
      label: "Self-Check",
      body: "Five minutes. Free. Structured intake on the asset, ownership, jurisdiction, and what you're trying to achieve.",
    },
    {
      icon: FileText,
      label: "Diagnostic",
      body: "$400. A working session and a written report — feasibility, structuring options, jurisdiction routing, indicative cost.",
    },
    {
      icon: ShieldCheck,
      label: "Structuring",
      body: "Mandate engagement: legal partner routing, compliance setup, investor-ready documentation. Scoped per asset.",
    },
    {
      icon: Globe2,
      label: "Distribution",
      body: "Distribution to a relevant investor pool. Worldwide reach, with depth in seven legal-partner jurisdictions.",
    },
  ];

  return (
    <section className="border-b border-border/60">
      <div className="container max-w-6xl py-20 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          How it works
        </p>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Four steps. Nothing happens unless you decide it should.
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Each step is its own product, with its own deliverable. Most owners
          stop at step two with a written assessment in hand.
        </p>

        <ol className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.label}
              className="rounded-xl border border-border bg-elevated p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <step.icon
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {step.label}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-border/60 bg-muted/40">
      <div className="container max-w-6xl py-20 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-background p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Money-back guarantee
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              15 minutes in, no questions asked.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              If the Diagnostic call isn&apos;t delivering useful clarity, we
              refund the $400 in full. The guarantee lives on the call, not in
              the fine print.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Written deliverable
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              6–8 pages. Same structure every time.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Feasibility, structuring options, jurisdiction routing,
              timeline, indicative cost, investor-pool fit. A document you can
              hand to your counsel.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Advisory bench
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              Drawn from international real-estate practice.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Named advisors with prior firms verifiable on LinkedIn — Luc
              Villeneuve (ex-Century 21) and Costa (ex-Group1Vest). The
              tokenization rail is newer; the operating discipline isn&apos;t.
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Meet the team
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {[
            "Spain",
            "Morocco",
            "Thailand",
            "Hong Kong",
            "Switzerland",
            "Vietnam",
            "United States",
            "Worldwide",
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightsTeaser() {
  const previews = [
    {
      tag: "Primer · May 2026",
      title: "Liquidity for private real estate without selling",
      one: "What owners actually mean when they ask about tokenization, and the three things that change once you stop framing it as a sale.",
    },
    {
      tag: "Risk · June 2026",
      title: "Real-estate fractionalization: real benefits, real risks",
      one: "The list nobody publishes. What actually goes wrong, what's overstated, and how to read the boilerplate.",
    },
  ];

  return (
    <section className="border-b border-border/60">
      <div className="container max-w-6xl py-20 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Insights
            </p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Working notes from the practice.
            </h2>
          </div>
          <Link
            href="/insights"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex"
          >
            See all
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {previews.map((p) => (
            <article
              key={p.title}
              className="rounded-xl border border-border bg-elevated p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {p.tag}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.one}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section>
      <div className="container max-w-4xl py-20 md:py-28">
        <div className="rounded-2xl border border-border bg-elevated p-8 md:p-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            First step
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Five minutes. No credit card. Written assessment in your hand.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The Self-Check is the start of the conversation. Whether the answer
            is &ldquo;yes, here&apos;s how&rdquo; or &ldquo;not yet, here&apos;s what would change
            it&rdquo; — you walk away with something written.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start the Self-Check
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 font-medium transition-colors hover:border-primary/40"
            >
              Compare all five tiers
            </Link>
          </div>
          <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-3">
            {[
              "Free, structured intake",
              "Written outcome assessment",
              "Recommended next step",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
