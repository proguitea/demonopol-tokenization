"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("theme");

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-elevated text-foreground transition-colors hover:bg-muted"
      aria-label={isDark ? t("toLight") : t("toDark")}
    >
      {/* Render both icons to avoid hydration flash; CSS hides the inactive one. */}
      <Sun className={`h-4 w-4 ${isDark ? "hidden" : "block"}`} aria-hidden="true" />
      <Moon className={`h-4 w-4 ${isDark ? "block" : "hidden"}`} aria-hidden="true" />
    </button>
  );
}
