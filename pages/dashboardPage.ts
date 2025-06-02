import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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
}
