// Prefixes an internal, root-relative path (e.g. "/roadmap", "/roadmap#setup")
// with the site's configured base path, so every link still resolves once
// the site is deployed under a sub-path (GitHub Pages project sites serve
// from https://<user>.github.io/<repo>/ rather than the domain root).
//
// `import.meta.env.BASE_URL` is Astro's own resolved `base` config value —
// always "/" for a root deploy (Netlify) and something like
// "/shopify-app-handbook/" for a GitHub Pages project deploy — so this
// function needs no per-target configuration of its own; it just follows
// whatever astro.config.mjs was built with.
//
// External links, hash-only anchors, and mailto: links pass through
// unchanged — only genuine internal, root-relative paths get prefixed.
export function withBase(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  // Astro doesn't consistently pad BASE_URL with a trailing slash (it
  // depends on how `base` was written in astro.config.mjs), so normalize
  // here rather than trust its exact formatting — strip any trailing slash
  // off the base and any leading slash off the path, then join with
  // exactly one "/" ourselves.
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  return `${base}/${clean}`;
}
