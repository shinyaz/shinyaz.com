# Test Templates and Best Practices

## Component Test Template

```typescript
// __tests__/components/[subdirectory]/YourComponent.test.tsx
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { YourComponent } from "@/components/your-component"

describe("YourComponent", () => {
  it("renders with required props", () => {
    render(<YourComponent title="Test" />)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })

  it("handles click events", async () => {
    const handleClick = vi.fn()
    render(<YourComponent onClick={handleClick} />)
    await userEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

## E2E Test Template

```typescript
// e2e/your-feature.spec.ts
import { test, expect } from "@playwright/test"

test.describe("Your Feature", () => {
  test("should work as expected", async ({ page }) => {
    await page.goto("/")
    await page.click('[data-testid="your-button"]')
    await expect(page).toHaveURL("/expected-url")
    await expect(page.locator("h1")).toContainText("Expected Text")
  })
})
```

## Best Practices

1. **Test behavior, not implementation** — Focus on user-facing functionality
2. **Keep tests independent** — Each test runs in isolation
3. **Use meaningful assertions**
   ```typescript
   // Bad
   expect(result).toBeTruthy()
   // Good
   expect(result).toEqual({ status: "success", data: [...] })
   ```
4. **Mock external dependencies** — `#site/content` imports, API calls, test fixtures
5. **Test error cases** — Invalid props, network failures, empty states
