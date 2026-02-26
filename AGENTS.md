# AGENTS.md

## Cursor Cloud specific instructions

This is a static React portfolio/blog site (no backend, no database). See `README.md` for full details.

### Services

| Service | Command | Port |
|---|---|---|
| Vite dev server | `npm run dev` | 5173 |

### Quick reference

- **Install deps:** `npm install`
- **Dev server:** `npm run dev` (starts Vite with HMR)
- **Build:** `npm run build` (outputs to `dist/`)
- **Preview prod build:** `npm run preview`

### Notes

- No test framework is configured — there are no `test` scripts or test files.
- No linter (ESLint) is configured in the project.
- The `package.json` has an `overrides` entry pinning `esbuild` to `^0.27.2` for Vite/Node compatibility.
- Static assets live in both `/assets/` and `/public/assets/`; the GitHub Actions deploy workflow copies them at build time.
- Node.js v20+ is required (v22 works fine).
