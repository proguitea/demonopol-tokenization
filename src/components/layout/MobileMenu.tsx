"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const NAV_ITEMS = [
  { key: "services",   href: "/services"   },
  { key: "diagnostic", href: "/diagnostic" },
  { key: "insights",   href: "/insights"   },
  { key: "about",      href: "/about"      },
] as const;

export function MobileMenu() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger / close toggle — visible below md breakpoint */}
      <button
        type="button"
        aria-label={open ? t("closeMenu") : t("openMenu")}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
      >
        {open
          ? <X    className="h-5 w-5" aria-hidden="true" />
          : <Menu className="h-5 w-5" aria-hidden="true" />
        }
      </button>

      {/* Full-page overlay nav */}
      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={t("mobileNavLabel")}
          className="fixed inset-x-0 top-16 bottom-0 z-20 overflow-y-auto bg-background md:hidden"
        >
          <nav className="container flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center rounded-md px-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}

            <a
              href="https://demonopol.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center gap-1 rounded-md px-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t("backToDemonopol")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> (opens in new tab)</span>
            </a>

            <div className="mt-4 border-t border-border/60 pt-4">
              <Link
                href="/start"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("ctaStart")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
