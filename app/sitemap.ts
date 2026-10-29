import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/profile";
import { projects } from "@/data/projects";
import { paths } from "@/lib/i18n";

// Generated at build time into /sitemap.xml.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { ro: paths.home("ro"), en: paths.home("en"), priority: 1 },
    { ro: paths.projects("ro"), en: paths.projects("en"), priority: 0.8 },
    ...projects.map((p) => ({ ro: paths.project("ro", p.slug), en: paths.project("en", p.slug), priority: 0.6 })),
  ];
  return pages.flatMap((pg) =>
    (["ro", "en"] as const).map((l) => ({
      url: `${SITE_URL}${pg[l]}`,
      priority: pg.priority,
      alternates: { languages: { ro: `${SITE_URL}${pg.ro}`, en: `${SITE_URL}${pg.en}` } },
    })),
  );
}
