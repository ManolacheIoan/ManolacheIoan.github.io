/** Small arrow icon. `dir="ne"` points up-right (external links). */
export function Arrow({ dir = "e", className = "h-4 w-4" }: { dir?: "e" | "ne" | "n" | "w" | "s"; className?: string }) {
  const rotate = { e: 0, ne: -45, n: -90, w: 180, s: 90 }[dir];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
