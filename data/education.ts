import type { L, LList } from "@/lib/i18n";

export type EducationItem = {
  id: string;
  period: string;
  current?: boolean;
  degree: L;
  program: L;
  school: L;
  /** Faculty name. [Placeholder] values are shown as-is until you replace them. */
  faculty: L;
  note?: L;
  /** Relevant courses. Leave empty to hide the list. */
  courses: LList;
  /** Bachelor's thesis (optional). Set to null to hide. */
  thesis?: { title: L; summary: L } | null;
};

// Newest first. Check the years and the faculty name (see README).
export const education: EducationItem[] = [
  {
    id: "master",
    period: "2026 —",
    current: true,
    degree: { ro: "Master · anul I", en: "Master's · year 1" },
    program: { ro: "Informatică Aplicată", en: "Applied Computer Science" },
    school: {
      ro: "Universitatea „Dunărea de Jos” din Galați",
      en: "“Dunărea de Jos” University of Galați",
    },
    faculty: { ro: "[Facultatea — de completat]", en: "[Faculty — to fill in]" },
    note: { ro: "În curs", en: "In progress" },
    courses: { ro: [], en: [] },
  },
  {
    id: "licenta",
    period: "2022 — 2026",
    degree: { ro: "Licență", en: "Bachelor's degree" },
    program: { ro: "Informatică Aplicată", en: "Applied Computer Science" },
    school: {
      ro: "Universitatea „Dunărea de Jos” din Galați",
      en: "“Dunărea de Jos” University of Galați",
    },
    faculty: { ro: "[Facultatea — de completat]", en: "[Faculty — to fill in]" },
    note: { ro: "Absolvit", en: "Graduated" },
    // Example: { ro: ["Structuri de date", "Baze de date"], en: ["Data structures", "Databases"] }
    courses: { ro: [], en: [] },
    thesis: null,
  },
];
