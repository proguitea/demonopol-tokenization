import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function Logo() {
  const t = useTranslations("brand");

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 font-display text-base font-semibold tracking-tight"
      aria-label={t("name")}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary font-display text-sm font-semibold text-accent transition-transform group-hover:scale-[1.04]"
      >
        D
      </span>
      <span className="text-foreground">{t("name")}</span>
      <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
        {t("tagline")}
      </span>
    </Link>
  );
}
