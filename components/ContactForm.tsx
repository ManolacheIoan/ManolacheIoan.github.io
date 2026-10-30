"use client";

import { useState, type FormEvent } from "react";
import { isPlaceholder, profile } from "@/data/profile";
import { ui } from "@/data/ui";
import type { Lang } from "@/lib/i18n";
import { Arrow } from "./Arrow";

/**
 * Without a Formspree ID (data/profile.ts → formspreeId) the form opens the visitor's email app
 * with the message filled in. With one, it posts to Formspree and shows a confirmation.
 */
export function ContactForm({ lang }: { lang: Lang }) {
  const t = ui[lang].form;
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formspree = profile.formspreeId.trim();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    if (!formspree) {
      const to = isPlaceholder(profile.email) ? "" : profile.email;
      const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
      location.href = `mailto:${to}?subject=${encodeURIComponent(`${t.subject}: ${name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setState("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspree}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setState(res.ok ? "sent" : "error");
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setState("error");
    }
  }

  const field =
    "peer w-full border-0 border-b border-line-strong bg-transparent px-0 pb-3 pt-7 text-lg text-ink outline-none transition placeholder:text-transparent focus:border-accent-fg focus:placeholder:text-muted";
  const label =
    "t-label pointer-events-none absolute left-0 top-7 text-muted transition-all duration-300 peer-focus:top-0 peer-[:not(:placeholder-shown)]:top-0";

  return (
    <form onSubmit={onSubmit} className="grid gap-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative">
          <input id="cf-name" name="name" required autoComplete="name" placeholder={t.name} className={field} />
          <label htmlFor="cf-name" className={label}>{t.name}</label>
        </div>
        <div className="relative">
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder={t.email} className={field} />
          <label htmlFor="cf-email" className={label}>{t.email}</label>
        </div>
      </div>
      <div className="relative">
        <textarea id="cf-message" name="message" required rows={4} placeholder={t.messagePh} className={`${field} resize-y`} />
        <label htmlFor="cf-message" className={label}>{t.message}</label>
      </div>
      {/* Honeypot against spam bots (Formspree ignores submissions where it's filled). */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary !min-h-14 !px-8 text-base disabled:opacity-60">
          {state === "sending" ? t.sending : t.send} <Arrow />
        </button>
        <p className="max-w-[36ch] text-sm text-muted" role="status" aria-live="polite">
          {state === "sent" ? <span className="text-ink">{t.sent}</span> : state === "error" ? <span className="text-ink">{t.error}</span> : formspree ? null : t.mailtoNote}
        </p>
      </div>
    </form>
  );
}
