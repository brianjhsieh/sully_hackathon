import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Sully AI App', () => {
  test('should load the main page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(page).toHaveTitle(/Sully|AI/i);
    await expect(loginPage.header).toBeVisible();
  });

  test('should show login form', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

    test('should login with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await loginPage.loginSuccessfully();
    await page.getByText('How can I help you today?').waitFor();
  });

  test('should not login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'wrongpassword');
    await expect(page.getByText('Something went wrong!')).toBeVisible();
  });

  // Add more tests as needed, e.g., navigation, sidebar, etc.
});
