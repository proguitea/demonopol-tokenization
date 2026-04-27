import { isDisposableEmail } from "./disposable-emails";
import type { LeadInput } from "./schema";

export type ScoreEvent = {
  rule: string;
  delta: number;
  detail?: string;
};

export type ScoringResult = {
  score: number;
  events: ScoreEvent[];
};

/**
 * Pure function — no I/O. Mirrors the rubric in spec §6 (and is the
 * single place to edit when those numbers change).
 */
export function scoreLead(input: LeadInput): ScoringResult {
  const events: ScoreEvent[] = [];
  const add = (rule: string, delta: number, detail?: string) => {
    events.push({ rule, delta, detail });
  };

  // --- Asset value
  switch (input.assetValueBracket) {
    case "5m_plus":
      add("asset_value_5m_plus", 30);
      break;
    case "1m_5m":
      add("asset_value_1m_5m", 20);
      break;
    case "250k_1m":
      add("asset_value_250k_1m", 10);
      break;
    case "50k_250k":
      add("asset_value_50k_250k", 5);
      break;
    case "under_50k":
      add("asset_value_below_minimum", 0, "auto-reject");
      break;
  }

  // --- Documentation completeness
  const realDocs = input.documents.filter((d) => d !== "none");
  if (realDocs.length >= 4) {
    add("documentation_strong", 20, `${realDocs.length} documents`);
  } else if (realDocs.length >= 2) {
    add("documentation_partial", 10, `${realDocs.length} documents`);
  } else {
    add("documentation_weak", 0, `${realDocs.length} documents`);
  }

  // --- Reasoning quality (length is a proxy; a reviewer reads it later)
  const reasoning = input.reasoning.trim();
  if (reasoning.length >= 500) {
    add("reasoning_detailed", 15, `${reasoning.length} chars`);
  } else if (reasoning.length >= 200) {
    add("reasoning_adequate", 10, `${reasoning.length} chars`);
  } else {
    add("reasoning_short", 0, "auto-reject");
  }

  // --- Timeline urgency
  switch (input.timeline) {
    case "immediate":
      add("timeline_immediate", 10);
      break;
    case "three_months":
      add("timeline_3mo", 5);
      break;
    case "six_months":
    case "twelve_plus":
      // No score, no penalty — patient capital is fine.
      break;
  }

  // --- Ownership professionalism
  if (input.ownership === "spv" || input.ownership === "fund") {
    add("ownership_institutional", 5);
  }

  // --- Disposable email (also a hard reject in evaluateRejection)
  if (isDisposableEmail(input.contactEmail)) {
    add("disposable_email", -50);
  }

  const score = events.reduce((sum, e) => sum + e.delta, 0);
  return { score, events };
}

export type ScoreBucket = "auto_rejected" | "low_fit" | "qualified" | "priority";

/**
 * Map a numeric score to a qualitative bucket. Used by the server action
 * to decide email template and Slack-notify behaviour.
 */
export function bucketFromScore(score: number): ScoreBucket {
  if (score >= 50) return "priority";
  if (score >= 30) return "qualified";
  if (score >= 0) return "low_fit";
  return "auto_rejected";
}
