import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
  test("blog listing page loads with posts", async ({ page }) => {
    await page.goto("/en/blog");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("click a post and verify detail page renders", async ({ page }) => {
    await page.goto("/en/blog");
    const firstPostHeading = page.locator("article h2").first();
    const postTitle = await firstPostHeading.textContent();
    await firstPostHeading.click();
    await expect(page).toHaveURL(/\/en\/blog\/\d{4}\/\d{2}\/\d{2}\//);
    await expect(page.locator("h1")).toBeVisible();
    if (postTitle) {
      await expect(page.locator("h1")).toContainText(postTitle);
    }
  });

  test("Japanese blog listing page loads", async ({ page }) => {
    await page.goto("/ja/blog");
    await expect(page.locator("article").first()).toBeVisible();
  });
});
