import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../../../lib/builder";
import HomePage from "../../../pages/HomePage";
import LoginPage from "../../../pages/LoginPage";

const config = require('../../../lib/config');

//let constants = require("../../../lib/constants/constants");

describe("ADDING PRODUCTS TO CART FOR CUSTOMER", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
  });
  afterEach(async () => {
    //Empty Cart
    await page.waitAndClick(".action-delete");
    await homepage.navigation();
  }); 
  after(async () => {
    //Logout Magento
    await loginPage.logOutMagento();
    //Close Browser
    await page.close();
  });
  describe("Adding DEFAULT Products for Customer", () => {
        step("Step 2.1: Adding from listview", async () => {
            //await loginPage.loginMobileID(config.baseUrl + "","37200000566");
            //Make new Customer
            await loginPage.loginSmartID(config.smartId);
            await page.goto(config.baseUrl + "/tooted/ilu/huulepulgad",{ waitUntil: 'networkidle0'});
            await homepage.navigation();
            await page.waitAndClick(".product-item:nth-of-type(1) .tocart");
            await page.waitForSelector(".counter-number");
            expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
            await homepage.navigation();
            await page.waitAndClick(".subtotal");
            await page.waitForSelector(".item-info .product-item-name");
            expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
        });
        step("Step 2.2: Adding from detailview", async () => {
            await page.goto(config.baseUrl + "/babe-huulepulk-spf20-4g-pmm0100409ee",{ waitUntil: 'networkidle0'});
            await page.waitAndClick("#product-addtocart-button");
            await page.waitForSelector(".counter-number");
            await homepage.navigation();
            expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
            await homepage.navigation();
            await page.waitAndClick(".subtotal");
            await page.waitForSelector(".item-info .product-item-name");
            expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
        });
        step("Step 2.3: Adding with link", async () => {
          await page.goto(config.baseUrl + "/products/link/add/pmm0100409ee",{ waitUntil: 'networkidle0'}); 
          await homepage.navigation();
          expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
          await homepage.navigation();
          await page.waitAndClick(".subtotal");
          await page.waitForSelector(".item-info .product-item-name");
          expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
        });
});
});