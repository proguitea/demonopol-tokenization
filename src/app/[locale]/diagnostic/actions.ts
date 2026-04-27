"use server";

import { headers } from "next/headers";

import { routing } from "@/i18n/routing";
import {
  DIAGNOSTIC_PRICE_USD_CENTS,
  DIAGNOSTIC_PRODUCT_DESCRIPTION,
  stripe,
} from "@/lib/stripe/server";

type CreateCheckoutResult =
  | { ok: true; url: string }
  | { ok: false; error: "stripe_not_configured" | "stripe_error" };

export async function createDiagnosticCheckout({
  locale,
}: {
  locale: string;
}): Promise<CreateCheckoutResult> {
  if (!stripe) return { ok: false, error: "stripe_not_configured" };

  const supportedLocale = (routing.locales as readonly string[]).includes(locale)
    ? locale
    : routing.defaultLocale;
  const localePath =
    supportedLocale === routing.defaultLocale ? "" : `/${supportedLocale}`;

  const hdr = await headers();
  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const host = hdr.get("host") ?? "tokenize.demonopol.com";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const origin = envOrigin ?? `${protocol}://${host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: DIAGNOSTIC_PRICE_USD_CENTS,
            product_data: {
              name: "Demonopol Diagnostic",
              description: DIAGNOSTIC_PRODUCT_DESCRIPTION,
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        description: "Demonopol Diagnostic",
        statement_descriptor_suffix: "DIAGNOSTIC",
      },
      success_url: `${origin}${localePath}/diagnostic/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${localePath}/diagnostic?cancelled=1`,
      billing_address_collection: "auto",
      allow_promotion_codes: false,
      metadata: {
        source: "tokenize.demonopol.com",
        product: "diagnostic",
        locale: supportedLocale,
      },
    });

    if (!session.url) return { ok: false, error: "stripe_error" };
    return { ok: true, url: session.url };
  } catch (e) {
    console.error("[stripe] checkout session create failed:", e);
    return { ok: false, error: "stripe_error" };
  }
}
