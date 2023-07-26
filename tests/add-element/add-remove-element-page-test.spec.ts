import { test, expect } from "@playwright/test";
import { AddRemoveElementPage } from "../../src/pages/add-remoe-element-page";
import { HomePage } from "../../src/pages/home-page";

let addRemoveElementPage: AddRemoveElementPage;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToApplication();
  await homePage.selectAddRemoveElementLink();
});

test("Verify that the header of the Add/Remove Elements page is visible and the Add Element button is enabled.", async ({
  page,
}) => {
  addRemoveElementPage = new AddRemoveElementPage(page);

  const isHeaderVisible = await addRemoveElementPage.isHeaderVisible();
  const isAddRemoveButtonFunctional =
    await addRemoveElementPage.isAddRemoveFunctional();

  expect(isAddRemoveButtonFunctional).toBeTruthy();
  expect(isHeaderVisible).toBeTruthy();
});

test("Verify that a user is able to add a certain number of elements by clicking the Add Element button.", async ({
  page,
}) => {
  addRemoveElementPage = new AddRemoveElementPage(page);

  const initialElemetntCount =
    await addRemoveElementPage.getAllAddedElementCount();

  await addRemoveElementPage.addElements(3);
  const addedElementCount =
    await addRemoveElementPage.getAllAddedElementCount();

  expect(initialElemetntCount).toEqual(0);
  expect(addedElementCount).toEqual(3);
});

test("Verify that a user is able to remove a certain number of elements by clicking the Delete button.", async ({
  page,
}) => {
  addRemoveElementPage = new AddRemoveElementPage(page);

  await addRemoveElementPage.addElements(3); // Pre-Condition - Since the session is new, there won't be any added elements to remove.

  const initialElemetntCount =
    await addRemoveElementPage.getAllAddedElementCount();

  await addRemoveElementPage.removeElements(2);
  const finalElementCount =
    await addRemoveElementPage.getAllAddedElementCount();

  expect(initialElemetntCount).toEqual(3);
  expect(finalElementCount).toEqual(1);
});
