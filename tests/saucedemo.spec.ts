import { expect } from '@playwright/test';
import { test } from './fixtures';
import { User } from './fixtures/user';


test('Login with valid credentials', async ({ page }) => {
    await page.goto(User.loginUrl);
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    expect(page).toHaveURL(User.authorizedUrl);
});

test('Unlogged user cannot access inventory', async ({ page }) => {
    await page.goto(User.authorizedUrl);

    expect(page).toHaveURL(User.loginUrl);
});

test('Add to cart btn becomes Remove btn (standard_user)', async ({ page }) => {
    const product = page
        .getByTestId('inventory-item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' });
    await page.goto(User.authorizedUrl);
    await product.getByRole('button', { name: 'Add to cart'}).click();
    await expect(product.getByRole('button', { name: 'Remove' })).toBeVisible();
});

test('Add to cart btn does not change (problem_user)', async ({ page }) => {
    const buggyBtn = page
        .getByTestId('inventory-item')
        .filter({ hasText: 'Sauce Labs Bolt T-Shirt' })
        .getByRole('button', { name: 'Add to cart'});
    await page.goto(User.authorizedUrl);
    await buggyBtn.click();
    await expect(buggyBtn).toBeVisible();
});