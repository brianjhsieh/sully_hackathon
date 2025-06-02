import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  sidebarButton(name: string): Locator {
    return this.page.locator(`button[data-tooltip-id*="${name.toLowerCase()}"]`);
  }

  async clickSidebarItem(name: string) {
    await this.sidebarButton(name).click();
  }

  async assertSidebarItemVisible(name: string) {
    await this.sidebarButton(name).waitFor({ state: 'visible' });
  }

  async validateSidebarItems(expectedItems: string[]) {
    for (const item of expectedItems) {
      await this.assertSidebarItemVisible(item);
    }
  }
}
