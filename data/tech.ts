import type { L } from "@/lib/i18n";

/**
 * Technologies, grouped. `id` is what projects reference in data/projects.ts.
 * `icon` is a Simple Icons name (https://simpleicons.org) or one of the built-in ones in components/TechIcon.tsx.
 * `workflow: true` means it's part of how you work in general, not tied to specific projects.
 */
export type Tech = {
  id: string;
  name: string;
  icon: string;
  workflow?: boolean;
  /** Shown instead of "no public project yet" when the tech was used somewhere not listed as a project. */
  note?: L;
};
export type TechGroup = { id: string; title: L; items: Tech[] };

const THESIS: L = { ro: "Folosită în lucrarea de licență", en: "Used in my bachelor's thesis" };

export const techGroups: TechGroup[] = [
  {
    id: "frontend",
    title: { ro: "Frontend și mobil", en: "Frontend & mobile" },
    items: [
      { id: "html", name: "HTML", icon: "html5" },
      { id: "css", name: "CSS", icon: "css" },
      { id: "javascript", name: "JavaScript", icon: "javascript" },
      { id: "typescript", name: "TypeScript", icon: "typescript" },
      { id: "react", name: "React", icon: "react" },
      { id: "nextjs", name: "Next.js", icon: "nextdotjs" },
      { id: "tailwind", name: "Tailwind CSS", icon: "tailwindcss" },
      { id: "motion", name: "Framer Motion", icon: "framer" },
      { id: "reactnative", name: "React Native", icon: "react", note: THESIS },
      { id: "expo", name: "Expo", icon: "expo", note: THESIS },
    ],
  },
  {
    id: "backend",
    title: { ro: "Backend și date", en: "Backend & data" },
    items: [
      { id: "python", name: "Python", icon: "python" },
      { id: "fastapi", name: "FastAPI", icon: "fastapi" },
      { id: "rest", name: "REST API", icon: "code" },
      { id: "postgresql", name: "PostgreSQL", icon: "postgresql" },
      { id: "sqlalchemy", name: "SQLAlchemy", icon: "sqlalchemy" },
      { id: "firebase", name: "Firebase", icon: "firebase", note: THESIS },
    ],
  },
  {
    id: "testing",
    title: { ro: "Testare", en: "Testing" },
    items: [
      { id: "pytest", name: "pytest", icon: "pytest" },
      { id: "vitest", name: "Vitest", icon: "vitest" },
      { id: "playwright", name: "Playwright", icon: "check" },
    ],
  },
  {
    id: "devops",
    title: { ro: "DevOps", en: "DevOps" },
    items: [
      { id: "docker", name: "Docker / Compose", icon: "docker" },
      { id: "githubactions", name: "GitHub Actions", icon: "githubactions" },
      { id: "caddy", name: "Caddy", icon: "caddy" },
      { id: "prometheus", name: "Prometheus", icon: "prometheus" },
      { id: "grafana", name: "Grafana", icon: "grafana" },
      { id: "linux", name: "Linux", icon: "linux", workflow: true },
      { id: "git", name: "Git", icon: "git", workflow: true },
      { id: "netlify", name: "Netlify", icon: "netlify" },
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
      { id: "a11y", name: "Accesibilitate (axe)", icon: "a11y" },
      { id: "eslint", name: "ESLint", icon: "eslint", workflow: true },
    ],
  },
];

/** English names where they differ. */
export const techNameEn: Record<string, string> = { a11y: "Accessibility (axe)" };

export const allTech = techGroups.flatMap((g) => g.items);
export const techById = Object.fromEntries(allTech.map((t) => [t.id, t])) as Record<string, Tech>;

/** Display name of a technology in the given language. */
export const techName = (id: string, lang: "ro" | "en") =>
  (lang === "en" && techNameEn[id]) || techById[id]?.name || id;
