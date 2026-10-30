"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/data/projects";
import { techById, techGroups, techName } from "@/data/tech";
import { ui } from "@/data/ui";
import { paths, type Lang } from "@/lib/i18n";
import { SectionHead } from "./SectionHead";
import { TechIcon } from "./TechIcon";
import { Reveal } from "./Reveal";

const usage = (id: string) => projects.filter((p) => p.tech.includes(id));

/**
 * Technologies grouped, no skill bars. Hovering (desktop) or tapping a technology
 * highlights the projects where it was used in the panel next to it.
 */
export function Stack({ lang }: { lang: Lang }) {
  const t = ui[lang].sections.stack;
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const shown = hover ?? active;
  const tech = shown ? techById[shown] : null;
  const used = shown ? usage(shown) : [];
  const groups = techGroups.filter((g) => g.items.length > 0);

  return (
    <section id="tehnologii" aria-labelledby="stack-title" className="container-x py-24 sm:py-32">
      <SectionHead index="04" kicker={t.kicker} title={t.title} id="stack-title" aside={<p className="max-w-[46ch] text-ink-2">{t.hint}</p>} />

      <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-12 lg:gap-12">
        <div className="grid content-start gap-10 lg:col-span-7">
          {groups.map((g, gi) => (
            <Reveal key={g.id} delay={gi * 0.06}>
              <h3 className="t-label mb-4 flex items-center gap-3 text-muted">
                {g.title[lang]}
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
                <span>{String(g.items.length).padStart(2, "0")}</span>
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {g.items.map((item) => {
                  const on = shown === item.id;
                  const n = usage(item.id).length;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-pressed={active === item.id}
                        onClick={() => setActive((a) => (a === item.id ? null : item.id))}
                        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(item.id)}
                        onPointerLeave={() => setHover(null)}
                        className={`group inline-flex min-h-11 items-center gap-2.5 rounded-full border px-4 py-2 text-[0.95rem] transition duration-300 ${
                          on
                            ? "border-accent bg-accent text-on-accent"
                            : "border-line bg-surface/60 text-ink hover:border-line-strong"
                        }`}
                      >
                        <TechIcon icon={item.icon} className="h-4 w-4" />
                        {techName(item.id, lang)}
                        {n > 0 ? (
                          <span className={`font-mono text-[0.7rem] ${on ? "text-on-accent/70" : "text-muted"}`}>{n}</span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Projects panel */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 overflow-hidden rounded-[1.4rem] border border-line bg-surface">
            <div className="flex min-h-[5.5rem] items-center justify-between gap-4 border-b border-line px-5 py-4" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={shown ?? "none"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3"
                >
                  {tech ? (
                    <>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-on-accent">
                        <TechIcon icon={tech.icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-display text-lg font-semibold tracking-[-0.02em]">{techName(tech.id, lang)}</span>
                        <span className="text-sm text-muted">
                          {tech.workflow ? t.workflow : used.length ? t.usedIn(used.length) : tech.note?.[lang] ?? t.none}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="t-label text-muted">
                      {t.projects} · {projects.length}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
              {active ? (
                <button type="button" onClick={() => setActive(null)} className="t-label shrink-0 rounded-full border border-line px-3 py-2 text-muted hover:text-ink">
                  {t.reset}
                </button>
              ) : null}
            </div>
            <ul>
              {projects.map((p) => {
                const match = !shown || tech?.workflow || p.tech.includes(shown);
                return (
                  <li key={p.slug} className="border-b border-line last:border-0">
                    <Link
                      href={paths.project(lang, p.slug)}
                      className={`flex items-center justify-between gap-3 px-5 py-2.5 transition duration-300 hover:bg-surface-2 ${match ? "opacity-100" : "opacity-25"}`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={`h-2 w-2 rounded-full transition duration-300 ${shown && match ? "scale-100 bg-accent-fg" : "scale-50 bg-line-strong"}`}
                        />
                        <span className="font-medium">{p.name}</span>
                      </span>
                      <span className="t-label text-[0.65rem] text-muted">{p.kind === "demo" ? "demo" : lang === "ro" ? "personal" : "personal"}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
