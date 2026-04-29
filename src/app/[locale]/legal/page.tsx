import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { localeAlternates } from "@/lib/seo/alternates";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Terms of Service, Privacy Policy, and Risk Disclosure for Demonopol LLC. Plain-English placeholders today, counsel-reviewed binding text before the first paid Diagnostic.",
  alternates: localeAlternates("/legal"),
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
  const t = await getTranslations("legal");

  const termsBullets = t.raw("terms.bullets") as string[];
  const privacyBullets = t.raw("privacy.bullets") as string[];
  const riskBullets = t.raw("risk.bullets") as string[];

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container max-w-3xl py-20 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {t("headline")}
          </h1>
          <p className="mt-6 text-pretty text-base text-muted-foreground md:text-lg">
            {t("intro")}
          </p>

          <nav
            aria-label="On this page"
            className="mt-8 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wide"
          >
            <a
              href="#terms"
              className="rounded-md border border-border bg-background px-3 py-1.5 hover:border-primary/40"
            >
              {t("nav.terms")}
            </a>
            <a
              href="#privacy"
              className="rounded-md border border-border bg-background px-3 py-1.5 hover:border-primary/40"
            >
              {t("nav.privacy")}
            </a>
            <a
              href="#risk"
              className="rounded-md border border-border bg-background px-3 py-1.5 hover:border-primary/40"
            >
              {t("nav.risk")}
            </a>
          </nav>
        </div>
      </section>

      <section id="terms" className="border-b border-border/60 scroll-mt-28">
        <div className="container max-w-3xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("terms.section")}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("terms.headline")}
          </h2>
          <PlaceholderBox
            placeholderLabel={t("placeholder")}
            note={t("terms.note")}
            bullets={termsBullets}
          />
        </div>
      </section>

      <section
        id="privacy"
        className="border-b border-border/60 scroll-mt-28 bg-muted/40"
      >
        <div className="container max-w-3xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("privacy.section")}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("privacy.headline")}
          </h2>
          <PlaceholderBox
            placeholderLabel={t("placeholder")}
            note={t("privacy.note")}
            bullets={privacyBullets}
          />
        </div>
      </section>

      <section id="risk" className="scroll-mt-28">
        <div className="container max-w-3xl py-16 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("risk.section")}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("risk.headline")}
          </h2>
          <PlaceholderBox
            placeholderLabel={t("placeholder")}
            note={t("risk.note")}
            bullets={riskBullets}
          />

          <p className="mt-12 text-sm text-muted-foreground">
            {t("contact")}{" "}
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
  placeholderLabel,
  note,
  bullets,
}: {
  placeholderLabel: string;
  note: string;
  bullets: string[];
}) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-elevated p-6 md:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
        {placeholderLabel}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{note}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="flex items-start gap-3 border-l-2 border-border pl-4"
          >
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
