import { Locator, Page } from "@playwright/test";

export class DropDownPage {
  private page: Page;

  private header: Locator;
  private dropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText("Dropdown List");
    this.dropDown = page.getByTestId("dropdown");
  }

  async isHeaderVisible(): Promise<boolean> {
    await this.header.waitFor()
    const isVisible = await this.header.isVisible();
    return isVisible;
  }

  async selectOption(option: string) {
    await this.dropDown.selectOption(option);
   
  }
    
    async isSelected(option: string): Promise<string | null> {
        const attributeValue = await this.page
        .getByRole("option", { name: option })
        .getAttribute("selected");
      return attributeValue;
    }
}
