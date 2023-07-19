import { CheckboxesPage } from "../../src/pages/checkboxes-page";
import { HomePage } from "../../src/pages/home-page";
import { test, expect } from "@playwright/test";

let checkboxesPage: CheckboxesPage;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToApplication();
  await homePage.selectCheckBoxesLink();
});

test("Verify the Checkboxes Page heading", async ({ page }) => {
  checkboxesPage = new CheckboxesPage(page);

  const isHeaderVisible = await checkboxesPage.isHeaderVisible();

  expect(isHeaderVisible).toBeTruthy();
});

test("Verify that checkbox 2 is checked by default", async ({ page }) => {
  checkboxesPage = new CheckboxesPage(page);

  const isChecked = await checkboxesPage.isChecked(2);

  expect(isChecked).toBeTruthy();
});

test("Verify that checkbox 1 can be checked", async ({ page }) => {
  checkboxesPage = new CheckboxesPage(page);

  await checkboxesPage.checkCheckBox(1);
  const isChecked = await checkboxesPage.isChecked(1);

  expect(isChecked).toBeTruthy();
});

test("Verify that checkbox 2 can be unchecked", async ({ page }) => {
  checkboxesPage = new CheckboxesPage(page);

  await checkboxesPage.uncheckCheckBox(2);
  const isChecked = await checkboxesPage.isChecked(2);

  expect(isChecked).toBeFalsy();
});
