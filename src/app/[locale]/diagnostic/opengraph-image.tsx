import { ImageResponse } from "next/og";
import { ogTemplate, runtime, size, contentType } from "@/lib/og/template";

export { runtime, size, contentType };
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
