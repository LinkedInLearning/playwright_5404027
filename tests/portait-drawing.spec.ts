import { test } from './fixtures';
import { expect, Page, Locator } from '@playwright/test';

test.describe('Portrait drawing tests', () => {
  let first, second, canvas: Locator;

  test.beforeEach(async ({ page, nav }) => {
    await page.goto(nav.portrait);
    first = page.locator('#palette').getByRole('listitem').nth(0);
    second = page.locator('#palette').getByRole('listitem').nth(1);
    canvas = page.getByRole('figure').getByRole('grid');
  });

  test('Hover on first palette item', async () => {
    await first.hover();
    
    await expect(first).toHaveCSS('background-color', 'rgba(192, 192, 192, 0.5)');
  });

  test('Drag first palette item to the canvas', async ({ page }) => {
    await first.dragTo(canvas, { 'targetPosition': { x: 30, y: 30 } });
    
    await expect(page.getByRole('figure').getByRole('gridcell')).toHaveCount(1);
  });

  async function drag2ElementsToCanvas(page: Page) : Promise<void> {
    const canvas = page.getByRole('figure').getByRole('grid');
    
    await first.dragTo(canvas, { 'targetPosition': { x: 30, y: 30 } });
    await second.dragTo(canvas);
  }

  async function centerOf(locator: Locator): Promise<{ x: number, y: number }> {
    const box = await locator.boundingBox();
    
    return box 
      ? { x: box.x + box.width / 2, y: box.y + box.height / 2 } 
      : { x: 0, y: 0 };
  }

  test('Select with mouse', async ({ page }) => {
    await drag2ElementsToCanvas(page);
    const f1Center = await centerOf(page.locator('#f1'));

    await page.mouse.click(f1Center.x, f1Center.y);
  
    await expect(page.getByRole('figure').getByRole('gridcell', {selected : true})).toHaveId('f1');
  });

  test('Select background', async ({ page }) => {
    await page.getByLabel('Fond').setInputFiles(['tests/data/bg.jpg']);

    const canvasCenter = await centerOf(canvas);
    await page.mouse.move(canvasCenter.x, canvasCenter.y);
    await page.mouse.wheel(0, 200);
    
    await expect(canvas).toHaveCSS('background-image', /^url\("data\:image\/jpeg;base64.*"\)/);
  });

  test('Delete current item', async ({ page }) => {
    await drag2ElementsToCanvas(page);

    await page.keyboard.press('Delete');
    
    await expect(page.getByRole('figure').getByRole('gridcell')).toHaveCount(1);
  });

  test('Delete all items', async ({ page }) => {
    await drag2ElementsToCanvas(page);

    page.on('dialog', dlg => dlg.accept());
    await page.keyboard.press('Control+Delete');

    await expect(page.getByRole('figure').getByRole('gridcell')).toHaveCount(0);
  });
});
