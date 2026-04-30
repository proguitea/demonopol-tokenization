import { ImageResponse } from "next/og";
import { ogTemplate } from "@/lib/og/template";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Demonopol Diagnostic — $400 written go / no-go on your asset";

export default function OG() {
  return new ImageResponse(
    ogTemplate({
      eyebrow: "Diagnostic · $400",
      headlineLines: ["$400 written go /", "no-go on your asset."],
      subhead:
        "60–90 min working session · 6–8 page report · 15-min money-back guarantee.",
      footerItems: ["Structured assessment", "Written deliverable", "Independent opinion"],
    }),
    { ...size },
  );
}
