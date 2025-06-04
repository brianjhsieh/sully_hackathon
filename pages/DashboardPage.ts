import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly newPatientNamePopup: Locator;
  readonly newPatientNameInput: Locator;
  readonly newPatientNameSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newPatientNamePopup = page.getByText('Patient NamePleaseAdd');
    this.newPatientNameInput = page.locator('#patientName');
    this.newPatientNameSubmitButton = page.getByRole('button', { name: 'Continue' });
  }

  sidebarButton(label: string): Locator {
    return this.page.getByRole('button', { name: label });
  }

  async navigateToSection(label: string) {
    const btn = this.sidebarButton(label);
    await btn.waitFor({ state: 'visible' });
    await btn.click();
  }

  async expectSidebarItemsVisible(labels: string[]) {
    for (const label of labels) {
      await this.sidebarButton(label).waitFor({ state: 'visible' });
    }
  }

  async isGreetingVisible(): Promise<boolean> {
    return await this.page.getByText('How can I help you today?').isVisible();
  }

  getNewVisitButton(): Locator {
    return this.page.locator('#twid_new_visit_button');
  }

  async startNewVisit() {
    await this.getNewVisitButton().click();
  }

  async selectExistingPatient(name: string) {
    const existingPatientCard = this.page.locator('#twid_existing_patient_card');
    await expect(existingPatientCard).toBeVisible();

    const searchInput = existingPatientCard.getByRole('combobox', { name: /search or create patient/i });
    await searchInput.click(); // triggers dropdown

    const patientOption = this.page.getByRole('option', { name: 'Test Patient' }).nth(0);
    await expect(patientOption).toBeVisible();
    await patientOption.click();
  }
};
