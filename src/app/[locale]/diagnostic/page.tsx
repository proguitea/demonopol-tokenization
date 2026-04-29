import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, ShieldCheck, FileText, Clock } from "lucide-react";

import { PayButton } from "@/components/diagnostic/PayButton";
import {
  BreadcrumbsSchema,
  DiagnosticFaqSchema,
  DiagnosticServiceSchema,
} from "@/components/seo/StructuredData";
import { Link } from "@/i18n/navigation";
import { localeAlternates } from "@/lib/seo/alternates";
import { isStripeConfigured } from "@/lib/stripe/server";

export const metadata: Metadata = {
  title: "Diagnostic",
  description:
    "$400 for a written go / no-go on tokenizing your real-estate asset. 60–90 min working session, 6–8 page report, 15-minute money-back guarantee.",
  alternates: localeAlternates("/diagnostic"),
  openGraph: {
    title: "Diagnostic — Demonopol",
    description:
      "Pay $400. Book a 60–90 min call. Get a 6–8 page written go / no-go on whether your asset can be tokenized — and how.",
  },
};

export default async function DiagnosticPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("diagnostic");
  const stripeConfigured = isStripeConfigured();

  const reportSections = t.raw("report.sections") as string[];
  const checklistItems = t.raw("checklist.items") as string[];
  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;

  return (
    <>
      <DiagnosticServiceSchema />
      <DiagnosticFaqSchema faqs={faqItems} />
      <BreadcrumbsSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Diagnostic", href: "/diagnostic" },
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start">
            <PayButton stripeConfigured={stripeConfigured} variant="primary" />
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-primary/40"
            >
              {t("selfCheckFirst")}
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-xs text-muted-foreground">
            {t("stripeNote")}
          </p>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/40">
        <div className="container max-w-5xl py-14">
          <div className="grid gap-4 md:grid-cols-3">
            <Tile
              icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
              eyebrow={t("tiles.moneyBack.eyebrow")}
              title={t("tiles.moneyBack.title")}
              body={t("tiles.moneyBack.body")}
            />
            <Tile
              icon={<FileText className="h-5 w-5" aria-hidden="true" />}
              eyebrow={t("tiles.written.eyebrow")}
              title={t("tiles.written.title")}
              body={t("tiles.written.body")}
            />
            <Tile
              icon={<Clock className="h-5 w-5" aria-hidden="true" />}
              eyebrow={t("tiles.timeline.eyebrow")}
              title={t("tiles.timeline.title")}
              body={t("tiles.timeline.body")}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container max-w-5xl py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t("report.eyebrow")}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {t("report.headline")}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("report.subhead")}
              </p>
            </div>
            <ul className="space-y-3">
              {reportSections.map((section, i) => (
                <li
                  key={i}
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
                {t("checklist.eyebrow")}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {t("checklist.headline")}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("checklist.subhead")}
              </p>
            </div>
            <ul className="space-y-3">
              {checklistItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
                >
                  <Check className="mt-0.5 h-5 w-5 flex-none text-primary" aria-hidden="true" />
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
            {t("faq.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("faq.headline")}
          </h2>
          <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-elevated">
            {faqItems.map((faq, i) => (
              <details
                key={i}
                className="group p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 text-sm font-medium">
                  <span>{faq.q}</span>
                  <span className="font-mono text-muted-foreground transition-transform group-open:rotate-45" aria-hidden="true">
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
              {t("cta.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {t("cta.headline")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("cta.body")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
              <PayButton stripeConfigured={stripeConfigured} variant="primary" />
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-primary/40"
              >
                {t("cta.compare")}
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
