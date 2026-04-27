import { z } from "zod";

import {
  ASSET_TYPES,
  DOCUMENTS,
  INVESTOR_TARGETS,
  MAX_REASONING_CHARS,
  MIN_REASONING_CHARS,
  OWNERSHIPS,
  TIMELINES,
  VALUE_BRACKETS,
} from "./constants";

// ISO 3166-1 alpha-2 country code. Two letters, uppercase. We accept
// either case from the form and normalise server-side.
const countryCode = z
  .string()
  .trim()
  .regex(/^[A-Za-z]{2}$/, "Use a two-letter country code (e.g. ES, VN, US).")
  .transform((v) => v.toUpperCase());

export const startFormSchema = z.object({
  // 1. Asset
  assetType: z.enum(ASSET_TYPES, {
    errorMap: () => ({ message: "Pick the asset category." }),
  }),
  assetValueBracket: z.enum(VALUE_BRACKETS, {
    errorMap: () => ({ message: "Pick the asset value bracket." }),
  }),
  assetCountry: countryCode,
  assetRegion: z.string().trim().max(120).optional().or(z.literal("")),

  // 2. Ownership
  ownership: z.enum(OWNERSHIPS, {
    errorMap: () => ({ message: "Pick the ownership structure." }),
  }),

  // 3. Documents
  documents: z
    .array(z.enum(DOCUMENTS))
    .min(1, "Tick at least one option (or 'None yet')."),

  // 4. Timeline
  timeline: z.enum(TIMELINES, {
    errorMap: () => ({ message: "Pick a timeline." }),
  }),

  // 5. Investor target
  investorTargets: z
    .array(z.enum(INVESTOR_TARGETS))
    .min(1, "Pick at least one investor profile."),

  // 6. Reasoning
  reasoning: z
    .string()
    .trim()
    .min(
      MIN_REASONING_CHARS,
      `Tell us at least ${MIN_REASONING_CHARS} characters about why you want to do this.`,
    )
    .max(MAX_REASONING_CHARS),

  // 7-9. Contact
  contactName: z.string().trim().min(2, "Your name, please.").max(120),
  contactEmail: z
    .string()
    .trim()
    .email("That doesn't look like a valid email.")
    .transform((v) => v.toLowerCase()),
  contactPhone: z.string().trim().max(40).optional().or(z.literal("")),
  contactCountry: countryCode,

  // 10. Consent (two boxes — privacy + risk)
  consentPrivacy: z
    .boolean()
    .refine((v) => v === true, "Required to continue."),
  consentRisk: z.boolean().refine((v) => v === true, "Required to continue."),

  // Honeypot — bots fill this; humans never see it.
  website: z
    .string()
    .max(0, "Spam detected.")
    .optional()
    .or(z.literal("")),
});

export type StartFormInput = z.infer<typeof startFormSchema>;

// Minimal shape used by scoring + rejection — strip honeypot and consent.
export type LeadInput = Omit<
  StartFormInput,
  "website" | "consentPrivacy" | "consentRisk"
>;
