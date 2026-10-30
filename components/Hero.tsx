import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { allTech } from "@/data/tech";
import { ui } from "@/data/ui";
import { locale, type Lang } from "@/lib/i18n";
import { LocalClock } from "./LocalClock";
import { Rich } from "./Rich";
import { Arrow } from "./Arrow";
import { SectionLink } from "./SectionLink";

/** Splits a word into letters that slide up one after another (pure CSS, see .hero-letter). */
function Letters({ word, start }: { word: string; start: number }) {
  return (
    <span className="hero-word" aria-hidden="true">
      {[...word].map((ch, i) => (
        <span key={i} className="hero-letter" style={{ "--i": start + i } as CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/** Circular text that slowly rotates; links to the projects. */
function Badge({ lang }: { lang: Lang }) {
  const text = ui[lang].hero.badge;
  return (
    <SectionLink
      lang={lang}
      id="proiecte"
      toHeading
      className="group relative grid h-[5.5rem] w-[5.5rem] shrink-0 place-items-center self-center sm:h-32 sm:w-32 lg:h-40 lg:w-40"
    >
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-ink font-mono text-[12px] uppercase tracking-[0.36em]">
          <textPath href="#badge-circle">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="sr-only">{ui[lang].hero.seeWork}</span>
      <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-accent text-on-accent transition duration-500 group-hover:scale-125 sm:h-14 sm:w-14">
        <Arrow dir="s" className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
    </SectionLink>
  );
}

export function Hero({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const personal = projects.filter((p) => p.kind === "personal").length;
  const stats = [
    { n: projects.length, label: t.stats.projects },
    { n: personal, label: t.stats.personal },
    { n: projects.length - personal, label: t.stats.demo },
    { n: allTech.length, label: t.stats.tech },
  ];

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-8 pt-24 sm:pt-28">
      {/* Background: two slow, blurred color fields and faint column guides */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_65%,transparent)]">
        <div className="hero-blob hero-blob-a" />
        <div className="hero-blob hero-blob-b" />
        <div className="container-x grid h-full grid-cols-4 md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={`border-l border-line/60 ${i >= 4 ? "hidden md:block" : ""} ${i === 11 ? "border-r" : ""}`} />
          ))}
        </div>
      </div>

      <div className="container-x flex flex-1 flex-col">
        {/* Top line */}
        <div className="fade-up flex flex-wrap items-center justify-between gap-3 text-muted" style={{ "--d": "0.05s" } as CSSProperties}>
          <p className="t-label">
            <span className="text-accent-fg">(</span>
            {t.hero.eyebrow}
            <span className="text-accent-fg">)</span> — {new Date().getFullYear()}
          </p>
          <div className="t-label flex flex-wrap items-center gap-x-4 gap-y-2">
            {profile.availability ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-3 py-1.5 text-ink backdrop-blur">
                <span className="pulse-dot h-2 w-2 rounded-full bg-[#5fd47a]" aria-hidden="true" />
                {profile.availability[lang]}
              </span>
            ) : null}
            <span>
              {profile.city[lang]} · <LocalClock timeZone={profile.timeZone} locale={locale[lang].replace("_", "-")} />
            </span>
          </div>
        </div>

        {/* Name */}
        <h1 id="hero-title" className="t-display mt-auto pt-10 text-[clamp(4rem,16.5vw,17rem)] [font-variation-settings:'opsz'_96,'wdth'_92]">
          <span className="sr-only">
            {profile.name} ({profile.alias}), {profile.role[lang]}
          </span>
          <span className="flex items-end justify-between gap-4">
            <Letters word={profile.firstName} start={0} />
            <Badge lang={lang} />
          </span>
          <span className="block">
            <Letters word={profile.lastName} start={profile.firstName.length} />
            {/* Extra room on the right so the dot's rounded edge isn't clipped by the mask. */}
            <span className="hero-word pr-[0.1em]" aria-hidden="true">
              <span className="hero-letter text-accent-fg" style={{ "--i": profile.name.length + 1 } as CSSProperties}>
                .
              </span>
            </span>
          </span>
        </h1>

        {/* Intro + actions */}
        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <p className="fade-up t-lead max-w-[34ch] text-[clamp(1.25rem,2.1vw,1.75rem)] leading-[1.35] text-ink md:col-span-7" style={{ "--d": "0.4s" } as CSSProperties}>
            <Rich text={profile.intro[lang]} />
          </p>
          <div className="fade-up md:col-span-5 md:justify-self-end" style={{ "--d": "0.5s" } as CSSProperties}>
            <p className="t-label max-w-[38ch] leading-relaxed text-muted">{profile.role[lang]}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <SectionLink lang={lang} id="proiecte" toHeading className="btn btn-primary">
                {t.hero.seeWork} <Arrow />
              </SectionLink>
              <SectionLink lang={lang} id="contact" className="btn btn-ghost">
                {t.hero.contact}
              </SectionLink>
              <a href={profile.cv} download="Ioan_Manolache_CV.pdf" className="link-u t-label ml-1 inline-flex min-h-11 items-center gap-1.5 text-ink-2">
                {t.downloadCv} <Arrow dir="s" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Numbers, all computed from /data */}
        <dl className="fade-up mt-12 grid grid-cols-2 border-t border-line sm:grid-cols-4" style={{ "--d": "0.6s" } as CSSProperties}>
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-row-reverse items-baseline justify-end gap-3 py-4 ${i % 2 ? "border-l border-line pl-4 sm:pl-6" : ""} ${i === 2 ? "sm:border-l sm:border-line sm:pl-6" : ""}`}>
              <dt className="t-label text-muted">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{String(s.n).padStart(2, "0")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
