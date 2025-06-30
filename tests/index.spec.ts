import { test } from './fixtures';
import { expect, Locator } from '@playwright/test';

test.describe('Home page tests', () => {
  test.beforeEach(async ({ indexPage, nav }) => {
    await indexPage.goto();
  });

  test('Search is ready on load', async ({ indexPage }) => {
    await expect(indexPage.searchBox).toBeEnabled();
    await expect(indexPage.searchBox).toBeEditable();
    await expect(indexPage.searchBox).toBeFocused();
  });

  test('Select menu "Portrait" goes to the page', async ({ page, indexPage, nav }) => {
    await indexPage.clickPortrait();
    await expect(page).toHaveURL(RegExp(`^.*${nav.portrait}$`));
  });

  test('All fruits displayed', async ({ indexPage }) => {
    await indexPage.page.screenshot({ 
      path: 'test-results/screenshots/index-page.png', 
      fullPage: true 
    });
    await expect(indexPage.fruitCards).toHaveCount(11);
  });

  test('Simple search with results', async ({ page, indexPage }) => {
    await indexPage.search('ana')
    await expect(indexPage.fruitCards).toHaveCount(2);
    await expect(indexPage.fruitCards).toHaveText(['Ananas', 'Banane']);
    await expect(indexPage.searchBox).not.toBeEmpty();
    await expect(page.getByText(/^Ananas.*Banane/i)).toBeVisible();
  });

  test('Simple search with no result', async ({ page, indexPage }) => {
    await indexPage.search('xyz');
    await expect(page.locator('#liste>div>.row')).toBeEmpty();
  });

  test('Bottom link return to the top', async ({ indexPage }) => {
    await indexPage.clickTop();
    await expect(indexPage.linkChercher).toBeInViewport();
  });

  test('Click on "Chercher" reset search', async ({ indexPage }) => {
    await indexPage.search('xs');
    await indexPage.clickHome();
    await expect(indexPage.searchBox).toBeEmpty();
  });
});