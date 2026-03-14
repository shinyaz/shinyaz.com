# MDX Component Patterns and Templates

## Basic Component Template

```typescript
// src/components/mdx/YourComponent.tsx
import { cn } from "@/lib/utils"

interface YourComponentProps {
  children?: React.ReactNode
  className?: string
}

export function YourComponent({ children, className, ...props }: YourComponentProps) {
  return (
    <div className={cn("your-styles", className)} {...props}>
      {children}
    </div>
  )
}
```

## Info/Warning/Tip Boxes

```tsx
export function InfoBox({ children, type = "info" }) {
  const styles = {
    info: "border-blue-500 bg-blue-50",
    warning: "border-yellow-500 bg-yellow-50",
    error: "border-red-500 bg-red-50",
  }
  return <div className={cn("border-l-4 p-4 my-4", styles[type])}>{children}</div>
}
```

## Code Output Display

```tsx
export function Output({ children }) {
  return (
    <div className="bg-gray-900 text-gray-100 p-4 rounded-md my-4 font-mono text-sm">
      <div className="text-gray-500 text-xs mb-2">Output:</div>
      {children}
    </div>
  )
}
```

## Interactive Demo Container

```tsx
"use client"

export function Demo({ children }) {
  return (
    <div className="border rounded-lg p-4 my-8 bg-background">
      <div className="text-sm text-muted-foreground mb-2">Interactive Demo</div>
      {children}
    </div>
  )
}
```

## Test Template

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

## Tailwind v4 Styling Guide

```css
/* Use theme colors */
color: rgb(var(--foreground));
background: rgb(var(--background));

/* Consistent spacing */
padding: 1rem; /* 4, 8, 12, 16, 24, 32, 48, 64 */
```
