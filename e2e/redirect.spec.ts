import { test, expect } from "@playwright/test";

test.describe("Root Redirect", () => {
  test("accessing / redirects to a locale-prefixed path", async ({ page }) => {
    await page.goto("/");
    const url = page.url();
    expect(url).toMatch(/\/(en|ja)(\/|$)/);
  });

  test("redirected page loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});
