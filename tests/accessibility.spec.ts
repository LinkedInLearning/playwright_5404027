// npm install -D @axe-core/playwright
import { test, expect } from '@playwright/test';


test.describe('Accessibility testing', () => {
    
    test('Home page', async ({ page }) => {
        await page.goto('https://playwright.dev/');

        // TODO        
    });

    test('Documentation page', async ({ page }) => {
        await page.goto('https://playwright.dev/docs/intro');
        
        // TODO
    });
});

