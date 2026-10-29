import { isPlaceholder, profile } from "@/data/profile";
import { ui } from "@/data/ui";
import type { Lang } from "@/lib/i18n";
import { Rich } from "./Rich";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { SocialIcon } from "./SocialIcon";
import { Arrow } from "./Arrow";

export function Contact({ lang }: { lang: Lang }) {
  const t = ui[lang].sections.contact;
  const links = [
    { name: "email" as const, label: profile.email, href: `mailto:${profile.email}`, show: true },
    { name: "github" as const, label: "GitHub", href: profile.socials.github, show: !isPlaceholder(profile.socials.github) },
    { name: "linkedin" as const, label: "LinkedIn", href: profile.socials.linkedin, show: !isPlaceholder(profile.socials.linkedin) },
  ].filter((l) => l.show);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#8e3a7d_35%,transparent),transparent_70%)] blur-2xl" />
      <div className="container-x">
        <p className="t-label flex items-center gap-3 border-t border-line pt-6 text-muted md:pt-8">
          <span className="text-accent-fg">(06)</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          {t.kicker}
        </p>
        <Reveal>
          <h2 id="contact-title" className="t-display mt-10 max-w-[13ch] text-[clamp(3.2rem,9vw,8.5rem)] [font-variation-settings:'opsz'_96,'wdth'_92]">
            <Rich text={t.title} />
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="t-lead text-ink-2">{t.lead}</p>
            <ul className="mt-8 grid gap-1">
              {links.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    {...(l.name === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex items-center justify-between gap-4 border-b border-line py-4 transition hover:border-accent-fg"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <SocialIcon name={l.name} className="h-5 w-5 shrink-0 text-muted transition group-hover:text-accent-fg" />
                      <span className="truncate text-lg">{l.label}</span>
                    </span>
                    <Arrow dir="ne" className="h-4 w-4 shrink-0 transition duration-500 group-hover:rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
            <ContactForm lang={lang} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
