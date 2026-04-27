import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://tokenize.demonopol.com";

const ROUTES: ReadonlyArray<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/diagnostic", priority: 0.9, changeFrequency: "monthly" },
  { path: "/start", priority: 0.8, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const { defaultLocale, locales } = routing;

  return ROUTES.map((route) => {
    const canonical = `${SITE_URL}${route.path}`;
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      const prefix = locale === defaultLocale ? "" : `/${locale}`;
      languages[locale] = `${SITE_URL}${prefix}${route.path}`;
    }
    return {
      url: canonical,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages },
    };
  });
}
