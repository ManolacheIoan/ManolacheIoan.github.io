import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVars } from "@/lib/fonts";
import { ThemeScript } from "@/components/ThemeScript";

// 404 for any unknown URL, in both languages (it sits outside the RO/EN layouts).
export const metadata: Metadata = {
  title: "404 · John Mnl",
  robots: { index: false },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

export default function GlobalNotFound() {
  return (
    <html lang="ro" className={fontVars} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">
        <main className="container-x flex min-h-[100svh] flex-col justify-center py-20">
          <p className="t-label fade-up text-muted">
            <span className="text-accent-fg">(</span>404<span className="text-accent-fg">)</span>
          </p>
          <h1 className="t-display fade-up mt-6 text-[clamp(3.6rem,13vw,12rem)]" style={{ ["--d" as string]: "0.08s" }}>
            Pagina <span className="em-serif">nu există</span>
            <span className="text-accent-fg">.</span>
          </h1>
          <p className="t-lead fade-up mt-6 text-ink-2" lang="en" style={{ ["--d" as string]: "0.16s" }}>
            This page does not exist.
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "0.24s" }}>
            <Link href="/" className="btn btn-primary">Înapoi acasă</Link>
            <Link href="/en/" className="btn btn-ghost" lang="en">Back home</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
