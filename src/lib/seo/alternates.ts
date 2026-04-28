import { routing } from "@/i18n/routing";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://tokenize.demonopol.com";

/**
 * Build a `metadata.alternates` object for a given canonical path.
 *
 * - `canonical` is the EN (default-locale) URL — Google reads this as
 *   "the source-of-truth version of this content."
 * - `languages` lists every supported locale's URL, plus `x-default`
 *   pointing at the canonical EN URL.
 *
 * Pages call this from their static `metadata` export. Path is the
 * canonical (default-locale) path, e.g. `/services`. The default
 * locale stays unprefixed; non-defaults get the `/{locale}` prefix.
 */
export function localeAlternates(path: string): {
  canonical: string;
  languages: Record<string, string>;
} {
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    languages[locale] = `${SITE_URL}${prefix}${cleanPath}` || SITE_URL;
  }
  languages["x-default"] = `${SITE_URL}${cleanPath}` || SITE_URL;

  return {
    canonical: `${SITE_URL}${cleanPath}` || SITE_URL,
    languages,
  };
}
