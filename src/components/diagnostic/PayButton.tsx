"use client";

import { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { ArrowRight, Loader2 } from "lucide-react";

import { createDiagnosticCheckout } from "@/app/[locale]/diagnostic/actions";

const FALLBACK_HREF =
  "mailto:legal@demonopol.com?subject=Diagnostic%20booking&body=Hi%20Demonopol%2C%20I%27d%20like%20to%20book%20the%20%24400%20Diagnostic.%20Please%20send%20a%20payment%20link.";

export function PayButton({
  stripeConfigured,
  variant = "primary",
}: {
  stripeConfigured: boolean;
  variant?: "primary" | "ghost";
}) {
  const locale = useLocale();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const baseClasses =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      : "inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-60";

  if (!stripeConfigured) {
    return (
      <a href={FALLBACK_HREF} className={baseClasses}>
        Email us to book the Diagnostic
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  function handleClick() {
    setError(null);
    startTransition(async () => {
      const result = await createDiagnosticCheckout({ locale });
      if (result.ok) {
        window.location.assign(result.url);
      } else {
        setError(
          "Couldn't start the checkout. Please try again, or email legal@demonopol.com.",
        );
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        aria-busy={pending}
        className={baseClasses}
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            Redirecting to Stripe…
          </>
        ) : (
          <>
            Pay $400 — Book the Diagnostic
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
