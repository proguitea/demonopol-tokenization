import { ImageResponse } from "next/og";
import { ogTemplate, runtime, size, contentType } from "@/lib/og/template";

export { runtime, size, contentType };
export const alt = "Demonopol Insights — Working notes from the practice";

export default function OG() {
  return new ImageResponse(
    ogTemplate({
      eyebrow: "Insights",
      headlineLines: ["Working notes", "from the practice."],
      subhead:
        "By asset class · By jurisdiction · By structuring decision. No roundups, no hot takes.",
      footerItems: ["Primer", "Jurisdiction", "Asset class", "Risk"],
    }),
    { ...size },
  );
}
