import { ImageResponse } from "next/og";
import { ogTemplate } from "@/lib/og/template";

export const runtime     = "edge";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "About Demonopol — International real-estate advisory";

export default function OG() {
  return new ImageResponse(
    ogTemplate({
      eyebrow: "About",
      headlineLines: ["International", "real-estate advisory."],
      subhead:
        "Advisory team drawn from international practice · Transparent corporate structure.",
      footerItems: ["Spain", "Thailand", "Vietnam", "Morocco", "Hong Kong", "Worldwide"],
    }),
    { ...size },
  );
}
