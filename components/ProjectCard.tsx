"use client";

import Link from "next/link";
import { ViewTransition, useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { Project } from "@/data/projects";
import { techName } from "@/data/tech";
import { ui } from "@/data/ui";
import { paths, type Lang } from "@/lib/i18n";
import { Shot } from "./Shot";
import { WatchDiagram } from "./WatchDiagram";
import { Arrow } from "./Arrow";

/** Screenshot (or diagram) with the shared-element name used by the page transition. */
export function ProjectMedia({ project, lang, priority, sizes }: { project: Project; lang: Lang; priority?: boolean; sizes?: string }) {
  const alt =
    lang === "ro" ? `Captură de ecran din ${project.name}` : `Screenshot of ${project.name}`;
  return (
    <ViewTransition name={`shot-${project.slug}`} share="morph" default="none">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {project.image ? (
          <Shot name={project.image} alt={alt} priority={priority} sizes={sizes} className="card-img" />
        ) : (
          <WatchDiagram lang={lang} compact />
        )}
      </div>
    </ViewTransition>
  );
}

export function KindBadge({ project, lang }: { project: Project; lang: Lang }) {
  const t = ui[lang].projects;
  return project.kind === "demo" ? (
    <span className="t-label inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 text-[0.65rem] text-muted">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full border border-current" />
      {t.demoBadge}
    </span>
  ) : (
    <span className="t-label inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[0.65rem] text-on-accent">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {t.personalBadge}
    </span>
  );
}

/**
 * Project card. `feature` = big editorial row on the home page; `grid` = card on the projects page.
 * Desktop: tilts toward the pointer, the screenshot zooms inside a rounded mask and a "View" pill follows the cursor.
 */
export function ProjectCard({
  project,
  lang,
  variant = "grid",
  index,
  total,
  dimmed = false,
  priority = false,
}: {
  project: Project;
  lang: Lang;
  variant?: "feature" | "grid";
  index?: number;
  total?: number;
  dimmed?: boolean;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-5, 5]);
  const rotateX = useTransform(sy, [0, 1], [4, -4]);
  const pillX = useMotionValue(0);
  const pillY = useMotionValue(0);
  const pillSX = useSpring(pillX, { stiffness: 400, damping: 30 });
  const pillSY = useSpring(pillY, { stiffness: 400, damping: 30 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    pillX.set(e.clientX - r.left);
    pillY.set(e.clientY - r.top);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const t = ui[lang].projects;
  const href = paths.project(lang, project.slug);
  const feature = variant === "feature";

  const media = (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="card-media relative overflow-hidden rounded-[1.1rem] border border-line bg-surface shadow-[var(--shadow)]"
      >
        <ProjectMedia project={project} lang={lang} priority={priority} sizes={feature ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"} />
        {/* sheen */}
        <div aria-hidden="true" className="card-sheen pointer-events-none absolute inset-0" />
        {/* cursor pill (desktop only) */}
        <motion.span
          aria-hidden="true"
          style={{ x: pillSX, y: pillSY }}
          className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
        >
          <span className="card-pill t-label flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-[0.7rem] text-on-accent">
            {t.view} <Arrow dir="ne" className="h-3.5 w-3.5" />
          </span>
        </motion.span>
      </motion.div>
    </div>
  );

  const techList = (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted" aria-label={ui[lang].project.stack}>
      {project.tech
        .filter((id) => id !== "react" || !project.tech.includes("nextjs"))
        .map((id) => (
          <li key={id} className="font-mono text-[0.78rem]">
            {techName(id, lang)}
          </li>
        ))}
    </ul>
  );

  if (feature) {
    const even = (index ?? 0) % 2 === 0;
    return (
      <article className={`group project-card grid items-center gap-6 md:grid-cols-12 md:gap-10 ${dimmed ? "opacity-30" : ""}`}>
        <Link
          href={href}
          className={`block md:col-span-7 ${even ? "" : "md:order-2"}`}
          aria-label={`${t.view}: ${project.name}`}
          tabIndex={-1}
        >
          {media}
        </Link>
        <div className={`md:col-span-5 ${even ? "" : "md:order-1"}`}>
          <p className="t-label flex items-center gap-3 text-muted">
            <span className="text-accent-fg">
              {String((index ?? 0) + 1).padStart(2, "0")}
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
            {String(total ?? 0).padStart(2, "0")}
          </p>
          <h3 className="t-h3 mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)]">
            <Link href={href} className="link-u">
              {project.name}
            </Link>
          </h3>
          <div className="mt-4">
            <KindBadge project={project} lang={lang} />
          </div>
          <p className="t-lead mt-5 max-w-[40ch] text-ink-2">{project.tagline[lang]}</p>
          <div className="mt-6">{techList}</div>
          <Link href={href} className="btn btn-ghost mt-8">
            {t.view} <Arrow />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className={`group project-card relative transition-opacity duration-500 ${dimmed ? "opacity-25" : ""}`}>
      {media}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="t-h3 text-2xl sm:text-3xl">
            <Link href={href} className="after:absolute after:inset-0 after:z-20 after:content-['']">
              {project.name}
            </Link>
          </h3>
          <p className="mt-2 max-w-[46ch] text-ink-2">{project.tagline[lang]}</p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong transition duration-500 group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
        >
          <Arrow />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
        <KindBadge project={project} lang={lang} />
        {techList}
      </div>
    </article>
  );
}
