---
name: add-mdx-component
description: Add a new MDX component for use in blog posts and content pages. Covers component creation, MDX registration, Tailwind v4 styling, and testing. Use when the user wants to create a custom component for MDX content, add interactive elements to posts, or build reusable content blocks.
---

Add a new MDX component for use in blog posts and content.

## Workflow

1. **Create component file**

   ```typescript
   // src/components/mdx/YourComponent.tsx
   import { cn } from "@/lib/utils"

   interface YourComponentProps {
     children?: React.ReactNode
     className?: string
     // Add specific props
   }

   export function YourComponent({
     children,
     className,
     ...props
   }: YourComponentProps) {
     return (
       <div className={cn("your-styles", className)} {...props}>
         {children}
       </div>
     )
   }
   ```

2. **Register in MDX components**

   ```typescript
   // src/components/mdx-components.tsx
   import { YourComponent } from "./mdx/YourComponent";

   export const mdxComponents = {
     // ... existing components
     YourComponent,
   };
   ```

3. **Apply Tailwind v4 styling**
   - Use CSS variables from theme tokens
   - Follow existing patterns:

     ```css
     /* Use theme colors */
     color: rgb(var(--foreground));
     background: rgb(var(--background));

     /* Consistent spacing */
     padding: 1rem; /* 4, 8, 12, 16, 24, 32, 48, 64 */
     ```

4. **Implement as Server Component (default)**
   - Keep as server component unless interactivity needed
   - For interactive components, add `"use client"` directive

5. **Add component tests**

   ```typescript
   // __tests__/components/mdx/YourComponent.test.tsx
   import { describe, it, expect } from "vitest"
   import { render, screen } from "@testing-library/react"
   import { YourComponent } from "@/components/mdx/YourComponent"

   describe("YourComponent", () => {
     it("renders children", () => {
       render(<YourComponent>Test content</YourComponent>)
       expect(screen.getByText("Test content")).toBeInTheDocument()
     })

     it("applies custom className", () => {
       render(<YourComponent className="custom">Test</YourComponent>)
       // Test className application
     })
   })
   ```

6. **Create usage example**

   ```markdown
   <!-- In a test MDX file -->
   <YourComponent className="my-custom-class">
     This is how you use the component in MDX content.
   </YourComponent>
   ```

7. **Document the component**
   - Add JSDoc comments
   - Create example in a blog post or documentation

8. **Test in development**
   ```bash
   npm run dev
   # Navigate to a post using the component
   ```

## Component Patterns

### Info/Warning/Tip Boxes

```tsx
export function InfoBox({ children, type = "info" }) {
  const styles = {
    info: "border-blue-500 bg-blue-50",
    warning: "border-yellow-500 bg-yellow-50",
    error: "border-red-500 bg-red-50",
  };

  return (
    <div className={cn("border-l-4 p-4 my-4", styles[type])}>{children}</div>
  );
}
```

### Code Output Display

```tsx
export function Output({ children }) {
  return (
    <div className="bg-gray-900 text-gray-100 p-4 rounded-md my-4 font-mono text-sm">
      <div className="text-gray-500 text-xs mb-2">Output:</div>
      {children}
    </div>
  );
}
```

### Interactive Demo Container

```tsx
"use client";

export function Demo({ children }) {
  return (
    <div className="border rounded-lg p-4 my-8 bg-background">
      <div className="text-sm text-muted-foreground mb-2">Interactive Demo</div>
      {children}
    </div>
  );
}
```

## Testing Checklist

- [ ] Component renders without errors
- [ ] Props are properly typed
- [ ] Styling works in light/dark modes
- [ ] Component is accessible (proper ARIA attributes)
- [ ] Works in both locales (ja/en)
- [ ] No hydration mismatches
