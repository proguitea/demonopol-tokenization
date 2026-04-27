import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { stripe } from "@/lib/stripe/server";

// Stripe SDK relies on Node crypto — keep this on the Node runtime
// rather than edge.
export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { ok: false, error: "stripe_not_configured" },
      { status: 503 },
    );
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error(
      "[stripe-webhook] STRIPE_WEBHOOK_SECRET missing — refusing to process events",
    );
    return NextResponse.json(
      { ok: false, error: "webhook_not_configured" },
      { status: 503 },
    );
  }

  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { ok: false, error: "missing_signature" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed:", err);
    return NextResponse.json(
      { ok: false, error: "invalid_signature" },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // Stripe emails the customer a receipt automatically. For V1 we
        // log to the runtime console — the founder triages from the
        // Stripe Dashboard. A custom Resend email can land later if
        // founder workflow needs it.
        console.info("[stripe-webhook] checkout.session.completed", {
          id: session.id,
          customer_email: session.customer_details?.email,
          amount_total: session.amount_total,
          currency: session.currency,
          metadata: session.metadata,
        });
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        console.info("[stripe-webhook] charge.refunded", {
          id: charge.id,
          amount_refunded: charge.amount_refunded,
        });
        break;
      }
      default:
        // Ignore everything else for V1.
        break;
    }
  } catch (err) {
    // Returning 200 on handler errors avoids Stripe retrying for
    // logic-side failures we couldn't act on anyway. Logged for
    // observability.
    console.error("[stripe-webhook] handler error:", err);
  }

  return NextResponse.json({ ok: true });
}
