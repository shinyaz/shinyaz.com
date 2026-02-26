import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("navigate to blog page", async ({ page }) => {
    await page.goto("/en");
    await page.click('a[href="/en/blog"]');
    await expect(page).toHaveURL(/\/en\/blog/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("navigate to projects page", async ({ page }) => {
    await page.goto("/en");
    await page.click('a[href="/en/projects"]');
    await expect(page).toHaveURL(/\/en\/projects/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("navigate to uses page", async ({ page }) => {
    await page.goto("/en");
    await page.click('a[href="/en/uses"]');
    await expect(page).toHaveURL(/\/en\/uses/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("navigate to about page", async ({ page }) => {
    await page.goto("/en");
    await page.click('a[href="/en/about"]');
    await expect(page).toHaveURL(/\/en\/about/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("category page loads from blog post badge", async ({ page }) => {
    await page.goto("/en/blog");
    const categoryLink = page.locator('a[href*="/en/category/"]').first();
    if (await categoryLink.isVisible()) {
      await categoryLink.click();
      await expect(page).toHaveURL(/\/en\/category\//);
      await expect(page.locator("h1")).toBeVisible();
    }
  });

  test("tag page loads from blog post badge", async ({ page }) => {
    await page.goto("/en/blog");
    const tagLink = page.locator('a[href*="/en/tag/"]').first();
    if (await tagLink.isVisible()) {
      await tagLink.click();
      await expect(page).toHaveURL(/\/en\/tag\//);
      await expect(page.locator("h1")).toBeVisible();
    }
  });

  test("non-existent route returns 404 status", async ({ page }) => {
    const response = await page.goto("/en/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
