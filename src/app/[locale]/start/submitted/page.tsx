import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Self-Check submitted",
  robots: { index: false, follow: false },
};

const COPY: Record<
  string,
  { eyebrow: string; headline: string; body: string; primaryCta: string; primaryHref: string }
> = {
  priority: {
    eyebrow: "Priority match",
    headline: "Your asset profile looks like a strong fit.",
    body: "We've flagged your submission for a priority response. Expect a written assessment within one business day, and an invitation to book the full Diagnostic at a fast-track slot.",
    primaryCta: "Pre-book a Diagnostic",
    primaryHref: "/diagnostic",
  },
  qualified: {
    eyebrow: "Qualified",
    headline: "We can work with this.",
    body: "Expect a written assessment within two business days, with an indicative price band and the recommended next step. If you'd like to move faster, you can book the Diagnostic now.",
    primaryCta: "Book a Diagnostic",
    primaryHref: "/diagnostic",
  },
  low_fit: {
    eyebrow: "Received",
    headline: "Thanks — we have what we need.",
    body: "Based on what you've shared, the fit is not obvious. We'll come back with a written explanation and, if useful, suggested resources or alternative structures. No paid step is recommended right now.",
    primaryCta: "Read the Insights",
    primaryHref: "/insights",
  },
  rejected: {
    eyebrow: "Not a fit right now",
    headline: "Honest answer: this isn't ready yet.",
    body: "We auto-reject submissions when the asset value, the documentation, or the reasoning isn't yet at a stage where the Diagnostic would pay for itself. That's deliberate — paying $400 for a 'no' isn't useful to anyone. You're welcome to come back when the situation changes.",
    primaryCta: "Read the Insights",
    primaryHref: "/insights",
  },
};

const REJECTION_DETAIL: Record<string, string> = {
  asset_value_below_minimum:
    "Asset value under $50,000 — below the minimum for a viable structuring effort.",
  reasoning_too_short:
    "The reasoning text was too short to assess fit. Try again with more detail when you have time.",
  missing_docs_and_jurisdiction:
    "We need either supporting documents or a jurisdiction to work from — both were missing.",
  disposable_email:
    "The email address is from a disposable domain. Use a real address you can receive replies at.",
  rate_limited:
    "Too many submissions from this network in a short window. Try again later.",
  honeypot: "The submission tripped a spam check.",
};

export default async function SubmittedPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ outcome?: string; reason?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { outcome = "qualified", reason } = await searchParams;

  const copy = COPY[outcome] ?? COPY.qualified;

  return (
    <section className="container max-w-2xl py-20 md:py-28">
      <div className="space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {copy.eyebrow}
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {copy.headline}
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">{copy.body}</p>
        {outcome === "rejected" && reason && REJECTION_DETAIL[reason] ? (
          <p className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
            <span className="font-medium">Why:</span> {REJECTION_DETAIL[reason]}
          </p>
        ) : null}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <Link
            href={copy.primaryHref as "/diagnostic" | "/insights"}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {copy.primaryCta}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-elevated px-6 py-3 text-sm font-medium transition-colors hover:border-primary/40"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
