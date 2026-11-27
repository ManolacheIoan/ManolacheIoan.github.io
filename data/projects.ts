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
    status: { ro: "În lucru", en: "In progress" },
    statusTone: "local",
    tech: [...NEXT_TS, "tailwind"],
    image: "alegemasina",
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/used-car-advisor" }],
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
    status: { ro: "Funcțional și testat · încă nelansat", en: "Working and tested · not launched yet" },
    statusTone: "ready",
    tech: [...NEXT_TS, "python", "fastapi", "rest", "postgresql", "pwa"],
    image: "fitplan",
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/fitplan" }],
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
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/busola-career-assessment" }],
  },
  {
    slug: "progres-100",
    name: "Progres 100",
    kind: "personal",
    tagline: {
      ro: "Aplicație mobilă care te ajută să renunți la obiceiurile nocive, cu sfaturi generate de AI. Lucrarea mea de licență.",
      en: "A mobile app that helps you break harmful habits, with AI-generated tips. My bachelor's thesis.",
    },
    description: {
      ro: [
        "Lucrarea mea de licență: o aplicație mobilă care te ajută să renunți la obiceiurile nocive și să-ți urmărești progresul zi de zi, după motto-ul „Fiecare zi contează”.",
        "Am construit-o cu React Native și Expo, cu datele în Firebase, iar sfaturile personalizate sunt generate cu AI prin Claude API.",
      ],
      en: [
        "My bachelor's thesis: a mobile app that helps you break harmful habits and track your progress day by day, built around the motto “Every day counts”.",
        "I built it with React Native and Expo, with data stored in Firebase, and personalised tips generated with AI through the Claude API.",
      ],
    },
    features: {
      ro: ["Aplicație mobilă cu React Native și Expo", "Renunțarea la obiceiurile nocive, cu progres zilnic", "Sfaturi generate cu AI (Claude API)", "Date sincronizate în Firebase"],
      en: ["Mobile app built with React Native and Expo", "Breaking harmful habits, with daily progress", "AI-generated tips (Claude API)", "Data synced with Firebase"],
    },
    status: { ro: "Lucrare de licență", en: "Bachelor's thesis" },
    statusTone: "ready",
    tech: ["reactnative", "expo", "firebase", "claude"],
    image: "progres-100",
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/progres100" }],
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
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/viata-de-hibrid" }],
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
    name: "Manotek",
    kind: "personal",
    tagline: {
      ro: "Site-ul studioului meu: prezență online pentru afaceri locale.",
      en: "My studio's website: online presence for local businesses.",
    },
    description: {
      ro: [
        "Site static pentru Manotek, în stil editorial luminos, cu tipografie lucrată, animații discrete și scroll lin.",
        "Are o pagină de audit gratuit, prin care o afacere locală cere o analiză a prezenței ei online.",
      ],
      en: [
        "A static site for Manotek in a light editorial style, with careful typography, subtle animations and smooth scrolling.",
        "It includes a free audit page where a local business can request a review of its online presence.",
      ],
    },
    features: {
      ro: ["Design editorial, luminos", "Animații discrete și scroll lin", "Pagină de audit gratuit", "SEO și date structurate"],
      en: ["Light editorial design", "Subtle animations and smooth scrolling", "Free audit page", "SEO and structured data"],
    },
    status: { ro: "Construit · lansare în pregătire", en: "Built · launch in preparation" },
    statusTone: "ready",
    tech: [...NEXT_TS, "tailwind", "motion", "seo", "a11y"],
    links: [{ label: { ro: "Previzualizare", en: "Preview" }, href: "https://manolacheioan.github.io/manotek-v2/" }],
    image: "manotek",
  },

  // ─────────────── Demo projects (fictional businesses) ───────────────
  {
    slug: "studio-lumen",
    name: "Studio Lumen",
    kind: "demo",
    tagline: { ro: "Salon și frizerie, cu două teme gata făcute: „salon” și „barber”.", en: "Hair salon and barbershop, with two ready-made themes: “salon” and “barber”." },
    description: {
      ro: ["Site pentru un salon de înfrumusețare și frizerie. Tot conținutul și tema stau într-un singur fișier: aceeași bază arată feminin și rafinat sau masculin și clasic, schimbând un singur cuvânt.", "Programarea se face în patru pași, cu rezumat la final, și pleacă pe e-mail sau ca mesaj WhatsApp precompletat."],
      en: ["A site for a hair and beauty salon with a barbershop. All content and the theme live in one file: the same build looks soft and refined or dark and classic by changing a single word.", "Booking takes four steps with a summary at the end, and goes out by e-mail or as a prefilled WhatsApp message."],
    },
    features: {
      ro: ["Două teme: salon și barber", "Servicii pe tab-uri, cu durată și preț", "Programare în 4 pași, cu WhatsApp", "Galerie filtrabilă cu lightbox", "Listă de prețuri printabilă"],
      en: ["Two themes: salon and barber", "Tabbed services with duration and price", "4-step booking with WhatsApp", "Filterable gallery with lightbox", "Printable price list"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "tailwind", "seo", "a11y"],
    image: "studio-lumen",
    links: [
      { label: { ro: "Demo live", en: "Live demo" }, href: "https://manolacheioan.github.io/salon-demo/" },
      { label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/salon-demo" },
    ],
  },
  {
    slug: "forja-fitness",
    name: "Forja Fitness",
    kind: "demo",
    tagline: { ro: "Sală de fitness, cu abonamente, program și antrenament de probă.", en: "Gym, with memberships, opening hours and a free trial session." },
    description: {
      ro: ["Site pentru o sală de fitness: abonamente, program, clase, antrenori și galerie. Vizitatorul cere un antrenament de probă gratuit printr-un formular scurt, care poate pleca și pe WhatsApp."],
      en: ["A site for a gym: memberships, opening hours, classes, trainers and a gallery. Visitors ask for a free trial session through a short form that can also go out over WhatsApp."],
    },
    features: {
      ro: ["Abonamente și program", "Formular pentru antrenament de probă", "Galerie cu lightbox", "Întrebări frecvente"],
      en: ["Memberships and opening hours", "Free trial request form", "Gallery with lightbox", "FAQ"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "tailwind", "seo", "a11y"],
    image: "forja-fitness",
    links: [
      { label: { ro: "Demo live", en: "Live demo" }, href: "https://manolacheioan.github.io/forja-fitness-demo/" },
      { label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/forja-fitness-demo" },
    ],
  },
  {
    slug: "aurelia",
    name: "Restaurant Aurelia",
    kind: "demo",
    tagline: { ro: "Restaurant cu sală de evenimente și cramă, cu calendar de date libere.", en: "Restaurant with an event hall and wine cellar, with an availability calendar." },
    description: {
      ro: ["Site pentru un restaurant cu sală de nunți și evenimente. Viitorii miri văd din prima lunile libere, meniurile pentru evenimente și sala, apoi cer o ofertă."],
      en: ["A site for a restaurant with a wedding and event hall. Couples see the free months, the event menus and the hall at a glance, then ask for a quote."],
    },
    features: {
      ro: ["Calendar „Date libere” pe luni", "Meniuri pentru evenimente", "Cerere de ofertă, cu WhatsApp", "Galerie"],
      en: ["Month-by-month availability calendar", "Event menus", "Quote request, with WhatsApp", "Gallery"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "tailwind", "seo", "a11y"],
    image: "aurelia",
    links: [
      { label: { ro: "Demo live", en: "Live demo" }, href: "https://manolacheioan.github.io/aurelia-evenimente-demo/" },
      { label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/aurelia-evenimente-demo" },
    ],
  },
  {
    slug: "conacul-brumarel",
    name: "Conacul Brumărel",
    kind: "demo",
    tagline: { ro: "Restaurant cu cazare: meniu, camere și evenimente în familie.", en: "Restaurant with rooms: menu, accommodation and family events." },
    description: {
      ro: ["Site pentru un restaurant cu pensiune: meniu complet pe categorii, pagină de cazare cu tipurile de camere și cerere de rezervare, plus evenimente în familie."],
      en: ["A site for a restaurant with guest rooms: a full menu by category, an accommodation page with room types and booking requests, plus family events."],
    },
    features: {
      ro: ["Meniu pe categorii", "Pagină de cazare cu cerere de rezervare", "Evenimente", "Fotografii înlocuibile cu cele reale dintr-un singur fișier"],
      en: ["Menu by category", "Accommodation page with booking requests", "Events", "Photos swappable for real ones from a single file"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "tailwind", "seo", "a11y"],
    image: "conacul-brumarel",
    links: [
      { label: { ro: "Demo live", en: "Live demo" }, href: "https://manolacheioan.github.io/conacul-brumarel-demo/" },
      { label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/conacul-brumarel-demo" },
    ],
  },
  {
    slug: "strada-grill",
    name: "Strada Grill",
    kind: "demo",
    tagline: { ro: "Fast food cu meniu, coș și comandă trimisă pe WhatsApp.", en: "Fast food with a menu, cart and orders sent over WhatsApp." },
    description: {
      ro: ["Site pentru un fast food: meniu pe categorii, oferta zilei și un coș în pagină. Comanda pleacă printr-un formular sau ca un singur mesaj pe WhatsApp, fără aplicații în plus."],
      en: ["A site for a fast food place: a menu by category, a daily offer and an in-page cart. The order goes out through a form or as a single WhatsApp message, with no extra apps."],
    },
    features: {
      ro: ["Meniu pe categorii, cu coș", "Oferta zilei", "Comandă prin formular sau WhatsApp", "Livrare și program"],
      en: ["Menu by category, with cart", "Daily offer", "Order by form or WhatsApp", "Delivery and opening hours"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "tailwind", "seo", "a11y"],
    image: "strada-grill",
    links: [
      { label: { ro: "Demo live", en: "Live demo" }, href: "https://manolacheioan.github.io/strada-grill-demo/" },
      { label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/strada-grill-demo" },
    ],
  },
  {
    slug: "notariat-avalon",
    name: "Birou Notarial Avalon",
    kind: "demo",
    tagline: { ro: "Birou notarial, cu acte necesare explicate pe fiecare serviciu.", en: "Notary office, with the required documents explained for every service." },
    description: {
      ro: ["Site pentru un birou notarial, cu câte o pagină pentru fiecare serviciu: ce include, ce acte sunt necesare și cum decurge. Programarea se face din site."],
      en: ["A site for a notary office with a page for every service: what it covers, which documents are needed and how it works. Appointments are booked from the site."],
    },
    features: {
      ro: ["Pagină pentru fiecare serviciu", "Liste de acte necesare", "Cum decurge o procedură", "Programare online"],
      en: ["A page for every service", "Required-document lists", "How each procedure works", "Online booking"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "tailwind", "seo", "a11y"],
    image: "notariat-avalon",
    links: [
      { label: { ro: "Demo live", en: "Live demo" }, href: "https://manolacheioan.github.io/notariat-demo/" },
      { label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/notariat-demo" },
    ],
  },
  {
    slug: "clarview",
    name: "ClarView Termopane",
    kind: "demo",
    tagline: { ro: "Firmă de termopane, cu configurator de ofertă și slider înainte/după.", en: "Window company, with a quote configurator and a before/after slider." },
    description: {
      ro: ["Site pentru o firmă de tâmplărie PVC și aluminiu. Clientul alege produsul, culoarea și dimensiunile într-un configurator și primește oferta după măsurători, iar lucrările se văd într-un slider înainte/după."],
      en: ["A site for a PVC and aluminium window company. Customers pick the product, colour and size in a configurator and get a quote after measuring, and past jobs are shown in a before/after slider."],
    },
    features: {
      ro: ["Configurator pentru cerere de ofertă", "Pagini de produs", "Slider înainte/după", "Zona de montaj"],
      en: ["Quote request configurator", "Product pages", "Before/after slider", "Installation area"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "tailwind", "seo", "a11y"],
    image: "clarview",
    links: [
      { label: { ro: "Demo live", en: "Live demo" }, href: "https://manolacheioan.github.io/termopane-demo/" },
      { label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/termopane-demo" },
    ],
  },
  {
    slug: "volan-academy",
    name: "Volan Academy",
    kind: "demo",
    tagline: { ro: "Școală de șoferi, cu test de exersare și înscriere online în 4 pași.", en: "Driving school, with a practice quiz and 4-step online enrolment." },
    description: {
      ro: ["Site pentru o școală de șoferi: categorii de permis, pachete de prețuri, pașii până la permis, acte necesare, flotă și întrebări frecvente. Un test de 10 întrebări dă feedback imediat și scor, iar înscrierea în 4 pași pleacă prin formular sau WhatsApp."],
      en: ["A site for a driving school: licence categories, price packages, the steps to a licence, required documents, fleet and FAQ. A 10-question quiz gives instant feedback and a score, and the 4-step enrolment goes out by form or WhatsApp."],
    },
    features: {
      ro: ["Test de exersare cu scor", "Înscriere în 4 pași cu rezumat", "Timeline animat la scroll", "Lighthouse 100 pe mobil"],
      en: ["Practice quiz with score", "4-step enrolment with summary", "Scroll-animated timeline", "Lighthouse 100 on mobile"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "tailwind", "motion", "seo", "a11y"],
    image: "volan-academy",
    links: [
      { label: { ro: "Demo live", en: "Live demo" }, href: "https://manolacheioan.github.io/scoala-soferi-demo/" },
      { label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/scoala-soferi-demo" },
    ],
  },
  {
    slug: "motorpro",
    name: "MotorPro Service Auto",
    kind: "demo",
    tagline: { ro: "Service auto, cu programare în 5 pași și calculator de revizie.", en: "Car repair shop, with 5-step booking and a service-interval calculator." },
    description: {
      ro: ["Site pentru un service auto: servicii, cum se lucrează, galerie și întrebări frecvente. Un calculator arată când urmează revizia, iar programarea în 5 pași pleacă pe e-mail sau WhatsApp."],
      en: ["A site for a car repair shop: services, how the work is done, a gallery and FAQ. A calculator shows when the next service is due, and the 5-step booking goes out by e-mail or WhatsApp."],
    },
    features: {
      ro: ["Programare în 5 pași", "Calculator de revizie", "Pagini de servicii", "Galerie și întrebări frecvente"],
      en: ["5-step booking", "Service-interval calculator", "Service pages", "Gallery and FAQ"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "tailwind", "seo", "a11y"],
    image: "motorpro",
    links: [
      { label: { ro: "Demo live", en: "Live demo" }, href: "https://manolacheioan.github.io/service-auto-demo/" },
      { label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/service-auto-demo" },
    ],
  },
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
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/akropolis" }],
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
        "Catalog online cu căutare rapidă de produse, filtre pe categorii și câte o pagină pentru fiecare produs, cu variante și buton „Sună acum”.",
      ],
      en: [
        "An online catalog with fast product search, category filters and a page for every product, with variants and a “Call now” button.",
      ],
    },
    features: {
      ro: ["Căutare rapidă de produse", "Filtre pe categorii", "Pagină de produs cu variante", "Buton „Sună acum”"],
      en: ["Fast product search", "Category filters", "Product pages with variants", "“Call now” button"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "css"],
    image: "temelia",
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/materiale-demo" }],
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
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/dental-clinic-website" }],
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
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/atelierul-suvitelor" }],
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
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/respiro" }],
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
    links: [{ label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/birou-notarial-cervin" }],
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
        "Are și un calendar de evenimente (porți deschise, spectacole, începutul taberelor) cu „Adaugă în calendar”, o pagină cu încăperile centrului desenate în cod, termeni și condiții, imagine de previzualizare la distribuire și iconițe pentru telefon. Testat cu Vitest, Playwright și axe (accesibilitate).",
      ],
      en: [
        "A site for a learning center for kids aged 4–14. Programs are presented as “missions”, with filters, camps, hand-drawn characters and online sign-up.",
        "It also has an events calendar (open days, shows, camp start dates) with “Add to calendar”, a page showing the center's rooms drawn in code, terms and conditions, a link preview image for sharing and home-screen icons. Tested with Vitest, Playwright and axe (accessibility).",
      ],
    },
    features: {
      ro: ["Programe prezentate ca „misiuni”", "Filtre", "Tabere", "Calendar de evenimente", "Personaje desenate", "Înscriere online"],
      en: ["Programs presented as “missions”", "Filters", "Camps", "Events calendar", "Hand-drawn characters", "Online sign-up"],
    },
    status: { ro: "Demo", en: "Demo" },
    statusTone: "demo",
    tech: [...NEXT_TS, "css"],
    image: "clubul-curiosilor",
    links: [
      { label: { ro: "Demo live", en: "Live demo" }, href: "https://manolacheioan.github.io/clubul-curiosilor/" },
      { label: { ro: "Cod sursă", en: "Source code" }, href: "https://github.com/ManolacheIoan/clubul-curiosilor" },
    ],
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
