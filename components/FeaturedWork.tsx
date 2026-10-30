import Link from "next/link";
import { featuredProjects, projects } from "@/data/projects";
import { ui } from "@/data/ui";
import { paths, type Lang } from "@/lib/i18n";
import { SectionHead } from "./SectionHead";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { Arrow } from "./Arrow";

export function FeaturedWork({ lang }: { lang: Lang }) {
  const t = ui[lang].sections.work;
  return (
    <section id="proiecte" aria-labelledby="work-title" className="container-x py-24 sm:py-32">
      <SectionHead index="01" kicker={t.kicker} title={t.title} id="work-title" />
      <div className="mt-14 grid gap-24 sm:mt-20 md:gap-36">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug}>
            <ProjectCard project={p} lang={lang} variant="feature" index={i} total={featuredProjects.length} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-24 flex justify-center">
        <Link href={paths.projects(lang)} className="btn btn-primary !min-h-14 !px-8 text-base">
          {t.all} ({projects.length}) <Arrow />
        </Link>
      </Reveal>
    </section>
  );
}
