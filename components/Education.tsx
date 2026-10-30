"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { education } from "@/data/education";
import { ui } from "@/data/ui";
import type { Lang } from "@/lib/i18n";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

/** Education timeline: the line draws itself as you scroll through the section. */
export function Education({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="educatie" data-jump="section" aria-labelledby="edu-title" className="container-x py-24 sm:py-32">
      <SectionHead index="03" kicker={t.sections.education.kicker} title={t.sections.education.title} id="edu-title" />
      <ol ref={ref} className="relative mt-14 grid gap-16 sm:mt-20 md:ml-[25%] md:gap-20">
        {/* track + drawn line */}
        <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-line" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: reduce ? 1 : progress }}
          className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-accent-fg"
        />
        {education.map((e, i) => (
          <li key={e.id} className="relative pl-12 sm:pl-16">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center rounded-full border-2 border-accent-fg bg-bg ${e.current ? "" : ""}`}
            >
              {e.current ? <span className="pulse-dot h-[5px] w-[5px] rounded-full bg-accent-fg" /> : null}
            </span>
            <Reveal delay={i * 0.05}>
              <p className="t-label flex flex-wrap items-center gap-3 text-muted">
                <span className="text-ink">{e.period}</span>
                {e.note ? (
                  <span className={`rounded-full px-2.5 py-1 text-[0.65rem] ${e.current ? "bg-accent text-on-accent" : "border border-line-strong"}`}>
                    {e.note[lang]}
                  </span>
                ) : null}
              </p>
              <h3 className="t-h3 mt-4 text-[clamp(2rem,4vw,3.4rem)]">
                {e.degree[lang]}
                <span className="em-serif"> — {e.program[lang]}</span>
              </h3>
              <p className="mt-4 text-lg text-ink">{e.school[lang]}</p>
              <p className="mt-1 text-muted">{e.faculty[lang]}</p>

              {e.courses[lang].length ? (
                <div className="mt-6">
                  <p className="t-label text-muted">{t.education.courses}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {e.courses[lang].map((c) => (
                      <li key={c} className="rounded-full border border-line px-3 py-1.5 text-sm">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {e.thesis ? (
                <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
                  <p className="t-label text-muted">{t.education.thesis}</p>
                  <p className="mt-2 font-display text-xl font-medium tracking-[-0.02em]">{e.thesis.title[lang]}</p>
                  <p className="mt-2 text-ink-2">{e.thesis.summary[lang]}</p>
                </div>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
