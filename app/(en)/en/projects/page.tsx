import { ProjectsPage } from "@/components/ProjectsPage";
import { pageMetadata } from "@/lib/seo";
import { paths } from "@/lib/i18n";

export const metadata = pageMetadata("en", {
  title: "Projects",
  description: "All projects by Ioan Manolache: personal apps and demo websites, built with Next.js, TypeScript, Python and PostgreSQL.",
  ro: paths.projects("ro"),
  en: paths.projects("en"),
});

export default function Page() {
  return <ProjectsPage lang="en" />;
}
