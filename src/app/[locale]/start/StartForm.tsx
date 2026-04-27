"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  ASSET_TYPES,
  DOCUMENTS,
  INVESTOR_TARGETS,
  MAX_REASONING_CHARS,
  MIN_REASONING_CHARS,
  OWNERSHIPS,
  TIMELINES,
  VALUE_BRACKETS,
} from "@/lib/start/constants";
import { startFormSchema, type StartFormInput } from "@/lib/start/schema";
import { cn } from "@/lib/utils";

import { submitStartForm } from "./actions";

const STORAGE_KEY = "demonopol.taas.start.draft.v1";

const labels = {
  assetType: {
    single_family: "Single-family residence",
    multi_family: "Multi-family / apartment building",
    commercial: "Commercial (office, retail, hospitality)",
    land: "Land",
    mixed_use: "Mixed-use",
    development: "Development project",
    other: "Other",
  },
  valueBracket: {
    under_50k: "Under $50,000",
    "50k_250k": "$50,000 – $250,000",
    "250k_1m": "$250,000 – $1M",
    "1m_5m": "$1M – $5M",
    "5m_plus": "$5M+",
  },
  ownership: {
    sole: "Sole owner",
    co_owned: "Co-owned (partnership)",
    spv: "Held in an SPV / holding company",
    fund: "Held in a fund",
    other: "Other",
  },
  timeline: {
    immediate: "Immediately (within 4 weeks)",
    three_months: "Within 3 months",
    six_months: "Within 6 months",
    twelve_plus: "12 months or later",
  },
  documents: {
    deed: "Deed",
    title_report: "Title report",
    recent_valuation: "Recent valuation",
    financials: "Financials / income statement",
    occupancy: "Occupancy data",
    none: "None yet",
  },
  investorTargets: {
    hnwi: "High-net-worth individuals",
    family_office: "Family offices",
    institutional: "Institutional investors",
    retail: "Retail / qualified retail",
  },
};

export function StartForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<StartFormInput>({
    resolver: zodResolver(startFormSchema),
    defaultValues: {
      assetType: undefined,
      assetValueBracket: undefined,
      assetCountry: "",
      assetRegion: "",
      ownership: undefined,
      documents: [],
      timeline: undefined,
      investorTargets: [],
      reasoning: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      contactCountry: "",
      consentPrivacy: false,
      consentRisk: false,
      website: "",
    },
    mode: "onBlur",
  });

  // Restore draft from localStorage on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      reset({ ...draft, consentPrivacy: false, consentRisk: false, website: "" });
    } catch {
      // Ignore corrupt drafts.
    }
  }, [reset]);

  // Persist draft on every change. We never persist consent or honeypot.
  const watched = watch();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { consentPrivacy: _p, consentRisk: _r, website: _w, ...persistable } =
      watched;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch {
      // Storage quota or private mode — ignore.
    }
  }, [watched]);

  const reasoningLength = (watched.reasoning ?? "").trim().length;

  const onSubmit: SubmitHandler<StartFormInput> = (data) => {
    startTransition(async () => {
      const result = await submitStartForm(data);
      if (!result.ok) {
        for (const [path, messages] of Object.entries(result.errors)) {
          setError(path as keyof StartFormInput, {
            type: "server",
            message: messages[0],
          });
        }
        return;
      }
      window.localStorage.removeItem(STORAGE_KEY);
      const params = new URLSearchParams({ outcome: result.outcome });
      if (result.rejectionReason) params.set("reason", result.rejectionReason);
      router.push(`/start/submitted?${params.toString()}`);
    });
  };

  const submitting = isSubmitting || isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12" noValidate>
      {/* Honeypot (hidden visually, accessible to bots) */}
      <div aria-hidden="true" className="sr-only" tabIndex={-1}>
        <label>
          Leave this field empty
          <input
            type="text"
            autoComplete="off"
            tabIndex={-1}
            {...register("website")}
          />
        </label>
      </div>

      <Section title="The asset" subtitle="Tell us what you'd like to bring to the market.">
        <RadioGroup
          legend="Asset category"
          name="assetType"
          options={ASSET_TYPES}
          labels={labels.assetType}
          register={register}
          error={errors.assetType?.message}
        />
        <RadioGroup
          legend="Asset value (USD)"
          name="assetValueBracket"
          options={VALUE_BRACKETS}
          labels={labels.valueBracket}
          register={register}
          error={errors.assetValueBracket?.message}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Country (ISO code)"
            error={errors.assetCountry?.message}
            hint="Two-letter code, e.g. ES, VN, US."
          >
            <input
              {...register("assetCountry")}
              placeholder="ES"
              maxLength={2}
              className="input"
              autoComplete="off"
            />
          </Field>
          <Field label="Region or city (optional)" error={errors.assetRegion?.message}>
            <input
              {...register("assetRegion")}
              placeholder="Marbella"
              className="input"
              autoComplete="off"
            />
          </Field>
        </div>
        <RadioGroup
          legend="Ownership structure"
          name="ownership"
          options={OWNERSHIPS}
          labels={labels.ownership}
          register={register}
          error={errors.ownership?.message}
        />
      </Section>

      <Section title="Readiness" subtitle="What's already in place — and how soon you'd want to move.">
        <CheckboxGroup
          legend="Documents you can share with us"
          name="documents"
          options={DOCUMENTS}
          labels={labels.documents}
          register={register}
          error={errors.documents?.message}
        />
        <RadioGroup
          legend="Timeline"
          name="timeline"
          options={TIMELINES}
          labels={labels.timeline}
          register={register}
          error={errors.timeline?.message}
        />
      </Section>

      <Section title="Investors" subtitle="Who do you imagine ends up holding the fractions?">
        <CheckboxGroup
          legend="Investor profiles you'd like to reach"
          name="investorTargets"
          options={INVESTOR_TARGETS}
          labels={labels.investorTargets}
          register={register}
          error={errors.investorTargets?.message}
        />
      </Section>

      <Section
        title="Why this asset, why now"
        subtitle="The single most useful field. Free text. The more candid, the better."
      >
        <Field
          label={`Your reasoning (min ${MIN_REASONING_CHARS} characters)`}
          error={errors.reasoning?.message}
          hint={
            <span className="font-mono text-xs">
              {reasoningLength}/{MAX_REASONING_CHARS} characters
            </span>
          }
        >
          <textarea
            {...register("reasoning")}
            rows={6}
            maxLength={MAX_REASONING_CHARS}
            className="input min-h-[160px] resize-y"
            placeholder="What's the asset, why are you considering tokenization, what are you optimising for (liquidity, partial exit, broader investor base), and what's the constraint you're trying to work around?"
          />
        </Field>
      </Section>

      <Section title="Contact" subtitle="So we can get back to you with the assessment.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" error={errors.contactName?.message}>
            <input {...register("contactName")} className="input" autoComplete="name" />
          </Field>
          <Field label="Email" error={errors.contactEmail?.message}>
            <input
              type="email"
              {...register("contactEmail")}
              className="input"
              autoComplete="email"
            />
          </Field>
          <Field
            label="Phone (optional)"
            error={errors.contactPhone?.message}
            hint="Helpful if your timeline is immediate."
          >
            <input
              type="tel"
              {...register("contactPhone")}
              className="input"
              autoComplete="tel"
            />
          </Field>
          <Field
            label="Your country (ISO code)"
            error={errors.contactCountry?.message}
            hint="Two-letter code."
          >
            <input
              {...register("contactCountry")}
              placeholder="VN"
              maxLength={2}
              className="input"
              autoComplete="country"
            />
          </Field>
        </div>
      </Section>

      <Section title="Consent" subtitle="Two boxes — both required.">
        <Checkbox
          name="consentPrivacy"
          register={register}
          error={errors.consentPrivacy?.message}
        >
          I&apos;ve read the{" "}
          <span className="font-medium underline-offset-2">privacy notice</span>{" "}
          (published with the legal pages in Week 6) and consent to Demonopol
          processing this submission.
        </Checkbox>
        <Checkbox
          name="consentRisk"
          register={register}
          error={errors.consentRisk?.message}
        >
          I understand tokenization of private real estate is a relatively new
          rail and that this Self-Check is an assessment, not a financial,
          legal, or tax recommendation. The full risk disclosure ships with the
          legal pages in Week 6.
        </Checkbox>
      </Section>

      <div className="flex flex-col items-start gap-3 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Your draft is saved locally as you type. You can close the tab and come
          back.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity",
            submitting && "opacity-60",
          )}
        >
          {submitting ? "Submitting…" : "Submit Self-Check"}
        </button>
      </div>
    </form>
  );
}

