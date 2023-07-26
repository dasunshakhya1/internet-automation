import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/home-page";
import { TestValues } from "./home-page-test-helper";

test("Verify that the Home page header is visible and the element list contains all elements.", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToApplication();
  const isHeaderVisible = await homePage.isHeaderVisible();
  const elementList = await homePage.getEelements();

  expect(isHeaderVisible).toBeTruthy();
  expect(elementList).toEqual(TestValues.elements);
});
