import { test, expect } from '@playwright/test';


test('Select "Nez" filters the palette', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/portrait.html');
  await page.getByRole('combobox').selectOption('Nez');
  await expect(page.locator('#palette').getByRole('listitem')).toHaveCount(6);
});
