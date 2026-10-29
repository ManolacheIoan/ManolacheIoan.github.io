import type { Metadata } from "next";
import { profile, SITE_URL } from "@/data/profile";
import { locale, paths, type Lang } from "@/lib/i18n";

export const siteTitle = `${profile.name} (${profile.alias})`;

export const siteDescription: Record<Lang, string> = {
  ro: "Portofoliul lui Ioan Manolache (John Mnl): full-stack developer din Galați, masterand în Informatică Aplicată la UGAL și fondatorul Manotek. Proiecte cu Next.js, TypeScript, Python și PostgreSQL.",
  en: "Portfolio of Ioan Manolache (John Mnl): full-stack developer from Galați, Romania, MSc student in Applied Computer Science at UGAL and founder of Manotek. Projects built with Next.js, TypeScript, Python and PostgreSQL.",
};

export const themeColor = [
  { media: "(prefers-color-scheme: light)", color: "#f1edf1" },
  { media: "(prefers-color-scheme: dark)", color: "#110c14" },
];

/** Shared metadata for a whole language. Pages add their own title/description/canonical. */
export function baseMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${siteTitle} · ${lang === "ro" ? "Portofoliu" : "Portfolio"}`, template: `%s · ${profile.alias}` },
    description: siteDescription[lang],
    applicationName: profile.alias,
    authors: [{ name: profile.name }],
    creator: profile.name,
    openGraph: {
      type: "website",
      siteName: `${profile.alias} · ${profile.name}`,
      locale: locale[lang],
      alternateLocale: locale[lang === "ro" ? "en" : "ro"],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: siteTitle }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  };
}

/** Title, description and language alternates for one page. `ro`/`en` are the page's two URLs. */
export function pageMetadata(lang: Lang, opts: { title?: string; description?: string; ro: string; en: string }): Metadata {
  const url = lang === "ro" ? opts.ro : opts.en;
  return {
    ...(opts.title ? { title: opts.title } : {}),
    ...(opts.description ? { description: opts.description } : {}),
    alternates: {
      canonical: url,
      languages: { ro: opts.ro, en: opts.en, "x-default": opts.ro },
    },
    openGraph: {
      url,
      ...(opts.title ? { title: `${opts.title} · ${profile.alias}` } : {}),
      ...(opts.description ? { description: opts.description } : {}),
      locale: locale[lang],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: siteTitle }],
    },
  };
}

export const homeUrls = { ro: paths.home("ro"), en: paths.home("en") };
