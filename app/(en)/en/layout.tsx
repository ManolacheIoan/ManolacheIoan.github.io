import type { Viewport } from "next";
import "../../globals.css";
import { baseMetadata, themeColor } from "@/lib/seo";
import { SiteShell } from "@/components/SiteShell";

// Root layout for the English pages (`/en/`, `/en/projects/...`).
export const metadata = baseMetadata("en");
export const viewport: Viewport = { themeColor };

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
