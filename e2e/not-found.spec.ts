import { test, expect } from "@playwright/test";

test.describe("404 Not Found", () => {
  test("English 404 page shows error message and home link", async ({ page }) => {
    await page.goto("/en/nonexistent-page-xyz");
    await expect(page.locator("h1")).toContainText("404");
    await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
  });

  test("Japanese 404 page shows localized message", async ({ page }) => {
    await page.goto("/ja/nonexistent-page-xyz");
    await expect(page.locator("h1")).toContainText("404");
    await expect(page.getByRole("link", { name: "ホームに戻る" })).toBeVisible();
  });

  test("deeply nested non-existent path shows 404", async ({ page }) => {
    await page.goto("/en/a/b/c/d/e");
    await expect(page.locator("h1")).toContainText("404");
  });
});
