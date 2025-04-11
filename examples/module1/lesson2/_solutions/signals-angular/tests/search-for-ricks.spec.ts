import test, { expect } from '@playwright/test';

test.describe('Search for Rick', () => {
  test('should show 20 Ricks', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox').fill('Rick');
    await expect(page.getByRole('listitem')).toHaveCount(20);
  });
});
