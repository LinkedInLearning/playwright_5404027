import { test, expect } from '@playwright/test';


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

test('Select with mouse', async ({ page }) => {
  const first = page.locator('#palette').getByRole('listitem').nth(0);
  const second = page.locator('#palette').getByRole('listitem').nth(1);
  const canvas = page.getByRole('figure').getByRole('grid');
 
  await page.goto('https://labasse.github.io/tutti-frutti/portrait.html');
  await first.dragTo(canvas, { 'targetPosition': { x: 30, y: 30 } });
  await second.dragTo(canvas);
  const f1Pos = await page.locator('#f1').boundingBox() || { x: 0, y: 0, width: 0, height: 0 } ;
 
  await page.mouse.click(f1Pos.x + f1Pos.width/2, f1Pos.y+f1Pos.height/2);
 
  await expect(page.getByRole('figure').getByRole('gridcell', {selected : true})).toHaveId('f1');
});