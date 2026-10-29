import type { Viewport } from "next";
import "../globals.css";
import { baseMetadata, themeColor } from "@/lib/seo";
import { SiteShell } from "@/components/SiteShell";

// Root layout for the Romanian pages (`/`, `/proiecte/...`).
export const metadata = baseMetadata("ro");
export const viewport: Viewport = { themeColor };

export default function RomanianLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="ro">{children}</SiteShell>;
}
