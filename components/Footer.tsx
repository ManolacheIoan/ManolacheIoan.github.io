import Link from "next/link";
import { isPlaceholder, profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { locale, paths, type Lang } from "@/lib/i18n";
import { LocalClock } from "./LocalClock";
import { SocialIcon } from "./SocialIcon";
import { Arrow } from "./Arrow";
import { SectionLink } from "./SectionLink";

export function Footer({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const socials = [
    { name: "github" as const, href: profile.socials.github, label: "GitHub" },
    { name: "linkedin" as const, href: profile.socials.linkedin, label: "LinkedIn" },
  ].filter((s) => !isPlaceholder(s.href));

  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="t-label text-muted">{profile.name}</p>
          <p className="mt-3 max-w-[34ch] text-ink-2">{profile.role[lang]}</p>
        </div>
        <nav aria-label={lang === "ro" ? "Subsol" : "Footer"} className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            <li><Link className="link-u" href={paths.projects(lang)}>{t.nav.work}</Link></li>
            <li><SectionLink lang={lang} id="despre" className="link-u">{t.nav.about}</SectionLink></li>
            <li><SectionLink lang={lang} id="educatie" className="link-u">{t.nav.education}</SectionLink></li>
            <li><SectionLink lang={lang} id="tehnologii" className="link-u">{t.nav.stack}</SectionLink></li>
            <li><SectionLink lang={lang} id="manotek" className="link-u">{t.nav.manotek}</SectionLink></li>
            <li><SectionLink lang={lang} id="contact" className="link-u">{t.nav.contact}</SectionLink></li>
          </ul>
        </nav>
        <div className="flex items-start gap-2 md:col-span-3 md:justify-end">
          {socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:border-accent hover:bg-accent hover:text-on-accent">
              <SocialIcon name={s.name} />
            </a>
          ))}
          <a href={profile.cv} download className="grid h-11 place-items-center rounded-full border border-line px-4 t-label transition hover:border-accent hover:bg-accent hover:text-on-accent">
            {t.cv} ↓
          </a>
        </div>
      </div>

      {/* Giant wordmark */}
      <p aria-hidden="true" className="footer-mark container-x mt-14 select-none whitespace-nowrap text-center font-display font-bold leading-[0.8] tracking-[-0.06em]">
        John Mnl<span className="ml-[0.12em] text-accent-fg">.</span>
      </p>

      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-muted">
        <p>© {new Date().getFullYear()} {profile.name}. {t.footer.rights}</p>
        <p className="t-label">
          {profile.city[lang]} · <LocalClock timeZone={profile.timeZone} locale={locale[lang].replace("_", "-")} />
        </p>
        <SectionLink lang={lang} id="top" className="link-u inline-flex items-center gap-2">
          {t.footer.top} <Arrow dir="n" className="h-3.5 w-3.5" />
        </SectionLink>
      </div>
    </footer>
  );
}
