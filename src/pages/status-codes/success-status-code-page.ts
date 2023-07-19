import { Page, Locator } from "@playwright/test";

export class SuccessCodePage {
  private page: Page;

  private description: Locator;

  constructor(page: Page) {
    this.page = page;

    this.description = page.getByTestId("content").locator("p");
  }

  async getDescription() {
    await this.description.waitFor();
    return await this.description.innerText();
  }
}
