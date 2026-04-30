import { ImageResponse } from "next/og";
import { ogTemplate, runtime, size, contentType } from "@/lib/og/template";

export { runtime, size, contentType };
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
