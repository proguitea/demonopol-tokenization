import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

/**
 * Demonopol brand lockup.
 *
 * The mark is rendered inline as SVG so its dominant fill follows
 * `currentColor` and inverts cleanly between light and dark themes.
 * The blue and yellow accents stay fixed — they're the brand signal.
 *
 * NOTE — the canonical PNG/SVG provided by the founder (with the
 * "decentralized Real Estate" tagline) is *not* shipped on this site.
 * Per OPEN_QUESTIONS Q-005 the TaaS audience hears no crypto-tribe
 * vocabulary; the parent-brand tagline lives on demonopol.com main,
 * not here. This recreation is an approximation — see Q-020.
 */
export function Logo() {
  const t = useTranslations("brand");

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label={t("name")}
    >
      <DemonopolMark className="h-7 w-auto text-foreground transition-transform group-hover:scale-[1.03]" />
      <span className="font-display text-base font-semibold tracking-tight">
        <span className="text-brand-blue">DE</span>
        <span className="text-foreground">MONOPOL</span>
      </span>
      <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
        {t("tagline")}
      </span>
    </Link>
  );
}

function DemonopolMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 192"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Left tall roof — uses currentColor so dark theme inverts cleanly */}
      <polygon points="0,96 96,0 96,96" fill="currentColor" />
      {/* Right kinked roof segment */}
      <polygon points="96,32 96,96 192,96 192,64" fill="currentColor" />
      {/* Right base column */}
      <rect x="192" y="64" width="48" height="128" fill="currentColor" />
      {/* Left base column */}
      <rect x="0" y="96" width="48" height="96" fill="currentColor" />
      {/* Mid column above the yellow accent */}
      <rect x="96" y="96" width="48" height="32" fill="currentColor" />
      {/* Right-of-mid column */}
      <rect x="156" y="96" width="36" height="96" fill="currentColor" />
      {/* Bottom strip across the centre */}
      <rect x="48" y="160" width="108" height="32" fill="currentColor" />
      {/* Mid-right column under the yellow */}
      <rect x="120" y="128" width="36" height="32" fill="currentColor" />
      {/* Yellow accent — sits in the middle band */}
      <rect x="96" y="128" width="24" height="20" fill="#F0C420" />
      {/* Blue tall accent — door-shaped, lower-left */}
      <rect x="48" y="112" width="36" height="80" fill="#3F6CE5" />
    </svg>
  );
}
