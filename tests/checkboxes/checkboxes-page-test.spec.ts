import { CheckboxesPage } from "../../src/pages/checkboxes-page";
import { HomePage } from "../../src/pages/home-page";
import { test, expect } from "@playwright/test";

let checkboxesPage: CheckboxesPage;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToApplication();
  await homePage.selectCheckBoxesLink();
});

test("Verify that the header of the Checkboxes page is visible and that the initial checkbox count is the expected value.", async ({
  page,
}) => {
  checkboxesPage = new CheckboxesPage(page);

  const isHeaderVisible = await checkboxesPage.isHeaderVisible();
  const initialChecBoxesCount = await checkboxesPage.getCheckBoxesCount();

  expect(initialChecBoxesCount).toEqual(2);
  expect(isHeaderVisible).toBeTruthy();
});

test("Verify that checkbox 2 is checked and checkbox 1 is unchecked by default.", async ({
  page,
}) => {
  checkboxesPage = new CheckboxesPage(page);

  const isFirstCheckBoxChecked = await checkboxesPage.isChecked(1);
  const isSecondCheckBoxChecked = await checkboxesPage.isChecked(2);

  expect(isFirstCheckBoxChecked).toBeFalsy();
  expect(isSecondCheckBoxChecked).toBeTruthy();
});

test("Verify that checkbox 1 can be checked without changing the status of checkbox 2.", async ({
  page,
}) => {
  checkboxesPage = new CheckboxesPage(page);

  await checkboxesPage.checkCheckBox(1);
  const isTheFirstBoxChecked = await checkboxesPage.isChecked(1);
  const isTheSecondBoxChecked = await checkboxesPage.isChecked(2);

  expect(isTheFirstBoxChecked).toBeTruthy();
  expect(isTheSecondBoxChecked).toBeTruthy();
});

test("Verify that checkbox 2 can be unchecked without changing the status of checkbox 1.", async ({
  page,
}) => {
  checkboxesPage = new CheckboxesPage(page);
  await checkboxesPage.checkCheckBox(1); // Pre-Condition - Changing the status of checkbox 1
  await checkboxesPage.uncheckCheckBox(2);
  const isSecondCheckBoxChecked = await checkboxesPage.isChecked(2);
  const isTheFirstBoxChecked = await checkboxesPage.isChecked(1);

  expect(isSecondCheckBoxChecked).toBeFalsy();
  expect(isTheFirstBoxChecked).toBeTruthy();
});
