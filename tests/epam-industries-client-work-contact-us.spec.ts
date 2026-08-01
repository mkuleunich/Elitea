import { test, expect, type Page } from '@playwright/test';

async function dismissCookieBanner(page: Page) {
  const acceptButton = page
    .getByRole('button', { name: /accept|agree|allow all|i agree/i })
    .first();

  if (await acceptButton.isVisible().catch(() => false)) {
    await acceptButton.click();
  }
}

test('user can open client work from Industries and see the Contact Us link', async ({
  page,
}) => {
  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });
  await dismissCookieBanner(page);

  const industriesTrigger = page
    .locator(
      'header button[aria-label="Expand: Industries"]:visible, header button[aria-label="Industries"]:visible, header [role="button"][aria-label="Industries"]:visible'
    )
    .first();

  if (await industriesTrigger.isVisible().catch(() => false)) {
    await industriesTrigger.click();
  } else {
    const industriesTextTrigger = page.getByRole('banner').getByText(/^Industries$/).first();
    await expect(industriesTextTrigger).toBeVisible();
    await industriesTextTrigger.click();
  }

  const exploreClientWorkLink = page
    .getByRole('link', { name: /Explore Our Client Work/i })
    .first();

  await expect(exploreClientWorkLink).toBeVisible();
  await exploreClientWorkLink.click();

  await expect(page).toHaveURL(/\/services\/client-work\/?$/);
  await expect(page.getByRole('link', { name: /Contact Us/i }).first()).toBeVisible();
});
