import { test } from './fixtures';
import { expect, Locator } from '@playwright/test';

test.describe('Home page tests', () => {
  let searchBox: Locator;

  test.beforeEach(async ({ page, nav }) => {
    await page.goto(nav.home);
    searchBox = page.getByRole('searchbox', { name: 'Chercher' })
  });

  test('Search is ready on load', async () => {
    await expect(searchBox).toBeEnabled();
    await expect(searchBox).toBeEditable();
    await expect(searchBox).toBeFocused();
  });

  test('Select menu "Portrait" goes to the page', async ({ page, nav }) => {
    await page.getByRole('link', { name: 'Portrait' }).click();
    await expect(page).toHaveURL(RegExp(`^.*${nav.portrait}$`));
  });

  test('All fruits displayed', async ({ page }) => {
    await expect(page.getByAltText(/\(fruit\)$/)).toHaveCount(11);
  });

  test('Simple search with results', async ({ page }) => {
    await searchBox.click();
    await searchBox.fill('ana');
    await expect(page.getByRole("listitem")
                    .filter({ has: page.getByRole('img') })
                    .filter({ hasNotText: 'Autres' })
                    .getByRole('heading', { level: 5 })
          ).toHaveText(['Ananas', 'Banane']);
    await expect(searchBox).not.toBeEmpty();
    await expect(page.getByText(/^Ananas.*Banane/i)).toBeVisible();
  });

  test('Simple search with no result', async ({ page }) => {
    await searchBox.click();
    await searchBox.fill('xyz');
    await expect(page.locator('#liste>div>.row')).toBeEmpty();
  });

  test('Bottom link return to the top', async ({ page }) => {
    await page.getByRole('link', { name: 'Haut de page' }).click();
    await expect(page
                  .getByRole('navigation')
                  .getByRole('link', { name: 'chercher' })
                ).toBeInViewport();
  });

  test('Click on "Chercher" reset search', async ({ page }) => {
    await searchBox.click();
    await searchBox.fill('xs');
    await page.getByRole('link', { name: 'Tutti-Frutti' }).click();
    await expect(page.getByRole('searchbox', { name: 'Chercher' })).toBeEmpty();
  });
});