import { test, expect } from '@playwright/test';


test('Select "Nez" filters the palette', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/portrait.html');
  // TODO
});
