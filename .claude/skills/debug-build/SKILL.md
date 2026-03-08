---
name: debug-build
description: Troubleshoot and fix build errors
---

Debug and fix build errors in the Next.js application.

## Common Issues & Solutions

### 1. **Google Fonts Network Errors**

```bash
# Clear cache and retry (max 3 attempts)
rm -rf .next
npm run build

# If still failing, check network connectivity
curl -I https://fonts.googleapis.com
```

### 2. **Velite Content Generation Issues**

```bash
# Check Velite output
ls -la .velite/

# Rebuild Velite content
rm -rf .velite
npm run build

# Check for MDX syntax errors
npx velite --debug
```

### 3. **TypeScript Errors**

```bash
# Run type check separately
npx tsc --noEmit

# Common fixes:
# - Missing type imports
# - Incorrect path aliases (@/*, #site/content)
# - Strict mode violations
```

### 4. **Module Resolution Issues**

```bash
# Verify dependencies installed
npm ls

# Check for missing dependencies
npm install

# Clear all caches
rm -rf .next node_modules .velite
npm install
npm run build
```

### 5. **Memory Issues**

```bash
# Increase Node memory for large builds
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### 6. **Turbopack Issues**

```bash
# Try building without Turbopack
npx next build  # Instead of npm run build
```

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
