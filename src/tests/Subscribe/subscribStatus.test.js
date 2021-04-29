import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../../lib/builder";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";

const config = require('../../lib/config');

let constants = require("../../lib/constants/constants");
let alpi = require("../../lib/constants/alpiConst");

const { makePostRequest } = require('../../lib/helpers');

describe.skip("NEWSLETTER STATUS TEST (subscribeStatus.test)", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
  });
  
  after(async () => {
    //Close Browser
    await page.close();
  });

  describe("1.Log in to Customer account and test subscriptions  ", () => {
    step("Step 1: Log in to customer magento account and test if he/she has subscription ", async () => {
        //Make New Customer
        await loginPage.loginMobileID(config.personalCodeMID, config.phoneNumberMID);
        await page.goto(config.baseUrl + "/customer/account/");
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
  describe("2.Check subscriptions after account creation from Alpi API", () => {
    //Make Alpi API requests and check subscriptions
    step('Step 1: Check apotheka subscription ', async () => {
        const request = await makePostRequest(config.alpiRequestUrl, config.personalCodeMID);
        expect(request.subscriptions_newsletter[0].subscription_origin).equal('ApothekaEE');
        expect(request.subscriptions_newsletter[0].subscription).equal('1');
    });
    step('Step 2: Check petcity subscription ', async () => {
        const request = await makePostRequest(config.alpiRequestUrl, config.personalCodeMID);
        expect(request.subscriptions_newsletter[1].subscription_origin).equal('PetCityEE');
        expect(request.subscriptions_newsletter[1].subscription).equal('1');
        });
    step('Step 3: Check beauty subscription ', async () => {
        const request = await makePostRequest(config.alpiRequestUrl, config.personalCodeMID);
        expect(request.subscriptions_newsletter[2].subscription_origin).equal('BeautyEE');
        expect(request.subscriptions_newsletter[2].subscription).equal('1');
        });
  });
  describe("3.Check subscriptions after logout/login ", () => {
    //Make Alpi API requests and check subscriptions
    step("Step 1: Log out/ Log in and check if subscriptions have same values ", async () => {
        await loginPage.logOutMagento();
        await page.waitForSelector("#registration_link");
        await loginPage.loginMobileID(config.personalCodeMID, config.phoneNumberMID);
        await page.goto(config.baseUrl + "/customer/account/");
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

});
