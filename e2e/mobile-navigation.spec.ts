import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 375, height: 667 } });

test.describe("Mobile Navigation", () => {
  test("hamburger menu is visible on mobile", async ({ page }) => {
    await page.goto("/en");
    const hamburger = page.getByRole("button", { name: "Menu" });
    await expect(hamburger).toBeVisible();
  });

  test("desktop nav is hidden on mobile", async ({ page }) => {
    await page.goto("/en");
    const desktopNav = page.locator("header nav.md\\:flex");
    await expect(desktopNav).toBeHidden();
  });

  test("opens drawer and shows nav links", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Uses" })).toBeVisible();
    await expect(page.getByRole("link", { name: "About" })).toBeVisible();
  });

  test("navigates to blog via mobile menu", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL(/\/en\/blog/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("drawer closes after navigation", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/en\/about/);
    // After navigation, the drawer should be closed, hamburger shows "Menu" again
    const hamburger = page.getByRole("button", { name: "Menu" });
    await expect(hamburger).toBeVisible();
  });

  test("closes drawer with Escape key", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
  });

  test("closes drawer when clicking overlay", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
    // Click the overlay (left side of screen, since drawer is on right)
    await page.click("[aria-hidden='true']");
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
  });

  test("Japanese locale mobile menu", async ({ page }) => {
    await page.goto("/ja");
    const hamburger = page.getByRole("button", { name: "メニュー" });
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
  });
});
