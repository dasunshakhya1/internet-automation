import { test, expect } from "@playwright/test";
import { AddRemoveElementPage } from "../../src/pages/add-remoe-element-page";
import { HomePage } from "../../src/pages/home-page";

let addRemoveElementPage: AddRemoveElementPage;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToApplication();
  await homePage.selectAddRemoveElementLink();
});

test("Verify the Add Remove Element Page header", async ({ page }) => {
  addRemoveElementPage = new AddRemoveElementPage(page);

  const isHeaderVisible = await addRemoveElementPage.isHeaderVisible();
  expect(isHeaderVisible).toBeTruthy();
});

test("Verify that adding three elements", async ({ page }) => {
  addRemoveElementPage = new AddRemoveElementPage(page);

  await addRemoveElementPage.addElements(3);
  const elementCount = await addRemoveElementPage.getAllAddedElementCount();
  expect(elementCount).toEqual(3);
});

test("Verify that removing added elements", async ({ page }) => {
  addRemoveElementPage = new AddRemoveElementPage(page);

  await addRemoveElementPage.removeElements();
  const elementCount = await addRemoveElementPage.getAllAddedElementCount();
  expect(elementCount).toEqual(0);
});
