import { Fragment } from "react";

/** Renders text from /data where words between *stars* become the italic serif accent. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="em-serif">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain text version (for alt texts, metadata). */
export const plain = (text: string) => text.replace(/\*(.+?)\*/g, "$1");
