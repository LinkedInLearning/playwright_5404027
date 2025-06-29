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
    const response = await request.get(
        'https://labasse.github.io/tutti-frutti/calendrier.json', {
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