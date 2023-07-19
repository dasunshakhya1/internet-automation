import { Locator, Page } from "@playwright/test";
import { Roles } from "../../constants/roles";

export class ElementList {
  private page: Page;

  private checkBoxesLnk: Locator;
  private addRemoveElemetLnk: Locator;
  private dropDownLnk: Locator;
  private keyPressLnk: Locator
  private statusCodeLnk: Locator

  private elementList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementList = page.locator("//ul/li");
    this.checkBoxesLnk = page.getByRole(Roles.link, { name: "Checkboxes" });
    this.dropDownLnk = page.getByRole(Roles.link, { name: "Dropdown" });
    this.keyPressLnk = page.getByRole(Roles.link, { name: "Key Presses" });
    this.addRemoveElemetLnk = page.getByRole(Roles.link, {
      name: "Add/Remove Elements",
    });
    this.statusCodeLnk =page.getByRole(Roles.link,{name:"Status Codes"})
  }

  async getElements(): Promise<string[]> {
    return await this.elementList.allTextContents();
  }
  async getElementCount(): Promise<Locator[]> {
    return await this.elementList.all();
  }
  async selectCheckBoxes() {
    await this.checkBoxesLnk.click();
  }

  async selectAddRemoveElement() {
    await this.addRemoveElemetLnk.click();
  }

  async selectDropDown() {
    await this.dropDownLnk.click()
  }

  async selectKeyPress() {
    await this.keyPressLnk.click()
  }

  async selectStausCodes() {
    await this.statusCodeLnk.click()
  }
}
