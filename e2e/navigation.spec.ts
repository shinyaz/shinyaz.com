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
});
