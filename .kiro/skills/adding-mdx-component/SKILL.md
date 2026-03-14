---
name: adding-mdx-component
description: Add a new MDX component for use in blog posts and content pages. Covers component creation, MDX registration, Tailwind v4 styling, and testing. Use when the user wants to create a custom component for MDX content, add interactive elements to posts, or build reusable content blocks.
---

Add a new MDX component for use in blog posts and content.

## Workflow

1. **Create component file** at `src/components/mdx/YourComponent.tsx`
   - Use `cn()` from `@/lib/utils` for className merging
   - Define a TypeScript interface for props

2. **Register in MDX components** at `src/components/mdx-components.tsx`
   ```typescript
   import { YourComponent } from "./mdx/YourComponent"
   export const mdxComponents = { /* existing */, YourComponent }
   ```

3. **Apply Tailwind v4 styling** — Use theme tokens: `rgb(var(--foreground))`

4. **Server Component by default** — Add `"use client"` only for interactivity

5. **Add tests** at `__tests__/components/mdx/YourComponent.test.tsx`

6. **Test in development** — `npm run dev`

## Checklist

- [ ] Component renders without errors
- [ ] Props are properly typed
- [ ] Styling works in light/dark modes
- [ ] Component is accessible
- [ ] Works in both locales (ja/en)
- [ ] No hydration mismatches

See [component patterns and templates](references/PATTERNS.md) for common examples.
