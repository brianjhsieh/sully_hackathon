import { expect, Page, Locator } from '@playwright/test';

export class VisitPage {
  readonly page: Page;
  readonly transcriptTextarea: Locator;
  readonly startInPersonVisitButton: Locator;
  readonly finishVisitButton: Locator;
  readonly alertPopupButton: Locator;
  readonly notesTextarea: Locator;
  readonly generateNoteButton: Locator;
  readonly viewNoteButton: Locator;
  readonly addNotesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transcriptTextarea = page.getByRole('textbox', { name: /Transcript/i });
    this.startInPersonVisitButton = page.getByRole('button', { name: /Start In-Person Visit/i });
    this.finishVisitButton = page.getByRole('button', { name: /Finish Visit/i });
    this.alertPopupButton = page.getByRole('button', { name: /OK/i });
    this.notesTextarea = page.getByRole('textbox', { name: /Type additional notes here/i });
    this.generateNoteButton = page.getByRole('button', { name: /Generate Note/i });
    this.viewNoteButton = page.getByRole('button', { name: /View Note/i });
    this.addNotesButton = page.getByRole('button', { name: /Add Notes/i });
  }

  async isLoaded(): Promise<boolean> {
    return this.transcriptTextarea.isVisible();
  }

  async startInPersonVisit(): Promise<void> {
    await this.startInPersonVisitButton.click();
  }

  async typeNotesInput(message: string): Promise<void> {
    await this.notesTextarea.fill(message);
  }

  async addNotes(): Promise<void> {
    await this.addNotesButton.click();
  }
}
