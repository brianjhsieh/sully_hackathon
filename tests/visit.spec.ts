// tests/start-visit.spec.ts
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

        // TODO: Audio streaming to microphone is not implemented yet
        // Expected to use "clean.m4a"

        const transcript = await expect(visitPage.transcriptTextarea).not.toBeEmpty();
        expect(transcript).toContain('headache');
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

        // TODO: Audio streaming to microphone is not implemented yet
        // Expected to use "silence.m4a"

        const transcript = await expect(visitPage.transcriptTextarea).toBeEmpty();
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