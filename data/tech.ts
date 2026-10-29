import type { L } from "@/lib/i18n";

/**
 * Technologies, grouped. `id` is what projects reference in data/projects.ts.
 * `icon` is a Simple Icons name (https://simpleicons.org) or one of the built-in ones in components/TechIcon.tsx.
 * `workflow: true` means it's part of how you work in general, not tied to specific projects.
 */
export type Tech = { id: string; name: string; icon: string; workflow?: boolean };
export type TechGroup = { id: string; title: L; items: Tech[] };

export const techGroups: TechGroup[] = [
  {
    id: "frontend",
    title: { ro: "Frontend", en: "Frontend" },
    items: [
      { id: "html", name: "HTML", icon: "html5" },
      { id: "css", name: "CSS", icon: "css" },
      { id: "javascript", name: "JavaScript", icon: "javascript" },
      { id: "typescript", name: "TypeScript", icon: "typescript" },
      { id: "react", name: "React", icon: "react" },
      { id: "nextjs", name: "Next.js", icon: "nextdotjs" },
      { id: "tailwind", name: "Tailwind CSS", icon: "tailwindcss" },
      { id: "motion", name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    id: "backend",
    title: { ro: "Backend și date", en: "Backend & data" },
    items: [
      { id: "python", name: "Python", icon: "python" },
      { id: "fastapi", name: "FastAPI", icon: "fastapi" },
      { id: "postgresql", name: "PostgreSQL", icon: "postgresql" },
    ],
  },
  {
    id: "other",
    title: { ro: "Altele", en: "Other" },
    items: [
      { id: "pwa", name: "PWA", icon: "pwa" },
      { id: "claude", name: "Claude API (AI)", icon: "claude" },
      { id: "i18n", name: "i18n", icon: "globe" },
      { id: "seo", name: "SEO", icon: "search" },
      { id: "a11y", name: "Accesibilitate", icon: "a11y" },
      { id: "git", name: "Git", icon: "git", workflow: true },
      { id: "netlify", name: "Netlify", icon: "netlify" },
      { id: "eslint", name: "ESLint", icon: "eslint", workflow: true },
    ],
  },
  {
    // From university. Add only what you actually used, e.g. { id: "java", name: "Java", icon: "openjdk" }.
    // The group is hidden while it's empty.
    id: "university",
    title: { ro: "De la facultate", en: "From university" },
    items: [],
  },
];

/** English names where they differ. */
export const techNameEn: Record<string, string> = { a11y: "Accessibility" };

export const allTech = techGroups.flatMap((g) => g.items);
export const techById = Object.fromEntries(allTech.map((t) => [t.id, t])) as Record<string, Tech>;

/** Display name of a technology in the given language. */
export const techName = (id: string, lang: "ro" | "en") =>
  (lang === "en" && techNameEn[id]) || techById[id]?.name || id;
