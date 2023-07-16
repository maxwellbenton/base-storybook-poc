import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:6006/');
  await page.goto('http://localhost:6006/?path=/docs/example-introduction--docs');
  await page.getByRole('button', { name: 'IntegratedCheckout' }).click();
  await page.frameLocator('iframe[title="storybook-preview-iframe"]').getByRole('heading', { name: 'INTEGRATED CHECKOUT' }).click();
});

test('get started link', async ({ page }) => {
  await page.goto('https://localhost:6006/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
