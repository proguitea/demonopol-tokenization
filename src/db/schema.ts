import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ---- Enums ----------------------------------------------------------------

export const assetTypeEnum = pgEnum("asset_type", [
  "single_family",
  "multi_family",
  "commercial",
  "land",
  "mixed_use",
  "development",
  "other",
]);

export const valueBracketEnum = pgEnum("asset_value_bracket", [
  "under_50k",
  "50k_250k",
  "250k_1m",
  "1m_5m",
  "5m_plus",
]);

export const ownershipEnum = pgEnum("ownership", [
  "sole",
  "co_owned",
  "spv",
  "fund",
  "other",
]);

export const timelineEnum = pgEnum("timeline", [
  "immediate",
  "three_months",
  "six_months",
  "twelve_plus",
]);

export const documentEnum = pgEnum("document_kind", [
  "deed",
  "title_report",
  "recent_valuation",
  "financials",
  "occupancy",
  "none",
]);

export const investorTargetEnum = pgEnum("investor_target", [
  "hnwi",
  "family_office",
  "institutional",
  "retail",
]);

export const leadStatusEnum = pgEnum("lead_status", [
  "submitted",
  "auto_rejected",
  "low_fit",
  "qualified",
  "priority",
  "diagnostic_booked",
  "diagnostic_paid",
  "closed_won",
  "closed_lost",
]);

export const rejectionReasonEnum = pgEnum("rejection_reason", [
  "asset_value_below_minimum",
  "reasoning_too_short",
  "missing_docs_and_jurisdiction",
  "disposable_email",
  "rate_limited",
  "honeypot",
]);

// ---- Tables ---------------------------------------------------------------

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    submittedAt: timestamp("submitted_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    locale: varchar("locale", { length: 8 }).notNull().default("en"),

    // Asset
    assetType: assetTypeEnum("asset_type").notNull(),
    assetValueBracket: valueBracketEnum("asset_value_bracket").notNull(),
    assetCountry: varchar("asset_country", { length: 2 }).notNull(),
    assetRegion: text("asset_region"),
    ownership: ownershipEnum("ownership").notNull(),
    documents: documentEnum("documents").array().notNull(),
    timeline: timelineEnum("timeline").notNull(),
    investorTargets: investorTargetEnum("investor_targets").array().notNull(),
    reasoning: text("reasoning").notNull(),

    // Contact
    contactName: text("contact_name").notNull(),
    contactEmail: text("contact_email").notNull(),
    contactPhone: text("contact_phone"),
    contactCountry: varchar("contact_country", { length: 2 }).notNull(),

    // Consent
    consentPrivacy: boolean("consent_privacy").notNull().default(false),
    consentRisk: boolean("consent_risk").notNull().default(false),

    // Scoring + status
    score: integer("score").notNull().default(0),
    status: leadStatusEnum("status").notNull().default("submitted"),
    rejectionReason: rejectionReasonEnum("rejection_reason"),

    // Telemetry — never store full IP, only a one-way hash for rate-limit reuse
    ipHash: varchar("ip_hash", { length: 64 }),
    userAgent: text("user_agent"),
    referrer: text("referrer"),
    utm: jsonb("utm"),
  },
  (table) => ({
    submittedAtIdx: index("leads_submitted_at_idx").on(table.submittedAt),
    statusIdx: index("leads_status_idx").on(table.status),
    emailIdx: index("leads_contact_email_idx").on(table.contactEmail),
    scoreIdx: index("leads_score_idx").on(table.score),
  }),
);

export const leadScoreEvents = pgTable("lead_score_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  rule: text("rule").notNull(),
  delta: integer("delta").notNull(),
  detail: text("detail"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const autoReportRuns = pgTable("auto_report_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  model: text("model").notNull(),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  costCents: integer("cost_cents"),
  status: varchar("status", { length: 24 }).notNull(),
  errorMessage: text("error_message"),
  pdfUrl: text("pdf_url"),
  startedAt: timestamp("started_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const emailLog = pgTable("email_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
  template: text("template").notNull(),
  toEmail: text("to_email").notNull(),
  subject: text("subject").notNull(),
  status: varchar("status", { length: 24 }).notNull(),
  providerMessageId: text("provider_message_id"),
  errorMessage: text("error_message"),
  sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
});

export const magicLinks = pgTable(
  "magic_links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    tokenHash: varchar("token_hash", { length: 64 }).notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    consumedAt: timestamp("consumed_at", { withTimezone: true }),
    payload: jsonb("payload"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    tokenHashIdx: index("magic_links_token_hash_idx").on(table.tokenHash),
    emailIdx: index("magic_links_email_idx").on(table.email),
  }),
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
