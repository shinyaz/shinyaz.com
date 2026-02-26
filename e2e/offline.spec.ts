import { test, expect } from "@playwright/test";

test.describe("Offline page", () => {
  test("English offline page renders title and message", async ({ page }) => {
    await page.goto("/en/~offline");
    await expect(page.locator("h1")).toHaveText("Offline");
    await expect(page.locator("p")).toContainText(
      "You are not connected to the internet"
    );
  });

  test("Japanese offline page renders title and message", async ({ page }) => {
    await page.goto("/ja/~offline");
    await expect(page.locator("h1")).toHaveText("Offline");
    await expect(page.locator("p")).toContainText(
      "インターネットに接続されていません"
    );
  });
});
