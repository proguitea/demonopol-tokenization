"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  vi: "VI",
  es: "ES",
  fr: "FR",
  th: "TH",
  zh: "ZH",
};

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onChange = (next: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <label className="relative inline-flex items-center" aria-label={t("label")}>
      <Globe
        className="pointer-events-none absolute left-2 h-4 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <select
        value={locale}
        onChange={(event) => onChange(event.target.value as Locale)}
        disabled={isPending}
        className="appearance-none rounded-md border border-border bg-elevated py-1.5 pl-7 pr-7 font-mono text-xs uppercase tracking-[0.14em] text-foreground"
      >
        {routing.locales.map((code) => (
          <option key={code} value={code}>
            {localeLabels[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
