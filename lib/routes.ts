export const routes = {
  home: "/",
  programma: "/programma/",
  informazioni: "/informazioni/",
  convenzioni: "/convenzioni/",
  storia: "/storia/",
  foto: "/foto-e-video/",
  news: "/news/",
  contatti: "/contatti/",
  privacy: "/privacy/",
  cookiePolicy: "/privacy/#cookie",
} as const;

function normalizePath(path: string): string {
  const withoutHash = path.split("#")[0];
  return withoutHash.endsWith("/") ? withoutHash : `${withoutHash}/`;
}

export function isCurrentSection(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === "/") return current === "/";
  return current.startsWith(target);
}
