"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";

import { getDb, isDbConfigured } from "@/db/client";
import { leadScoreEvents, leads } from "@/db/schema";
import { evaluateRejection, type RejectionReason } from "@/lib/start/rejection";
import { startFormSchema } from "@/lib/start/schema";
import { bucketFromScore, scoreLead } from "@/lib/start/scoring";

export type SubmitResult =
  | {
      ok: true;
      leadId: string | null;
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
  const { website: _honeypot, consentPrivacy: _cp, consentRisk: _cr, ...lead } =
    data;

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

  let leadId: string | null = null;
  if (isDbConfigured()) {
    try {
      const db = getDb();
      const hdr = await headers();
      const ipHash = hashIp(
        hdr.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          hdr.get("x-real-ip") ??
          "",
      );
      const status =
        outcome === "rejected"
          ? ("auto_rejected" as const)
          : (outcome as "low_fit" | "qualified" | "priority");

      const [row] = await db
        .insert(leads)
        .values({
          locale: "en",
          assetType: lead.assetType,
          assetValueBracket: lead.assetValueBracket,
          assetCountry: lead.assetCountry,
          assetRegion: lead.assetRegion || null,
          ownership: lead.ownership,
          documents: lead.documents,
          timeline: lead.timeline,
          investorTargets: lead.investorTargets,
          reasoning: lead.reasoning,
          contactName: lead.contactName,
          contactEmail: lead.contactEmail,
          contactPhone: lead.contactPhone || null,
          contactCountry: lead.contactCountry,
          consentPrivacy: true,
          consentRisk: true,
          score: scoring.score,
          status,
          rejectionReason: rejection.rejected ? rejection.reason : null,
          ipHash,
          userAgent: hdr.get("user-agent"),
          referrer: hdr.get("referer"),
        })
        .returning({ id: leads.id });
      leadId = row?.id ?? null;
      if (leadId && scoring.events.length) {
        await db.insert(leadScoreEvents).values(
          scoring.events.map((e) => ({
            leadId: leadId as string,
            rule: e.rule,
            delta: e.delta,
            detail: e.detail ?? null,
          })),
        );
      }
    } catch (e) {
      console.error("[start] DB persist failed:", e);
      // Non-fatal — return success so the visitor isn't blocked. This row
      // can be replayed from request logs once the DB is up.
    }
  } else {
    // No DB configured — log to server console for manual triage.
    console.info("[start] lead (DB not configured):", {
      contactEmail: lead.contactEmail,
      assetCountry: lead.assetCountry,
      assetValueBracket: lead.assetValueBracket,
      score: scoring.score,
      outcome,
    });
  }

  return { ok: true, leadId, outcome, rejectionReason, score: scoring.score };
}

function hashIp(ip: string): string {
  if (!ip) return "";
  const salt = process.env.IP_HASH_SALT ?? "demonopol-taas";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}
