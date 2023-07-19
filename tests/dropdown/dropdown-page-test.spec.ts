import { DropDownPage } from "../../src/pages/drop-down-page";
import { HomePage } from "../../src/pages/home-page";
import { test, expect } from "@playwright/test";

let dropDownPage: DropDownPage;
const SELECTED = "selected";
const OPTION_1: string = "Option 1";
const OPTION_2: string = "Option 2";

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToApplication();
  await homePage.selectDropDownLink();
});

test("Verify the Dropdown Page heading", async ({ page }) => {
  dropDownPage = new DropDownPage(page);

  const isHeaderVisible = await dropDownPage.isHeaderVisible();

  expect(isHeaderVisible).toBeTruthy();
});

test("Verify that selecting Option 1", async ({ page }) => {
  dropDownPage = new DropDownPage(page);

  await dropDownPage.selectOption(OPTION_1);
  const attributeValue = await dropDownPage.isSelected(OPTION_1);

  expect(attributeValue).toEqual(SELECTED);
});

test("Verify that selecting Option 2 and changing the status of Option 1", async ({
  page,
}) => {
  dropDownPage = new DropDownPage(page);

  await dropDownPage.selectOption(OPTION_2);
  const attributeValue = await dropDownPage.isSelected(OPTION_2);
  const attributeValueNull = await dropDownPage.isSelected(OPTION_1);

  expect(attributeValue).toEqual(SELECTED);
  expect(attributeValueNull).toEqual(null);
});
