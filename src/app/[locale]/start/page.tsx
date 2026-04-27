import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { StartForm } from "./StartForm";

export const metadata: Metadata = {
  title: "Self-Check",
  description:
    "A free, structured questionnaire to assess whether your asset is a fit for tokenization. About five minutes.",
};

export default async function StartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="container max-w-3xl py-16 md:py-24">
      <div className="mb-12 space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Self-Check
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Free assessment of your asset.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          About five minutes. No credit card. Submit and we&apos;ll come back
          with a written assessment of fit, an indicative price band for the
          full Diagnostic, and the immediate next step. Your draft is saved
          locally as you go.
        </p>
      </div>
      <StartForm />
    </section>
  );
}
