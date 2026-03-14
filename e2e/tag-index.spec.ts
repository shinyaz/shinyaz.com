import { test, expect } from "@playwright/test";

test.describe("Tag Index Page", () => {
  test("English tag index page loads with tags", async ({ page }) => {
    await page.goto("/en/tag");
    await expect(page.locator("h1")).toContainText("Tags");
    await expect(page.locator("a[href*='/en/tag/']").first()).toBeVisible();
  });

  test("Japanese tag index page loads with tags", async ({ page }) => {
    await page.goto("/ja/tag");
    await expect(page.locator("h1")).toContainText("タグ");
    await expect(page.locator("a[href*='/ja/tag/']").first()).toBeVisible();
  });

  test("each tag shows post count", async ({ page }) => {
    await page.goto("/en/tag");
    const firstTag = page.locator("a[href*='/en/tag/']").first();
    await expect(firstTag).toContainText(/\(\d+\)/);
  });

  test("clicking a tag navigates to tag detail page", async ({ page }) => {
    await page.goto("/en/tag");
    const firstLink = page.locator("a[href*='/en/tag/']").first();
    await firstLink.click();
    await expect(page).toHaveURL(/\/en\/tag\/.+/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("tag detail page has link back to tag index", async ({ page }) => {
    await page.goto("/en/tag");
    const firstLink = page.locator("a[href*='/en/tag/']").first();
    await firstLink.click();
    await expect(page).toHaveURL(/\/en\/tag\/.+/);
    const backLink = page.locator("a[href='/en/tag']");
    await expect(backLink).toContainText("All Tags");
    await backLink.click();
    await expect(page).toHaveURL(/\/en\/tag$/);
  });

  test("blog page has link to tag index", async ({ page }) => {
    await page.goto("/en/blog");
    const tagLink = page.locator("a[href='/en/tag']");
    await expect(tagLink).toBeVisible();
    await tagLink.click();
    await expect(page).toHaveURL(/\/en\/tag$/);
  });
});
