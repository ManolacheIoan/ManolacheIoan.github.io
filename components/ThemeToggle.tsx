"use client";

import { useSyncExternalStore } from "react";
import { ui } from "@/data/ui";
import type { Lang } from "@/lib/i18n";

// The current theme lives on <html data-theme>, set before paint by ThemeScript.
function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}
const getTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function ThemeToggle({ lang }: { lang: Lang }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");
  const next = theme === "dark" ? "light" : "dark";

  function toggle() {
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Circular reveal of the new theme where supported.
    if (!reduce && "startViewTransition" in document) {
      document.documentElement.classList.add("theme-vt");
      const vt = (document as Document & { startViewTransition: (cb: () => void) => { finished: Promise<void> } }).startViewTransition(apply);
      vt.finished.finally(() => document.documentElement.classList.remove("theme-vt"));
    } else apply();
  }

  const label = theme === "dark" ? ui[lang].theme.toLight : ui[lang].theme.toDark;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition hover:border-line-strong"
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" />
      </svg>
    </button>
  );
}
