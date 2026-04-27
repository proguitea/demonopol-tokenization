import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Calendar, Check, Mail } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { stripe } from "@/lib/stripe/server";

export const metadata: Metadata = {
  title: "Payment received",
  // The success page is reached via Stripe redirect with a session_id —
  // no value indexing it, and we don't want it leaking into search
  // results.
  robots: { index: false, follow: false },
};

const PRECALL_CHECKLIST = [
  "Asset deck or summary (any format)",
  "Title deed or equivalent ownership document",
  "Most recent financials or rent-roll, if income-producing",
  "Prior valuation or recent broker opinion of value, if you have one",
];

export default async function DiagnosticSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { session_id } = await searchParams;

  let verified = false;
  let customerEmail: string | undefined;
  let amountFormatted: string | undefined;

  if (session_id && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.status === "complete" && session.payment_status === "paid") {
        verified = true;
        customerEmail = session.customer_details?.email ?? undefined;
        if (session.amount_total != null) {
          amountFormatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: (session.currency ?? "usd").toUpperCase(),
          }).format(session.amount_total / 100);
        }
      }
    } catch (e) {
      console.error("[stripe] success-page session retrieval failed:", e);
    }
  }

  const calLink =
    process.env.NEXT_PUBLIC_CAL_LINK?.trim() || "demonopol/diagnostic";
  const calUrl = calLink.startsWith("http")
    ? calLink
    : `https://cal.com/${calLink}`;

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container max-w-3xl py-20 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {verified ? "Payment received" : "Payment status pending"}
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {verified
              ? "Thank you. Now book the call."
              : "We're confirming your payment."}
          </h1>
          <p className="mt-6 text-pretty text-base text-muted-foreground md:text-lg">
            {verified ? (
              <>
                {customerEmail ? (
                  <>
                    Stripe receipt is on its way to{" "}
                    <span className="font-medium text-foreground">
                      {customerEmail}
                    </span>
                    .{" "}
                  </>
                ) : (
                  <>Your Stripe receipt is on its way. </>
                )}
                {amountFormatted ? (
                  <>
                    Payment of{" "}
                    <span className="font-medium text-foreground">
                      {amountFormatted}
                    </span>{" "}
                    confirmed by Demonopol LLC.{" "}
                  </>
                ) : null}
                The next step is choosing a slot.
              </>
            ) : (
              <>
                If you just paid, this page will reflect it within a few
                seconds — refresh once. If something looks off, email{" "}
                <a
                  href="mailto:legal@demonopol.com"
                  className="font-medium text-primary hover:underline"
                >
                  legal@demonopol.com
                </a>{" "}
                with your Stripe receipt and we&apos;ll sort it.
              </>
            )}
          </p>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-3xl py-16 md:py-20">
          <div className="rounded-xl border border-border bg-elevated p-8 md:p-12">
            <div className="flex items-center gap-2 text-primary">
              <Calendar className="h-5 w-5" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em]">
                Step 1 — Book the call
              </span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Pick a 60–90 minute slot in the next 7–10 days.
            </h2>
            <p className="mt-3 text-muted-foreground">
              We&apos;ll send a calendar invite as soon as you confirm. If your
              preferred slot isn&apos;t open, email us and we&apos;ll add one
              that fits.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Open the booking page
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:tokenize@demonopol.com?subject=Diagnostic%20scheduling"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-primary/40"
              >
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Email us instead
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container max-w-3xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Step 2 — Before the call
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Pre-call checklist
          </h2>
          <p className="mt-3 text-muted-foreground">
            Bring what you have. Missing pieces don&apos;t cancel the call —
            they shape what we can verify and how confident the verdict is.
          </p>
          <ul className="mt-8 space-y-3">
            {PRECALL_CHECKLIST.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-border bg-elevated p-4"
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
      </section>

      <section>
        <div className="container max-w-3xl py-16 md:py-20">
          <div className="rounded-xl border border-border bg-elevated p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Money-back guarantee
            </p>
            <h2 className="mt-3 font-display text-xl font-semibold tracking-tight">
              15 minutes in. No questions asked.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              If, fifteen minutes into the call, you don&apos;t believe the
              session will deliver useful clarity, we end it and refund the
              full $400. No paperwork, no friction. Email{" "}
              <a
                href="mailto:legal@demonopol.com"
                className="font-medium text-primary hover:underline"
              >
                legal@demonopol.com
              </a>{" "}
              if you ever need to invoke it.
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              Questions before the call?{" "}
              <Link
                href="/diagnostic"
                className="font-medium text-primary hover:underline"
              >
                Re-read what&apos;s inside
              </Link>{" "}
              or email{" "}
              <a
                href="mailto:tokenize@demonopol.com"
                className="font-medium text-primary hover:underline"
              >
                tokenize@demonopol.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
