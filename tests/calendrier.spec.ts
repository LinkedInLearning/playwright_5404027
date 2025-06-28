import { test, expect } from '@playwright/test';


test('Check calendar for "Janvier"', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/calendrier.html');

  const frame = page.frameLocator('main iframe');
  await frame.getByRole('link', { name: 'Janvier' }).click();
  await expect(frame.locator('main>div').getByRole('listitem')).toHaveCount(11);
});

test('Check calendar for "Août"', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/calendrier.html');

  const frame = page.frameLocator('main iframe');
  await frame.getByRole('link', { name: 'Août' }).click();
  await expect(frame.locator('main>div').getByRole('listitem')).toHaveCount(24);
});

test('Get data from API', async ({ request }) => {
  // Make a GET request to the "API" (https://labasse.github.io/tutti-frutti/calendrier.json) 
});