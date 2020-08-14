import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../builder";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

describe.skip("Tests for adding OTC product to shopping cart", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
  });
 /*  afterEach(async () => {
    //Empty Cart
    await page.waitAndClick(".action-delete");
    await homepage.navigation();
  }); */
  after(async () => {
    await page.close();
  });

  describe("Adding OTC for Non Customers", () => {
    step("Step 1: Adding from detailview", async () => {
      await page.goto(
        "https://www.staging.apotheka.ee/bisacodyl-gsk-rektaalsuposiit-10mg-n10-pmm0000489ee",{ waitUntil: 'networkidle0'});
      await homepage.navigation();
      await page.waitAndClick(".btn-addtocart");
      await page.waitForSelector("#verify-addtocart");
      await page.waitForSelector("#verify-addtocart > div > div.form > fieldset:nth-child(1) > div:nth-child(1) > div > select");
      await page.click("#verify-addtocart > div > div.form > fieldset:nth-child(1) > div:nth-child(1) > div > div.automatic-dropdown > div");
      await page.select("#verify-addtocart > div > div.form > fieldset:nth-child(1) > div:nth-child(1) > div > select", "Kuni 1");
      /* await page.waitAndClick("#verify-addtocart .automatic-dropdown div");
       await page.select("select#age", "23");
      await page.waitAndClickTwo(".btn.tocart.type02"); */
      await page.waitFor(5000);
      console.log("Test");
  });
});
});