// ---- Field primitives ----------------------------------------------------

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <header>
        <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </header>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
      <div className="flex items-center justify-between text-xs">
        <span className="text-destructive" role="alert">
          {error ?? " "}
        </span>
        {hint ? <span className="text-muted-foreground">{hint}</span> : null}
      </div>
    </label>
  );
}

type RadioGroupProps<T extends string> = {
  legend: string;
  name: keyof StartFormInput;
  options: readonly T[];
  labels: Record<T, string>;
  register: ReturnType<typeof useForm<StartFormInput>>["register"];
  error?: string;
};

function RadioGroup<T extends string>({
  legend,
  name,
  options,
  labels,
  register,
  error,
}: RadioGroupProps<T>) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((value) => (
          <label
            key={value}
            className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-elevated p-3 transition-colors hover:border-primary/40"
          >
            <input
              type="radio"
              value={value}
              {...register(name)}
              className="mt-0.5"
            />
            <span className="text-sm">{labels[value]}</span>
          </label>
        ))}
      </div>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function CheckboxGroup<T extends string>({
  legend,
  name,
  options,
  labels,
  register,
  error,
}: RadioGroupProps<T>) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((value) => (
          <label
            key={value}
            className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-elevated p-3 transition-colors hover:border-primary/40"
          >
            <input
              type="checkbox"
              value={value}
              {...register(name)}
              className="mt-0.5"
            />
            <span className="text-sm">{labels[value]}</span>
          </label>
        ))}
      </div>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function Checkbox({
  name,
  register,
  error,
  children,
}: {
  name: keyof StartFormInput;
  register: ReturnType<typeof useForm<StartFormInput>>["register"];
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-elevated p-3">
      <input type="checkbox" {...register(name)} className="mt-1" />
      <span className="text-sm">
        {children}
        {error ? (
          <span className="mt-1 block text-xs text-destructive" role="alert">
            {error}
          </span>
        ) : null}
      </span>
    </label>
  );
}
