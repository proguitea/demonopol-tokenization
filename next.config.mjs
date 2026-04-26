import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/diagnostic",
        destination: "/", // placeholder until /diagnostic ships in Week 4
        permanent: false,
        has: [{ type: "query", key: "_force", value: "0" }],
      },
    ].filter(() => false); // disabled — leaving the structure for later sprints
  },
};

const sentryEnabled =
  Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN) &&
  process.env.NODE_ENV === "production";

const config = sentryEnabled
  ? withSentryConfig(withNextIntl(nextConfig), {
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      widenClientFileUpload: true,
      tunnelRoute: "/monitoring",
      hideSourceMaps: true,
      disableLogger: true,
    })
  : withNextIntl(nextConfig);

export default config;
