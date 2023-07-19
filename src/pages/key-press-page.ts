import { Locator, Page } from "@playwright/test";

export class KeyPressPage {
  private page: Page;

  private header: Locator;
  private description: Locator;
  private textInput: Locator;
  private result: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText("Key Presses", { exact: true });
    this.description = page.getByRole("paragraph").locator("visible=true");
    this.textInput = page.getByTestId("target");
    this.result = page.locator("//p[@id='result']");
  }

  async isHeaderVisible(): Promise<boolean> {
    await this.header.waitFor();
    const isVisible = await this.header.isVisible();
    return isVisible;
  }

  async getDescription(): Promise<string | null> {
    const desc = await this.description.textContent();
    return desc;
  }

  async enterTargetValues(key: string) {
    await this.textInput.press(key);
  }

  async getResultValue(): Promise<string | null> {
    await this.page.waitForSelector("//p[@id='result']");
    let result = await this.result.textContent();
    return result;
  }
}
