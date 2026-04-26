import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        {t("title")}
      </h1>
      <p className="max-w-md text-muted-foreground">{t("body")}</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground"
      >
        {t("cta")}
      </Link>
    </section>
  );
}
