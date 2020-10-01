import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../lib/builder";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

let constants = require("../lib/constants/constants");
let alpi = require("../lib/constants/alpiConst");

const { makePostRequest } = require('../lib/helpers');

describe("NEWSLETTER SUBSCRIBE/UNSUBSCRIBE TEST", () => {
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
    await loginPage.deleteCustomerFromMagento(constants.unSusubscribe.backendUrl);
    //Delete Customer from TestALPI
    await loginPage.deleteCustomerFromAlpi();
    //Close Browser
    await page.close();
  });

  describe("Create New Customer and test subscription links  ", () => {
      step("Step 1: Create new customer and test if he/she has subscription ", async () => {
          //Make New Customer
          await loginPage.newCustomer();
          await page.waitForSelector(constants.unSusubscribe.sSubscribeBlock);
          await page.goto(constants.unSusubscribe.subscribePage);
          await page.waitForSelector("#form-validate");
          //Test that customer has subscription for Apotheka, Petcity, ApothekaBeauty
          const subscriptionApotheka = await loginPage.getSubscriptionValue(constants.unSusubscribe.sSubscribeApo);
          const subscriptionPetcity = await loginPage.getSubscriptionValue(constants.unSusubscribe.sSubscribePet);
          const subscriptionApothekaBeauty = await loginPage.getSubscriptionValue(constants.unSusubscribe.sSubscribeBeauty);
          expect(subscriptionApotheka).to.be.true;
          expect(subscriptionPetcity).to.be.true;
          expect(subscriptionApothekaBeauty).to.be.true;
      });
    });
    describe("Check subscriptions after account creation from Alpi API", () => {
      //Make Alpi API requests and check subscriptions
      step('Step 2.1: Check apotheka subscription ', async () => {
          const request = await makePostRequest(alpi.alpiRequests.url, alpi.alpiRequests.personalCode);
          expect(request.subscriptions_newsletter[0].subscription_origin).equal('ApothekaEE');
          expect(request.subscriptions_newsletter[0].subscription).equal('1');
      });
      step('Step 2.2: Check petcity subscription ', async () => {
          const request = await makePostRequest(alpi.alpiRequests.url, alpi.alpiRequests.personalCode);
          expect(request.subscriptions_newsletter[1].subscription_origin).equal('PetCityEE');
          expect(request.subscriptions_newsletter[1].subscription).equal('1');
          });
      step('Step 2.3: Check beauty subscription ', async () => {
          const request = await makePostRequest(alpi.alpiRequests.url, alpi.alpiRequests.personalCode);
          expect(request.subscriptions_newsletter[2].subscription_origin).equal('BeautyEE');
          expect(request.subscriptions_newsletter[2].subscription).equal('1');
          });
    });
  describe("Create New Customer and test SaS unsubscribe links  ", () => {
       step("Step 3: Get ALPI ID, construct unsubscribe link and click on unsubscribe", async () => {
          //Get ALPI id for last generated Customer
        const alpiID = await loginPage.getAlpiID(constants.unSusubscribe.backendUrl, constants.unSusubscribe.mbUsername, constants.unSusubscribe.mbPassword);
        //Construct SaS unsubscribe links
        const unsubscribeApotheka = constants.unSusubscribe.unSubscribeUrl+ alpiID +"&language=et&brandCode=ApothekaEE";
        const unsubscribePetcity = constants.unSusubscribe.unSubscribeUrl+ alpiID +"&language=et&brandCode=PetCityEE";
        const unsubscribeApothekaBeauty = constants.unSusubscribe.unSubscribeUrl+ alpiID +"&language=et&brandCode=BeautyEE";
        //Go to Apotheka SaS unsubscribe link and click unsubscribe
        await page.goto(unsubscribeApotheka);
        await page.waitForSelector(constants.unSusubscribe.sUnsubscribeBlock);
        await page.waitAndClick(constants.unSusubscribe.sUnsubscribeButton);
        //Go to Petcity SaS unsubscribe link and click unsubscribe
        await page.goto(unsubscribePetcity);
        await page.waitForSelector(constants.unSusubscribe.sUnsubscribeBlock);
        await page.waitAndClick(constants.unSusubscribe.sUnsubscribeButton);
        //Go to ApothekaBeauty SaS unsubscribe link and click unsubscribe
        await page.goto(unsubscribeApothekaBeauty);
        await page.waitForSelector(constants.unSusubscribe.sUnsubscribeBlock);
        await page.waitAndClick(constants.unSusubscribe.sUnsubscribeButton);
        // Go to unsubscribe page
        await page.goto(constants.unSusubscribe.subscribePage);
        //Get subscription values
        const subscriptionApotheka = await loginPage.getSubscriptionValue(constants.unSusubscribe.sSubscribeApo);
        const subscriptionPetcity = await loginPage.getSubscriptionValue(constants.unSusubscribe.sSubscribePet);
        const subscriptionApothekaBeauty = await loginPage.getSubscriptionValue(constants.unSusubscribe.sSubscribeBeauty);
        //Expect subscriptions to be false
        expect(subscriptionApotheka).to.be.false;
        expect(subscriptionPetcity).to.be.false;
        expect(subscriptionApothekaBeauty).to.be.false;
      });
    });
    describe("Check subscriptions after Unsubscribe from Alpi API", () => {
       //Make Alpi API requests and check subscriptions
      step('Step 4.1: Check apotheka subscription ', async () => {
          const request = await makePostRequest(alpi.alpiRequests.url, alpi.alpiRequests.personalCode);
          expect(request.subscriptions_newsletter[0].subscription_origin).equal('ApothekaEE');
          expect(request.subscriptions_newsletter[0].subscription).equal('0');
      });
      step('Step 4.2: Check petcity subscription ', async () => {
          const request = await makePostRequest(alpi.alpiRequests.url, alpi.alpiRequests.personalCode);
          expect(request.subscriptions_newsletter[1].subscription_origin).equal('PetCityEE');
          expect(request.subscriptions_newsletter[1].subscription).equal('0');
          });
      step('Step 4.3: Check beauty subscription ', async () => {
          const request = await makePostRequest(alpi.alpiRequests.url, alpi.alpiRequests.personalCode);
          expect(request.subscriptions_newsletter[2].subscription_origin).equal('BeautyEE');
          expect(request.subscriptions_newsletter[2].subscription).equal('0');
          });
    });
});
   
 
