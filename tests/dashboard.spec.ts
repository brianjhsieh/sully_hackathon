import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';

test('Verify dashboard sidebar contains expected items', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
  expect(await loginPage.isLoggedIn()).toBeTruthy();

  await dashboard.validateSidebarItems([
    'Home',
    'Search',
    'Visits',
    'Patients',
    'Scribe',
    'Nurse',
    'Consultant',
    'Researcher',
    'Receptionist',
    'Interpreter',
    'Apps',
  ]);
});
