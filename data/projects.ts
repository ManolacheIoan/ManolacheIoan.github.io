import type { L, LList } from "@/lib/i18n";

export type ProjectKind = "personal" | "demo";
/** Drives the colored dot next to the status. */
export type StatusTone = "live" | "ready" | "local" | "demo";

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  /** Shown on the home page, in this order (see `featuredOrder`). */
  featured?: boolean;
  tagline: L;
  description: LList;
  features: LList;
  status: L;
  statusTone: StatusTone;
  /** Tech ids from data/tech.ts. */
  tech: string[];
  /** Base name of the screenshot in public/projects (without -640/-1200.webp). */
  image?: string;
  /** Built-in diagram instead of a screenshot. */
  diagram?: "watch";
  links?: { label: L; href: string }[];
};

const NEXT_TS = ["nextjs", "react", "typescript"];

export const projects: Project[] = [
  // ─────────────── Personal projects ───────────────
  {
    slug: "alegemasina",
    name: "AlegeMasina",
    kind: "personal",
    featured: true,
    tagline: {
      ro: "Platformă care te ajută să alegi o mașină second-hand în România.",
      en: "A platform that helps you choose a used car in Romania.",
    },
    description: {
      ro: [
        "Patru întrebări despre buget, utilizare și preferințe, apoi o listă de modele potrivite, fiecare cu un scor explicat: vezi de ce a primit nota respectivă, nu doar nota.",
        "În jurul recomandărilor am construit un catalog cu filtre, o comparație între modele și calculatoare pentru costurile reale de folosire.",
      ],
      en: [
        "Four questions about budget, usage and preferences, then a list of matching models, each with an explained score: you see why it got that score, not just the number.",
        "Around the recommendations I built a filterable catalog, a side-by-side comparison and calculators for the real running costs.",
      ],
    },
    features: {
      ro: [
        "Patru întrebări și un scor explicat",
        "Catalog de modele cu filtre",
        "Comparație între până la 4 modele",
        "Calculatoare de cost",
        "Favorite",
      ],
      en: [
        "Four questions and an explained score",
        "Model catalog with filters",
        "Side-by-side comparison of up to 4 models",
        "Cost calculators",
        "Favorites",
      ],
    },
    status: { ro: "În lucru · încă negăzduit", en: "In progress · not hosted yet" },
    statusTone: "local",
    tech: [...NEXT_TS, "tailwind"],
    image: "alegemasina",
  },
  {
    slug: "fitplan",
    name: "FitPlan",
    kind: "personal",
    featured: true,
    tagline: {
      ro: "Antrenor personal pe telefon, cu planuri făcute după reguli clare, fără AI.",
      en: "A personal trainer on your phone, with plans built from clear rules, no AI.",
    },
    description: {
      ro: [
        "O aplicație instalabilă pe telefon (PWA), cu conturi, care face un plan de sală și ținte de calorii pe baza unor reguli clare și verificabile, nu a unui model AI.",
        "Pe lângă plan, ține un jurnal de antrenamente, mese și greutate, arată progresul în grafice și începe cu un screening de siguranță.",
      ],
      en: [
        "An installable phone app (PWA) with accounts that builds a gym plan and calorie targets from clear, checkable rules rather than an AI model.",
        "Beyond the plan, it keeps a log of workouts, meals and weight, charts your progress and starts with a safety screening.",
      ],
    },
    features: {
      ro: [
        "Plan de sală și ținte de calorii după reguli clare",
        "Jurnal de antrenamente, mese și greutate",
        "Grafice de progres",
        "Screening de siguranță",
        "Conturi de utilizator, instalabilă ca aplicație",
      ],
      en: [
        "Gym plan and calorie targets from clear rules",
        "Workout, meal and weight log",
        "Progress charts",
        "Safety screening",
        "User accounts, installable as an app",
      ],
    },
    status: { ro: "Funcțional și testat · încă nepublic", en: "Working and tested · not public yet" },
    statusTone: "ready",
    tech: [...NEXT_TS, "python", "fastapi", "rest", "postgresql", "pwa"],
    image: "fitplan",
  },
  {
    slug: "busola",
    name: "Busola",
    kind: "personal",
    featured: true,
    tagline: {
      ro: "Test de carieră și autodescoperire, ca un interviu ghidat în 8 etape.",
      en: "A career and self-discovery test, run as an 8-step guided interview.",
    },
    description: {
      ro: [
        "Busola te trece prin opt etape care combină modele cunoscute: Holland, Big Five, valori, ancore de carieră și Ikigai.",
        "La final primești un profil calculat, un raport scris generat la cerere cu Claude și cinci experimente de încercat chiar luna asta. Răspunsurile rămân în browserul tău.",
      ],
      en: [
        "Busola walks you through eight steps that combine well-known models: Holland, Big Five, values, career anchors and Ikigai.",
        "At the end you get a computed profile, a written report generated on demand with Claude, and five experiments to try this month. Your answers stay in your browser.",
      ],
    },
    features: {
      ro: [
        "Interviu ghidat în 8 etape",
        "Holland, Big Five, valori, ancore de carieră, Ikigai",
        "Profil calculat la final",
        "Raport scris generat la cerere cu Claude",
        "5 experimente de încercat luna asta",
        "Răspunsurile rămân în browser",
      ],
      en: [
        "8-step guided interview",
        "Holland, Big Five, values, career anchors, Ikigai",
        "Computed profile at the end",
        "Written report generated on demand with Claude",
        "5 experiments to try this month",
        "Answers stay in the browser",
      ],
    },
    status: { ro: "Proiect personal", en: "Personal project" },
    statusTone: "ready",
    tech: ["html", "css", "javascript", "claude"],
    image: "busola",
  },
  {
    slug: "progres-100",
    name: "Progres 100",
    kind: "personal",
    tagline: {
      ro: "Aplicație mobilă de urmărire a progresului, cu sfaturi generate de AI. Lucrarea mea de licență.",
      en: "A mobile progress-tracking app with AI-generated tips. My bachelor's thesis.",
    },
    description: {
      ro: [
        "Lucrarea mea de licență: o aplicație mobilă care te ajută să-ți urmărești progresul zi de zi, după motto-ul „Fiecare zi contează”.",
        "Am construit-o cu React Native și Expo, cu datele în Firebase, iar sfaturile personalizate sunt generate cu AI prin Claude API.",
      ],
      en: [
        "My bachelor's thesis: a mobile app that helps you track your progress day by day, built around the motto “Every day counts”.",
        "I built it with React Native and Expo, with data stored in Firebase, and personalised tips generated with AI through the Claude API.",
      ],
    },
    features: {
      ro: ["Aplicație mobilă cu React Native și Expo", "Urmărirea progresului zilnic", "Sfaturi generate cu AI (Claude API)", "Date sincronizate în Firebase"],
      en: ["Mobile app built with React Native and Expo", "Daily progress tracking", "AI-generated tips (Claude API)", "Data synced with Firebase"],
    },
    status: { ro: "Lucrare de licență", en: "Bachelor's thesis" },
    statusTone: "ready",
    tech: ["reactnative", "expo", "firebase", "claude"],
    image: "progres-100",
  },
  {
    slug: "viata-de-hibrid",
    name: "Viața de Hibrid",
    kind: "personal",
    featured: true,
    tagline: {
      ro: "Site personal cu două fețe: Studio pentru proiecte digitale, Arena pentru sport.",
      en: "A two-sided personal site: Studio for digital projects, Arena for sport.",
    },
    description: {
      ro: [
        "Pagina de intrare e împărțită în două: Studio, pentru proiecte digitale, și Arena, pentru sport. Fiecare jumătate are culorile și animațiile ei.",
        "Mai are galerie, formular de contact și animații la scroll.",
      ],
      en: [
        "The landing page is split in two: Studio, for digital projects, and Arena, for sport. Each half has its own colors and animations.",
        "It also has a gallery, a contact form and scroll animations.",
      ],
    },
    features: {
      ro: [
        "Intrare împărțită în două lumi",
        "Culori și animații diferite pe fiecare parte",
        "Galerie",
        "Formular de contact",
        "Animații la scroll",
      ],
      en: [
        "Landing split into two worlds",
        "Different colors and animations on each side",
        "Gallery",
        "Contact form",
        "Scroll animations",
      ],
    },
    status: { ro: "Proiect personal", en: "Personal project" },
    statusTone: "ready",
    tech: [...NEXT_TS, "tailwind", "motion"],
    image: "viata-de-hibrid",
  },
  {
    slug: "manotek-watch",
    name: "Manotek Watch",
    kind: "personal",
    featured: true,
    tagline: {
      ro: "Platformă de monitorizare a site-urilor, cu peste 660 de teste automate pe backend.",
      en: "A website monitoring platform with 660+ automated backend tests.",
    },
    description: {
      ro: [
        "Cel mai mare proiect al meu: un serviciu care verifică periodic site-urile, deschide și închide automat incidente și trimite alerte pe Discord, plus avertizări când expiră certificatele SSL.",
        "În spate rulează un worker care preia sarcinile în siguranță, chiar și în paralel. Securitatea e lucrată: protecție SSRF, webhook-uri criptate, autentificare în doi pași (2FA) și protecție CSRF.",
        "Am scris peste 660 de teste pentru backend, plus 149 de teste unitare și 154 end-to-end. Am configurat CI/CD, monitorizare cu Prometheus și Grafana, publicare pe HTTPS și un ghid de backup și restaurare.",
      ],
      en: [
        "My biggest project: a service that checks websites periodically, opens and closes incidents automatically and sends Discord alerts, plus warnings when SSL certificates are about to expire.",
        "Behind it runs a background worker that picks up jobs safely, even concurrently. Security is built in: SSRF protection, encrypted webhooks, two-factor authentication (2FA) and CSRF protection.",
        "I wrote 660+ backend tests, plus 149 unit and 154 end-to-end tests. I set up CI/CD, Prometheus and Grafana monitoring, HTTPS deployment and a backup and restore runbook.",
      ],
    },
    features: {
      ro: [
        "Verificări periodice și incidente deschise/închise automat",
        "Alerte pe Discord și avertizări de expirare SSL",
        "Worker cu blocare sigură a sarcinilor în paralel",
        "Protecție SSRF și CSRF, webhook-uri criptate, 2FA",
        "660+ teste backend, 149 unitare, 154 end-to-end",
        "CI/CD, monitorizare Prometheus/Grafana, backup și restaurare",
      ],
      en: [
        "Periodic checks with incidents opened and closed automatically",
        "Discord alerts and SSL expiry warnings",
        "Background worker with safe concurrent job locking",
        "SSRF and CSRF protection, encrypted webhooks, 2FA",
        "660+ backend tests, 149 unit, 154 end-to-end",
        "CI/CD, Prometheus/Grafana monitoring, backup and restore",
      ],
    },
    status: { ro: "Funcțional local · încă nepublic", en: "Working locally · not public yet" },
    statusTone: "local",
    tech: [
      "python", "fastapi", "rest", "postgresql", "sqlalchemy", "nextjs", "react", "typescript",
      "pytest", "vitest", "playwright", "docker", "githubactions", "caddy", "prometheus", "grafana",
    ],
    image: "manotek-watch",
  },
  {
    slug: "manotek",
    name: "Manotek.ro",
    kind: "personal",
    tagline: {
      ro: "Site-ul studioului meu, în română, engleză și germană.",
      en: "My studio's website, in Romanian, English and German.",
    },
    description: {
      ro: [
        "Site static pentru Manotek, în trei limbi, cu temă luminoasă și întunecată, SEO lucrat și un fundal animat.",
      ],
      en: [
        "A static site for Manotek in three languages, with light and dark themes, careful SEO and an animated background.",
      ],
    },
    features: {
      ro: [
        "Trei limbi: română, engleză, germană",
        "Temă luminoasă și întunecată",
        "SEO și date structurate",
        "Fundal animat",
      ],
      en: [
        "Three languages: Romanian, English, German",
        "Light and dark theme",
        "SEO and structured data",
        "Animated background",
      ],
    },
    status: { ro: "Construit · lansare în pregătire", en: "Built · launch in preparation" },
    statusTone: "ready",
    tech: [...NEXT_TS, "tailwind", "i18n", "seo", "a11y", "netlify"],
    image: "manotek",
  },

  // ─────────────── Demo projects (fictional businesses) ───────────────
  {
    slug: "akropolis",
    name: "Akropolis",
    kind: "demo",
    tagline: {
      ro: "Tavernă grecească: meniu, coș și comandă trimisă pe WhatsApp.",
      en: "Greek taverna: menu, cart and orders sent over WhatsApp.",
    },
    description: {
      ro: [
        "Site pentru o tavernă grecească, cu meniu și coș de cumpărături. Comanda pleacă sub forma unui singur mesaj pe WhatsApp, deci restaurantul nu are nevoie de alt sistem.",
      ],
      en: [
        "A site for a Greek taverna with a menu and a cart. The order goes out as a single WhatsApp message, so the restaurant needs no other system.",
      ],
    },
    features: {
      ro: ["Meniu cu coș", "Comanda trimisă ca un singur mesaj WhatsApp", "Temă luminoasă și întunecată"],
      en: ["Menu with cart", "Order sent as a single WhatsApp message", "Light and dark theme"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: ["html", "css", "javascript"],
    image: "akropolis",
  },
  {
    slug: "temelia",
    name: "Temelia",
    kind: "demo",
    tagline: {
      ro: "Catalog pentru un magazin de materiale de construcții.",
      en: "Catalog for a building materials store.",
    },
    description: {
      ro: [
        "Catalog online cu căutare care ignoră diacriticele, filtre pe categorii și câte o pagină pentru fiecare produs, cu variante și buton „Sună acum”.",
      ],
      en: [
        "An online catalog with search that ignores diacritics, category filters and a page for every product, with variants and a “Call now” button.",
      ],
    },
    features: {
      ro: ["Căutare care ignoră diacriticele", "Filtre pe categorii", "Pagină de produs cu variante", "Buton „Sună acum”"],
      en: ["Diacritics-insensitive search", "Category filters", "Product pages with variants", "“Call now” button"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "css"],
    image: "temelia",
  },
  {
    slug: "zambet-mare",
    name: "Zâmbet Mare",
    kind: "demo",
    featured: true,
    tagline: {
      ro: "Clinică stomatologică pentru familie, cu o pagină animată pentru copii.",
      en: "Family dental clinic, with an animated page for kids.",
    },
    description: {
      ro: [
        "Site pentru o clinică stomatologică de familie: servicii, prețuri, echipă și programare online.",
        "Pentru copii are o pagină separată, cu mascote desenate și o demonstrație animată de periaj.",
      ],
      en: [
        "A site for a family dental clinic: services, prices, team and online booking.",
        "Kids get their own page, with hand-drawn mascots and an animated brushing demo.",
      ],
    },
    features: {
      ro: ["Servicii, prețuri și echipă", "Pagină pentru copii cu demonstrație animată de periaj", "Mascote desenate", "Programare online"],
      en: ["Services, prices and team", "Kids' page with an animated brushing demo", "Hand-drawn mascots", "Online booking"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "css", "a11y"],
    image: "zambet-mare",
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/zambet-mare" }],
  },
  {
    slug: "atelierul-suvitelor",
    name: "Atelierul Șuvițelor",
    kind: "demo",
    tagline: {
      ro: "Salon și barbershop, cu programare pe orele libere ale fiecărui specialist.",
      en: "Salon and barbershop, with booking on each stylist's free slots.",
    },
    description: {
      ro: [
        "Site pentru un salon de coafură și barbershop. Programarea online arată doar orele libere ale fiecărui specialist.",
        "Mai are galerie și temă luminoasă și întunecată.",
      ],
      en: [
        "A site for a hair salon and barbershop. Online booking only shows each specialist's free slots.",
        "It also has a gallery and a light and dark theme.",
      ],
    },
    features: {
      ro: ["Programare cu orele libere ale fiecărui specialist", "Galerie", "Temă luminoasă și întunecată"],
      en: ["Booking with each specialist's free slots", "Gallery", "Light and dark theme"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "css"],
    image: "atelierul-suvitelor",
  },
  {
    slug: "respiro",
    name: "Respiro",
    kind: "demo",
    tagline: {
      ro: "Studio de masaj, cu card cadou tipăribil și ghid de respirație animat.",
      en: "Massage studio, with a printable gift card and an animated breathing guide.",
    },
    description: {
      ro: [
        "Site pentru un studio de masaj: servicii și prețuri, card cadou care se poate tipări, un ghid de respirație animat și formular de programare.",
      ],
      en: [
        "A site for a massage studio: services and prices, a printable gift card, an animated breathing guide and a booking form.",
      ],
    },
    features: {
      ro: ["Servicii și prețuri", "Card cadou tipăribil", "Ghid de respirație animat", "Formular de programare"],
      en: ["Services and prices", "Printable gift card", "Animated breathing guide", "Booking form"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "css"],
    image: "respiro",
  },
  {
    slug: "birou-notarial-cervin",
    name: "Birou Notarial Cervin",
    kind: "demo",
    tagline: {
      ro: "Birou notarial, cu acte necesare interactive și estimator de onorarii.",
      en: "Notary office, with an interactive document checklist and a fee estimator.",
    },
    description: {
      ro: [
        "Site pentru un birou notarial care încearcă să facă procedurile mai ușor de înțeles: o listă interactivă cu actele necesare, un estimator de onorarii și cronologia fiecărei proceduri.",
        "La final, programarea se face direct din site.",
      ],
      en: [
        "A site for a notary office that tries to make procedures easier to understand: an interactive checklist of required documents, a fee estimator and a timeline for each procedure.",
        "Appointments are booked straight from the site.",
      ],
    },
    features: {
      ro: ["Listă interactivă de acte necesare", "Estimator de onorarii", "Cronologia procedurii", "Programări"],
      en: ["Interactive required-documents checklist", "Fee estimator", "Procedure timeline", "Appointments"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "css"],
    image: "birou-notarial-cervin",
  },
  {
    slug: "clubul-curiosilor",
    name: "Clubul Curioșilor",
    kind: "demo",
    tagline: {
      ro: "Centru educațional pentru copii de 4–14 ani, cu programe prezentate ca „misiuni”.",
      en: "Learning center for kids aged 4–14, with programs presented as “missions”.",
    },
    description: {
      ro: [
        "Site pentru un centru educațional pentru copii de 4–14 ani. Programele sunt prezentate ca „misiuni”, cu filtre, tabere, personaje desenate și înscriere online.",
      ],
      en: [
        "A site for a learning center for kids aged 4–14. Programs are presented as “missions”, with filters, camps, hand-drawn characters and online sign-up.",
      ],
    },
    features: {
      ro: ["Programe prezentate ca „misiuni”", "Filtre", "Tabere", "Personaje desenate", "Înscriere online"],
      en: ["Programs presented as “missions”", "Filters", "Camps", "Hand-drawn characters", "Online sign-up"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "css"],
    image: "clubul-curiosilor",
  },
];

/** Projects on the home page, in this order. */
export const featuredOrder = [
  "manotek-watch",
  "alegemasina",
  "fitplan",
  "busola",
  "viata-de-hibrid",
  "zambet-mare",
];

export const featuredProjects = featuredOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
