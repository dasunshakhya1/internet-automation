import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/home-page";
import { KeyPressPage } from "../../src/pages/key-press-page";
import { TestValues } from "./status-code-test-helper";
import { StatusCodePage } from "../../src/pages/status-codes/status-code-page";
import { StatusCodes } from "../../src/constants/status-codes";
import { SuccessCodePage } from "../../src/pages/status-codes/success-status-code-page";

let statusCodePage: StatusCodePage;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToApplication();
  await homePage.selectStatusCodeLink();
});

test("Verify the Status Code Page heading and status code list", async ({ page }) => {
  statusCodePage = new StatusCodePage(page);
  const isHeaderVisible = await statusCodePage.isHeaderVisible();
  const statusCodes = await statusCodePage.getStatusCoseList();
  expect(isHeaderVisible).toBeTruthy();
  expect(statusCodes).toEqual(TestValues.STATUS_CODES);
});

test("Verify the Succes status code page", async ({ page }) => {
  statusCodePage = new StatusCodePage(page);
  const successPage = new SuccessCodePage(page);
  await statusCodePage.selectStatusCode(StatusCodes.OK);
  const description = await successPage.getDescription();
  expect(description).toContain(TestValues.SUCCESS_CODE_PAGE_HEADER);
});
