import { test } from './fixtures';
import { expect, Locator } from '@playwright/test';

test.describe('Portrait page tests', () => {
  let titreInput, titrePortrait: Locator;

  test.beforeEach(async ({ page, nav }) => {
    await page.goto(nav.portrait);
    titreInput = page.getByPlaceholder('Titre du portrait');
    titrePortrait = page.getByRole('figure').getByRole('heading');
  });

  test('Select "Nez" filters the palette', async ({ page }) => {
    await page.getByRole('combobox').selectOption('Nez');
    await expect(page.locator('#palette').getByRole('listitem')).toHaveCount(6);
  });

  test('Set the portrait title', async ({ page }) => {
    await titreInput.fill('Vertumne');
    await page.getByRole('button', { name: 'Ok' }).click();
    await expect(titrePortrait).toHaveText('Vertumne');
  });

  test('Set invalid portrait title', async ({ page }) => {
    await titreInput.fill('V');
    await page.getByRole('button', { name: 'Ok' }).focus();
    await expect(page.locator('input[type=text]:invalid')).toHaveCount(1);
    await expect(titrePortrait).toHaveText('(sans titre)');
  });

  test('Hide portrait title', async ({ page }) => {
    await page.goto('/tutti-frutti/portrait.html');
    await page.getByLabel('Titre visible').uncheck();
    await expect(titrePortrait).toBeHidden();
  });

  test('Change default item size', async ({ page }) => {
    await page.getByLabel('Taille :').fill('8');
    await expect(page.locator('#valeur')).toHaveText('8');
  });
});