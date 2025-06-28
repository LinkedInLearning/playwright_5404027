import { test, expect, Page, Locator } from '@playwright/test';


test('Hover on first palette item', async ({ page }) => {
  const first = page.locator('#palette').getByRole('listitem').nth(0);
  await page.goto('https://labasse.github.io/tutti-frutti/portrait.html');
  
  await first.hover();
  
  await expect(first).toHaveCSS('background-color', 'rgba(192, 192, 192, 0.5)');
});

test('Drag first palette item to the canvas', async ({ page }) => {
  const first = page.locator('#palette').getByRole('listitem').nth(0);
  const canvas = page.getByRole('figure').getByRole('grid');
  await page.goto('https://labasse.github.io/tutti-frutti/portrait.html');
  
  await first.dragTo(canvas, { 'targetPosition': { x: 30, y: 30 } });
  
  await expect(page.getByRole('figure').getByRole('gridcell')).toHaveCount(1);
});

async function drag2ElementsToCanvas(page: Page, palette: Locator) : Promise<void> {
  const canvas = page.getByRole('figure').getByRole('grid');
  
  await palette.nth(0).dragTo(canvas, { 'targetPosition': { x: 30, y: 30 } });
  await palette.nth(1).dragTo(canvas);
}

async function centerOf(locator: Locator): Promise<{ x: number, y: number }> {
  const box = await locator.boundingBox();
  
  return box 
    ? { x: box.x + box.width / 2, y: box.y + box.height / 2 } 
    : { x: 0, y: 0 };
}

test('Select with mouse', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/portrait.html');
  await drag2ElementsToCanvas(page, page.locator('#palette').getByRole('listitem'));
  const f1Center = await centerOf(page.locator('#f1'));

  await page.mouse.click(f1Center.x, f1Center.y);
 
  await expect(page.getByRole('figure').getByRole('gridcell', {selected : true})).toHaveId('f1');
});

test('Select background', async ({ page }) => {
  const canvas = page.getByRole('figure').getByRole('grid');
  await page.goto('https://labasse.github.io/tutti-frutti/portrait.html');
  
  await page.getByLabel('Fond').setInputFiles(['tests/data/bg.jpg']);

  const canvasCenter = await centerOf(canvas);
  await page.mouse.move(canvasCenter.x, canvasCenter.y);
  await page.mouse.wheel(0, 200);
  
  await expect(canvas).toHaveCSS('background-image', /^url\("data\:image\/jpeg;base64.*"\)/);
});

test('Delete current item', async ({ page }) => {
  await page.goto('https://labasse.github.io/tutti-frutti/portrait.html');
  await drag2ElementsToCanvas(page, page.locator('#palette').getByRole('listitem'));

  await page.keyboard.press('Delete');
  
  await expect(page.getByRole('figure').getByRole('gridcell')).toHaveCount(1);
});
