"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, type ProjectKind } from "@/data/projects";
import { allTech, techName } from "@/data/tech";
import { ui } from "@/data/ui";
import type { Lang } from "@/lib/i18n";
import { ProjectCard } from "./ProjectCard";
import { TechIcon } from "./TechIcon";

type KindFilter = "all" | ProjectKind;

/** Grid of all projects with filters: All / Personal / Demo, and by technology. */
export function ProjectsBrowser({ lang }: { lang: Lang }) {
  const t = ui[lang].projects;
  const [kind, setKind] = useState<KindFilter>("all");
  const [tech, setTech] = useState<string | null>(null);

  // Only technologies that appear in at least one project.
  const techOptions = useMemo(() => allTech.filter((x) => projects.some((p) => p.tech.includes(x.id))), []);
  const list = projects.filter((p) => (kind === "all" || p.kind === kind) && (!tech || p.tech.includes(tech)));
  const kinds: { id: KindFilter; label: string; n: number }[] = [
    { id: "all", label: t.all, n: projects.length },
    { id: "personal", label: t.personal, n: projects.filter((p) => p.kind === "personal").length },
    { id: "demo", label: t.demo, n: projects.filter((p) => p.kind === "demo").length },
  ];

  return (
    <div>
      <div className="grid gap-6 border-y border-line py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label={lang === "ro" ? "Tip de proiect" : "Project type"} className="flex flex-wrap gap-1 rounded-full border border-line p-1">
            {kinds.map((k) => (
              <button
                key={k.id}
                type="button"
                aria-pressed={kind === k.id}
                onClick={() => setKind(k.id)}
                className="relative min-h-10 rounded-full px-4 text-sm transition"
              >
                {kind === k.id ? (
                  <motion.span layoutId="kind-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                ) : null}
                <span className={`relative ${kind === k.id ? "text-bg" : "text-ink-2"}`}>
                  {k.label} <span className="font-mono text-xs opacity-60">{k.n}</span>
                </span>
              </button>
            ))}
          </div>
          <p className="t-label text-muted" aria-live="polite">
            {t.count(list.length)}
          </p>
        </div>
        <div role="group" aria-label={t.tech} className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={!tech}
            onClick={() => setTech(null)}
            className={`min-h-9 rounded-full border px-3.5 text-sm transition ${!tech ? "border-accent bg-accent text-on-accent" : "border-line text-ink-2 hover:border-line-strong"}`}
          >
            {t.anyTech}
          </button>
          {techOptions.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={tech === x.id}
              onClick={() => setTech((cur) => (cur === x.id ? null : x.id))}
              className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 text-sm transition ${tech === x.id ? "border-accent bg-accent text-on-accent" : "border-line text-ink-2 hover:border-line-strong"}`}
            >
              <TechIcon icon={x.icon} className="h-3.5 w-3.5" />
              {techName(x.id, lang)}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="py-24 text-center text-lg text-muted">{t.empty}</p>
      ) : (
        <motion.ul layout className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 sm:gap-y-20">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={i % 2 === 1 ? "sm:mt-24" : ""}
              >
                <ProjectCard project={p} lang={lang} priority={i < 2} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
