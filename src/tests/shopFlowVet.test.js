import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../builder";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

describe.skip("Tests for adding Vet product to shopping cart", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
  });
  after(async () => {
    await page.close();
  });

  describe("Adding Vet products for Non Customers", () => {
    step("Step 1: Adding from detailview on open times", async () => {
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
      await page.isElementVisible("div#verify-vet  .actions01.mobile-stretch > li:nth-of-type(2) > .btn.ico-chat.type02");
      await page.click("div#verify-vet  .actions01.mobile-stretch > li:nth-of-type(2) > .btn.ico-chat.type02");
      await page.waitAndClick(".buttons li:nth-of-type(2) span");
      expect(await page.getText(".message-queue")).to.include("Oled järjekorras");
  });
  step("Step 2: Adding with link", async () => {
    await page.goto("https://www.staging.apotheka.ee/products/link/add/pmm0039597ee",{ waitUntil: 'networkidle0'}); 
    await homepage.navigation();
    expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
    await homepage.navigation();
    await page.waitAndClick(".subtotal");
    await page.waitForSelector(".item-info .product-item-name");
    expect(await page.getText(".item-info .product-item-name")).to.include("BOLFO");
    //Deleting product from cart
    await page.waitAndClick(".action-delete");
    await homepage.navigation();
  });
});
});
