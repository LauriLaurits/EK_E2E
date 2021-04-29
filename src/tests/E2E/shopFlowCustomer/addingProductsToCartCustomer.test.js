import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../../../lib/builder";
import HomePage from "../../../pages/HomePage";
import LoginPage from "../../../pages/LoginPage";

const config = require('../../../lib/config');

//let constants = require("../../../lib/constants/constants");

describe("ADDING PRODUCTS TO CART FOR CUSTOMER (addingProductsToCartCustomer.test)", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
    //Check if cutomer is deleted from Magento and ALPI
    //await loginPage.checkAndDeleteAlpi(config.alpiUsername,config.alpiPassword, config.personalCode);
    //await loginPage.checkAndDeleteMagento(config.magentoUsername,config.magentoPassword, config.name);
    //Make new Customer
    //await loginPage.newCustomer(config.personalCode,config.phoneNumber,config.email);
  });
  afterEach(async () => {
    //Empty Cart
    await page.waitAndClick(".action-delete");
    await homepage.navigation();
  }); 
  after(async () => {
   //Delete Customer from Magento
   await loginPage.checkAndDeleteMagento(config.magentoUsername,config.magentoPassword, config.name);
   //Delete Customer from TestALPI
   await loginPage.checkAndDeleteAlpi(config.alpiUsername,config.alpiPassword, config.personalCode);
   //Close Browser
   await page.close();
  });
  describe("1.Adding DEFAULT Products for Customer", () => {
        step("Step 1: Making new customer and adding product to cart from listview", async () => {
            await loginPage.newCustomerConfirmation(config.personalCode,config.phoneNumber,config.email);
            await page.goto(config.baseUrl + "/tooted?brand=AVENE",{ waitUntil: 'networkidle0'});
            await homepage.navigation();
            await page.waitAndClick(".product-item:nth-of-type(2) .actions-primary span");
            await page.waitForSelector(".counter-number");
            expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
            await homepage.navigation();
            await page.waitAndClick(".subtotal");
            await page.waitForSelector(".item-info .product-item-name");
            expect(await page.getText(".item-info .product-item-name")).to.include("AVENE");
        });
        step("Step 2: Navigating and adding product to cart from detailview", async () => {
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
        step("Step 3: Adding product to cart with link", async () => {
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