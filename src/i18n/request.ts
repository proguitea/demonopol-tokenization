import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

// Recognise placeholder strings of the form [[XX: english source]] so we
// can strip them server-side and fall back to English. Copywriters still
// find untranslated keys by grepping the JSON files for `[[XX:`.
const PLACEHOLDER_RE = /^\s*\[\[[A-Z]{2,3}:[^]*\]\]\s*$/;

type Messages = { [key: string]: string | Messages };

function isPlaceholder(value: unknown): boolean {
  return typeof value === "string" && PLACEHOLDER_RE.test(value);
}

function stripPlaceholders(node: string | Messages): string | Messages | undefined {
  if (typeof node === "string") {
    return isPlaceholder(node) ? undefined : node;
  }
  const out: Messages = {};
  for (const [key, value] of Object.entries(node)) {
    const cleaned = stripPlaceholders(value);
    if (cleaned !== undefined) out[key] = cleaned;
  }
  return out;
}

function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = base[key];
    if (
      value !== null &&
      typeof value === "object" &&
      baseValue !== null &&
      typeof baseValue === "object"
    ) {
      result[key] = deepMerge(baseValue, value);
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

  const enMessages = (await import("../../messages/en.json")).default as Messages;
  if (locale === "en") {
    return { locale, messages: enMessages };
  }

  const localeMessages = (await import(`../../messages/${locale}.json`)).default as Messages;
  const cleaned = (stripPlaceholders(localeMessages) ?? {}) as Messages;
  const messages = deepMerge(enMessages, cleaned);

  return { locale, messages };
});
