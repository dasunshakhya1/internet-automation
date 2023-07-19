import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/home-page";
import { TestValues } from "./home-page-test-helper";

test("Verify the Home page Elements.", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToApplication();
  await expect(homePage.welcomeBannerTxt).toBeVisible();
  const elementList = await homePage.getEelements()
  expect(elementList).toEqual(TestValues.elements)
});
