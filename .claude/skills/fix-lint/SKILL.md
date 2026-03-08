---
name: fix-lint
description: Fix linting and formatting errors automatically
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

5. **Run build to ensure no breaking changes**

   ```bash
   npm run build
   ```

   - Fix any build errors introduced

6. **Commit if changes were made**
   ```bash
   git add -A
   git commit -m "fix: Resolve linting and formatting issues"
   ```

## Common Patterns

- **Import organization**: Built-in → External → Internal → Types
- **Component structure**: Props interface → Component → Export
- **Async/await**: Always handle errors with try/catch
- **TypeScript**: No `any` without justification
