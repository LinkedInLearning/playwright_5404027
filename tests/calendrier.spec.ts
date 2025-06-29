import { test } from './fixtures';
import { expect, Locator, FrameLocator } from '@playwright/test';

test.describe('Calendrier drawing tests', () => {
  let fruitList: Locator;
  let frame: FrameLocator;

  test.beforeEach(async ({ page, nav }) => {
    await page.goto(nav.calendrier);
    frame = page.frameLocator('main iframe');
    fruitList = frame.locator('main>div').getByRole('listitem');
  });

  test('Current month is selected by default', async ({ page }) => {
    // A faire 
    await expect(fruitList).toHaveCount(11);
  });

  test('Check calendar for "Janvier"', async () => {
    await frame.getByRole('link', { name: 'Janvier' }).click();
    await expect(fruitList).toHaveCount(11);
  });

  test('Check calendar for "Août"', async () => {
    await frame.getByRole('link', { name: 'Août' }).click();
    await expect(fruitList).toHaveCount(24);
  });

  test('Get data from API', async ({ request }) => {
      const response = await request.get(
          '/tutti-frutti/calendrier.json', {
              headers: {
                  'Accept': 'application/json',
              },
          });
      expect(response.ok()).toBeTruthy();
      const data = await response.json();
      expect(data).toBeInstanceOf(Array);
      expect(data.length).toEqual(37);
      expect(data[0][0]).toEqual('Abricot');
      expect(data[0][1]).toBeGreaterThan(0);
      expect(data[0][2]).toMatch(/^0b[0-1]{12}$/);
  });
});
