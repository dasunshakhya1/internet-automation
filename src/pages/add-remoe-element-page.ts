import { Locator, Page } from "@playwright/test";

export class AddRemoveElementPage {
  private page: Page;
  private header: Locator;
  private addBtn: Locator;
  private removeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText("Add/Remove Elements");
    this.addBtn = page.getByRole("button", { name: "Add Element" });
    this.removeBtn = page.getByRole("button", { name: "Delete" });
  }

  async isHeaderVisible(): Promise<boolean> {
    await this.header.waitFor();
    const isVisible = await this.header.isVisible();
    return isVisible;
  }

  async addElements(count: number) {
    for (let i = 0; i < count; i++) {
      await this.addBtn.click();
    }
  }

  async getAllAddedElementCount(): Promise<number> {
    const buttons: Locator[] = await this.removeBtn.all();
    return buttons.length;
  }

  async removeElements() {
    const buttons: Locator[] = await this.removeBtn.all();
    for (let i = 0; i < buttons.length; i++) {
      await buttons[i].click();
    }
  }
}
