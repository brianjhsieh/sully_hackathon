import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Dashboard Page', () => {
    test('Dashboard loads correctly and allows navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);

    await dashboardPage.expectSidebarItemsVisible([
        'Home', 'Visits', 'Patients', 'Scribe',
        'Nurse', 'Consultant', 'Researcher', 'Receptionist',
        'Interpreter', 'Apps'
    ]);

    await dashboardPage.navigateToSection('Visits');
    });
});
