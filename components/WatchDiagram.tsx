import type { Lang } from "@/lib/i18n";
import { ui } from "@/data/ui";

/** Manotek Watch has no screenshot yet: this shows its loop (check → incident → alert → close → report). */
export function WatchDiagram({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const steps = ui[lang].watch;
  return (
    <div
      role="img"
      aria-label={`${ui[lang].project.watchAlt}: ${steps.join(" → ")}`}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-surface-2"
    >
      {/* dotted grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <ol className={`relative grid w-[88%] ${compact ? "gap-1.5" : "gap-2.5 sm:gap-3"}`} aria-hidden="true">
        {steps.map((step, i) => (
          <li
            key={step}
            className="watch-step flex items-center gap-3 rounded-full border border-line-strong bg-bg/80 px-3 py-1.5 backdrop-blur sm:px-4 sm:py-2"
            style={{ marginLeft: `${i * (compact ? 5 : 6)}%`, ["--i" as string]: i }}
          >
            <span className="t-label grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-[0.65rem] text-on-accent">
              {i + 1}
            </span>
            <span className={`truncate font-medium ${compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"}`}>{step}</span>
            {i === 1 ? <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[#e5484d]" /> : null}
            {i === 3 ? <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[#46a758]" /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
