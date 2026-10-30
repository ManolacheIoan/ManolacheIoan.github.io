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
import { SectionLink } from "./SectionLink";

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

  // Glass background after scrolling. The bar hides only after a clear scroll down (80px)
  // and comes back after a clear scroll up (40px), so small trackpad jitters don't make it flicker.
  useEffect(() => {
    let last = scrollY;
    let travel = 0;
    let ticking = false;
    let jumpUntil = 0;
    const onJump = (e: Event) => {
      jumpUntil = performance.now() + 1600;
      setHidden(Boolean((e as CustomEvent<{ hideHeader?: boolean }>).detail?.hideHeader));
    };
    const update = () => {
      ticking = false;
      const y = Math.max(0, scrollY);
      const delta = y - last;
      last = y;
      setScrolled(y > 24);
      // During a section jump the header keeps the state the jump asked for.
      if (performance.now() < jumpUntil) {
        travel = 0;
        return;
      }
      if (y < 120) {
        travel = 0;
        setHidden(false);
        return;
      }
      // Reset the counter when the direction changes.
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      if (travel > 80 && !document.querySelector("header")?.contains(document.activeElement)) setHidden(true);
      else if (travel < -40) setHidden(false);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("section-jump", onJump);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("section-jump", onJump);
    };
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

  // `id` = section of the home page (scrolls there); otherwise a normal page link.
  const links: { href: string; label: string; id?: string }[] = [
    { href: paths.projects(lang), label: t.nav.work },
    { href: paths.section(lang, "despre"), label: t.nav.about, id: "despre" },
    { href: paths.section(lang, "educatie"), label: t.nav.education, id: "educatie" },
    { href: paths.section(lang, "tehnologii"), label: t.nav.stack, id: "tehnologii" },
    { href: paths.section(lang, "contact"), label: t.nav.contact, id: "contact" },
  ];
  const navLink = (l: (typeof links)[number], className: string, children: React.ReactNode, extra?: { onNavigate?: () => void; autoFocus?: boolean }) =>
    l.id ? (
      <SectionLink lang={lang} id={l.id} className={className} onNavigate={extra?.onNavigate} toHeading>
        {children}
      </SectionLink>
    ) : (
      <Link href={l.href} className={className} onClick={extra?.onNavigate} autoFocus={extra?.autoFocus}>
        {children}
      </Link>
    );

  // The logo reloads the home page and starts at the top.
  function goHome(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    try {
      history.scrollRestoration = "manual";
    } catch {}
    window.scrollTo({ top: 0, behavior: "instant" });
    location.assign(paths.home(lang));
  }
  const other: Lang = lang === "ro" ? "en" : "ro";

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        onFocus={() => setHidden(false)}
        // The blur sits on the header itself: a blurred child of a moving header can't see the page behind it.
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[translate,background-color,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          hidden && !open ? "-translate-y-full" : ""
        } ${scrolled && !open ? "border-line bg-bg/75 backdrop-blur-xl" : "border-transparent bg-transparent backdrop-blur-none"}`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-[4.5rem] lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <a href={paths.home(lang)} onClick={goHome} className="flex min-h-11 items-center gap-3 lg:justify-self-start">
            <Monogram />
            <span className="font-display text-[1.05rem] font-semibold tracking-[-0.03em]">{profile.alias}</span>
          </a>

          <nav aria-label={lang === "ro" ? "Principal" : "Main"} className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/50 px-2 py-1">
              {links.map((l) => (
                <li key={l.href}>
                  {navLink(l, "block rounded-full px-4 py-2 text-[0.92rem] text-ink-2 transition hover:bg-surface-2 hover:text-ink", l.label)}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 lg:justify-self-end">
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
            <a href={profile.cv} download="Ioan_Manolache_CV.pdf" className="btn btn-primary hidden !min-h-10 !px-4 text-sm sm:inline-flex">
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
                      {navLink(
                        l,
                        "flex items-baseline justify-between py-4 font-display text-[2.6rem] font-semibold leading-none tracking-[-0.04em]",
                        <>
                          {l.label}
                          <span className="t-label text-muted">0{i + 1}</span>
                        </>,
                        { onNavigate: () => setOpen(false), autoFocus: i === 0 },
                      )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="container-x flex items-center justify-between gap-4 pb-8 pt-6">
              <a href={profile.cv} download="Ioan_Manolache_CV.pdf" className="btn btn-primary">
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
