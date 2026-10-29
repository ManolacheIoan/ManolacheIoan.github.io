import type { ReactNode } from "react";
import { fontVars } from "@/lib/fonts";
import { ui } from "@/data/ui";
import type { Lang } from "@/lib/i18n";
import { ThemeScript } from "./ThemeScript";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { MotionProvider } from "./MotionProvider";

/** <html> and <body> for one language. Used by both root layouts (RO and EN). */
export function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    // suppressHydrationWarning: ThemeScript sets data-theme on <html> before React loads.
    <html lang={lang} className={fontVars} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout, not a Pages Router page */}
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">
        <a href="#main" className="sr-only z-[80] rounded-full bg-accent px-5 py-3 text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          {ui[lang].skip}
        </a>
        <MotionProvider>
          <Cursor />
          <Header lang={lang} />
          <main id="main" className="relative">{children}</main>
          <Footer lang={lang} />
        </MotionProvider>
      </body>
    </html>
  );
}
