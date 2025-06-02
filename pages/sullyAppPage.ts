import { Page, Locator } from '@playwright/test';

export class SullyAppPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly sidebar: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: /login|sign in/i });
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.sidebar = page.locator('nav, aside');
    // this.header = page.locator('header');
    this.header = page.getByRole('img', { name: 'Sully.ai' });
  }

  async goto() {
    await this.page.goto('https://app.sully.ai/');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
