import { isPlaceholder, profile, SITE_URL } from "@/data/profile";
import type { Lang } from "@/lib/i18n";

/** schema.org Person data for search engines. */
export function PersonJsonLd({ lang }: { lang: Lang }) {
  const sameAs = Object.values(profile.socials).filter((u) => !isPlaceholder(u));
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.alias,
    url: `${SITE_URL}${lang === "ro" ? "/" : "/en/"}`,
    jobTitle: lang === "ro" ? "Full-stack developer" : "Full-stack developer",
    ...(isPlaceholder(profile.email) ? {} : { email: `mailto:${profile.email}` }),
    address: { "@type": "PostalAddress", addressLocality: "Galați", addressCountry: "RO" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universitatea „Dunărea de Jos” din Galați",
      sameAs: "https://www.ugal.ro",
    },
    founder: { "@type": "Organization", name: "Manotek", url: "https://manotek.ro" },
    knowsAbout: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Web development"],
    sameAs,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
