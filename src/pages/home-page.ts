import { Locator, Page } from "@playwright/test";
import { ApplicationConfigs } from "../configs/application-config";
import { ElementList } from "./components/element-list";

export class HomePage {
  readonly welcomeBanner: string = "Welcome to the-internet";

  readonly page: Page;
  readonly mainContext: Locator;
  readonly welcomeBannerTxt: Locator;

  private elementList: ElementList;

  constructor(page: Page) {
    this.page = page;
    this.mainContext = page.getByTestId("heading");
    this.welcomeBannerTxt = page.getByText(this.welcomeBanner);
    this.elementList = new ElementList(page);
  }

  async navigateToApplication(): Promise<void> {
    await this.page.goto(ApplicationConfigs.BASE_URL);
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
