import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../lib/builder";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const config = require('../lib/config');

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
    await loginPage.checkAndDeleteMagentoLoggedIn(config.name);
    //Delete Customer from TestALPI
    await loginPage.checkAndDeleteAlpi(config.alpiUsername, config.alpiPassword, config.personalCode);
    //Close Browser
    await page.close();
  });

  describe("Create New Customer and test subscription links  ", () => {
      step("Step 1: Create new customer and test if he/she has subscription ", async () => {
          //Make New Customer
          await loginPage.newCustomer(config.personalCode,config.phoneNumber,config.email);
          await page.waitForSelector(".box-newsletter");
          await page.goto(config.baseUrl + "/newsletter/manage/");
          await page.waitForSelector("#form-validate");
          //Test that customer has subscription for Apotheka, Petcity, ApothekaBeauty
          const subscriptionApotheka = await loginPage.getSubscriptionValue("/html//input[@id='subscription[ApothekaEE]']");
          const subscriptionPetcity = await loginPage.getSubscriptionValue("/html//input[@id='subscription[PetCityEE]']");
          const subscriptionApothekaBeauty = await loginPage.getSubscriptionValue("/html//input[@id='subscription[BeautyEE]']");
          expect(subscriptionApotheka).to.be.true;
          expect(subscriptionPetcity).to.be.true;
          expect(subscriptionApothekaBeauty).to.be.true;
      });
    });
    describe("Check subscriptions after account creation from Alpi API", () => {
      //Make Alpi API requests and check subscriptions
      step('Step 2.1: Check apotheka subscription ', async () => {
          const request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
          expect(request.subscriptions_newsletter[0].subscription_origin).equal('ApothekaEE');
          expect(request.subscriptions_newsletter[0].subscription).equal('1');
      });
      step('Step 2.2: Check petcity subscription ', async () => {
          const request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
          expect(request.subscriptions_newsletter[1].subscription_origin).equal('PetCityEE');
          expect(request.subscriptions_newsletter[1].subscription).equal('1');
          });
      step('Step 2.3: Check beauty subscription ', async () => {
          const request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
          expect(request.subscriptions_newsletter[2].subscription_origin).equal('BeautyEE');
          expect(request.subscriptions_newsletter[2].subscription).equal('1');
          });
    });
  describe("Create New Customer and test SaS unsubscribe links  ", () => {
       step("Step 3: Get ALPI ID, construct unsubscribe link and click on unsubscribe", async () => {
          //Get ALPI id for last generated Customer
        const alpiID = await loginPage.getAlpiID(config.magentoUsername, config.magentoPassword);
        //Construct SaS unsubscribe links
        const unsubscribeApotheka = config.alpiUnsubscribeUrl+ alpiID +"&language=et&brandCode=ApothekaEE";
        const unsubscribePetcity = config.alpiUnsubscribeUrl+ alpiID +"&language=et&brandCode=PetCityEE";
        const unsubscribeApothekaBeauty = config.alpiUnsubscribeUrl+ alpiID +"&language=et&brandCode=BeautyEE";
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
        await page.goto(config.baseUrl + "/newsletter/manage/");
        //Get subscription values
        const subscriptionApotheka = await loginPage.getSubscriptionValue("/html//input[@id='subscription[ApothekaEE]']");
        const subscriptionPetcity = await loginPage.getSubscriptionValue("/html//input[@id='subscription[PetCityEE]']");
        const subscriptionApothekaBeauty = await loginPage.getSubscriptionValue("/html//input[@id='subscription[BeautyEE]']");
        //Expect subscriptions to be false
        expect(subscriptionApotheka).to.be.false;
        expect(subscriptionPetcity).to.be.false;
        expect(subscriptionApothekaBeauty).to.be.false;
      });
    });
    describe("Check subscriptions after Unsubscribe from Alpi API", () => {
       //Make Alpi API requests and check subscriptions
      step('Step 4.1: Check apotheka subscription ', async () => {
          const request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
          expect(request.subscriptions_newsletter[0].subscription_origin).equal('ApothekaEE');
          expect(request.subscriptions_newsletter[0].subscription).equal('0');
      });
      step('Step 4.2: Check petcity subscription ', async () => {
          const request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
          expect(request.subscriptions_newsletter[1].subscription_origin).equal('PetCityEE');
          expect(request.subscriptions_newsletter[1].subscription).equal('0');
          });
      step('Step 4.3: Check beauty subscription ', async () => {
          const request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
          expect(request.subscriptions_newsletter[2].subscription_origin).equal('BeautyEE');
          expect(request.subscriptions_newsletter[2].subscription).equal('0');
          });
    });
});
   
 
