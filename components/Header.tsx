"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { otherLangPath, paths, type Lang } from "@/lib/i18n";
import { ThemeToggle } from "./ThemeToggle";
import { Arrow } from "./Arrow";

export function Monogram({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative grid place-items-center rounded-full bg-ink text-bg ${className}`}>
      <span className="font-display text-[0.8rem] font-bold tracking-[-0.06em]">JM</span>
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent" />
    </span>
  );
}

export function Header({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const pathname = usePathname() || "/";
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  // Glass background after scrolling; hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { href: paths.projects(lang), label: t.nav.work },
    { href: paths.section(lang, "despre"), label: t.nav.about },
    { href: paths.section(lang, "educatie"), label: t.nav.education },
    { href: paths.section(lang, "tehnologii"), label: t.nav.stack },
    { href: paths.section(lang, "contact"), label: t.nav.contact },
  ];
  const other: Lang = lang === "ro" ? "en" : "ro";

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          hidden && !open ? "-translate-y-full" : ""
        } ${scrolled && !open ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link href={paths.home(lang)} className="flex min-h-11 items-center gap-3">
            <Monogram />
            <span className="font-display text-[1.05rem] font-semibold tracking-[-0.03em]">{profile.alias}</span>
          </Link>

          <nav aria-label={lang === "ro" ? "Principal" : "Main"} className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-bg/40 px-2 py-1 backdrop-blur">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block rounded-full px-4 py-2 text-[0.92rem] text-ink-2 transition hover:bg-surface-2 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={otherLangPath(pathname, other)}
              hrefLang={other}
              lang={other}
              title={t.langSwitchLabel}
              className="t-label grid h-10 min-w-10 place-items-center rounded-full border border-line px-3 text-ink transition hover:border-line-strong"
            >
              {other.toUpperCase()}
            </a>
            <ThemeToggle lang={lang} />
            <a href={profile.cv} download className="btn btn-primary hidden !min-h-10 !px-4 text-sm sm:inline-flex">
              {t.cv} <Arrow dir="s" className="h-3.5 w-3.5" />
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="t-label grid h-10 place-items-center rounded-full border border-line px-4 text-ink lg:hidden"
            >
              {open ? t.close : t.menu}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.menu}
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-surface pt-24 lg:hidden"
          >
            <nav className="container-x flex-1" aria-label={lang === "ro" ? "Principal" : "Main"}>
              <ul className="grid gap-1">
                {links.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={reduce ? false : { y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        autoFocus={i === 0}
                        className="flex items-baseline justify-between py-4 font-display text-[2.6rem] font-semibold leading-none tracking-[-0.04em]"
                      >
                        {l.label}
                        <span className="t-label text-muted">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="container-x flex items-center justify-between gap-4 pb-8 pt-6">
              <a href={profile.cv} download className="btn btn-primary">
                {t.downloadCv} <Arrow dir="s" />
              </a>
              <span className="t-label text-muted">{profile.city[lang]}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
