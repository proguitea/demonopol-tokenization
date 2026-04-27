import { MIN_REASONING_CHARS } from "./constants";
import { isDisposableEmail } from "./disposable-emails";
import type { LeadInput } from "./schema";

export type RejectionReason =
  | "asset_value_below_minimum"
  | "reasoning_too_short"
  | "missing_docs_and_jurisdiction"
  | "disposable_email"
  | "rate_limited"
  | "honeypot";

export type RejectionResult =
  | { rejected: false }
  | { rejected: true; reason: RejectionReason };

/**
 * Spec §6 auto-rejection rules. Pure function — no I/O.
 * Rate-limited and honeypot are evaluated at the request layer (they
 * need access to headers / IP) and merged in the action.
 */
export function evaluateRejection(input: LeadInput): RejectionResult {
  if (input.assetValueBracket === "under_50k") {
    return { rejected: true, reason: "asset_value_below_minimum" };
  }

  if (input.reasoning.trim().length < MIN_REASONING_CHARS) {
    return { rejected: true, reason: "reasoning_too_short" };
  }

  const realDocs = input.documents.filter((d) => d !== "none");
  const noDocs = realDocs.length === 0;
  const noJurisdiction = !input.assetCountry || input.assetCountry.trim() === "";
  if (noDocs && noJurisdiction) {
    return { rejected: true, reason: "missing_docs_and_jurisdiction" };
  }

  if (isDisposableEmail(input.contactEmail)) {
    return { rejected: true, reason: "disposable_email" };
  }

  return { rejected: false };
}
