import { manotek } from "@/data/manotek";
import { ui } from "@/data/ui";
import type { Lang } from "@/lib/i18n";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { Arrow } from "./Arrow";

export function Manotek({ lang }: { lang: Lang }) {
  const t = ui[lang].sections.manotek;
  return (
    <section id="manotek" aria-labelledby="manotek-title" className="container-x py-24 sm:py-32">
      <SectionHead index="05" kicker={t.kicker} title={t.title} id="manotek-title" />
      <div className="mt-14 grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5 md:col-start-4">
          <p className="t-lead text-ink-2">{manotek.lead[lang]}</p>
          {manotek.isLive ? (
            <a href={manotek.url} target="_blank" rel="noopener" className="btn btn-primary mt-8">
              {t.visit} <Arrow dir="ne" />
            </a>
          ) : (
            <p className="t-label mt-8 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-muted">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              {t.soon}
            </p>
          )}
        </Reveal>
        <ul className="grid gap-px overflow-hidden rounded-[1.4rem] border border-line bg-line sm:grid-cols-2 md:col-span-12 lg:grid-cols-4">
          {manotek.services.map((s, i) => (
            <li key={s.title.ro} className="group relative bg-bg p-6 transition duration-500 hover:bg-surface sm:p-8">
              <Reveal delay={i * 0.07}>
                <span className="t-label text-accent-fg">0{i + 1}</span>
                <h3 className="t-h3 mt-10 text-2xl sm:mt-16">{s.title[lang]}</h3>
                <p className="mt-3 text-ink-2">{s.text[lang]}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
