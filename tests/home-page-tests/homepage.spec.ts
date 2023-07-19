import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/home-page";
import { TestValues } from "./home-page-test-helper";

test("Verify the Home page header", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToApplication();
  const isHeaderVisible = await homePage.isHeaderVisible();
  const elementList = await homePage.getEelements();

  expect(isHeaderVisible).toBeTruthy();
  expect(elementList).toEqual(TestValues.elements);
});
