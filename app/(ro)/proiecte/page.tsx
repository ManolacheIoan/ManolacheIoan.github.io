import { ProjectsPage } from "@/components/ProjectsPage";
import { pageMetadata } from "@/lib/seo";
import { paths } from "@/lib/i18n";

export const metadata = pageMetadata("ro", {
  title: "Proiecte",
  description: "Toate proiectele lui Ioan Manolache: aplicații personale și site-uri demo, construite cu Next.js, TypeScript, Python și PostgreSQL.",
  ro: paths.projects("ro"),
  en: paths.projects("en"),
});

export default function Page() {
  return <ProjectsPage lang="ro" />;
}
