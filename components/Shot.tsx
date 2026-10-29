/** A project screenshot (pre-optimized WebP in two sizes, 16:10). */
export function Shot({
  name,
  alt,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  name: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: images are pre-optimized by scripts/optimize-images.mjs
    <img
      src={`/projects/${name}-1200.webp`}
      srcSet={`/projects/${name}-640.webp 640w, /projects/${name}-960.webp 960w, /projects/${name}-1200.webp 1200w`}
      sizes={sizes}
      width={1200}
      height={750}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`block h-full w-full object-cover object-top ${className}`}
    />
  );
}
