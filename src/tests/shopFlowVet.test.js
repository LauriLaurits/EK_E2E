import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../builder";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

describe("Tests for adding Vet product to shopping cart", () => {
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

  describe("Adding Vet products for Non Customers", () => {
    step("Step 1: Adding from detailview", async () => {
      await page.goto(
        "https://www.staging.apotheka.ee/bolfo-flea-collar-ravimkaelarihm-98-7mg-g-12-5g-n1-pmm0039597ee",{ waitUntil: 'networkidle0'});
      await homepage.navigation();
      await page.waitAndClick(".btn-addtocart");
      await page.waitForSelector("#verify-vet");
      await page.waitForSelector("#animal_species");
      await page.waitAndType("#animal_species", "Karu");
      await page.waitForSelector("#animal_weight");
      await page.waitAndType("#animal_weight", "300kg");
      await page.waitForSelector("#animal_age");
      await page.waitAndType("#animal_age", "11 aastat");
      await page.waitForSelector("form#verify-text-form > .fieldset textarea#comment");
      await page.waitAndType("form#verify-text-form > .fieldset textarea#comment", "Karu sööb mett");
      /* await page.waitAndClick("#verify-addtocart .automatic-dropdown div");
       await page.select("select#age", "23");
      await page.waitAndClickTwo(".btn.tocart.type02"); */
      await page.waitFor(5000);
      console.log("Test");
  });
});
});
