---
name: running-tests
description: Run the appropriate test suite (Vitest unit/component tests or Playwright E2E tests) based on what files changed. Use when verifying code changes, writing new tests, or when the user mentions testing, test failures, or coverage.
---

Run the appropriate test suite based on what was changed.

## Test Strategy

| Changed Files     | Test Command       | Why                      |
|-------------------|--------------------|--------------------------|
| `src/lib/`        | `npm test`         | Unit tests for utilities |
| `src/components/` | `npm test`         | Component tests          |
| Routing/pages     | `npm run test:e2e` | E2E tests for navigation |
| i18n changes      | `npm run test:e2e` | Verify locale switching  |
| `content/` only   | Skip tests         | Content-only changes     |
| MDX components    | `npm test` + manual| Component + visual check |

## Commands

```bash
# Unit/Component (Vitest)
npm test                        # All
npm test -- YourComponent.test  # Specific file
npm test -- --coverage          # With coverage

# E2E (Playwright) — requires build first
npm run build
npm run test:e2e
npm run test:e2e -- --headed    # See browser
```

## Quick Validation Workflow

```bash
npm run lint          # 1. Lint
npx tsc --noEmit      # 2. Type check
npm test              # 3. Tests
npm run build         # 4. Build
```

## Debugging Failed Tests

```bash
npm test -- YourComponent.test --reporter=verbose
npm run test:e2e -- --debug
```

## Coverage Goals

- `src/lib/`: 80%+ coverage
- Components: Focus on critical paths
- E2E: Cover main user journeys

See [templates and best practices](references/TEMPLATES.md) for writing new tests.
