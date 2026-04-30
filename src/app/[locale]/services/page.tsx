import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, Minus } from "lucide-react";

import {
  BreadcrumbsSchema,
  ServiceListSchema,
} from "@/components/seo/StructuredData";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/lib/seo/alternates";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five tiers, from a free Self-Check to a fully-mandated transaction. Pricing published. Scope published. Most owners stop after the $400 Diagnostic.",
  alternates: localeAlternates("/services"),
  openGraph: {
    title: "Services — Demonopol",
    description:
      "Five priced tiers for tokenizing private real estate. Free Self-Check, $400 Diagnostic, scoped Mandate and Express engagements.",
  },
};

// Non-string tier metadata — display strings come from translations
type TierMeta = {
  key: "selfCheck" | "diagnostic" | "promotion" | "mandate" | "express";
  ctaHref: "/start" | "/diagnostic" | "/about";
  ctaDisabled?: boolean;
  emphasis?: boolean;
  /** Price shown as TBD placeholder (express only) */
  tbd?: string;
};

const TIER_META: TierMeta[] = [
  { key: "selfCheck", ctaHref: "/start" },
  { key: "diagnostic", ctaHref: "/diagnostic", ctaDisabled: true, emphasis: true },
  { key: "promotion", ctaHref: "/start", ctaDisabled: true },
  { key: "mandate", ctaHref: "/diagnostic", ctaDisabled: true },
  { key: "express", ctaHref: "/diagnostic", ctaDisabled: true, tbd: "{{TBD: Express price}}" },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  // Build tier data from translations for JSON-LD schema
  const schemaItems = TIER_META.map((meta) => ({
    name: t(`tiers.${meta.key}.name`),
    description: t(`tiers.${meta.key}.oneLine`),
    price: meta.tbd ?? t(`tiers.${meta.key}.price`),
  }));

  const comparisonRows = [
    { key: "written", values: [true, true, false, true, true] },
    { key: "live",    values: [false, true, false, true, true] },
    { key: "pricing", values: [true, true, false, true, true] },
    { key: "marketing", values: [false, false, true, true, true] },
    { key: "legal",   values: [false, false, false, true, true] },
    { key: "distribution", values: [false, false, false, true, true] },
    { key: "moneyBack", values: [false, true, false, false, false] },
  ] as const;

  return (
    <>
      <ServiceListSchema items={schemaItems} />
      <BreadcrumbsSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
      <section className="border-b border-border/60">
        <div className="container max-w-4xl py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            {t("headline")}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            {t("subhead")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-6xl py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TIER_META.map((meta) => {
              const includes = t.raw(`tiers.${meta.key}.includes`) as string[];
              const excludes = t.raw(`tiers.${meta.key}.excludes`) as string[];
              return (
                <TierCard
                  key={meta.key}
                  name={t(`tiers.${meta.key}.name`)}
                  price={meta.tbd ?? t(`tiers.${meta.key}.price`)}
                  priceCadence={
                    meta.key !== "selfCheck"
                      ? t(`tiers.${meta.key}.priceCadence`)
                      : undefined
                  }
                  oneLine={t(`tiers.${meta.key}.oneLine`)}
                  forWhom={t(`tiers.${meta.key}.forWhom`)}
                  forLabel={t("tierCard.for")}
                  recommendedLabel={meta.emphasis ? t("tierCard.recommended") : undefined}
                  includes={includes}
                  excludes={excludes}
                  ctaLabel={t(`tiers.${meta.key}.ctaLabel`)}
                  ctaHref={meta.ctaHref}
                  ctaDisabled={meta.ctaDisabled}
                  emphasis={meta.emphasis}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container max-w-5xl py-16 md:py-20">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("comparison.headline")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t("comparison.subhead")}
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    {t("comparison.header")}
                  </th>
                  {TIER_META.map((meta) => (
                    <th key={meta.key} className="px-4 py-3 text-left font-medium">
                      {t(`tiers.${meta.key}.name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <ComparisonRow
                    key={row.key}
                    label={t(`comparison.rows.${row.key}`)}
                    values={[...row.values]}
                  />
                ))}
                <tr className="border-b border-border/50">
                  <th scope="row" className="px-4 py-3 text-left font-medium">{t("comparison.rows.price")}</th>
                  {TIER_META.map((meta) => (
                    <td key={meta.key} className="px-4 py-3 font-mono text-xs">
                      {meta.tbd ?? t(`tiers.${meta.key}.price`)}
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
              {t("honestPath.eyebrow")}
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {t("honestPath.headline")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("honestPath.body")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("honestPath.start")}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-primary/40"
              >
                {t("honestPath.whoWeAre")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TierCard({
  name,
  price,
  priceCadence,
  oneLine,
  forWhom,
  forLabel,
  recommendedLabel,
  includes,
  excludes,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  emphasis,
}: {
  name: string;
  price: string;
  priceCadence?: string;
  oneLine: string;
  forWhom: string;
  forLabel: string;
  recommendedLabel?: string;
  includes: string[];
  excludes: string[];
  ctaLabel: string;
  ctaHref: "/start" | "/diagnostic" | "/about";
  ctaDisabled?: boolean;
  emphasis?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border bg-elevated p-6 transition-colors",
        emphasis ? "border-primary/40 shadow-sm" : "border-border",
      )}
    >
      <header className="space-y-3">
        {recommendedLabel ? (
          <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-primary">
            {recommendedLabel}
          </div>
        ) : null}
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-semibold tracking-tight">
            {price}
          </span>
          {priceCadence ? (
            <span className="text-xs text-muted-foreground">{priceCadence}</span>
          ) : null}
        </div>
        <p className="text-sm text-foreground/90">{oneLine}</p>
      </header>

      <p className="mt-6 text-xs uppercase tracking-wide text-muted-foreground">
        {forLabel}
      </p>
      <p className="mt-1 text-sm">{forWhom}</p>

      <ul className="mt-6 space-y-2 text-sm">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 flex-none text-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {excludes.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Minus className="mt-0.5 h-4 w-4 flex-none text-muted-foreground/60" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        {ctaDisabled ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex w-full items-center justify-center rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium opacity-60"
          >
            {ctaLabel}
          </button>
        ) : (
          <Link
            href={ctaHref}
            className={cn(
              "inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-opacity",
              emphasis
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "border border-border bg-background hover:border-primary/40",
            )}
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </article>
  );
}

function ComparisonRow({ label, values }: { label: string; values: boolean[] }) {
  return (
    <tr className="border-b border-border/50">
      <th scope="row" className="px-4 py-3 text-left font-medium">{label}</th>
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
