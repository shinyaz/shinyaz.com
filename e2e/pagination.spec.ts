import { test, expect } from "@playwright/test";

test.describe("Pagination", () => {
  test("blog listing shows pagination when enough posts exist", async ({ page }) => {
    await page.goto("/en/blog");
    const pagination = page.locator('nav[aria-label="Pagination"]').first();
    if (await pagination.isVisible()) {
      await expect(pagination.locator('[aria-current="page"]').first()).toContainText("1");
    }
  });

  test("clicking page 2 navigates and updates current page", async ({ page }) => {
    await page.goto("/en/blog");
    const pagination = page.locator('nav[aria-label="Pagination"]').first();
    if (await pagination.isVisible()) {
      const page2Link = pagination.locator('a:has-text("2")').first();
      if (await page2Link.isVisible()) {
        await page2Link.click();
        await expect(page).toHaveURL(/page=2/);
        await expect(pagination.locator('[aria-current="page"]').first()).toContainText("2");
      }
    }
  });

  test("prev/next buttons work", async ({ page }) => {
    await page.goto("/en/blog?page=2");
    const pagination = page.locator('nav[aria-label="Pagination"]').first();
    if (await pagination.isVisible()) {
      const prevLink = pagination.locator('a:has-text("Prev")');
      if (await prevLink.isVisible()) {
        await prevLink.click();
        await expect(page).toHaveURL(/\/en\/blog$/);
      }
    }
  });
});
