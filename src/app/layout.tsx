// Root layout. Real layout (with html/body) lives in [locale]/layout.tsx.
// This pass-through keeps Next.js happy.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
