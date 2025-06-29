import { test, expect } from '@playwright/test';


test('Select "Nez" filters the palette', async ({ page }) => {
  await page.goto('/tutti-frutti/portrait.html');
  await page.getByRole('combobox').selectOption('Nez');
  await expect(page.locator('#palette').getByRole('listitem')).toHaveCount(6);
});

test('Set the portrait title', async ({ page }) => {
  await page.goto('/tutti-frutti/portrait.html');
  await page.getByPlaceholder('Titre du portrait').fill('Vertumne');
  await page.getByRole('button', { name: 'Ok' }).click();
  await expect(page.getByRole('figure').getByRole('heading')).toHaveText('Vertumne');
});

test('Set invalid portrait title', async ({ page }) => {
  await page.goto('/tutti-frutti/portrait.html');
  await page.getByPlaceholder('Titre du portrait').fill('V');
  await page.getByRole('button', { name: 'Ok' }).focus();
  await expect(page.locator('input[type=text]:invalid')).toHaveCount(1);
  await expect(page.getByRole('figure').getByRole('heading')).toHaveText('(sans titre)');
});

test('Hide portrait title', async ({ page }) => {
  await page.goto('/tutti-frutti/portrait.html');
  await page.getByLabel('Titre visible').uncheck();
  await expect(page.getByRole('figure').getByRole('heading')).toBeHidden();
});

test('Change default item size', async ({ page }) => {
  await page.goto('/tutti-frutti/portrait.html');
  await page.getByLabel('Taille :').fill('8');
  await expect(page.locator('#valeur')).toHaveText('8');
});
