---
name: run-tests
description: Run the appropriate test suite (Vitest unit/component tests or Playwright E2E tests) based on what files changed. Use when verifying code changes, writing new tests, or when the user mentions testing, test failures, or coverage.
---

Run the appropriate test suite based on what was changed.

## Test Strategy

### 1. **Determine what to test**

| Changed Files     | Test Command              | Why                             |
| ----------------- | ------------------------- | ------------------------------- |
| `src/lib/`        | `npm test`                | Unit tests for utilities        |
| `src/components/` | `npm test`                | Component tests                 |
| Routing/pages     | `npm run test:e2e`        | E2E tests for navigation        |
| i18n changes      | `npm run test:e2e`        | Verify locale switching         |
| `content/` only   | Skip tests                | Content-only changes            |
| MDX components    | `npm test` + manual check | Component + visual verification |

### 2. **Unit/Component Tests (Vitest)**

```bash
# Run all unit tests
npm test

# Run specific test file
npm test -- YourComponent.test

# Run tests in watch mode during development
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

**What to test:**

- Component rendering
- Props handling
- Event handlers
- Utility functions
- Error states

### 3. **E2E Tests (Playwright)**

```bash
# Requires build first
npm run build
npm run test:e2e

# Run specific E2E test
npm run test:e2e -- navigation.spec.ts

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Run in specific browser
npm run test:e2e -- --project=chromium
```

**What to test:**

- Page navigation
- Locale switching
- Search functionality
- Dark mode toggle
- RSS feed generation
- 404 handling

### 4. **Quick Validation Workflow**

```bash
# 1. Lint first (catch obvious issues)
npm run lint

# 2. Type check
npx tsc --noEmit

# 3. Run relevant tests
npm test  # or npm run test:e2e

# 4. Build to ensure no runtime errors
npm run build
```

## Writing New Tests

### Component Test Template

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

### E2E Test Template

```typescript
// e2e/your-feature.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Your Feature", () => {
  test("should work as expected", async ({ page }) => {
    await page.goto("/");

    // Interact with page
    await page.click('[data-testid="your-button"]');

    // Assert results
    await expect(page).toHaveURL("/expected-url");
    await expect(page.locator("h1")).toContainText("Expected Text");
  });
});
```

## Test Best Practices

1. **Test behavior, not implementation**
   - Focus on user-facing functionality
   - Don't test internal state

2. **Keep tests independent**
   - Each test should run in isolation
   - Use proper setup/teardown

3. **Use meaningful assertions**

   ```typescript
   // Bad
   expect(result).toBeTruthy()

   // Good
   expect(result).toEqual({ status: "success", data: [...] })
   ```

4. **Mock external dependencies**
   - Mock `#site/content` imports
   - Mock API calls
   - Use test fixtures

5. **Test error cases**
   - Invalid props
   - Network failures
   - Empty states

## Debugging Failed Tests

```bash
# Run single test with verbose output
npm test -- YourComponent.test --reporter=verbose

# Debug E2E test
npm run test:e2e -- --debug

# Generate E2E test report
npm run test:e2e -- --reporter=html
```

## Coverage Goals

- Utilities in `src/lib/`: 80%+ coverage
- Components: Focus on critical paths
- E2E: Cover main user journeys
- Don't aim for 100% - focus on valuable tests
