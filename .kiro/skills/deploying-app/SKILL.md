---
name: deploying-app
description: Pre-deployment verification workflow. Runs lint, type check, unit tests, build, and E2E tests in sequence. Use before merging feature branches, deploying to production, preparing a PR for review, doing a release check, or when the user wants a full validation pass. Also use when the user says "check everything" or "make sure nothing is broken".
---

Run the full pre-deployment checklist: $ARGUMENTS

## Checklist Workflow

Copy this checklist to track progress:

```
Deploy Progress:
- [ ] Step 1: Lint & format
- [ ] Step 2: Type check
- [ ] Step 3: Unit & component tests
- [ ] Step 4: Production build
- [ ] Step 5: E2E tests
- [ ] Step 6: Manual spot check
```

Execute each step in order. Stop at the first failure and fix before continuing.

1. **Lint & format**
   ```bash
   npm run lint
   ```
   - Must pass with zero errors and zero warnings
   - If failures: run `npm run lint -- --fix`, then re-check

2. **Type check**
   ```bash
   npx tsc --noEmit
   ```
   - Must pass with zero errors
   - No `any` without justification

3. **Unit & component tests**
   ```bash
   npm test -- --run
   ```
   - All tests must pass
   - Skip only if the change is content-only (`content/` files)

4. **Production build**
   ```bash
   npm run build
   ```
   - Must complete without errors or warnings
   - Velite content generation + Next.js build with Turbopack

5. **E2E tests** (if routing, layout, or i18n changed)
   ```bash
   npm run test:e2e
   ```
   - Requires successful build from step 4
   - Skip for content-only or component-only changes

6. **Manual spot check** (optional)
   ```bash
   npm start
   ```
   - Verify changed pages visually at http://localhost:3000
   - Check both `/ja/` and `/en/` locales

## When to Skip Steps

| Change Type        | Lint | Types | Unit | Build | E2E  |
|--------------------|------|-------|------|-------|------|
| Content only       | —    | —     | —    | ✓     | —    |
| Component code     | ✓    | ✓     | ✓    | ✓     | —    |
| Routing / layout   | ✓    | ✓     | ✓    | ✓     | ✓    |
| i18n / locale      | ✓    | ✓     | ✓    | ✓     | ✓    |
| Config / deps      | ✓    | ✓     | ✓    | ✓     | ✓    |

## Quick One-Liner (full pass)

```bash
npm run lint && npx tsc --noEmit && npm test -- --run && npm run build && npm run test:e2e
```

## Common Failure Patterns

- **Lint fails after build**: Velite generates `.velite/` which may trigger import order issues — ensure `.velite` is in `.eslintignore`
- **Build fails on fonts**: Google Fonts network errors — retry or check connectivity
- **E2E fails on locale**: Ensure `generateStaticParams` returns all locales
- **Type errors after dependency update**: Run `npm install` then `npx tsc --noEmit` to isolate
