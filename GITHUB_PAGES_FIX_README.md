# NB LAO E-Commerce — GitHub Pages Fix

This package contains the source project with GitHub Pages path handling fixes.

## Fixes included
- Vite uses `/nblao-ecommerce-preview/` when `GITHUB_PAGES=true`.
- React Router uses Vite's `BASE_URL` as its basename.
- Public logo, product, brand, advertisement, and placeholder image URLs use `import.meta.env.BASE_URL`.
- `index.html` favicon uses `%BASE_URL%`.
- GitHub Actions workflow is saved as plain YAML (no Markdown fences or UTF-8 BOM).
- Deployment copies `dist/index.html` to `dist/404.html` so client-side React Router routes can load on refresh.

## Apply it
1. Back up your current project folder.
2. Extract this ZIP.
3. Copy/replace the files from the extracted `NBLAO E-Commerce` folder into your existing local project folder.
4. In VS Code Terminal, run:
   ```powershell
   pnpm.cmd install --frozen-lockfile
   pnpm.cmd build
   ```
5. If the local build succeeds, commit and push:
   ```powershell
   git add .
   git diff --cached --check
   git commit -m "Fix GitHub Pages routing and asset paths"
   git push origin main
   ```
6. In GitHub repository Settings → Pages, set **Source** to **GitHub Actions**.
7. Open Actions and confirm the newest workflow run is green.

## Important
GitHub Pages hosts the frontend only. It does not run the application's API server or database. Features that require a backend need a separately hosted backend and database.
