import { Locator, Page } from "@playwright/test";
import { ApplicationConfigs } from "../configs/application-config";
import { ElementList } from "./components/element-list";

export class HomePage {
  private readonly page: Page;
  private readonly header: Locator;

  private elementList: ElementList;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText("Welcome to the-internet");
    this.elementList = new ElementList(page);
  }

  async navigateToApplication(): Promise<void> {
    await this.page.goto(ApplicationConfigs.BASE_URL);
  }

  async isHeaderVisible(): Promise<boolean> {
    await this.header.waitFor();
    const isVisible = await this.header.isVisible();
    return isVisible;
  }

  async getEelements(): Promise<string[]> {
    const eles: string[] = await this.elementList.getElements();
    return eles;
  }

  async selectCheckBoxesLink() {
    await this.elementList.selectCheckBoxes();
  }

  async selectAddRemoveElementLink() {
    await this.elementList.selectAddRemoveElement();
  }

  async selectDropDownLink() {
    await this.elementList.selectDropDown();
  }

  async selectKeyPressLink() {
    await this.elementList.selectKeyPress();
  }

  async selectStatusCodeLink() {
    await this.elementList.selectStausCodes();
  }
}
