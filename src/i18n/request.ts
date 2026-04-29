import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

// Recognise placeholder strings of the form [[XX: english source]] so we
// can strip them server-side and fall back to English. Copywriters still
// find untranslated keys by grepping the JSON files for `[[XX:`.
const PLACEHOLDER_RE = /^\s*\[\[[A-Z]{2,3}:[^]*\]\]\s*$/;

// Internal type that mirrors the actual JSON shape, including string arrays
// (used by tier includes/excludes, report sections, FAQ items, etc.).
// next-intl's AbstractIntlMessages doesn't model arrays, so we cast at the
// boundary rather than narrow the type throughout.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonNode = string | string[] | { [key: string]: any };

function isPlaceholder(value: unknown): boolean {
  return typeof value === "string" && PLACEHOLDER_RE.test(value);
}

function stripPlaceholders(node: JsonNode): JsonNode | undefined {
  if (typeof node === "string") {
    return isPlaceholder(node) ? undefined : node;
  }
  if (Array.isArray(node)) {
    // Filter placeholder entries from string arrays
    const filtered = (node as unknown[]).filter(
      (item) => typeof item !== "string" || !isPlaceholder(item),
    );
    return filtered.length > 0 ? (filtered as string[]) : undefined;
  }
  const out: { [key: string]: JsonNode } = {};
  for (const [key, value] of Object.entries(node as { [key: string]: JsonNode })) {
    const cleaned = stripPlaceholders(value);
    if (cleaned !== undefined) out[key] = cleaned;
  }
  return out;
}

function deepMerge(
  base: { [key: string]: JsonNode },
  override: { [key: string]: JsonNode },
): { [key: string]: JsonNode } {
  const result: { [key: string]: JsonNode } = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = base[key];
    if (Array.isArray(value) || Array.isArray(baseValue)) {
      // Arrays: override wins wholesale (no partial merge)
      result[key] = value;
    } else if (
      value !== null &&
      typeof value === "object" &&
      baseValue !== null &&
      typeof baseValue === "object"
    ) {
      result[key] = deepMerge(
        baseValue as { [key: string]: JsonNode },
        value as { [key: string]: JsonNode },
      );
    } else {
      result[key] = value;
    }
  }
  return result;
}

function isSupportedLocale(value: string | undefined): value is Locale {
  return !!value && (routing.locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isSupportedLocale(requested) ? requested : routing.defaultLocale;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enRaw = (await import("../../messages/en.json")).default as any;
  if (locale === "en") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { locale, messages: enRaw as any };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const localeRaw = (await import(`../../messages/${locale}.json`)).default as any;
  const cleaned = (stripPlaceholders(localeRaw) ?? {}) as { [key: string]: JsonNode };
  const messages = deepMerge(enRaw, cleaned);

  // next-intl's AbstractIntlMessages doesn't model arrays in its types, but
  // supports them at runtime via t.raw(). Cast through unknown to satisfy TS.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { locale, messages: messages as any };
});
