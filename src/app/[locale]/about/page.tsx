import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { BreadcrumbsSchema } from "@/components/seo/StructuredData";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/lib/seo/alternates";

export const metadata: Metadata = {
  title: "About",
  description:
    "An advisory team drawn from international real-estate practice, named on the page. Operating from Demonopol LLC. Serving private real-estate owners worldwide.",
  alternates: localeAlternates("/about"),
  openGraph: {
    title: "About — Demonopol",
    description:
      "Operating side stays corporate; advisors are named with their prior firms. International real-estate practice applied to a newer liquidity rail.",
  },
};

type Advisor = {
  name: string;
  priorFirm: string;
  region: string;
  linkedin?: string;
};

// Q-011 / Q-018: name + prior firm + region + LinkedIn only. No years,
// no transaction figures, no aggregate metrics. Trust by craft.
const ADVISORS: Advisor[] = [
  {
    name: "Luc Villeneuve",
    priorFirm: "Century 21",
    region: "International real estate brokering",
    linkedin: "{{TBD: Luc Villeneuve LinkedIn URL}}",
  },
  {
    name: "Costa",
    priorFirm: "Group1Vest",
    region: "International real estate brokering",
    linkedin: "{{TBD: Costa LinkedIn URL}}",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbsSchema
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <section className="border-b border-border/60">
        <div className="container max-w-3xl py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            About
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            International real-estate practice, applied to a newer rail.
          </h1>
          <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
            Demonopol is operated by an advisory team drawn from international
            real-estate brokering. Tokenization is a newer mechanism — we treat
            it with the same discipline we apply to private real-estate
            transactions: documented, jurisdictionally aware, honest about what
            it is and what it isn&apos;t.
          </p>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-5xl py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                How we&apos;re built
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Operating side. Advisory side.
              </h2>
            </div>
            <div className="space-y-6 text-base text-muted-foreground">
              <p>
                The operating team — the people who answer your email, run your
                Diagnostic call, and structure your transaction — speaks in a
                single corporate voice. We don&apos;t put individual operator
                names on the front page because the work is collective and the
                relationship is with the firm.
              </p>
              <p>
                The advisory side is named. The advisors below lend their
                credentials and judgment, and you can verify their track
                records on LinkedIn. They&apos;re consulted on structure,
                jurisdiction, and the kinds of decisions where international
                real-estate experience is the difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container max-w-5xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Advisors
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Drawn from international real-estate practice.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Verifiable on LinkedIn. No aggregate metrics, no transaction
            volume. The credibility is in the names and the firms.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {ADVISORS.map((advisor) => (
              <AdvisorCard key={advisor.name} advisor={advisor} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-5xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Reach
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Worldwide, with depth in seven markets.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We accept assets worldwide. Where we have local legal-partner
            relationships, we route faster.
          </p>
          <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2 md:grid-cols-4">
            {[
              "Spain (luxury)",
              "Morocco",
              "Thailand",
              "Hong Kong",
              "Switzerland",
              "Vietnam",
              "United States",
              "Other — by jurisdiction",
            ].map((label) => (
              <li
                key={label}
                className="rounded-md border border-border bg-background px-4 py-3 font-mono text-xs uppercase tracking-wide"
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="container max-w-5xl py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-elevated p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Ecosystem
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                Sister site
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Demonopol&apos;s broader work runs at demonopol.com. This site
                is the Tokenization-as-a-Service entry point for issuers and
                owners.
              </p>
              <a
                href="https://demonopol.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Visit demonopol.com
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <div className="rounded-xl border border-border bg-elevated p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Contact
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                How to reach us
              </h3>
              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">General &amp; intake</dt>
                  <dd>
                    <a
                      href="mailto:tokenize@demonopol.com"
                      className="font-medium hover:underline"
                    >
                      tokenize@demonopol.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Legal &amp; payments</dt>
                  <dd>
                    <a
                      href="mailto:legal@demonopol.com"
                      className="font-medium hover:underline"
                    >
                      legal@demonopol.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Operating entity</dt>
                  <dd className="font-mono text-xs">
                    Demonopol LLC · Co. No. 4008 LLC · P.O. Box 2897, Kingstown,
                    St. Vincent &amp; the Grenadines
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-border bg-elevated p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              First step
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              The Self-Check is free, structured, and fast.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Five minutes. No credit card. We come back with a written
              assessment and the recommended next step.
            </p>
            <div className="mt-6">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start the Self-Check
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AdvisorCard({ advisor }: { advisor: Advisor }) {
  const linkedinHref = advisor.linkedin?.startsWith("{{TBD")
    ? undefined
    : advisor.linkedin;

  return (
    <article className="rounded-xl border border-border bg-background p-6">
      <h3 className="font-display text-xl font-semibold tracking-tight">
        {advisor.name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{advisor.region}</p>
      <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">
        Prior firm
      </p>
      <p className="text-sm font-medium">{advisor.priorFirm}</p>
      <div className="mt-5">
        {linkedinHref ? (
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : (
          <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            {advisor.linkedin}
          </span>
        )}
      </div>
    </article>
  );
}
