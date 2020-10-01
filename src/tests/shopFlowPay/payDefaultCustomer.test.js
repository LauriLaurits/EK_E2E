import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../../lib/builder";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";

let constants = require("../../lib/constants/constants");

describe("SHOP FLOW FOR LOGGED IN CUSTOMER BUYING DEFAULT PRODUCT", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
  });
  after(async () => {
    //Delete Customer from Magento
    await loginPage.deleteCustomerFromMagentoLoggedOut(constants.unSusubscribe.backendUrl, constants.unSusubscribe.mbUsername, constants.unSusubscribe.mbPassword);
    //Delete Customer from TestALPI
    await loginPage.deleteCustomerFromAlpi();
    //Close Browser
    await page.close();
  });
  describe("E2E shopflow default products for logged in customer", () => {
    step("Step 1: Making new Customer", async () => {
        await loginPage.newCustomer();
      });
    step("Step 2: Adding default product with link to cart ", async () => {
      await page.goto("https://www.staging.apotheka.ee/products/link/add/pmm0100409ee",{ waitUntil: "networkidle0" });
      await homepage.navigation();
      expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
      await homepage.navigation();
      //await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
      await page.waitAndClick(".primary.checkout");
      await page.waitForSelector("#checkout-root");
      expect(await page.url()).to.equal("https://www.staging.apotheka.ee/fast/checkout/index/");});

    step("Step 3: React checkout choose shipping method and fill necessary fields",async () => {
          //Choose shipping method
          await page.waitAndClick("[class] li:nth-of-type(4) div span");
          //Get Order number
          await page.waitForSelector(".summary-title");
          //const orderNumber = await page.getText(".summary-title");
          //console.log("Order Nr. React: " + orderNumber);
          //Keelan saadetise üleandmise alaealisele
          await page.waitAndClick(constants.selectors.underAge);
          //Anda üle vaid kontaktisikule
          await page.waitAndClick(constants.selectors.onlyContact);
          //Sisesta lubatud isikukood
          await page.waitAndType(constants.selectors.personalCode,constants.formCredentials.personalCode);
          //Info kullerile
          await page.waitAndType(constants.selectors.message,constants.formCredentials.message);
          await page.isElementVisible(constants.selectors.submitFirst);
          await page.click(constants.selectors.submitFirst);
    });

    step("Step 4: React checkout fill contact information", async () => {
        //County
        await page.waitAndClick(".control-select.has-value.size-default");
        await page.waitAndClick("[class='bp3-menu menu menu-layout-default Menu-menu-0-2-6'] li:nth-of-type(3) div");
        //City
        await page.waitAndType(constants.selectors.city,constants.formCredentials.city);
        //Aadress
        await page.waitAndType(constants.selectors.aadress,constants.formCredentials.aadress);
        //Zipcode
        await page.waitAndType(constants.selectors.zipCode,constants.formCredentials.zipCode
        );
        //Wait for button
        await page.isElementVisible(constants.selectors.submitSecond);
        await page.click(constants.selectors.submitSecond);
      });

    step("Step 5: React checkout check T&C and choose payment method", async () => {
          //Terms and conditions checkbox
          await page.waitAndClick(".checkbox-with-label-label > a");
          //Terms and conditions close
          await page.waitAndClick(".overlay-focusview-scroller .text");
          //LHV Payment
          await page.waitAndClick("li:nth-of-type(10) > button > .banklinks-item-label");
        });
    
    step("Step 6: Maksekeskuse test environment", async () => {
      //Wait for maksekeskus confirmation
      await page.waitAndClick(".btn-success");
      await page.waitAndClick(".btn-success");
      //WAit for success page
      await page.waitForSelector(".checkout-success");
    });

    step("Step 7: Success page validation for Order Nr.", async () => {
      const urlSuccess = await page.url();
      expect(urlSuccess).to.include("success");
      //Redirect back to Success page
      await page.waitForSelector(".order-number strong");
      //await page.waitFor(2000);
      //Order number from succsess page
      //const successOrderNumber = await page.getText(".order-number strong");
      //console.log("Success Order Nr: " + successOrderNumber);
      //expect(orderNumber).equal(successOrderNumber);
    });
  });
});
