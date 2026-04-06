import { test, expect } from "@playwright/test";

test.describe("Series Index Page", () => {
  test("English series page loads", async ({ page }) => {
    await page.goto("/en/series");
    await expect(page.locator("h1")).toContainText("Series");
  });

  test("Japanese series page loads", async ({ page }) => {
    await page.goto("/ja/series");
    await expect(page.locator("h1")).toContainText("シリーズ");
  });

  test("series cards link to first post in series", async ({ page }) => {
    await page.goto("/en/series");
    const firstCard = page.locator("a[href*='/en/blog/']").first();
    if (await firstCard.isVisible()) {
      await firstCard.click();
      await expect(page).toHaveURL(/\/en\/blog\//);
      await expect(page.locator("h1")).toBeVisible();
    }
  });
});
