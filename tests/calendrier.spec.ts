import { test, expect } from '@playwright/test';


test('Check calendar for "Janvier"', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/calendrier.html');

  // Cliquer sur le lien "Janvier"
  // Vérifier qu'on a bien 11 éléments
});

test('Check calendar for "Août"', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/calendrier.html');

  // Cliquer sur le lien "Août"
  // Vérifier qu'on a bien 24 éléments
});
