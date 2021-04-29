import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../lib/builder";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const config = require('../lib/config');

let constants = require("../lib/constants/constants");
let alpi = require("../lib/constants/alpiConst");

const { createEmail } = require('../lib/helpers');

describe.skip("NEWSLETTER SUBSCRIBE/UNSUBSCRIBE TEST (1subscribe.test)", () => {
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
   // await loginPage.checkAndDeleteMagentoLoggedIn(config.name);
    //Delete Customer from TestALPI
   // await loginPage.checkAndDeleteAlpi(config.alpiUsername, config.alpiPassword, config.personalCode);
    //Close Browser
    await page.close();
  });

  describe("1.Create New Customer and test subscription links  ", () => {
      step("Step 1: Create new customer and test if he/she has subscription ", async () => {
        await loginPage.newCustomerConfirmation(config.personalCode,config.phoneNumber,config.email);
          //Make New Customer
          /* await loginPage.newCustomer(config.personalCode,config.phoneNumber,config.email);
          const confirmationResponse =  await createEmail();
          const confirmationLink = await page.detectUrl(confirmationResponse);
          const cofirmLink = confirmationLink[2].slice(0,-1);
          await page.goto(cofirmLink);
          await page.isElementVisible(".cookie-actions");
          await page.waitForSelector(".cookie-actions");
          await page.waitAndClick(".actions01.vertical .btn.primary");
          expect(await page.isElementVisible(".cookie-settings")).to.be.false;
          expect(await page.isElementVisible(".message-success.success.message"));
          await page.waitAndClick("div#login-mobile-id > .fieldset input[name='personalcode']");
          await page.waitAndType("div#login-mobile-id > .fieldset input[name='personalcode']", personalCode);
          await page.waitAndClick("#mobile-id-input");
          await page.waitAndType("#mobile-id-input", phoneNumber);
          await page.waitFor(1000);
          await page.waitAndClick("#mobileid-submit");
          await page.isElementVisible("#mobileid-verification");
          expect(await page.isElementVisible("#mobileid-verification")).to.be
            .true;
          await page.waitForSelector(".authorization-link.logged-in");  
          await page.waitFor(4000); */
         
      });
    });
});
   