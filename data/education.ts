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
  /** University internship (optional). */
  internship?: { title: L; summary: L } | null;
};

// Newest first. Check the years and the faculty name (see README).
export const education: EducationItem[] = [
  {
    id: "master",
    period: "2026 —",
    current: true,
    degree: { ro: "Master · anul I", en: "Master's · year 1" },
    program: { ro: "Automatică și Informatică Aplicată", en: "Automation and Applied Informatics" },
    school: {
      ro: "Universitatea „Dunărea de Jos” din Galați",
      en: "“Dunărea de Jos” University of Galați",
    },
    faculty: { ro: "Facultatea de Automatică, Calculatoare, Inginerie Electrică și Electronică", en: "Faculty of Automation, Computers, Electrical Engineering and Electronics" },
    note: { ro: "În curs", en: "In progress" },
    courses: { ro: [], en: [] },
  },
  {
    id: "licenta",
    period: "2022 — 2026",
    degree: { ro: "Licență", en: "Bachelor's degree" },
    program: { ro: "Automatică și Informatică Aplicată", en: "Automation and Applied Informatics" },
    school: {
      ro: "Universitatea „Dunărea de Jos” din Galați",
      en: "“Dunărea de Jos” University of Galați",
    },
    faculty: { ro: "Facultatea de Automatică, Calculatoare, Inginerie Electrică și Electronică", en: "Faculty of Automation, Computers, Electrical Engineering and Electronics" },
    note: { ro: "Absolvit", en: "Graduated" },
    // Example: { ro: ["Structuri de date", "Baze de date"], en: ["Data structures", "Databases"] }
    courses: { ro: [], en: [] },
    thesis: {
      title: { ro: "Progres 100: aplicație mobilă pentru renunțarea la obiceiurile nocive", en: "Progres 100: a mobile app for breaking harmful habits" },
      summary: {
        ro: "Aplicație mobilă construită cu React Native, Expo și Firebase, care te ajută să renunți la obiceiurile nocive, îți urmărește progresul și oferă sfaturi generate cu AI prin Claude API.",
        en: "A mobile app built with React Native, Expo and Firebase that helps you break harmful habits, tracks your progress and gives AI-generated tips through the Claude API.",
      },
    },
    internship: {
      title: { ro: "Practică · Thecon, Galați · ian – mar 2024", en: "Internship · Thecon, Galați · Jan – Mar 2024" },
      summary: {
        ro: "Practica de la facultate: am scris HTML, CSS și JavaScript pentru proiecte web ale firmei, timp de trei luni.",
        en: "University internship: three months writing HTML, CSS and JavaScript for the company's web projects.",
      },
    },
  },
];
