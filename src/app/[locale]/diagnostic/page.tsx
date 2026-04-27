import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Check, ShieldCheck, FileText, Clock } from "lucide-react";

import { PayButton } from "@/components/diagnostic/PayButton";
import { Link } from "@/i18n/navigation";
import { isStripeConfigured } from "@/lib/stripe/server";

export const metadata: Metadata = {
  title: "Diagnostic",
  description:
    "$400. A 60–90 minute working session and a 6–8 page written assessment of whether — and how — your asset can be tokenized.",
};

const REPORT_SECTIONS = [
  "Asset summary — what we received and what we verified",
  "Feasibility verdict — go, conditional go, or no-go, with the reasoning",
  "Structuring options — the realistic legal containers for your asset",
  "Jurisdiction routing — where to do the work and why",
  "Indicative timeline — phases, blockers, decision points",
  "Indicative cost — legal, structuring, distribution",
  "Investor-pool fit — who would plausibly subscribe and at what ticket",
  "Recommended next steps — what we'd do next and what you can do without us",
];

const PRECALL_CHECKLIST = [
  "Asset deck or summary (any format)",
  "Title deed or equivalent ownership document",
  "Most recent financials or rent-roll, if income-producing",
  "Prior valuation or recent broker opinion of value, if you have one",
];

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "What if you decide my asset isn't a fit?",
    a: "You get the same written assessment — clearly explaining the no-go and what would change the verdict. The $400 buys clarity, not an outcome.",
  },
  {
    q: "How does the money-back guarantee work?",
    a: "If, fifteen minutes into the call, you don't believe the session will deliver useful clarity, we end the call and refund the $400 in full. No paperwork, no friction.",
  },
  {
    q: "Do I have to do the Self-Check first?",
    a: "Yes. The Self-Check is free and gives both sides the structured intake the Diagnostic builds on. It also lets us flag the rare cases that aren't a fit before you pay.",
  },
  {
    q: "Who runs the call?",
    a: "Members of our advisory team and an analyst from the operating side. We don't put individual operator names on the front page because the work is collective — but you'll meet the people on the call.",
  },
  {
    q: "Is the Diagnostic legal advice?",
    a: "No. It's a structured commercial and structuring assessment. When a jurisdiction-specific legal opinion is needed, we route you to a partner in the relevant market — that's a separate engagement.",
  },
];

export default async function DiagnosticPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const stripeConfigured = isStripeConfigured();

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container max-w-4xl py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Diagnostic
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            $400. One working session. A written go / no-go.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            A 60–90 minute call with our advisory team and a 6–8 page written
            assessment of whether — and how — your asset can be tokenized.
            You walk away with a document, not a verbal &ldquo;maybe.&rdquo;
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
            <PayButton stripeConfigured={stripeConfigured} variant="primary" />
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-primary/40"
            >
              Try the free Self-Check first
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-xs text-muted-foreground">
            Stripe Checkout. Receipt issued by Demonopol LLC. The 15-minute
            money-back guarantee lives on the call, not in the fine print.
          </p>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-5xl py-14">
          <div className="grid gap-4 md:grid-cols-3">
            <Tile
              icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
              eyebrow="Money-back guarantee"
              title="15 minutes in. No questions asked."
              body="If the call isn't delivering clarity, we end it and refund the full $400. The guarantee lives on the call, not in the fine print."
            />
            <Tile
              icon={<FileText className="h-5 w-5" aria-hidden="true" />}
              eyebrow="Written deliverable"
              title="6–8 page assessment."
              body="Not a transcript. Not slides. A document you can show to your counsel, your co-owners, or your investor relations contact."
            />
            <Tile
              icon={<Clock className="h-5 w-5" aria-hidden="true" />}
              eyebrow="Timeline"
              title="Report inside one week."
              body="Call within 7–10 days of payment, written assessment within 5 business days of the call."
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container max-w-5xl py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                What you get
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Inside the written diagnostic
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Eight sections. Same structure for every asset, so you can
                compare a Spanish villa report to a Bangkok office report
                section-by-section.
              </p>
            </div>
            <ul className="space-y-3">
              {REPORT_SECTIONS.map((section, i) => (
                <li
                  key={section}
                  className="flex items-start gap-4 rounded-lg border border-border bg-elevated p-4"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-md bg-muted font-mono text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm">{section}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-5xl py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Before the call
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Pre-call checklist
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Bring what you have. Missing pieces don&apos;t cancel the
                call — they shape what we can verify and how confident the
                verdict is.
              </p>
            </div>
            <ul className="space-y-3">
              {PRECALL_CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container max-w-3xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Frequently asked
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Honest answers
          </h2>
          <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-elevated">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 text-sm font-medium">
                  <span>{faq.q}</span>
                  <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container max-w-3xl py-20 md:py-24">
          <div className="rounded-xl border border-border bg-elevated p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Ready
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Pay, book, get a written go / no-go.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Checkout takes one minute. After payment you&apos;ll be sent
              straight to the booking link to choose a slot in the next 7–10
              days. Money-back guarantee is unconditional in the first
              fifteen minutes of the call.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
              <PayButton stripeConfigured={stripeConfigured} variant="primary" />
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-primary/40"
              >
                Compare all five tiers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Tile({
  icon,
  eyebrow,
  title,
  body,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <div className="flex items-center gap-3 text-primary">
        {icon}
        <span className="font-mono text-xs uppercase tracking-[0.18em]">
          {eyebrow}
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
