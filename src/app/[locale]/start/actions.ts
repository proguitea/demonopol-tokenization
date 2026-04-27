"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";

import { sendIntakeNotification } from "@/lib/email/intake";
import { evaluateRejection, type RejectionReason } from "@/lib/start/rejection";
import { startFormSchema } from "@/lib/start/schema";
import { bucketFromScore, scoreLead } from "@/lib/start/scoring";

export type SubmitResult =
  | {
      ok: true;
      outcome: "rejected" | "low_fit" | "qualified" | "priority";
      rejectionReason?: RejectionReason;
      score: number;
    }
  | { ok: false; errors: Record<string, string[]> };

export async function submitStartForm(input: unknown): Promise<SubmitResult> {
  const parsed = startFormSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".") || "_form";
      (errors[path] ??= []).push(issue.message);
    }
    return { ok: false, errors };
  }

  const data = parsed.data;
  const { website: _h, consentPrivacy: _p, consentRisk: _r, ...lead } = data;

  const rejection = evaluateRejection(lead);
  const scoring = scoreLead(lead);

  let outcome: "rejected" | "low_fit" | "qualified" | "priority";
  let rejectionReason: RejectionReason | undefined;
  if (rejection.rejected) {
    outcome = "rejected";
    rejectionReason = rejection.reason;
  } else {
    const bucket = bucketFromScore(scoring.score);
    outcome = bucket === "auto_rejected" ? "rejected" : bucket;
  }

  // Best-effort email. Never throw — the user must always reach the
  // confirmation page.
  try {
    const hdr = await headers();
    const ipHash = hashIp(
      hdr.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        hdr.get("x-real-ip") ??
        "",
    );
    await sendIntakeNotification({
      lead,
      score: scoring.score,
      events: scoring.events,
      outcome,
      rejectionReason,
      metadata: {
        ipHash,
        userAgent: hdr.get("user-agent") ?? undefined,
        referrer: hdr.get("referer") ?? undefined,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (e) {
    console.error("[start] notification dispatch failed:", e);
  }

  return { ok: true, outcome, rejectionReason, score: scoring.score };
}

function hashIp(ip: string): string {
  if (!ip) return "";
  const salt = process.env.IP_HASH_SALT ?? "demonopol-taas";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 16);
}
