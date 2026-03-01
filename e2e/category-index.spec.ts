import { test, expect } from "@playwright/test";

test.describe("Category Index Page", () => {
  test("English category index page loads with categories", async ({ page }) => {
    await page.goto("/en/category");
    await expect(page.locator("h1")).toContainText("Categories");
    await expect(page.locator("a[href*='/en/category/']").first()).toBeVisible();
  });

  test("Japanese category index page loads with categories", async ({ page }) => {
    await page.goto("/ja/category");
    await expect(page.locator("h1")).toContainText("カテゴリ");
    await expect(page.locator("a[href*='/ja/category/']").first()).toBeVisible();
  });

  test("each category card shows post count", async ({ page }) => {
    await page.goto("/en/category");
    const firstCard = page.locator("a[href*='/en/category/']").first();
    await expect(firstCard).toContainText(/\d+ post/);
  });

  test("clicking a category navigates to category detail page", async ({ page }) => {
    await page.goto("/en/category");
    const firstLink = page.locator("a[href*='/en/category/']").first();
    await firstLink.click();
    await expect(page).toHaveURL(/\/en\/category\/.+/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("blog page has link to category index", async ({ page }) => {
    await page.goto("/en/blog");
    const categoryLink = page.locator("a[href='/en/category']");
    await expect(categoryLink).toBeVisible();
    await categoryLink.click();
    await expect(page).toHaveURL(/\/en\/category$/);
  });
});
