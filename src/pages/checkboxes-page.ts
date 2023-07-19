import { Locator, Page } from "@playwright/test";

export class CheckboxesPage {
  private page: Page;

  private header: Locator;
  private checkBox1: Locator;
  private checkBox2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText("Checkboxes");
    this.checkBox1 = page.locator("input[type=checkbox]:nth-child(1)");
    this.checkBox2 = page.locator("input[type=checkbox]:nth-child(3)");
  }

  async isHeaderVisible(): Promise<boolean> {
    const isVisible = await this.header.isVisible();
    return isVisible;
  }

  private getCheckbox(checkbox: number): Locator {
    if (checkbox == 1) {
      return this.checkBox1;
    }
    return this.checkBox2;
  }

  async checkCheckBox(checkbox: number) {
    await this.getCheckbox(checkbox).check();
  }

  async uncheckCheckBox(checkbox: number) {
    await this.getCheckbox(checkbox).uncheck();
  }

  async isChecked(checkbox: number) {
    const isChecked = await this.getCheckbox(checkbox).isChecked();
    return isChecked;
  }
}