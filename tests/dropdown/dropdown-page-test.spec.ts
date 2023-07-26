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

test("Verify that the header of the Dropdown page is visible and that the dropdown is enabled.", async ({
  page,
}) => {
  dropDownPage = new DropDownPage(page);

  const isHeaderVisible = await dropDownPage.isHeaderVisible();
  const isDropdownFuntional = await dropDownPage.isDropdownFuntional();
  const options = await dropDownPage.getOptions();

  expect(options).toEqual(3);
  expect(isHeaderVisible).toBeTruthy();
  expect(isDropdownFuntional).toBeTruthy();
});

test("Verify that selecting Option 1 results in changing the status of Option 2", async ({
  page,
}) => {
  dropDownPage = new DropDownPage(page);

  await dropDownPage.selectOption(OPTION_2); // Selecting option 2 first
  await dropDownPage.selectOption(OPTION_1);
  const option_1_status = await dropDownPage.isSelected(OPTION_1);
  const option_2_status = await dropDownPage.isSelected(OPTION_2);

  expect(option_1_status).toEqual(SELECTED);
  expect(option_2_status).toEqual(null);
});

test("Verify that selecting Option 2 results in changing the status of Option 1", async ({
  page,
}) => {
  dropDownPage = new DropDownPage(page);

  await dropDownPage.selectOption(OPTION_1); // Selecting option 1 first
  await dropDownPage.selectOption(OPTION_2);
  const attributeValue = await dropDownPage.isSelected(OPTION_2);
  const attributeValueNull = await dropDownPage.isSelected(OPTION_1);

  expect(attributeValue).toEqual(SELECTED);
  expect(attributeValueNull).toEqual(null);
});
