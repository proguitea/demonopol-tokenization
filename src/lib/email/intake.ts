import { Resend } from "resend";

import type { RejectionReason } from "@/lib/start/rejection";
import type { LeadInput } from "@/lib/start/schema";
import type { ScoreEvent } from "@/lib/start/scoring";

export type IntakeOutcome = "priority" | "qualified" | "low_fit" | "rejected";

type SendArgs = {
  lead: LeadInput;
  score: number;
  events: ScoreEvent[];
  outcome: IntakeOutcome;
  rejectionReason?: RejectionReason;
  metadata: {
    ipHash?: string;
    userAgent?: string;
    referrer?: string;
    submittedAt: string;
  };
};

/**
 * Best-effort send. Failures are logged, never thrown — the form must
 * succeed for the visitor regardless of email infrastructure state.
 *
 * Without RESEND_API_KEY the function logs the would-be payload to the
 * server console so submissions are never silently dropped in dev.
 */
export async function sendIntakeNotification(args: SendArgs): Promise<{
  ok: boolean;
  providerMessageId?: string;
  reason?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.EMAIL_INTERNAL_NOTIFY ?? "tokenize@demonopol.com";
  const from = process.env.EMAIL_FROM ?? "Demonopol <tokenize@demonopol.com>";

  const subject = buildSubject(args);
  const text = renderPlainText(args);

  if (!apiKey) {
    console.info(
      "[intake-email] RESEND_API_KEY not set — skipping send. Subject:",
      subject,
      "\n",
      text,
    );
    return { ok: false, reason: "no_api_key" };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: args.lead.contactEmail,
      subject,
      text,
    });
    if (result.error) {
      console.error("[intake-email] Resend error:", result.error);
      return { ok: false, reason: result.error.message };
    }
    return { ok: true, providerMessageId: result.data?.id };
  } catch (error) {
    console.error("[intake-email] threw:", error);
    return { ok: false, reason: error instanceof Error ? error.message : "unknown" };
  }
}

function buildSubject(args: SendArgs): string {
  const tag = args.outcome.toUpperCase();
  return `[${tag}] Self-Check — ${args.lead.contactName} (${args.lead.assetCountry}, ${args.score}pt)`;
}

function renderPlainText(args: SendArgs): string {
  const { lead, score, events, outcome, rejectionReason, metadata } = args;

  const lines: string[] = [
    `NEW SELF-CHECK SUBMISSION`,
    `=========================`,
    `Outcome:  ${outcome.toUpperCase()}${
      rejectionReason ? `  (reason: ${rejectionReason})` : ""
    }`,
    `Score:    ${score}`,
    ``,
    `CONTACT`,
    `-------`,
    `Name:     ${lead.contactName}`,
    `Email:    ${lead.contactEmail}`,
    `Phone:    ${lead.contactPhone || "—"}`,
    `Country:  ${lead.contactCountry}`,
    ``,
    `ASSET`,
    `-----`,
    `Type:             ${lead.assetType}`,
    `Value bracket:    ${lead.assetValueBracket}`,
    `Country / region: ${lead.assetCountry}${lead.assetRegion ? ` / ${lead.assetRegion}` : ""}`,
    `Ownership:        ${lead.ownership}`,
    `Documents:        ${lead.documents.join(", ") || "—"}`,
    `Timeline:         ${lead.timeline}`,
    `Investor targets: ${lead.investorTargets.join(", ") || "—"}`,
    ``,
    `REASONING (${lead.reasoning.length} chars)`,
    `---------`,
    lead.reasoning.trim(),
    ``,
  ];

  if (events.length) {
    lines.push(`SCORE BREAKDOWN`, `---------------`);
    for (const e of events) {
      const sign = e.delta >= 0 ? "+" : "";
      const detail = e.detail ? `  (${e.detail})` : "";
      lines.push(`  ${sign}${e.delta.toString().padStart(3, " ")}  ${e.rule}${detail}`);
    }
    lines.push(`  ===  Total: ${score}`, ``);
  }

  lines.push(
    `METADATA`,
    `--------`,
    `Submitted:  ${metadata.submittedAt}`,
    `IP (hash):  ${metadata.ipHash || "—"}`,
    `User-agent: ${metadata.userAgent || "—"}`,
    `Referrer:   ${metadata.referrer || "—"}`,
    ``,
    `— Reply directly to this email to respond to ${lead.contactName}.`,
  );

  return lines.join("\n");
}
