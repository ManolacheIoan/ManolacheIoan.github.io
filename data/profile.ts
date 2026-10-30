import type { L, LList } from "@/lib/i18n";

/**
 * Everything about you, in one place.
 * Text in [square brackets] is a placeholder: replace it (see README → "Ce mai trebuie completat").
 */
export const profile = {
  name: "Ioan Manolache",
  alias: "John Mnl",
  firstName: "Ioan",
  lastName: "Manolache",
  city: { ro: "România", en: "Romania" } satisfies L,
  /** IANA time zone, used for the live clock in the hero. */
  timeZone: "Europe/Bucharest",

  /** Leave empty ("") until you have it. The site hides what is missing. */
  email: "[email@exemplu.ro]",
  socials: {
    github: "https://github.com/ManolacheIoan",
    linkedin: "[https://www.linkedin.com/in/...]",
  },

  /** Your photo, e.g. "/me.jpg" in /public (portrait, 4:5). Empty = elegant monogram placeholder. */
  photo: "",
  /** CV file in /public. */
  cv: "/cv.pdf",

  /** Small status line in the hero. Set to null to hide it. */
  availability: {
    ro: "Deschis la colaborări",
    en: "Open to collaborations",
  } satisfies L as L | null,

  role: {
    ro: "Software Engineer · Masterand Informatică Aplicată, UGAL",
    en: "Software Engineer · MSc student in Applied Computer Science, UGAL",
  } satisfies L,

  /** Hero sentence. Words between *stars* are set in the italic serif. */
  intro: {
    ro: "Construiesc *aplicații web complete*, de la interfață la server și bază de date. Simple de folosit oricând, oriunde.",
    en: "I build *complete web applications*, from interface to server and database. Simple to use anytime, anywhere.",
  } satisfies L,

  /** "About me" paragraphs. */
  about: {
    ro: [
      "Sunt Ioan, iar online semnez John Mnl. Am terminat licența în Informatică Aplicată la Universitatea „Dunărea de Jos” din Galați și acum sunt în primul an de master, pe aceeași specializare.",
      "Îmi place să duc un proiect de la o idee pe hârtie până la ceva ce poți deschide pe telefon: interfață, logică, date și publicare. Din același motiv am fondat Manotek, un studio mic prin care fac site-uri și aplicații pentru firme.",
      "În paralel construiesc proiecte proprii, de la un ghid pentru alegerea unei mașini second-hand la o aplicație de antrenor personal, ca să învăț lucruri pe care nu le-aș întâlni altfel.",
    ],
    en: [
      "I'm Ioan, and online I go by John Mnl. I earned my bachelor's degree in Applied Computer Science at “Dunărea de Jos” University of Galați, and I'm now in the first year of my master's in the same field.",
      "I like taking a project from an idea on paper to something you can open on your phone: interface, logic, data and deployment. That's also why I founded Manotek, a small studio where I build websites and apps for businesses.",
      "Alongside it I build my own projects, from a guide for choosing a used car to a personal-trainer app, to learn things I wouldn't run into otherwise.",
    ],
  } satisfies LList,

  /** Short facts shown next to the "About" text. */
  facts: [
    { label: { ro: "Bază", en: "Based in" }, value: { ro: "România", en: "Romania" } },
    { label: { ro: "Studii", en: "Studies" }, value: { ro: "Master, anul I · UGAL", en: "MSc, year 1 · UGAL" } },
    { label: { ro: "Studio", en: "Studio" }, value: { ro: "Fondator Manotek", en: "Founder of Manotek" } },
    { label: { ro: "Online", en: "Online" }, value: { ro: "John Mnl", en: "John Mnl" } },
  ] satisfies { label: L; value: L }[],

  /** Contact form. Paste your Formspree form ID (e.g. "xyzabcd") to send messages directly; empty = opens the email app. */
  formspreeId: "",
};

/** Public address of the site (no trailing slash). Used for SEO, sitemap and social previews. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://johnmnl.example").replace(/\/$/, "");

/** True when a value is still a [placeholder]. */
export const isPlaceholder = (v: string | null | undefined) => !v || /^\[.*\]$/.test(v.trim());
