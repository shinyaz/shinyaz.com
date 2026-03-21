import { test, expect } from "@playwright/test";

test.describe("TIL", () => {
  test("English TIL listing page loads", async ({ page }) => {
    await page.goto("/en/til");
    await expect(page.locator("h1")).toContainText("TIL");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("Japanese TIL listing page loads", async ({ page }) => {
    await page.goto("/ja/til");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("click a TIL and verify detail page renders", async ({ page }) => {
    await page.goto("/en/til");
    const firstLink = page.locator("article a").first();
    await firstLink.click();
    await expect(page).toHaveURL(/\/en\/til\/\d{4}\/\d{2}\/\d{2}\//);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("TIL listing has browse tags link", async ({ page }) => {
    await page.goto("/en/til");
    await expect(page.locator('a[href="/en/tag"]')).toBeVisible();
  });
});
