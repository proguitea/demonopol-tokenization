import { ImageResponse } from "next/og";
import { ogTemplate } from "@/lib/og/template";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Demonopol Services — Five priced tiers for real-estate tokenization";

export default function OG() {
  return new ImageResponse(
    ogTemplate({
      eyebrow: "Services",
      headlineLines: ["Five priced tiers."],
      subhead:
        "Free Self-Check to full mandate · Pricing published · Scope published upfront.",
      footerItems: ["Free Self-Check", "$400 Diagnostic", "Promotion", "Mandate", "Express"],
    }),
    { ...size },
  );
}
