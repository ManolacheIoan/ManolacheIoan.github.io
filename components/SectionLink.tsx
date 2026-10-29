"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { paths, type Lang } from "@/lib/i18n";

const isHome = (pathname: string, lang: Lang) =>
  pathname.replace(/\/$/, "") === paths.home(lang).replace(/\/$/, "");

/**
 * Link to a section of the home page (#despre, #contact...).
 * On the home page it just scrolls there, without going through the router
 * (a router navigation re-renders the page mid-scroll and stutters).
 * On other pages it's a normal link to /#section.
 */
export function SectionLink({
  lang,
  id,
  className,
  children,
  onNavigate,
}: {
  lang: Lang;
  id: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || "/";
  const href = paths.section(lang, id);

  if (!isHome(pathname, lang)) {
    return (
      <Link href={href} className={className} onClick={onNavigate}>
        {children}
      </Link>
    );
  }

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    onNavigate?.();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Wait a frame so a closing mobile menu can release the scroll lock first.
    requestAnimationFrame(() => {
      // Tells the header to stay visible during this scroll.
      dispatchEvent(new Event("section-jump"));
      // Vertical only: left stays at 0, so the page can never slide sideways while scrolling.
      const top = target.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
      scrollTo({ top, left: 0, behavior: reduce ? "auto" : "smooth" });
      history.replaceState(history.state, "", `#${id}`);
      // Move keyboard focus to the section without jumping.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  }

  return (
    <a href={`#${id}`} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
