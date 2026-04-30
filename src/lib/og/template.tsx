/**
 * Shared OG image template for all route-level opengraph-image.tsx files.
 *
 * Usage:
 *   import { ogTemplate } from "@/lib/og/template";
 *   export default function OG() {
 *     return new ImageResponse(ogTemplate({ ... }), { width: 1200, height: 630 });
 *   }
 *
 * All per-route files should re-export runtime, alt, size, and contentType
 * from this module or define them locally.
 */

// ── Brand colours ────────────────────────────────────────────────────────────
export const NAVY   = "#0E1B3D";
export const BLUE   = "#3F6CE5";
export const YELLOW = "#F0C420";
export const IVORY  = "#F7F4EE";
export const FOREST = "#1A3C2E";
export const MUTED  = "#5A5754";
export const RULE   = "#D9D2C5";

// ── Common next/og config ────────────────────────────────────────────────────
export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

// ── Brand mark SVG (inline, no external fetch) ───────────────────────────────
export function BrandMark() {
  return (
    <svg width="84" height="68" viewBox="0 0 240 192">
      <polygon points="0,96 96,0 96,96"           fill={NAVY} />
      <polygon points="96,32 96,96 192,96 192,64" fill={NAVY} />
      <rect x="192" y="64"  width="48"  height="128" fill={NAVY} />
      <rect x="0"   y="96"  width="48"  height="96"  fill={NAVY} />
      <rect x="96"  y="96"  width="48"  height="32"  fill={NAVY} />
      <rect x="156" y="96"  width="36"  height="96"  fill={NAVY} />
      <rect x="48"  y="160" width="108" height="32"  fill={NAVY} />
      <rect x="120" y="128" width="36"  height="32"  fill={NAVY} />
      <rect x="96"  y="128" width="24"  height="20"  fill={YELLOW} />
      <rect x="48"  y="112" width="36"  height="80"  fill={BLUE} />
    </svg>
  );
}

// ── Template function ─────────────────────────────────────────────────────────
export interface OgTemplateProps {
  /** Short label above the headline (e.g. "Diagnostic · $400") */
  eyebrow: string;
  /** Main headline lines — each string becomes its own flex row */
  headlineLines: string[];
  /** Smaller descriptor below headline */
  subhead: string;
  /** Items shown in the bottom-left footer strip, joined with · */
  footerItems: string[];
}

export function ogTemplate({
  eyebrow,
  headlineLines,
  subhead,
  footerItems,
}: OgTemplateProps) {
  const MONO = '"IBM Plex Mono", ui-monospace, monospace';
  const SANS = '"Inter", system-ui, sans-serif';

  // Headline font size shrinks for longer strings to prevent overflow
  const maxLineLen = Math.max(...headlineLines.map((l) => l.length));
  const headlineFontSize = maxLineLen > 28 ? 72 : maxLineLen > 20 ? 82 : 92;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: IVORY,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: SANS,
      }}
    >
      {/* Brand lockup */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <BrandMark />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 50, fontWeight: 700 }}>
            <span style={{ color: BLUE }}>DE</span>
            <span style={{ color: NAVY }}>MONOPOL</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: MUTED,
              marginTop: 6,
              fontFamily: MONO,
            }}
          >
            {eyebrow}
          </div>
        </div>
      </div>

      {/* Headline block */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: headlineFontSize,
            fontWeight: 700,
            color: NAVY,
            lineHeight: 1.04,
          }}
        >
          {headlineLines.map((line, i) => (
            <span key={i} style={{ display: "flex" }}>
              {line}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: MUTED,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          {subhead}
        </div>
      </div>

      {/* Footer band */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 28,
          borderTop: `2px solid ${RULE}`,
          fontSize: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 14,
            fontWeight: 600,
            color: FOREST,
            flexWrap: "nowrap",
          }}
        >
          {footerItems.map((item, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {i > 0 && (
                <span style={{ color: MUTED, fontWeight: 400, marginRight: -10 }}>·</span>
              )}
              {item}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: MONO,
            color: NAVY,
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          tokenize.demonopol.com
        </div>
      </div>
    </div>
  );
}
