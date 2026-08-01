import { test, expect } from '@playwright/test';

test.describe('EPAM.com navigation', () => {
  test('Industries -> Explore Our Client Work shows Contact Us link', async ({ page }) => {
    // Navigate
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // Some regions show a cookie consent banner; dismiss if present.
    const acceptCookies = page.getByRole('button', { name: /accept|agree/i });
    if (await acceptCookies.isVisible().catch(() => false)) {
      await acceptCookies.click();
    }

    // Open header menu entry "Industries"
    // EPAM header uses a top-nav item; click it to open its menu.
    await page.getByRole('link', { name: /^Industries$/i }).click();

    // Click "Explore Our Client Work" from the Industries menu
    await page.getByRole('link', { name: /Explore Our Client Work/i }).click();

    // Verify "Contact Us" link is visible on destination page
    await expect(page.getByRole('link', { name: /Contact Us/i })).toBeVisible();
  });
});
