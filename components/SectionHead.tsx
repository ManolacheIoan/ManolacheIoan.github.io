import type { ReactNode } from "react";
import { Rich } from "./Rich";
import { Reveal } from "./Reveal";

/** "(03) — Kicker" label + big title, used at the top of every section. */
export function SectionHead({
  index,
  kicker,
  title,
  id,
  aside,
}: {
  index: string;
  kicker: string;
  title: string;
  id: string;
  aside?: ReactNode;
}) {
  return (
    <div data-section-head className="grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:pt-8">
      <p className="t-label flex items-center gap-3 text-muted md:col-span-3">
        <span className="text-accent-fg">({index})</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        {kicker}
      </p>
      <div className="md:col-span-9">
        <Reveal>
          <h2 id={id} className="t-h2 max-w-[18ch]">
            <Rich text={title} />
          </h2>
        </Reveal>
        {aside ? <div className="mt-6">{aside}</div> : null}
      </div>
    </div>
  );
}
