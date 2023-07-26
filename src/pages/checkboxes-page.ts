import { Locator, Page } from "@playwright/test";

export class CheckboxesPage {
  private page: Page;

  private readonly header: Locator;
  private readonly checkboxes: Locator;
  private readonly checkBox1: Locator;
  private readonly checkBox2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText("Checkboxes");
    this.checkboxes = page.locator("input[type=checkbox]");

    this.checkBox1 = page.locator("input[type=checkbox]:nth-child(1)");
    this.checkBox2 = page.locator("input[type=checkbox]:nth-child(3)");
  }

  async isHeaderVisible(): Promise<boolean> {
    await this.header.waitFor();
    const isVisible = await this.header.isVisible();
    return isVisible;
  }

  private async getCheckbox(checkbox: number): Promise<Locator> {
    return checkbox === 1 ? this.checkBox1 : this.checkBox2;
  }

  async getCheckBoxesCount(): Promise<number> {
    const checkBoxes: Locator[] = await this.checkboxes.all();
    return await checkBoxes.length;
  }
  async checkCheckBox(checkbox: number) {
    const chkBox = await this.getCheckbox(checkbox);
    await chkBox.check();
  }

  async uncheckCheckBox(checkbox: number) {
    const chkBox = await this.getCheckbox(checkbox);
    await chkBox.uncheck();
  }

  async isChecked(checkbox: number): Promise<boolean> {
    const chkBox = await this.getCheckbox(checkbox);
    return chkBox.isChecked();
  }
}
