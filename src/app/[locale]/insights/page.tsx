import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Mail } from "lucide-react";

import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Working notes on global liquidity for private real estate. Asset classes, jurisdictions, and the structuring decisions behind real transactions.",
};

type ArticlePreview = {
  slug: string;
  title: string;
  category: "Primer" | "Jurisdiction" | "Asset class" | "Risk";
  jurisdiction?: string;
  oneLine: string;
  status: "drafting" | "scheduled" | "published";
  scheduledFor?: string;
};

const ARTICLES: ArticlePreview[] = [
  {
    slug: "liquidity-without-selling",
    title: "Liquidity for private real estate without selling: a 2026 primer",
    category: "Primer",
    oneLine:
      "What owners actually mean when they ask about tokenization, and the three things that change once you stop framing it as a sale.",
    status: "drafting",
    scheduledFor: "May 2026",
  },
  {
    slug: "what-structuring-actually-costs",
    title: "What structuring private real estate for global investors actually costs",
    category: "Primer",
    oneLine:
      "Plain numbers. Where the $5K–$50K legal-fee figure comes from, and what you can do for less than that with a Diagnostic in hand.",
    status: "drafting",
    scheduledFor: "May 2026",
  },
  {
    slug: "spain-luxury-fractional-pathways",
    title: "Spain's luxury real-estate landscape: legal pathways for fractional foreign ownership",
    category: "Jurisdiction",
    jurisdiction: "Spain",
    oneLine:
      "What's actually permitted, what's only theoretically permitted, and the structures we see surviving the bar in Madrid.",
    status: "drafting",
    scheduledFor: "June 2026",
  },
  {
    slug: "real-benefits-real-risks",
    title: "Real-estate fractionalization: real benefits, real risks",
    category: "Risk",
    oneLine:
      "The list nobody publishes. What actually goes wrong, what's overstated, and how to read the boilerplate.",
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

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container max-w-4xl py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Insights
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Working notes on global liquidity for private real estate.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            We publish what we&apos;ve learned doing the work — by asset class,
            by jurisdiction, and on the structuring decisions that quietly
            decide whether a deal closes. No hot takes, no roundups.
          </p>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-5xl py-16 md:py-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
              In the queue
            </h2>
            <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              First wave drops in May–June
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.slug} article={article} />
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
                Newsletter
              </span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Get each Insights piece in your inbox.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Two emails a month at most. No promotion, no recycled summaries —
              the same writing that ships here. Email{" "}
              <a
                href="mailto:tokenize@demonopol.com?subject=Newsletter%20signup"
                className="font-medium text-primary hover:underline"
              >
                tokenize@demonopol.com
              </a>{" "}
              with the subject line &ldquo;Newsletter signup&rdquo; and we&apos;ll
              add you to the list. (A proper signup form lands once the
              first article publishes.)
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/start"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Or start the Self-Check
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ArticleCard({ article }: { article: ArticlePreview }) {
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
        {article.title}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">{article.oneLine}</p>
      <div className="mt-auto pt-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {article.status === "drafting" && article.scheduledFor
            ? `Drafting · ${article.scheduledFor}`
            : article.status === "scheduled" && article.scheduledFor
              ? `Scheduled · ${article.scheduledFor}`
              : "Published"}
        </p>
      </div>
    </article>
  );
}
