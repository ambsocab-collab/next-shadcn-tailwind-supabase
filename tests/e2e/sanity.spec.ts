import { test, expect } from '@playwright/test';

test('basic sanity check', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});