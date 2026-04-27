import "server-only";
import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY;

/**
 * Stripe SDK singleton. `null` when STRIPE_SECRET_KEY isn't configured —
 * call sites must check `isStripeConfigured()` first and fall back
 * gracefully (we expose a mailto: path on /diagnostic when Stripe is
 * absent so the site doesn't 500 in pre-launch staging).
 */
export const stripe: Stripe | null = apiKey
  ? new Stripe(apiKey, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
      appInfo: {
        name: "demonopol-taas-web",
        version: "0.1.0",
      },
    })
  : null;

export function isStripeConfigured(): boolean {
  return Boolean(apiKey);
}

export const DIAGNOSTIC_PRICE_USD_CENTS = 40_000; // $400.00

export const DIAGNOSTIC_PRODUCT_DESCRIPTION =
  "60–90 minute working session with our advisory team and a 6–8 page written go / no-go on tokenizing your asset. 15-minute money-back guarantee.";
