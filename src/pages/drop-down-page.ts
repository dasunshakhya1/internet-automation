import { Locator, Page } from "@playwright/test";

export class DropDownPage {
  private page: Page;

  private readonly header: Locator;
  private readonly dropDown: Locator;
  private readonly options: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText("Dropdown List");
    this.dropDown = page.getByTestId("dropdown");
    this.options = page.getByRole("option");
  }

  async isHeaderVisible(): Promise<boolean> {
    await this.header.waitFor();
    const isVisible = await this.header.isVisible();
    return isVisible;
  }

  async isDropdownFuntional() : Promise<boolean> {
    await this.dropDown.waitFor();
    return (await this.dropDown.isVisible()) && this.dropDown.isEnabled();
  }

  async getOptions() {
    const options = await this.options.all()
    return await options.length
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
