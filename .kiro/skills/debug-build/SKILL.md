---
name: debug-build
description: Troubleshoot and fix Next.js build errors including Velite content generation, TypeScript compilation, Turbopack, and memory issues. Use when npm run build fails, the user reports build errors, or deployment breaks.
---

Debug and fix build errors in the Next.js application.

## Debugging Workflow

1. **Capture full error**
   ```bash
   npm run build 2>&1 | tee build-error.log
   ```

2. **Identify error type**
   - Velite/MDX error → Check content files
   - TypeScript error → Fix type issues
   - Network error → Retry or check connectivity
   - Memory error → Increase heap size

3. **Isolate the problem**
   - Comment out recent changes
   - Build with minimal content
   - Check specific file mentioned in error

4. **Fix and verify**
   - Apply fix
   - Run `npm run build` again
   - Ensure no warnings remain

5. **Test locally**
   ```bash
   npm start  # Test production build
   ```

## Prevention Checklist

- [ ] Always run `npm run lint` before build
- [ ] Test MDX syntax in changed content files
- [ ] Verify image paths are correct
- [ ] Check for circular dependencies
- [ ] Ensure all environment variables are set

See [common issues and solutions](references/COMMON-ISSUES.md) for specific error types (Fonts, Velite, TypeScript, Modules, Memory, Turbopack).
