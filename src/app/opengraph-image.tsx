import { ImageResponse } from "next/og";

// 1200x630 is the canonical Open Graph card size — looks right on
// LinkedIn, X, WhatsApp, Slack, iMessage. Using next/og means Vercel
// generates the PNG on demand at the edge, no static file required.
export const runtime = "edge";
export const alt = "Demonopol — Tokenization-as-a-Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0E1B3D";
const BLUE = "#3F6CE5";
const YELLOW = "#F0C420";
const IVORY = "#F7F4EE";
const FOREST = "#1A3C2E";
const MUTED = "#5A5754";
const RULE = "#D9D2C5";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: IVORY,
          padding: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: '"Inter", system-ui, sans-serif',
        }}
      >
        {/* Brand lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <svg width="84" height="68" viewBox="0 0 240 192">
            <polygon points="0,96 96,0 96,96" fill={NAVY} />
            <polygon points="96,32 96,96 192,96 192,64" fill={NAVY} />
            <rect x="192" y="64" width="48" height="128" fill={NAVY} />
            <rect x="0" y="96" width="48" height="96" fill={NAVY} />
            <rect x="96" y="96" width="48" height="32" fill={NAVY} />
            <rect x="156" y="96" width="36" height="96" fill={NAVY} />
            <rect x="48" y="160" width="108" height="32" fill={NAVY} />
            <rect x="120" y="128" width="36" height="32" fill={NAVY} />
            <rect x="96" y="128" width="24" height="20" fill={YELLOW} />
            <rect x="48" y="112" width="36" height="80" fill={BLUE} />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 50,
                fontWeight: 700,
              }}
            >
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
              }}
            >
              Tokenization-as-a-Service
            </div>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              fontWeight: 700,
              color: NAVY,
              lineHeight: 1.04,
            }}
          >
            <span style={{ display: "flex" }}>Global liquidity</span>
            <span style={{ display: "flex" }}>
              for private real estate.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: MUTED,
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Worldwide structuring · transparent pricing · written
            assessments.
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
            fontSize: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              fontWeight: 600,
              color: FOREST,
            }}
          >
            <span style={{ display: "flex" }}>Free Self-Check</span>
            <span style={{ display: "flex", color: MUTED, fontWeight: 400 }}>
              ·
            </span>
            <span style={{ display: "flex" }}>$400 Diagnostic</span>
            <span style={{ display: "flex", color: MUTED, fontWeight: 400 }}>
              ·
            </span>
            <span style={{ display: "flex" }}>15-min money-back</span>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
              color: NAVY,
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            tokenize.demonopol.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
