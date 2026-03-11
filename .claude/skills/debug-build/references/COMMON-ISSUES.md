# Debug Build — Common Issues & Solutions

## 1. Google Fonts Network Errors

```bash
# Clear cache and retry (max 3 attempts)
rm -rf .next
npm run build

# If still failing, check network connectivity
curl -I https://fonts.googleapis.com
```

## 2. Velite Content Generation Issues

```bash
# Check Velite output
ls -la .velite/

# Rebuild Velite content
rm -rf .velite
npm run build

# Check for MDX syntax errors
npx velite --debug
```

## 3. TypeScript Errors

```bash
# Run type check separately
npx tsc --noEmit

# Common fixes:
# - Missing type imports
# - Incorrect path aliases (@/*, #site/content)
# - Strict mode violations
```

## 4. Module Resolution Issues

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

## 5. Memory Issues

```bash
# Increase Node memory for large builds
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## 6. Turbopack Issues

```bash
# Try building without Turbopack
npx next build  # Instead of npm run build
```
