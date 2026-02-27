import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test("search page loads with input", async ({ page }) => {
    await page.goto("/en/search");
    await expect(page.locator("h1")).toContainText("Search");
    await expect(page.locator('input[type="search"]')).toBeVisible();
  });

  test("typing in search box filters results and updates URL", async ({
    page,
  }) => {
    await page.goto("/en/search");
    const input = page.locator('input[type="search"]');
    await input.fill("test-query");
    await expect(page).toHaveURL(/\/en\/search\?q=test-query/);
  });

  test("search with query param shows results on load", async ({ page }) => {
    await page.goto("/en/search?q=blog");
    const input = page.locator('input[type="search"]');
    await expect(input).toHaveValue("blog");
  });

  test("header search icon links to search page", async ({ page }) => {
    await page.goto("/en/blog");
    const searchLink = page.locator('a[aria-label="Search"]');
    await expect(searchLink).toBeVisible();
    await searchLink.click();
    await expect(page).toHaveURL(/\/en\/search/);
  });

  test("Japanese search page loads", async ({ page }) => {
    await page.goto("/ja/search");
    await expect(page.locator("h1")).toContainText("検索");
    await expect(page.locator('input[type="search"]')).toBeVisible();
  });
});
