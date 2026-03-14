---
name: fixing-lint
description: Fix ESLint and Prettier linting and formatting errors. Use when lint checks fail, npm run lint reports errors, Prettier formatting is off, before committing code, or when the user mentions lint errors, formatting issues, code style problems, or import order issues.
---

Fix all linting and formatting errors in the project.

## Workflow

1. **Run lint check**

   ```bash
   npm run lint
   ```

   - Identify all ESLint and Prettier errors

2. **Apply automatic fixes**

   ```bash
   npm run lint -- --fix
   ```

   - Let ESLint fix auto-fixable issues
   - Prettier will format code automatically

3. **Manual fixes for remaining errors**
   - Review errors that couldn't be auto-fixed
   - Common issues:
     - Unused variables → Remove or prefix with `_`
     - Missing dependencies in React hooks → Add to dependency array
     - Type errors → Fix type annotations
     - Import order → Organize imports properly

4. **Verify all fixes**

   ```bash
   npm run lint
   ```

   - Must pass without errors

5. **Verify no breaking changes**

   ```bash
   npx tsc --noEmit
   ```

   - Fix any type errors introduced by the fixes

## Common Patterns

- **Import organization**: Built-in → External → Internal → Types
- **Component structure**: Props interface → Component → Export
- **Async/await**: Always handle errors with try/catch
- **TypeScript**: No `any` without justification
