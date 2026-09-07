import { defineConfig } from 'astro/config';

// The GitHub Actions workflow (.github/workflows/deploy-gh-pages.yml) sets
// DEPLOY_TARGET=gh-pages before building for GitHub Pages. Any other build
// (Netlify's own build step, or a local `npm run build`) leaves it unset
// and gets the Netlify-shaped config below, unchanged from before.
//
// GitHub Pages serves a project repo (one that isn't <user>.github.io
// itself) from a sub-path — https://saabbir.github.io/shopify-app-handbook/
// rather than the domain root — so `base` has to match the repo name.
// Every internal link on the site is built through the withBase() helper
// (src/lib/url.ts), which reads `import.meta.env.BASE_URL` at build time,
// so this is the only file that needs to know which target is building.
const isGhPages = process.env.DEPLOY_TARGET === 'gh-pages';

export default defineConfig({
  site: isGhPages ? 'https://saabbir.github.io' : 'https://shopify-app-handbook.netlify.app',
  base: isGhPages ? '/shopify-app-handbook' : '/',
  output: 'static',
  trailingSlash: 'never',
});
