import { allTech } from "@/data/tech";
import { TechIcon } from "./TechIcon";

/** Endless strip of technologies between sections (decorative; the real list is in the Stack section). */
export function Marquee() {
  const items = [...allTech, ...allTech];
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-line bg-surface py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee-track flex w-max items-center gap-10">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-3 font-display text-2xl font-semibold tracking-[-0.03em] text-ink-2 sm:text-3xl">
            <TechIcon icon={t.icon} className="h-6 w-6 text-accent-fg" />
            {t.name}
            <span className="ml-7 text-accent-fg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
