import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Mail } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/lib/seo/alternates";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Working notes on global liquidity for private real estate — by asset class, by jurisdiction, and on the structuring decisions that quietly decide whether a deal closes.",
  alternates: localeAlternates("/insights"),
  openGraph: {
    title: "Insights — Demonopol",
    description:
      "What we've learned doing the work. No roundups, no hot takes. By asset class, jurisdiction, and structuring decision.",
  },
};

type ArticleKey =
  | "liquidityWithoutSelling"
  | "whatStructuringCosts"
  | "spainLuxuryFractional"
  | "realBenefitsRealRisks";

type ArticleMeta = {
  key: ArticleKey;
  slug: string;
  category: "Primer" | "Jurisdiction" | "Asset class" | "Risk";
  jurisdiction?: string;
  status: "drafting" | "scheduled" | "published";
  scheduledFor?: string;
};

// Non-translatable article metadata; display strings come from translations
const ARTICLE_META: ArticleMeta[] = [
  {
    key: "liquidityWithoutSelling",
    slug: "liquidity-without-selling",
    category: "Primer",
    status: "drafting",
    scheduledFor: "May 2026",
  },
  {
    key: "whatStructuringCosts",
    slug: "what-structuring-actually-costs",
    category: "Primer",
    status: "drafting",
    scheduledFor: "May 2026",
  },
  {
    key: "spainLuxuryFractional",
    slug: "spain-luxury-fractional-pathways",
    category: "Jurisdiction",
    jurisdiction: "Spain",
    status: "drafting",
    scheduledFor: "June 2026",
  },
  {
    key: "realBenefitsRealRisks",
    slug: "real-benefits-real-risks",
    category: "Risk",
    status: "drafting",
    scheduledFor: "June 2026",
  },
];

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("insights");

  return (
    <>
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
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-5xl py-16 md:py-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              {t("queue.headline")}
            </h2>
            <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {t("queue.timing")}
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {ARTICLE_META.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                title={t(`articles.${article.key}.title`)}
                oneLine={t(`articles.${article.key}.oneLine`)}
                draftingLabel={t("articleStatus.drafting")}
                scheduledLabel={t("articleStatus.scheduled")}
                publishedLabel={t("articleStatus.published")}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container max-w-3xl py-20 md:py-24">
          <div className="rounded-xl border border-border bg-elevated p-8 md:p-12">
            <div className="flex items-center gap-2 text-primary">
              <Mail className="h-5 w-5" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em]">
                {t("newsletter.eyebrow")}
              </span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {t("newsletter.headline")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("newsletter.body")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("newsletter.cta")}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ArticleCard({
  article,
  title,
  oneLine,
  draftingLabel,
  scheduledLabel,
  publishedLabel,
}: {
  article: ArticleMeta;
  title: string;
  oneLine: string;
  draftingLabel: string;
  scheduledLabel: string;
  publishedLabel: string;
}) {
  const statusText =
    article.status === "drafting" && article.scheduledFor
      ? `${draftingLabel} · ${article.scheduledFor}`
      : article.status === "scheduled" && article.scheduledFor
        ? `${scheduledLabel} · ${article.scheduledFor}`
        : publishedLabel;

  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-background p-6">
      <div className="flex items-center gap-3">
        <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          {article.category}
        </span>
        {article.jurisdiction ? (
          <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            · {article.jurisdiction}
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">{oneLine}</p>
      <div className="mt-auto pt-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {statusText}
        </p>
      </div>
    </article>
  );
}
