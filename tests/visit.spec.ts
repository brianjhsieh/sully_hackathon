import { test, expect } from '@playwright/test';
import { VisitPage } from '../pages/VisitPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Visit Page', () => {
    test('Start a new visit using voice recording', async ({ page }) => {
        // Login flow
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.loginSuccessfully();

        // Navigate to patient/visit page
        const dashboard = new DashboardPage(page);
        await dashboard.selectExistingPatient('Test Patient');

        const visitPage = new VisitPage(page);
        await expect(visitPage.transcriptTextarea).toBeVisible();

        // Start in-person visit
        await visitPage.startInPersonVisit();

        // Wait for the transcript to update
        await expect(visitPage.transcriptTextarea).toHaveValue(/headache/i, { timeout: 60000 });

        // Finish the visit and check to see if note is generated
        await visitPage.finishVisitButton.click();
        await expect(visitPage.viewNoteButton).toBeVisible({ timeout: 10000 });
    });

    test('Start a new visit using voice recording with empty audio', async ({ page }) => {
        // Login flow
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.loginSuccessfully();

        // Navigate to patient/visit page
        const dashboard = new DashboardPage(page);
        await dashboard.selectExistingPatient('Test Patient');

        const visitPage = new VisitPage(page);
        await expect(visitPage.transcriptTextarea).toBeVisible();

        // Start in-person visit
        await visitPage.startInPersonVisit();

        // No transcript should be generated for empty audio
        const transcript = await expect(visitPage.transcriptTextarea).toBeEmpty();

        // Prematurely finish the visit
        await visitPage.finishVisitButton.click();

        // Alert popup should appear
        await visitPage.alertPopupButton.click();

        // Should be directed back to the main page
        await page.getByText('How can I help you today?').waitFor();
    });

    test('Start a new visit using manually added notes', async ({ page }) => {
        // Login flow
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.loginSuccessfully();

        // Navigate to patient/visit page
        const dashboard = new DashboardPage(page);
        await dashboard.selectExistingPatient('Test Patient');

        const visitPage = new VisitPage(page);
        await expect(visitPage.transcriptTextarea).toBeVisible();

        // Start in-person visit
        await visitPage.addNotes();
        await visitPage.typeNotesInput("The patient has a headache and fever. They have been taking pain medication for the past week.");

        await expect(visitPage.notesTextarea).not.toBeEmpty();

        await visitPage.generateNoteButton.click();
        await expect(visitPage.viewNoteButton).toBeVisible({ timeout: 10000 }); // High timeout due to note generation time
    });
});