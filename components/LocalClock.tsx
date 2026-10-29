"use client";

import { useEffect, useState } from "react";

/** Live local time in Galați (updates every 15s). Empty on the server to avoid a mismatch. */
export function LocalClock({ timeZone, locale }: { timeZone: string; locale: string }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone, hour12: false });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [timeZone, locale]);
  return <span suppressHydrationWarning className="tabular-nums">{now || "--:--"}</span>;
}
