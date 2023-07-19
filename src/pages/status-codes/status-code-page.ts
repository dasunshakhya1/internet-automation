import { Page, Locator } from "@playwright/test";

export class StatusCodePage {
  private page: Page;

  private header: Locator;
  private statusCodeList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText("Status Codes", { exact: true });
    this.statusCodeList = page.getByRole("listitem").locator("a");
  }

  async isHeaderVisible(): Promise<boolean> {
    await this.header.waitFor()
    const isVisible = await this.header.isVisible();
    return isVisible;
  }

  async getStatusCoseList(): Promise<string[]> {
    const codes: string[] = await this.statusCodeList.allTextContents();
    return codes;
  }

  async selectStatusCode(code: string) {
    await this.statusCodeList.filter({ hasText: code }).click();
  }
}
