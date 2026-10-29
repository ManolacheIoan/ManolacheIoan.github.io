import type { L } from "@/lib/i18n";

export const manotek = {
  name: "Manotek",
  url: "https://manotek.ro",
  /** Set to true once manotek.ro is online, so the link becomes clickable. */
  isLive: false,
  lead: {
    ro: "Manotek e studioul pe care l-am fondat. E mic intenționat: lucrez direct la fiecare proiect, de la prima discuție până după lansare.",
    en: "Manotek is the studio I founded. It's small on purpose: I work on every project myself, from the first conversation until after launch.",
  } satisfies L,
  services: [
    {
      title: { ro: "Site-uri de prezentare", en: "Business websites" },
      text: { ro: "Rapide, clare și ușor de găsit pe Google.", en: "Fast, clear and easy to find on Google." },
    },
    {
      title: { ro: "Magazine online", en: "Online stores" },
      text: { ro: "Catalog, coș și comenzi, potrivite firmei.", en: "Catalog, cart and orders, fitted to the business." },
    },
    {
      title: { ro: "Aplicații mobile", en: "Mobile apps" },
      text: { ro: "Aplicații care se instalează pe telefon.", en: "Apps that install on the phone." },
    },
    {
      title: { ro: "Aplicații de gestiune", en: "Management apps" },
      text: { ro: "Stocuri, programări și evidențe, într-un singur loc.", en: "Stock, bookings and records in one place." },
    },
  ] satisfies { title: L; text: L }[],
};
