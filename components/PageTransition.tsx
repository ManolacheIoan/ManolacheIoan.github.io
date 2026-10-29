import { ViewTransition, type ReactNode } from "react";

/** Wraps each page so route changes fade/lift between pages (see ::view-transition rules in globals.css). */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
