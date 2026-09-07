# Shopify App Handbook

A learning site for Shopify app and extension development — curriculum, a guided first build, an extensions deep dive, crash courses on the underlying tech, and a curated changelog.

Built with [Astro](https://astro.build) (static output) using native View Transitions (`astro:transitions`) for instant, no-reload navigation between pages.

## Structure

- `src/pages/` — one `.astro` file per route (`/`, `/roadmap`, `/getting-started`, `/extensions`, `/changelog`, `/crash-courses/*`)
- `src/layouts/BaseLayout.astro` — shared shell: nav, `<ClientRouter />`, page `<head>`
- `src/styles/global.css` — shared design tokens and components
- `src/components/` — small shared bits (e.g. crash-course sibling links)

Adding a new page is just adding a new `.astro` file under `src/pages/` (or a nested folder for a new section) that imports `BaseLayout` — no other wiring needed, so the site scales to many more pages over time.

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # static build to dist/
npm run preview  # preview the production build
```

## Deployment

The site deploys to two places from the same source, distinguished by one env var:

- **Netlify** — `netlify.toml` sets the build command (`npm run build`) and publish directory (`dist`). Once this repo is linked to the Netlify site in the Netlify dashboard (Site settings → Build & deploy → Link repository), every push to `main` deploys automatically. Served from the domain root.
- **GitHub Pages** — `.github/workflows/deploy-gh-pages.yml` builds with `npm run build:gh-pages` (sets `DEPLOY_TARGET=gh-pages`) and publishes via the official `actions/deploy-pages` action on every push to `main`. Served under a sub-path — `https://saabbir.github.io/shopify-app-handbook/` — since this is a project repo, not a `saabbir.github.io` user-site repo.

`astro.config.mjs` reads `DEPLOY_TARGET` to pick the right `site`/`base` pair for whichever target is building. Every internal link on the site goes through `withBase()` (`src/lib/url.ts`), which reads Astro's resolved `base` at build time — so adding a new page or link never needs to think about which target it'll deploy to; just write root-relative paths (`/roadmap`, not `roadmap` or a hardcoded domain) and pass them through `withBase()`.

**One-time setup for GitHub Pages** (only needed once, not per-deploy): in the repo's **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**. Until that's set, the workflow will run but Pages won't serve its output.

## Updating the Changelog

`src/pages/changelog.astro` is maintained by a weekly scheduled check against [shopify.dev/changelog](https://shopify.dev/changelog). Only changes that are necessary (something breaks / is required) or huge (a real shift in how apps are built) get added — see the page's own curation policy note.
