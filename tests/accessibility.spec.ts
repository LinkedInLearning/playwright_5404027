// npm install -D @axe-core/playwright
import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';


test.describe('Accessibility testing', () => {
    
    test('Home page', async ({ page }) => {
        await page.goto('https://playwright.dev/');
        const res = await new AxeBuilder({ page }).withTags('wcag2aa').analyze();

        expect(res.violations).toEqual([]);
    });

    test('Documentation page', async ({ page }) => {
        await page.goto('https://playwright.dev/docs/intro');
        
        const res = await new AxeBuilder({ page }).withTags('wcag2aa').analyze();
        
        expect(res.violations).toEqual([]);
    });
});

