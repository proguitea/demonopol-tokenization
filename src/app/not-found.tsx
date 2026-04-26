// Global fallback for routes that never reached the [locale] tree.
// The localized 404 lives at src/app/[locale]/not-found.tsx.

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: "#F7F4EE",
          color: "#1A1C1E",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <main>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            404
          </p>
          <h1 style={{ fontSize: "2rem", margin: "1rem 0", fontWeight: 600 }}>Page not found</h1>
          <p style={{ maxWidth: 480, color: "#5A5754" }}>
            The page you tried to reach is not here.
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" style={{ color: "#1A3C2E", textDecoration: "underline" }}>
              Back to home
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
