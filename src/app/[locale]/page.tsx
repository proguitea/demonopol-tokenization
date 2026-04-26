import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

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
    <section className="relative overflow-hidden">
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
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground opacity-60"
            >
              {t("ctaPrimary")}
            </button>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex items-center justify-center rounded-md border border-border bg-elevated px-6 py-3 font-medium text-foreground opacity-60"
            >
              {t("ctaSecondary")}
            </button>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {t("status")}
          </p>
        </div>
      </div>
    </section>
  );
}
