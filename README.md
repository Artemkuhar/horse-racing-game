# Horse Racing Game

**Project Overview**

- **Demo:** https://artemkuhar.github.io/horse-racing-game/
- **Repository:** https://github.com/Artemkuhar/horse-racing-game
- **Purpose:** Interactive Horse Racing Game (trial assignment).
- **Stack:** Vue 2 + TypeScript, Vuex, Vuetify, Jest, Cypress, ESLint, Prettier, Husky.

**Technical Decisions**

- **FSD Architecture:** Clear layering for scalability and isolation:
  - `app` — configuration and providers (router, store).
  - `pages` — route-level pages.
  - `widgets` — large page-level blocks.
  - `features` — complete user scenarios (e.g., program generation, start/pause).
  - `entities` — business entities (horse/race/result) with `actions/getters/mutations`.
  - `shared` — common components, utilities, styles.
- **State Management:** Vuex modules `horse`, `race`, `result` with strict typing and separated logic.
- **UI:** Vuetify for theming and base components.
- **Randomization & Constants:** Deterministic utilities and constants for horse colors/names and race distances.
- **Testability:** Core logic placed in `entities` and `shared` for robust unit/integration coverage.

- **Out of Scope / TODO:**
  - Responsive support across devices and screen sizes.
  - Improved error handling.
  - Global API handler with configuration.
  - 100% test coverage (currently ~90%).

**Code Quality**

- **Linting:** ESLint for TS/JS/Vue with strict rules.
- **Formatting:** Prettier with `format`/`format:check` scripts.
- **Pre-commit:** Husky + lint-staged — auto apply `eslint --fix` and `prettier --write` on staged files.

**Testing**

- **Unit:** Jest + `@vue/vue2-jest` for `actions/getters/mutations` and UI pieces.
- **Coverage:** Text coverage report.
- **E2E:** Cypress — scenarios for core user flows.

**CI/CD**

- **CI Commands:**
  - Lint (no warnings): `yarn lint:ci`.
  - Unit + coverage: `yarn test:unit:coverage`.
  - E2E with auto dev server: `yarn test:e2e:ci` (via `start-server-and-test` → `yarn serve --port 4173` → `cypress run`).
- **Practices:** Fast-fail on lint, single-source build/test scripts, GitHub Actions ready.

**Setup & Run**

```bash
# Install dependencies
yarn

# Start dev server
yarn serve

# Build production bundle
yarn build

# Lint (and auto-fix)
yarn lint
yarn lint:fix

# Format (write/check)
yarn format
yarn format:check

# Unit tests & coverage
yarn test:unit
yarn test:unit:coverage

# E2E locally and in CI-mode
yarn test:e2e
yarn test:e2e:ci
```
