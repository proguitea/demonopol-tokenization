import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Terms of Service, Privacy Policy, and Risk Disclosure for Demonopol LLC. Plain-English placeholders today, counsel-reviewed binding text before the first paid Diagnostic.",
  openGraph: {
    title: "Legal — Demonopol",
    description:
      "Three documents, one page: Terms of Service, Privacy Policy, Risk Disclosure. Honest about what's still pending counsel review.",
  },
};

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container max-w-3xl py-20 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Legal
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Terms, privacy, and risk disclosure.
          </h1>
          <p className="mt-6 text-pretty text-base text-muted-foreground md:text-lg">
            Three documents. We publish them on the same page so you can read
            them together. Each section below is a placeholder while counsel
            finalises the binding text — the live versions land before the
            first paid Diagnostic.
          </p>

          <nav
            aria-label="On this page"
            className="mt-8 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wide"
          >
            <a
              href="#terms"
              className="rounded-md border border-border bg-background px-3 py-1.5 hover:border-primary/40"
            >
              Terms of Service
            </a>
            <a
              href="#privacy"
              className="rounded-md border border-border bg-background px-3 py-1.5 hover:border-primary/40"
            >
              Privacy
            </a>
            <a
              href="#risk"
              className="rounded-md border border-border bg-background px-3 py-1.5 hover:border-primary/40"
            >
              Risk Disclosure
            </a>
          </nav>
        </div>
      </section>

      <section id="terms" className="border-b border-border/60 scroll-mt-28">
        <div className="container max-w-3xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Section 1
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Terms of Service
          </h2>
          <PlaceholderBox
            note="Counsel-reviewed text pending. The points below summarise our intent
            so you know what to expect when the binding version publishes."
            bullets={[
              "Operating entity is Demonopol LLC, registered in St. Vincent and the Grenadines (Co. No. 4008 LLC).",
              "Self-Check is provided free of charge with no obligation on either side.",
              "The Diagnostic is a fixed-fee one-time service ($400 USD) covered by a 15-minute money-back guarantee.",
              "Mandate and Express engagements are scoped per asset under a separate written agreement.",
              "We are not a law firm, broker-dealer, or registered investment advisor in any jurisdiction.",
              "Tokenization, where pursued, is executed through arms-length partners and remains subject to the laws of the relevant jurisdiction.",
            ]}
          />
        </div>
      </section>

      <section id="privacy" className="border-b border-border/60 scroll-mt-28 bg-muted/40">
        <div className="container max-w-3xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Section 2
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Privacy Policy
          </h2>
          <PlaceholderBox
            note="Counsel-reviewed text pending. The points below summarise our
            intended handling of personal data."
            bullets={[
              "We collect only the information you provide through the Self-Check, the Diagnostic intake, and direct correspondence.",
              "Submission metadata: timestamp, hashed IP (one-way, with a salt — we cannot reverse it to your IP), user-agent string, and referring URL.",
              "We do not sell data. We do not share data with third parties except the operational tools needed to run the service (email, payments, scheduling).",
              "We do not run cookie-based tracking or third-party advertising scripts.",
              "You can ask us to delete your record at any time by emailing legal@demonopol.com — we comply within ten business days.",
              "Data is processed in the European Union (Vercel, our email provider). Cross-border transfers occur only as required to run the service.",
            ]}
          />
        </div>
      </section>

      <section id="risk" className="scroll-mt-28">
        <div className="container max-w-3xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Section 3
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Risk Disclosure
          </h2>
          <PlaceholderBox
            note="Tokenizing private real estate is a newer mechanism. We say
            so out loud. The points below are the risks we surface in every
            Diagnostic — the binding text below will be at least this honest."
            bullets={[
              "Regulatory risk — the legal treatment of tokenized real estate is evolving across jurisdictions. What's permitted today may not be tomorrow, and vice versa.",
              "Liquidity risk — secondary markets for fractional real-estate interests are thin and often venue-specific. Liquidity is improved versus a sole-owner sale, not guaranteed.",
              "Operational risk — execution depends on third-party legal, custody, and distribution providers. We name them in your Diagnostic so you can do your own diligence.",
              "Valuation risk — pricing private real estate is judgmental. Tokenization does not produce a continuous market price the way listed equities do.",
              "Tax risk — treatment differs by jurisdiction, asset class, and investor type. We route to a tax partner — we do not provide tax opinions ourselves.",
              "Concentration risk — fractionalization spreads ownership but does not diversify the underlying asset. The asset's risks remain the asset's risks.",
              "We do not promise outcomes. We promise process, written deliverables, and an honest read of feasibility.",
            ]}
          />

          <p className="mt-12 text-sm text-muted-foreground">
            Questions on any of the three documents:{" "}
            <a
              href="mailto:legal@demonopol.com"
              className="font-medium text-primary hover:underline"
            >
              legal@demonopol.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

function PlaceholderBox({
  note,
  bullets,
}: {
  note: string;
  bullets: string[];
}) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-elevated p-6 md:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
        Pre-launch placeholder
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{note}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 border-l-2 border-border pl-4"
          >
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
