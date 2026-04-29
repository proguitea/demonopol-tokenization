import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const markets = t.raw("reach.markets") as string[];

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      {/* Jurisdiction reach strip */}
      <div className="border-b border-border/40">
        <div className="container py-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("reach.heading")}
          </p>
          <div className="flex flex-wrap gap-2">
            {markets.map((label) => (
              <span
                key={label}
                className="rounded-full border border-border/60 bg-background px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2 space-y-3">
          <p className="font-display text-lg font-semibold tracking-tight">
            {t("brand")}
          </p>
          <p className="max-w-md text-sm text-muted-foreground">
            {t("description")}
          </p>

          {/* Newsletter capture — mailto-based for V1 */}
          <div className="mt-6 rounded-lg border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-primary">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                {t("newsletter.eyebrow")}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {t("newsletter.body")}
            </p>
            <a
              href={`mailto:tokenize@demonopol.com?subject=${t("newsletter.subject")}`}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Mail className="h-3 w-3" aria-hidden="true" />
              {t("newsletter.cta")}
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("navHeading")}
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/services" className="text-foreground/80 hover:text-foreground">
                {t("nav.services")}
              </Link>
            </li>
            <li>
              <Link href="/diagnostic" className="text-foreground/80 hover:text-foreground">
                {t("nav.diagnostic")}
              </Link>
            </li>
            <li>
              <Link href="/start" className="text-foreground/80 hover:text-foreground">
                {t("nav.start")}
              </Link>
            </li>
            <li>
              <Link href="/insights" className="text-foreground/80 hover:text-foreground">
                {t("nav.insights")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-foreground/80 hover:text-foreground">
                {t("nav.about")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t("contactHeading")}
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:tokenize@demonopol.com"
                className="text-foreground/80 hover:text-foreground"
              >
                tokenize@demonopol.com
              </a>
            </li>
            <li>
              <a
                href="mailto:legal@demonopol.com"
                className="text-foreground/80 hover:text-foreground"
              >
                legal@demonopol.com
              </a>
            </li>
            <li>
              <a
                href="https://demonopol.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground"
              >
                demonopol.com ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-border/60">
        <div className="container flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Demonopol LLC. Co. No. 4008 LLC. P.O. Box 2897, Kingstown,
            St. Vincent &amp; the Grenadines.
          </p>
          <p>
            <Link href="/legal" className="hover:text-foreground">
              {t("legal")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
