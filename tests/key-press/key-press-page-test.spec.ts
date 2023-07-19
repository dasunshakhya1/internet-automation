import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/home-page";
import { KeyPressPage } from "../../src/pages/key-press-page";
import { TestValues } from "./key-press-page-test-helper";

let keyPressPage: KeyPressPage;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToApplication();
  await homePage.selectKeyPressLink();
});

test("Verify the Key Press Page header and description", async ({ page }) => {
  keyPressPage = new KeyPressPage(page);
  const isHeaderVisible = await keyPressPage.isHeaderVisible();
  const description = await keyPressPage.getDescription();

  expect(isHeaderVisible).toBeTruthy();
  expect(description).toEqual(TestValues.DESCRIPTION);
});

test("Verify Number keys", async ({ page }) => {
  keyPressPage = new KeyPressPage(page);
  keyPressPage.enterTargetValues("1");
  const result = await keyPressPage.getResultValue();

  expect(result).toEqual("You entered: 1");
});

test("Verify Typing keys", async ({ page }) => {
  keyPressPage = new KeyPressPage(page);
  keyPressPage.enterTargetValues("s");
  const result = await keyPressPage.getResultValue();

  expect(result).toEqual("You entered: S");
});

test("Verify Control keys", async ({ page }) => {
  keyPressPage = new KeyPressPage(page);
  keyPressPage.enterTargetValues("Alt");
  const result = await keyPressPage.getResultValue();

  expect(result).toEqual("You entered: ALT");
});
