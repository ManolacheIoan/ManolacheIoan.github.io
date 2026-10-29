import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { techById, techName } from "@/data/tech";
import { ui } from "@/data/ui";
import { paths, type Lang } from "@/lib/i18n";
import { KindBadge, ProjectMedia } from "./ProjectCard";
import { TechIcon } from "./TechIcon";
import { Reveal } from "./Reveal";
import { Arrow } from "./Arrow";
import { PageTransition } from "./PageTransition";

const toneColor: Record<Project["statusTone"], string> = {
  live: "bg-[#5fd47a]",
  ready: "bg-accent",
  local: "bg-[#e0a04a]",
  demo: "bg-line-strong",
};

export function ProjectPage({ project, lang }: { project: Project; lang: Lang }) {
  const t = ui[lang].project;
  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <PageTransition>
      <article className="pb-10 pt-28 sm:pt-36">
        <div className="container-x">
          <Link href={paths.projects(lang)} className="link-u t-label fade-up inline-flex min-h-11 items-center gap-2 text-muted hover:text-ink">
            <Arrow dir="w" className="h-3.5 w-3.5" /> {t.back}
          </Link>
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <div className="fade-up" style={{ ["--d" as string]: "0.05s" }}>
                <KindBadge project={project} lang={lang} />
              </div>
              <h1 className="t-display fade-up mt-6 text-[clamp(3.2rem,10vw,9rem)] [font-variation-settings:'opsz'_96,'wdth'_92]" style={{ ["--d" as string]: "0.1s" }}>
                {project.name}
                <span className="text-accent-fg">.</span>
              </h1>
            </div>
            <p className="t-lead fade-up text-ink-2 md:col-span-4" style={{ ["--d" as string]: "0.18s" }}>
              {project.tagline[lang]}
            </p>
          </div>
        </div>

        <div className="container-x mt-12 sm:mt-16">
          <div className="overflow-hidden rounded-[1.4rem] border border-line bg-surface shadow-[var(--shadow)]">
            <ProjectMedia project={project} lang={lang} priority sizes="(min-width: 1408px) 1312px, 100vw" />
          </div>
        </div>

        <div className="container-x mt-16 grid gap-14 md:grid-cols-12 sm:mt-24">
          {/* Meta */}
          <aside className="md:col-span-4">
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
              <div className="bg-bg p-5">
                <dt className="t-label text-muted">{t.type}</dt>
                <dd className="mt-2">{project.kind === "demo" ? ui[lang].projects.demoBadge : ui[lang].projects.personalBadge}</dd>
              </div>
              <div className="bg-bg p-5">
                <dt className="t-label text-muted">{t.status}</dt>
                <dd className="mt-2 flex items-center gap-2.5">
                  <span aria-hidden="true" className={`h-2 w-2 rounded-full ${toneColor[project.statusTone]}`} />
                  {project.status[lang]}
                </dd>
              </div>
              <div className="bg-bg p-5">
                <dt className="t-label text-muted">{t.stack}</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {project.tech.map((id) => (
                      <li key={id} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm">
                        <TechIcon icon={techById[id]?.icon ?? "code"} className="h-3.5 w-3.5" />
                        {techName(id, lang)}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              {project.links?.length ? (
                <div className="bg-bg p-5">
                  <dt className="t-label text-muted">{t.links}</dt>
                  <dd className="mt-2 grid gap-1">
                    {project.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-u inline-flex w-fit items-center gap-2">
                        {l.label[lang]} <Arrow dir="ne" className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </aside>

          {/* Body */}
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <h2 className="t-label text-muted">{t.about}</h2>
              <div className="mt-5 grid gap-5">
                {project.description[lang].map((p, k) => (
                  <p key={k} className={k === 0 ? "font-display text-[clamp(1.4rem,2.3vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.02em]" : "t-lead text-ink-2"}>
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal className="mt-14">
              <h2 className="t-label text-muted">{t.contains}</h2>
              <ol className="mt-5 border-t border-line">
                {project.features[lang].map((f, k) => (
                  <li key={f} className="flex items-baseline gap-5 border-b border-line py-4 text-lg">
                    <span className="t-label text-accent-fg">{String(k + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ol>
            </Reveal>
            {project.kind === "demo" ? (
              <Reveal className="mt-10">
                <p className="rounded-2xl border border-dashed border-line-strong p-5 text-ink-2">
                  <span className="t-label mr-2 text-accent-fg">Demo</span>
                  {t.demoNote}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>

        {/* Next project */}
        <div className="container-x mt-24 sm:mt-32">
          <Link href={paths.project(lang, next.slug)} className="group block border-t border-line pt-8">
            <span className="t-label text-muted">{t.next}</span>
            <span className="mt-4 flex items-center justify-between gap-6">
              <span className="t-display text-[clamp(2.8rem,9vw,8rem)] transition duration-700 group-hover:translate-x-3 [font-variation-settings:'opsz'_96,'wdth'_92]">
                {next.name}
              </span>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line-strong transition duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent sm:h-20 sm:w-20">
                <Arrow className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
            </span>
          </Link>
        </div>
      </article>
    </PageTransition>
  );
}
