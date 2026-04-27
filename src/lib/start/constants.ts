// Source of truth for all Self-Check option values. Both the zod schema
// and the form UI import from here, and the values match the Postgres
// enums in src/db/schema.ts.

export const ASSET_TYPES = [
  "single_family",
  "multi_family",
  "commercial",
  "land",
  "mixed_use",
  "development",
  "other",
] as const;
export type AssetType = (typeof ASSET_TYPES)[number];

export const VALUE_BRACKETS = [
  "under_50k",
  "50k_250k",
  "250k_1m",
  "1m_5m",
  "5m_plus",
] as const;
export type ValueBracket = (typeof VALUE_BRACKETS)[number];

export const OWNERSHIPS = ["sole", "co_owned", "spv", "fund", "other"] as const;
export type Ownership = (typeof OWNERSHIPS)[number];

export const TIMELINES = [
  "immediate",
  "three_months",
  "six_months",
  "twelve_plus",
] as const;
export type Timeline = (typeof TIMELINES)[number];

export const DOCUMENTS = [
  "deed",
  "title_report",
  "recent_valuation",
  "financials",
  "occupancy",
  "none",
] as const;
export type DocumentKind = (typeof DOCUMENTS)[number];

export const INVESTOR_TARGETS = [
  "hnwi",
  "family_office",
  "institutional",
  "retail",
] as const;
export type InvestorTarget = (typeof INVESTOR_TARGETS)[number];

// Tunables — kept in one place so the spec authority can override later.
export const MIN_REASONING_CHARS = 200;
export const MAX_REASONING_CHARS = 5000;
