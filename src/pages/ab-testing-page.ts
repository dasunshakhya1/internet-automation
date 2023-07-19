import { Locator, Page } from "@playwright/test";

export class AbTestingPage {
  private page: Page;
  private description: Locator;
  private header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.description = page.getByRole("paragraph");
    this.header = page.getByText("A/B Test Control");
  }

  async isHeaderVisible(): Promise<boolean> {
    const isVisible: boolean = await this.header.isVisible();
    return isVisible
  }
}
