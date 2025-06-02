import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test('Dashboard loads correctly and allows navigation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);

  await dashboard.expectSidebarItemsVisible([
    'Home', 'Visits', 'Patients', 'Scribe',
    'Nurse', 'Consultant', 'Researcher', 'Receptionist',
    'Interpreter', 'Apps'
  ]);

  await dashboard.navigateToSection('Scribe');
});
