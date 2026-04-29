import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

import { localeAlternates } from "@/lib/seo/alternates";

export const metadata: Metadata = {
  alternates: localeAlternates("/"),
};
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
      <ServiceLadder t={t} />
      <HowItWorks t={t} />
      <TrustStrip t={t} />
      <InsightsTeaser t={t} />
      <FinalCta t={t} />
    </>
  );
}

type HomeT = ReturnType<typeof useTranslations<"home">>;

function Hero({ t }: { t: HomeT }) {
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
            {t("statusBar")}
          </p>
        </div>
      </div>
    </section>
  );
}

function ServiceLadder({ t }: { t: HomeT }) {
  const cards = [
    {
      key: "selfCheck" as const,
      href: "/start" as const,
      emphasis: false,
    },
    {
      key: "diagnostic" as const,
      href: "/diagnostic" as const,
      emphasis: true,
    },
    {
      key: "mandate" as const,
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
              {t("services.eyebrow")}
            </p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {t("services.headline")}
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex"
          >
            {t("services.seeAll")}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.key}
              className={`flex h-full flex-col rounded-xl border bg-elevated p-6 transition-colors ${
                card.emphasis ? "border-primary/40 shadow-sm" : "border-border"
              }`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t(`services.cards.${card.key}.eyebrow`)}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                {t(`services.cards.${card.key}.title`)}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {t(`services.cards.${card.key}.body`)}
              </p>
              <div className="mt-auto pt-6">
                <Link
                  href={card.href}
                  className={`inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-opacity ${
                    card.emphasis
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border bg-background hover:border-primary/40"
                  }`}
                >
                  {t(`services.cards.${card.key}.cta`)}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ t }: { t: HomeT }) {
  const steps = [
    { key: "selfCheck" as const, icon: ClipboardCheck },
    { key: "diagnostic" as const, icon: FileText },
    { key: "structuring" as const, icon: ShieldCheck },
    { key: "distribution" as const, icon: Globe2 },
  ];

  return (
    <section className="border-b border-border/60">
      <div className="container max-w-6xl py-20 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t("howItWorks.eyebrow")}
        </p>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {t("howItWorks.headline")}
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {t("howItWorks.subhead")}
        </p>

        <ol className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.key}
              className="rounded-xl border border-border bg-elevated p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {t(`howItWorks.steps.${step.key}.label`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`howItWorks.steps.${step.key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TrustStrip({ t }: { t: HomeT }) {
  const markets = [
    "Spain", "Morocco", "Thailand", "Hong Kong",
    "Switzerland", "Vietnam", "United States", "Worldwide",
  ];

  return (
    <section className="border-b border-border/60 bg-muted/40">
      <div className="container max-w-6xl py-20 md:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-background p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {t("trust.moneyBack.eyebrow")}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              {t("trust.moneyBack.title")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("trust.moneyBack.body")}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {t("trust.written.eyebrow")}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              {t("trust.written.title")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("trust.written.body")}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {t("trust.advisory.eyebrow")}
            </p>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              {t("trust.advisory.title")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("trust.advisory.body")}
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              {t("trust.advisory.cta")}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {markets.map((label) => (
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

function InsightsTeaser({ t }: { t: HomeT }) {
  const previews = ["first", "second"] as const;

  return (
    <section className="border-b border-border/60">
      <div className="container max-w-6xl py-20 md:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("insights.eyebrow")}
            </p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {t("insights.headline")}
            </h2>
          </div>
          <Link
            href="/insights"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex"
          >
            {t("insights.seeAll")}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {previews.map((key) => (
            <article
              key={key}
              className="rounded-xl border border-border bg-elevated p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t(`insights.previews.${key}.tag`)}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
                {t(`insights.previews.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`insights.previews.${key}.one`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ t }: { t: HomeT }) {
  const features = ["intake", "outcome", "next"] as const;

  return (
    <section>
      <div className="container max-w-4xl py-20 md:py-28">
        <div className="rounded-2xl border border-border bg-elevated p-8 md:p-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("cta.eyebrow")}
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {t("cta.headline")}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {t("cta.body")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("cta.start")}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 font-medium transition-colors hover:border-primary/40"
            >
              {t("cta.compare")}
            </Link>
          </div>
          <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-3">
            {features.map((key) => (
              <li key={key} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{t(`cta.features.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
