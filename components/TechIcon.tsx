import {
  siCaddy,
  siClaude,
  siDocker,
  siExpo,
  siFirebase,
  siGithubactions,
  siGrafana,
  siLinux,
  siPrometheus,
  siPytest,
  siSqlalchemy,
  siVitest,
  siCss,
  siEslint,
  siFastapi,
  siFramer,
  siGit,
  siHtml5,
  siJavascript,
  siNetlify,
  siNextdotjs,
  siPostgresql,
  siPwa,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

// Brand icons from Simple Icons (24×24 paths). To add one: import it above and add it here.
const brand: Record<string, string> = {
  html5: siHtml5.path,
  css: siCss.path,
  javascript: siJavascript.path,
  typescript: siTypescript.path,
  react: siReact.path,
  nextdotjs: siNextdotjs.path,
  tailwindcss: siTailwindcss.path,
  framer: siFramer.path,
  python: siPython.path,
  fastapi: siFastapi.path,
  postgresql: siPostgresql.path,
  pwa: siPwa.path,
  claude: siClaude.path,
  git: siGit.path,
  netlify: siNetlify.path,
  eslint: siEslint.path,
  docker: siDocker.path,
  githubactions: siGithubactions.path,
  caddy: siCaddy.path,
  prometheus: siPrometheus.path,
  grafana: siGrafana.path,
  linux: siLinux.path,
  pytest: siPytest.path,
  vitest: siVitest.path,
  sqlalchemy: siSqlalchemy.path,
  expo: siExpo.path,
  firebase: siFirebase.path,
};

// Simple line icons for things that aren't brands.
const line: Record<string, React.ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  a11y: (
    <>
      <circle cx="12" cy="4.5" r="1.8" />
      <path d="M5 8.5c4.5 1.2 9.5 1.2 14 0M12 10v5m0 0-3 6m3-6 3 6" />
    </>
  ),
  code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5" />,
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.8 2.8L16 9.8" />
    </>
  ),
};

export function TechIcon({ icon, className = "h-4 w-4" }: { icon: string; className?: string }) {
  if (brand[icon]) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d={brand[icon]} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {line[icon] ?? line.code}
    </svg>
  );
}
