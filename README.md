# Shopify Dev Handbook

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

Deployed to [Netlify](https://netlify.com) as a static site. `netlify.toml` sets the build command (`npm run build`) and publish directory (`dist`) — once this repo is linked to the Netlify site in the Netlify dashboard (Site settings → Build & deploy → Link repository), every push to `main` deploys automatically.

## Updating the Changelog

`src/pages/changelog.astro` is maintained by a weekly scheduled check against [shopify.dev/changelog](https://shopify.dev/changelog). Only changes that are necessary (something breaks / is required) or huge (a real shift in how apps are built) get added — see the page's own curation policy note.
