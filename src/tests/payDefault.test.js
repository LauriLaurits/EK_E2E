import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../builder";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

let constants = require('./../../constants');

describe("Flow for adding prduct to cart and pay in Fast Checkout", () => {
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
  describe('Paying default prducts Non Customer', () => {
    step("Step 1: Adding default product with link to cart ", async () => {
      await page.goto("https://www.staging.apotheka.ee/products/link/add/pmm0100409ee",{ waitUntil: 'networkidle0'}); 
      await homepage.navigation();
      expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
      await page.waitAndClick(".primary.checkout");
      await page.waitForSelector("#checkout-root");
      expect(await page.url()).to.equal("https://www.staging.apotheka.ee/fast/checkout/index/");
      await page.waitAndClick("[class] li:nth-of-type(5) div span");
      //Keelan saadetise üleandmise alaealisele
      await page.waitAndClick(constants.selectors.underAge);
      //Anda üle vaid kontaktisikule
      await page.waitAndClick(constants.selectors.onlyContact);
      //Sisesta lubatud isikukood
      await page.waitAndType(constants.selectors.personalCode, constants.formCredentials.personalCode);
      //Info kullerile
      await page.waitAndType(constants.selectors.message, constants.formCredentials.message);
      await page.isElementVisible(constants.selectors.submitFirst);
      await page.click(constants.selectors.submitFirst);
      //Email
      await page.waitAndType(constants.selectors.email, constants.formCredentials.email);
      //Firstname
      await page.waitAndType(constants.selectors.firstName, constants.formCredentials.firstName);
      //Lastname
      await page.waitAndType(constants.selectors.lastName, constants.formCredentials.lastName);
      //Telephone
      await page.waitAndType(constants.selectors.phoneNumber, constants.formCredentials.phoneNumber);
      //County
      //await page.waitAndType(constants.selectors.county, constants.formCredentials.county);
      //await page.select(".control-select-select", "Harjumaa");
      //City
      await page.waitAndType(constants.selectors.city, constants.formCredentials.city);
      //Aadress
      await page.waitAndType(constants.selectors.aadress, constants.formCredentials.aadress);
      //Zipcode
      await page.waitAndType(constants.selectors.zipCode, constants.formCredentials.zipCode);
      //Wait for button
      await page.isElementVisible(constants.selectors.submitSecond);
      await page.click(constants.selectors.submitSecond);

      console.log(constants.email);
      await page.waitFor(3000);
      
      
  });

});

});