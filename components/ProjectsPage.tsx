import { ui } from "@/data/ui";
import type { Lang } from "@/lib/i18n";
import { Rich } from "./Rich";
import { ProjectsBrowser } from "./ProjectsBrowser";
import { PageTransition } from "./PageTransition";

export function ProjectsPage({ lang }: { lang: Lang }) {
  const t = ui[lang].projects;
  return (
    <PageTransition>
      <div className="container-x pb-24 pt-32 sm:pt-40">
        <p className="t-label fade-up text-muted">
          <span className="text-accent-fg">(</span>
          {ui[lang].nav.work}
          <span className="text-accent-fg">)</span>
        </p>
        <h1 className="t-display fade-up mt-6 text-[clamp(3.6rem,12vw,11rem)] [font-variation-settings:'opsz'_96,'wdth'_92]" style={{ ["--d" as string]: "0.08s" }}>
          <Rich text={t.title} />
        </h1>
        <p className="t-lead fade-up mt-8 max-w-[56ch] text-ink-2" style={{ ["--d" as string]: "0.16s" }}>
          {t.lead}
        </p>
        <div className="fade-up mt-14" style={{ ["--d" as string]: "0.24s" }}>
          <ProjectsBrowser lang={lang} />
        </div>
      </div>
    </PageTransition>
  );
}
