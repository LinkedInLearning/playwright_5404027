import { test, expect } from '@playwright/test';


test('Search is ready on load', async ({ page }) => {
  const searchBox = page.getByRole('searchbox', { name: 'Chercher' });
  
  await page.goto('https://labasse.github.io/tutti-frutti/');
  await expect(searchBox).toBeEnabled();
  await expect(searchBox).toBeEditable();
  await expect(searchBox).toBeFocused();
});

test('Select menu "Portrait" goes to the page', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/');
  await page.getByRole('link', { name: 'Portrait' }).click();
  await expect(page).toHaveURL(/.*\/portrait.html$/);
});

test('All fruits displayed', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/');
  await expect(page.getByAltText(/\(fruit\)$/)).toHaveCount(11);
});

test('Simple search with results', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/');
  await page.getByRole('searchbox', { name: 'Chercher' }).click();
  await page.getByRole('searchbox', { name: 'Chercher' }).fill('ana');
  await expect(page.getByRole("listitem")
                   .filter({ has: page.getByRole('img') })
                   .filter({ hasNotText: 'Autres' })
                   .getByRole('heading', { level: 5 })
        ).toHaveText(['Ananas', 'Banane']);
  await expect(page.getByRole('searchbox', { name: 'Chercher' })).not.toBeEmpty();
  await expect(page.getByText(/^Ananas.*Banane/i)).toBeVisible();
});

test('Simple search with no result', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/');
  await page.getByRole('searchbox', { name: 'Chercher' }).click();
  await page.getByRole('searchbox', { name: 'Chercher' }).fill('xyz');
  await expect(page.locator('#liste>div>.row')).toBeEmpty();
});

test('Bottom link return to the top', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/');
  await page.getByRole('link', { name: 'Haut de page' }).click();
  await expect(page
                .getByRole('navigation')
                .getByRole('link', { name: 'chercher' })
              ).toBeInViewport();
});

test('Click on "Chercher" reset search', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/');
  await page.getByRole('searchbox', { name: 'Chercher' }).click();
  await page.getByRole('searchbox', { name: 'Chercher' }).fill('xs');
  await page.getByRole('link', { name: 'Tutti-Frutti' }).click();
  await expect(page.getByRole('searchbox', { name: 'Chercher' })).toBeEmpty();
});