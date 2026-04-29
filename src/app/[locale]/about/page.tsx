import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const t = await getTranslations("about");

  const markets = t.raw("reach.markets") as string[];

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
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {t("headline")}
          </h1>
          <p className="mt-6 text-pretty text-lg text-muted-foreground md:text-xl">
            {t("subhead")}
          </p>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-3xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("origin.eyebrow")}
          </p>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("origin.headline")}
          </h2>
          <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
            {t("origin.body")}
          </p>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container max-w-5xl py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t("howBuilt.eyebrow")}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {t("howBuilt.headline")}
              </h2>
            </div>
            <div className="space-y-6 text-base text-muted-foreground">
              <p>{t("howBuilt.operating")}</p>
              <p>{t("howBuilt.advisory")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container max-w-5xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("advisors.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("advisors.headline")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t("advisors.subhead")}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {ADVISORS.map((advisor) => (
              <AdvisorCard
                key={advisor.name}
                advisor={advisor}
                priorFirmLabel={t("advisors.priorFirm")}
                linkedinLabel={t("advisors.linkedin")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-5xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("reach.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("reach.headline")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t("reach.subhead")}
          </p>
          <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2 md:grid-cols-4">
            {markets.map((label) => (
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
                {t("ecosystem.eyebrow")}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                {t("ecosystem.headline")}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("ecosystem.body")}
              </p>
              <a
                href="https://demonopol.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t("ecosystem.cta")}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
            <div className="rounded-xl border border-border bg-elevated p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t("contact.eyebrow")}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                {t("contact.headline")}
              </h3>
              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">{t("contact.general")}</dt>
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
                  <dt className="text-muted-foreground">{t("contact.legalPayments")}</dt>
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
                  <dt className="text-muted-foreground">{t("contact.entity")}</dt>
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
              {t("cta.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {t("cta.headline")}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {t("cta.body")}
            </p>
            <div className="mt-6">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("cta.start")}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AdvisorCard({
  advisor,
  priorFirmLabel,
  linkedinLabel,
}: {
  advisor: Advisor;
  priorFirmLabel: string;
  linkedinLabel: string;
}) {
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
        {priorFirmLabel}
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
            {linkedinLabel}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only"> (opens in new tab)</span>
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
