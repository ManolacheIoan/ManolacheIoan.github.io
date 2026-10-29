import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `npm run build` writes plain HTML/CSS/JS into /out (Netlify, Vercel, any host).
  output: "export",
  // `/en` is emitted as `/en/index.html`, which every static host serves correctly.
  trailingSlash: true,
  // The default image optimizer needs a server. Screenshots are pre-optimized by `npm run images`.
  images: { unoptimized: true },
  // Lets a phone on the same Wi-Fi open the dev server: `npm run dev -- -H 0.0.0.0`.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  experimental: {
    // The site has two root layouts (RO and EN), so the 404 page lives in app/global-not-found.tsx.
    globalNotFound: true,
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
