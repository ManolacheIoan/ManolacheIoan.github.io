// Two languages: Romanian (default, no prefix) and English (under /en).
export type Lang = "ro" | "en";
export const langs: Lang[] = ["ro", "en"];

/** A piece of text in both languages. */
export type L = { ro: string; en: string };
/** A list of texts in both languages. */
export type LList = { ro: string[]; en: string[] };

/** URL builders, so every link points to the right language version. */
export const paths = {
  home: (lang: Lang) => (lang === "ro" ? "/" : "/en/"),
  projects: (lang: Lang) => (lang === "ro" ? "/proiecte/" : "/en/projects/"),
  project: (lang: Lang, slug: string) =>
    lang === "ro" ? `/proiecte/${slug}/` : `/en/projects/${slug}/`,
  section: (lang: Lang, id: string) => `${lang === "ro" ? "/" : "/en/"}#${id}`,
};

/** The same page in the other language (used by the language switch). */
export function otherLangPath(pathname: string, to: Lang): string {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const ro = p.startsWith("/en/") ? p.replace(/^\/en\//, "/").replace(/^\/projects\//, "/proiecte/") : p;
  if (to === "ro") return ro;
  return `/en${ro.replace(/^\/proiecte\//, "/projects/")}`;
}

export const locale: Record<Lang, string> = { ro: "ro_RO", en: "en_US" };
