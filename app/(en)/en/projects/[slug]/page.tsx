import { notFound } from "next/navigation";
import { projectBySlug, projects } from "@/data/projects";
import { ProjectPage } from "@/components/ProjectPage";
import { pageMetadata } from "@/lib/seo";
import { paths } from "@/lib/i18n";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/projects/[slug]">) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return pageMetadata("en", { title: p.name, description: p.tagline.en, ro: paths.project("ro", slug), en: paths.project("en", slug) });
}

export default async function Page({ params }: PageProps<"/en/projects/[slug]">) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  return <ProjectPage project={project} lang="en" />;
}
