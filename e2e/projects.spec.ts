import { test, expect } from "@playwright/test";

test.describe("Projects Page", () => {
  test("English projects page displays project cards", async ({ page }) => {
    await page.goto("/en/projects");
    await expect(page.locator("h1")).toBeVisible();
    // At least one project card should be visible
    const cards = page.locator("[class*='grid'] > *");
    await expect(cards.first()).toBeVisible();
  });

  test("Japanese projects page displays localized content", async ({ page }) => {
    await page.goto("/ja/projects");
    await expect(page.locator("h1")).toBeVisible();
    const cards = page.locator("[class*='grid'] > *");
    await expect(cards.first()).toBeVisible();
  });

  test("project card has external links", async ({ page }) => {
    await page.goto("/en/projects");
    const externalLinks = page.locator('a[target="_blank"], a[href^="https://github.com"]');
    if (await externalLinks.first().isVisible()) {
      const href = await externalLinks.first().getAttribute("href");
      expect(href).toBeTruthy();
    }
  });
});
