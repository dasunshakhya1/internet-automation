import { Locator, Page } from "@playwright/test";

export class AddRemoveElementPage {
  private page: Page;
  private readonly header: Locator;
  private readonly addBtn: Locator;
  private readonly removeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText("Add/Remove Elements");
    this.addBtn = page.getByRole("button", { name: "Add Element" });
    this.removeBtn = page.getByRole("button", { name: "Delete" });
  }

  async isHeaderVisible(): Promise<boolean> {
    await this.header.waitFor();
    return await this.header.isVisible();
  }

  async isAddRemoveFunctional(): Promise<boolean> {
    await this.addBtn.waitFor();
    return (await this.addBtn.isVisible()) && this.addBtn.isEnabled();
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

  async removeElements(count: number) {
    const buttons: Locator[] = await this.removeBtn.all();

    if (count <= buttons.length) {
      for (let i = 0; i < count; i++) {
        await buttons[i].click();
      }
    } else {
      console.log(
        `The count (${count}) is greater than the actual number (${buttons.length}) of elements.`
      );
    }
  }
}
