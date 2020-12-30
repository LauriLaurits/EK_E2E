import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../../../lib/builder";
import HomePage from "../../../pages/HomePage";
import LoginPage from "../../../pages/LoginPage";

const config = require("../../../lib/config");
const { makeGetRequest } = require("../../../lib/helpers");

describe("SHOP FLOW FOR GUEST BUYING DEFAULT PRODUCT (shopFlowDefault.test)", () => {
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
  describe("1.E2E Shopflow buying default products as guest", () => {
    step("Step 1: Searching and buying default product from listview", async () => {
      const progressStock = await makeGetRequest(
        config.requestUrlProgress,
        config.productCodeApotheka
      );
      if (progressStock.data[0].in_stock >= 1) {
        await page.goto(config.baseUrl, { waitUntil: "networkidle0" });
        await homepage.navigation();
        await page.waitAndClick("#search");
        await page.waitAndType("#search", "P" + config.productCodeApotheka);
        await page.keyboard.press("Enter");
        await page.waitAndClick("form[method='post'] > button[title='Lisa ostukorvi']");
        await page.waitForSelector(".item-cart-count");
        await page.waitForSelector(".counter-number");
        await homepage.navigation();
        expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
        await homepage.navigation();
        await page.waitAndClick(".subtotal");
        await page.waitForSelector(".item-info .product-item-name");
        const productName = await makeGetRequest(
          config.requestUrlProgress,
          config.productCodeApotheka
        );
        expect(await page.getText(".item-info .product-item-name")).to.include(productName.data[0].name);
        await page.waitAndClick(".primary.checkout");
        await page.waitForSelector("#checkout-root");
        expect(await page.url()).to.equal(config.baseUrl + "/fast/checkout/index/");
      } else {
        console.log(
          "Product " + config.productCodeApotheka + " is out of stock"
        );
      }
    });
    step("Step 2: React checkout choose shipping method and fill necessary fields",async () => {
          //Choose shipping method
          await page.waitAndClick("[class] li:nth-of-type(4) div span");
          //Get Order number
          await page.waitForSelector(".summary-title");
          //const orderNumber = await page.getText(".summary-title");
          //Keelan saadetise üleandmise alaealisele
          await page.waitAndClick(".checkbox-with-label:nth-of-type(1) .checkbox-with-label-label");
          //Anda üle vaid kontaktisikule
          await page.waitAndClick(".checkbox-with-label:nth-of-type(2) .checkbox-with-label-label");
          //Sisesta lubatud isikukood
          await page.waitAndType(".control-input-input","39010102711");
          //Info kullerile
          await page.waitAndType(".control-textarea-textarea","Testinfo Kullerile");
          await page.isElementVisible(".button-inner .text");
          await page.click(".button-inner .text");
    });

    step("Step 3: React checkout fill contact information", async () => {
        //Email
        await page.waitAndType(".layout-form-column:nth-of-type(1) [type]","lauri@upitech.ee");
        //Firstname
        await page.waitAndType(".layout-form-column:nth-of-type(2) .form-row:nth-of-type(1) [type]","Lauri");
        //Lastname
        await page.waitAndType(".layout-form-has-columns .form-row:nth-of-type(2) [type]","Laurits");
        //Telephone
        await page.waitAndType(".form-row:nth-of-type(3) [type]","55555555");
        //County
        await page.waitAndClick(".control-select.has-value.size-default");
        await page.waitAndClick("[class='bp3-menu menu menu-layout-default Menu-menu-0-2-6'] li:nth-of-type(3) div");
        //City
        await page.waitAndType(".form-row:nth-of-type(5) [type]","Tartu");
        //Aadress
        await page.waitAndType(".form-row:nth-of-type(6) [type]","Tamme 18");
        //Zipcode
        await page.waitAndType(".form-row:nth-of-type(7) [type]","11318"
        );
        //Wait for button
        await page.isElementVisible("#checkout-root > div > div.frame-checkout-content > div > div > div > div > div.layout-sidebar-primary > ul > li.list-progress-item.current.ListProgressItem-item-0-2-5 > div.list-progress-item-content.ListProgressItem-content-0-2-4 > div > ul > li");
        await page.click("#checkout-root > div > div.frame-checkout-content > div > div > div > div > div.layout-sidebar-primary > ul > li.list-progress-item.current.ListProgressItem-item-0-2-5 > div.list-progress-item-content.ListProgressItem-content-0-2-4 > div > ul > li");
      });

    step("Step 4: React checkout check T&C and choose payment method", async () => {
          //Terms and conditions checkbox
          await page.waitAndClick(".checkbox-with-label-label > a");
          //Terms and conditions close
          await page.waitAndClick(".overlay-focusview-scroller .text");
          //LHV Payment
          await page.waitAndClick("li:nth-of-type(10) > button > .banklinks-item-label");
        });
    
    step("Step 5: Maksekeskuse test environment", async () => {
      //Wait for maksekeskus

      //Wait for maksekeskus confirmation
      await page.waitAndClick(".btn-success");
      await page.waitAndClick(".btn-success");
      //WAit for success page
      await page.waitForSelector(".checkout-success");
    });

    step("Step 6: Succsess page validation for Order Nr.", async () => {
      const urlSuccess = await page.url();
      expect(urlSuccess).to.include("success");
      //Redirect back to Success page
      await page.waitForSelector(".checkout-success p:nth-of-type(1) span");
      //await page.waitFor(2000);
      //Order number from succsess page
      //const successOrderNumber = await page.getText(".checkout-success p:nth-of-type(1) span");
      //console.log("Success Order Nr: " + successOrderNumber);
      //expect(orderNumber).to.include(successOrderNumber);
    });
  });
});
