import type { Lang } from "@/lib/i18n";
import { Hero } from "./Hero";
import { FeaturedWork } from "./FeaturedWork";
import { Marquee } from "./Marquee";
import { About } from "./About";
import { Education } from "./Education";
import { Stack } from "./Stack";
import { Manotek } from "./Manotek";
import { Contact } from "./Contact";
import { PersonJsonLd } from "./JsonLd";
import { PageTransition } from "./PageTransition";

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <PageTransition>
      <div>
        <PersonJsonLd lang={lang} />
        <Hero lang={lang} />
        <FeaturedWork lang={lang} />
        <Marquee />
        <About lang={lang} />
        <Education lang={lang} />
        <Stack lang={lang} />
        <Manotek lang={lang} />
        <Contact lang={lang} />
      </div>
    </PageTransition>
  );
}
