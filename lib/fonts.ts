import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

// Display: Bricolage Grotesque (titles). Accent: Instrument Serif italic (highlighted words).
// Body: Geist. Labels and small details: Geist Mono. All include Romanian diacritics (latin-ext).
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono", display: "swap" });

export const fontVars = `${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`;
