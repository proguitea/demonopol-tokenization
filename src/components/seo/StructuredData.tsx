/**
 * JSON-LD structured-data fragments. Rendered as inline
 * `<script type="application/ld+json">` blocks so search engines and
 * social-card crawlers can parse them without executing JavaScript.
 *
 * Per Q-005 / Q-012, none of these fragments cite numerical trust
 * claims (years, transaction volume, market size). They describe the
 * organisation and its priced services, no more.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://tokenize.demonopol.com";

function ldScript(payload: object) {
  return (
    <script
      type="application/ld+json"
      // The payload is constructed from static strings; no user-supplied
      // input enters this JSON, so dangerouslySetInnerHTML is safe here.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationSchema() {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: "Demonopol",
    legalName: "Demonopol LLC",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/demonopol-logo-dark.webp`,
    email: "tokenize@demonopol.com",
    description:
      "Global liquidity for private real estate. Worldwide structuring, distribution, and a transparent advisory process.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "P.O. Box 2897",
      addressLocality: "Kingstown",
      addressCountry: "VC",
    },
    sameAs: ["https://demonopol.com"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "tokenize@demonopol.com",
        areaServed: "Worldwide",
        availableLanguage: ["en", "fr", "vi", "th", "es", "zh"],
      },
      {
        "@type": "ContactPoint",
        contactType: "legal",
        email: "legal@demonopol.com",
      },
    ],
  });
}

export function WebsiteSchema() {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: "Demonopol — Tokenization-as-a-Service",
    inLanguage: ["en", "fr", "vi", "th", "es", "zh"],
    publisher: { "@id": `${SITE_URL}#organization` },
  });
}

export function DiagnosticServiceSchema() {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/diagnostic#service`,
    name: "Demonopol Diagnostic",
    serviceType: "Real-estate tokenization advisory",
    description:
      "60–90 minute working session and a 6–8 page written go / no-go on tokenizing your asset. 15-minute money-back guarantee.",
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: { "@type": "Place", name: "Worldwide" },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Private real-estate owners, family offices, sponsors",
    },
    offers: {
      "@type": "Offer",
      price: "400.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/diagnostic`,
      seller: { "@id": `${SITE_URL}#organization` },
    },
  });
}

export function DiagnosticFaqSchema({
  faqs,
}: {
  faqs: ReadonlyArray<{ q: string; a: string }>;
}) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/diagnostic#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  });
}

export function BreadcrumbsSchema({
  items,
}: {
  items: ReadonlyArray<{ name: string; href: string }>;
}) {
  return ldScript({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
    })),
  });
}
