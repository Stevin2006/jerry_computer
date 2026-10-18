# Jerry Computers frontend

An Angular 21 / TypeScript 5.9 frontend preview for computer retail, device service and staff operations. There is no backend, database, payment processing, real authentication, courier integration, geofence validation or payroll calculation in this project.

**Status:** substantial UI implementation, not a verified production build. Dependency installation and browser execution were blocked in the authoring environment. Run the checks below before using this as a release candidate.

## Run locally

Use Node.js 24 and a network-enabled environment:

```sh
npm install
npm start
```

Open `http://localhost:4200`. Use the account icon → **Preview a workspace**, or navigate directly to `/admin/dashboard`, `/office/dashboard`, `/ecommerce/dashboard` or `/engineer/dashboard`.

Direct workspace routes deliberately select a demo role. This is a design preview mechanism, **not authentication or authorization**. Production must replace the preview guard with the actual frontend session integration; backend authorization remains mandatory. No tokens are stored in localStorage or sessionStorage.

## UI areas

- Public home, categories, catalogue search/filter/sort/layout/pagination, product details, cart, checkout review, service overview, store information and legal-policy preparation pages.
- Customer account, scoped orders and service requests, status timelines, service intake, notifications and profile settings.
- E-commerce order dashboard, order details, shipments and customer records.
- Office service intake, priority queue, dispatch, engineer availability and escalations.
- Engineer assignments, job details, append-only demo work logs, status transitions, escalation forms, attendance location states and personal reports.
- Admin products and specification editing, category management, inventory, customers, staff capabilities, service operations, attendance corrections, office locations, payroll previews, reports, settings and branding.

All data-driven areas have designed feedback states through the catalogue, shared table or data-region preview controls. Forms show validation and explicit API-dependency messages. Browser location is requested only by an explicit user action, and uploaded files remain temporary browser previews.

## Architecture

```text
src/app/
  core/          UI models, mock data, state services, API adapter, navigation
  shared/        Tables, product cards, timelines, badges, feedback states,
                 icons, focus containment, file previews and location capture
  features/
    store/       Public retail pages
    forms/       Authentication, checkout, service intake, product editor
    workspace/   Role-specific dashboards, detail views and management pages
```

Feature routes are lazy-loaded. Standalone Angular components use signals, computed state, Reactive Forms and a shared semantic CSS token system. Shared management lists use typed table adapters; domain detail pages have dedicated components.

`DataService` owns in-memory demo state. `ApiRetailService` is an unregistered HttpClient integration boundary with configurable endpoint URLs; it is not called by the preview. See [integration notes](docs/INTEGRATION.md) before connecting real data.

## Design system and skills

Warm neutral surfaces, forest green, restrained lime accents, Manrope headings and DM Sans body text (with system fallbacks), consistent control sizes, semantic status colours and light/dark/system appearance.

The installed **shadcn** and **Magic UI** skills informed native Angular component composition, semantic tokens, restrained entrance transitions and hover feedback. No React component packages were added. Motion respects reduced-motion preferences. Native dialogs handle confirmations and editing sheets; conditional panels include keyboard focus containment.

The **21st-ai** skill was read and its Angular handoff approach considered. Its CLI could not start because npm access was unavailable. No 21st generation or component retrieval succeeded; no generated 21st assets are claimed.

Local SVG device illustrations and a brand icon are provided. Real product photography, official contact details, branch locations and approved policies have not been supplied. The UI says so instead of inventing business information.

## Checks

```sh
npm test                 # 13 dependency-free domain tests
npm run check:source     # TypeScript parsing, local imports, CSS brace check
npm run build            # Angular production compilation
npm run test:ui          # Angular/Vitest workflow and component tests
```

**Actually passed:** 13 domain tests; parsing of 43 TypeScript source files; local import and external-template resolution; CSS brace balance; structural nesting/brace checks of 27 HTML files; strict type checking of the core models, mock records and domain declarations using the locally available TypeScript compiler.

**Blocked:** Angular build and Angular UI tests (`ng: not found`; npm registry DNS unavailable). Local HTTP sockets and Chrome startup were rejected by the environment, so no runtime, screenshot, responsive-browser or screen-reader validation is claimed. No package lockfile was generated because dependencies could not be resolved.

The Angular test source covers lazy navigation, shopping/cart limits, checkout validation, customer note isolation, conditional service location fields, demo capabilities, engineer work history, attendance location consent, product validation, dispatch data and shared table states. These tests are written but have **not run**.

## Remaining frontend work

1. Install dependencies; resolve any compiler or template diagnostics exposed by the first actual Angular build; run the Angular workflow tests.
2. Inspect all workspaces in a real browser at mobile, tablet and desktop sizes. Complete keyboard, contrast, screen-reader and dark-mode QA, then fix any discovered defects.
3. Extend UI tests across management sheets, file ordering, all forms, failure recovery and cross-workspace navigation; add browser responsive/interaction coverage.
4. Replace illustrative product artwork with approved multi-image galleries and finalise verified store content and policies. Product detail currently previews one supplied illustration, with zoom, rather than inventing additional product photos.
5. Expand period selection from its explicit integration state when real reporting periods are supplied; validate advanced multi-branch filtering against the eventual dataset.

See [inspection and delivery notes](docs/DELIVERY.md) for the initial repository findings and remaining validation boundaries.
