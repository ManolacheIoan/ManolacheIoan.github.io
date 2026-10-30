import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import type { Lang } from "@/lib/i18n";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

/** Portrait, or a designed monogram until a photo is set in data/profile.ts. */
function Portrait({ lang }: { lang: Lang }) {
  if (profile.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export
      <img
        src={profile.photo}
        alt={lang === "ro" ? `Portret ${profile.name}` : `Portrait of ${profile.name}`}
        width={800}
        height={1000}
        loading="lazy"
        className="aspect-[4/5] w-full rounded-[1.4rem] object-cover"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={lang === "ro" ? "Loc pentru fotografie" : "Photo placeholder"}
      className="relative grid aspect-[4/5] w-full place-items-center overflow-hidden rounded-[1.4rem] border border-line bg-surface"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_srgb,#8e3a7d_45%,transparent),transparent_60%)]" />
      <div aria-hidden="true" className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
      <span aria-hidden="true" className="relative font-serif text-[clamp(7rem,16vw,13rem)] italic leading-none tracking-[-0.04em] text-ink">
        JM
      </span>
      <span aria-hidden="true" className="spin-slow absolute right-6 top-6 h-14 w-14 rounded-full border border-dashed border-line-strong" />
      <p aria-hidden="true" className="t-label absolute inset-x-5 bottom-5 flex justify-between text-muted">
        <span>{profile.name}</span>
        <span>{profile.city[lang]}</span>
      </p>
    </div>
  );
}

export function About({ lang }: { lang: Lang }) {
  const t = ui[lang].sections.about;
  return (
    <section id="despre" aria-labelledby="about-title" className="container-x py-24 sm:py-32">
      <SectionHead index="02" kicker={t.kicker} title={t.title} id="about-title" />
      <div className="mt-14 grid gap-12 sm:mt-20 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-4 md:col-start-1">
          <Portrait lang={lang} />
        </Reveal>
        <div className="md:col-span-7 md:col-start-6">
          <div className="grid gap-6">
            {profile.about[lang].map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "font-display text-[clamp(1.45rem,2.4vw,2rem)] font-medium leading-[1.3] tracking-[-0.02em]" : "t-lead text-ink-2"}>
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {profile.facts.map((f) => (
                <div key={f.label.ro} className="bg-bg p-5">
                  <dt className="t-label text-muted">{f.label[lang]}</dt>
                  <dd className="mt-2 font-display text-lg font-medium tracking-[-0.02em]">{f.value[lang]}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
