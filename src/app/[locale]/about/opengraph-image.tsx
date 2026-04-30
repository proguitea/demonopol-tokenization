import { ImageResponse } from "next/og";
import { ogTemplate, runtime, size, contentType } from "@/lib/og/template";

export { runtime, size, contentType };
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
