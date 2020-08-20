//import puppeteer from "puppeteer";
import { step } from "mocha-steps";

import Page from "../builder";
import { expect } from "chai";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

let constants = require("./../../constants");

describe.only("Newsletter subscribe/unsubscribe test", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
  });
  
  after(async () => {
    // Delete Customer from Magento
    await loginPage.deleteCustomerFromMagento(constants.unSusubscribe.backendUrl);
    //Delete Customer from TestALPI
    await loginPage.deleteCustomerFromAlpi();
    // Close Browser
    await page.close();
  });

  describe("Create New Customer and  ", () => {
      step("Step 1: Create new customer and test if he/she has subscription ", async () => {
          //Make New Customer
          await loginPage.newCustomer();
          await page.waitForSelector(".box-newsletter");
          await page.goto(constants.unSusubscribe.subscribePage);
          //Test that customer has subscription for Apotheka, Petcity, ApothekaBeauty
          const subscriptionApotheka = await loginPage.getSubscriptionValue('/html//input[@id="subscription[ApothekaEE]"]');
          const subscriptionPetcity = await loginPage.getSubscriptionValue('/html//input[@id="subscription[PetCityEE]"]');
          const subscriptionApothekaBeauty = await loginPage.getSubscriptionValue('/html//input[@id="subscription[BeautyEE]"]');
          expect(subscriptionApotheka).to.be.true;
          expect(subscriptionPetcity).to.be.true;
          expect(subscriptionApothekaBeauty).to.be.true;
      });
      step("Step 2: Get ALPI ID, construct unsubscribe link and click on unsubscribe. ", async () => {
          //Get ALPI id for last generated Customer
        const alpiID = await loginPage.getAlpiID(constants.unSusubscribe.backendUrl, constants.unSusubscribe.magentoBackendUsername, constants.unSusubscribe.magentoBackendPassword);
        //Construct SaS unsubscribe links
        const unsubscribeApotheka = "https://staging-sas.upitech.ee/#/unsubscribe?email=test@test.ee&alpiCustomerId="+alpiID+"&language=et&brandCode=ApothekaEE";
        const unsubscribePetcity = "https://staging-sas.upitech.ee/#/unsubscribe?email=test@test.ee&alpiCustomerId="+alpiID+"&language=et&brandCode=PetCityEE";
        const unsubscribeApothekaBeauty = "https://staging-sas.upitech.ee/#/unsubscribe?email=test@test.ee&alpiCustomerId="+alpiID+"&language=et&brandCode=BeautyEE";
        //Go to Apotheka SaS unsubscribe link and click unsubscribe
        await page.goto(unsubscribeApotheka);
        await page.waitForSelector(".layout-unsubscribe.ng-scope");
        await page.waitAndClick(".btn.ng-binding.primary");
        //Go to Petcity SaS unsubscribe link and click unsubscribe
        await page.goto(unsubscribePetcity);
        await page.waitForSelector(".layout-unsubscribe.ng-scope");
        await page.waitAndClick(".btn.ng-binding.primary");
        //Go to ApothekaBeauty SaS unsubscribe link and click unsubscribe
        await page.goto(unsubscribeApothekaBeauty);
        await page.waitForSelector(".layout-unsubscribe.ng-scope");
        await page.waitAndClick(".btn.ng-binding.primary");
        // Go to unsubscribe page
        await page.goto(constants.unSusubscribe.subscribePage);
        //Get subscription values
        const subscriptionApotheka = await loginPage.getSubscriptionValue('/html//input[@id="subscription[ApothekaEE]"]');
        const subscriptionPetcity = await loginPage.getSubscriptionValue('/html//input[@id="subscription[PetCityEE]"]');
        const subscriptionApothekaBeauty = await loginPage.getSubscriptionValue('/html//input[@id="subscription[BeautyEE]"]');
        //Expect subscriptions to be false
        expect(subscriptionApotheka).to.be.false;
        expect(subscriptionPetcity).to.be.false;
        //expect(subscriptionApothekaBeauty).to.be.false;
      });
    });
});
   
 
