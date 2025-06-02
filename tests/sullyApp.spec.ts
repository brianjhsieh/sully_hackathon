import { test, expect } from '@playwright/test';
import { SullyAppPage } from '../pages/sullyAppPage';

test.describe('Sully AI App', () => {
  test('should load the main page', async ({ page }) => {
    const sully = new SullyAppPage(page);
    await sully.goto();
    await expect(page).toHaveTitle(/Sully|AI/i);
    await expect(sully.header).toBeVisible();
  });

  test('should show login form', async ({ page }) => {
    const sully = new SullyAppPage(page);
    await sully.goto();
    await expect(sully.emailInput).toBeVisible();
    await expect(sully.passwordInput).toBeVisible();
    await expect(sully.submitButton).toBeVisible();
  });

  test('should not login with invalid credentials', async ({ page }) => {
    const sully = new SullyAppPage(page);
    await sully.goto();
    await sully.login('invalid@example.com', 'wrongpassword');
    await expect(page.getByText('Something went wrong!')).toBeVisible();
  });

  // Add more tests as needed, e.g., navigation, sidebar, etc.
});
