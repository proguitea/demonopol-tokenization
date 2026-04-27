import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

/**
 * Demonopol brand lockup.
 *
 * Two canonical assets ship under public/brand/ — the dark lockup (navy
 * on white) for light theme, and the white lockup (light on dark) for
 * dark theme. Both are the founder-supplied PNG/WebP and include the
 * "decentralized Real Estate" tagline at the bottom.
 *
 * Per Q-005, the tagline is **not** shown on this site. We crop it
 * visually with `aspect-ratio` + `object-cover` + `object-top` so the
 * tagline portion is rendered outside the visible window. We don't
 * mutate the source asset — when a tagline-free variant ships, we'll
 * point at it and remove the crop.
 *
 * The natural lockup is ~3.25:1 (7370x2268). The mark+wordmark portion
 * lives in roughly the top 72% of the image height — `aspect-[4.5/1]`
 * crops to that.
 */
export function Logo() {
  const t = useTranslations("brand");

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label={t("name")}
    >
      <span className="relative block aspect-[4.5/1] h-7 w-auto overflow-hidden">
        <Image
          src="/brand/demonopol-logo-dark.webp"
          alt={t("name")}
          fill
          sizes="200px"
          priority
          className="object-cover object-top transition-transform group-hover:scale-[1.02] dark:hidden"
        />
        <Image
          src="/brand/demonopol-logo-white.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="200px"
          priority
          className="hidden object-cover object-top transition-transform group-hover:scale-[1.02] dark:block"
        />
      </span>
      <span
        className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline"
        aria-hidden="true"
      >
        {t("tagline")}
      </span>
    </Link>
  );
}
