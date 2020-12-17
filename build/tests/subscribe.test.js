"use strict";

var _mochaSteps = require("mocha-steps");

var _chai = require("chai");

var _builder = require("../lib/builder");

var _builder2 = _interopRequireDefault(_builder);

var _HomePage = require("../pages/HomePage");

var _HomePage2 = _interopRequireDefault(_HomePage);

var _LoginPage = require("../pages/LoginPage");

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../lib/config');

var constants = require("../lib/constants/constants");
var alpi = require("../lib/constants/alpiConst");

var _require = require('../lib/helpers'),
    makePostRequest = _require.makePostRequest;

describe("NEWSLETTER SUBSCRIBE/UNSUBSCRIBE TEST", function () {
  var page = void 0;
  var homepage = void 0;
  var loginPage = void 0;

  before(async function () {
    page = await _builder2.default.build("Desktop");
    homepage = new _HomePage2.default(page);
    loginPage = new _LoginPage2.default(page);
  });

  after(async function () {
    //Delete Customer from Magento
    await loginPage.checkAndDeleteMagentoLoggedIn(config.name);
    //Delete Customer from TestALPI
    await loginPage.checkAndDeleteAlpi(config.alpiUsername, config.alpiPassword, config.personalCode);
    //Close Browser
    await page.close();
  });

  describe("Create New Customer and test subscription links  ", function () {
    (0, _mochaSteps.step)("Step 1: Create new customer and test if he/she has subscription ", async function () {
      //Make New Customer
      await loginPage.newCustomer(config.personalCode, config.phoneNumber, config.email);
      await page.waitForSelector(".box-newsletter");
      await page.goto(config.baseUrl + "/newsletter/manage/");
      await page.waitForSelector("#form-validate");
      //Test that customer has subscription for Apotheka, Petcity, ApothekaBeauty
      var subscriptionApotheka = await loginPage.getSubscriptionValue("/html//input[@id='subscription[ApothekaEE]']");
      var subscriptionPetcity = await loginPage.getSubscriptionValue("/html//input[@id='subscription[PetCityEE]']");
      var subscriptionApothekaBeauty = await loginPage.getSubscriptionValue("/html//input[@id='subscription[BeautyEE]']");
      (0, _chai.expect)(subscriptionApotheka).to.be.true;
      (0, _chai.expect)(subscriptionPetcity).to.be.true;
      (0, _chai.expect)(subscriptionApothekaBeauty).to.be.true;
    });
  });
  describe("Check subscriptions after account creation from Alpi API", function () {
    //Make Alpi API requests and check subscriptions
    (0, _mochaSteps.step)('Step 2.1: Check apotheka subscription ', async function () {
      var request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
      (0, _chai.expect)(request.subscriptions_newsletter[0].subscription_origin).equal('ApothekaEE');
      (0, _chai.expect)(request.subscriptions_newsletter[0].subscription).equal('1');
    });
    (0, _mochaSteps.step)('Step 2.2: Check petcity subscription ', async function () {
      var request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
      (0, _chai.expect)(request.subscriptions_newsletter[1].subscription_origin).equal('PetCityEE');
      (0, _chai.expect)(request.subscriptions_newsletter[1].subscription).equal('1');
    });
    (0, _mochaSteps.step)('Step 2.3: Check beauty subscription ', async function () {
      var request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
      (0, _chai.expect)(request.subscriptions_newsletter[2].subscription_origin).equal('BeautyEE');
      (0, _chai.expect)(request.subscriptions_newsletter[2].subscription).equal('1');
    });
  });
  describe("Create New Customer and test SaS unsubscribe links  ", function () {
    (0, _mochaSteps.step)("Step 3: Get ALPI ID, construct unsubscribe link and click on unsubscribe", async function () {
      //Get ALPI id for last generated Customer
      var alpiID = await loginPage.getAlpiID(config.magentoUsername, config.magentoPassword);
      //Construct SaS unsubscribe links
      var unsubscribeApotheka = config.alpiUnsubscribeUrl + alpiID + "&language=et&brandCode=ApothekaEE";
      var unsubscribePetcity = config.alpiUnsubscribeUrl + alpiID + "&language=et&brandCode=PetCityEE";
      var unsubscribeApothekaBeauty = config.alpiUnsubscribeUrl + alpiID + "&language=et&brandCode=BeautyEE";
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
      var subscriptionApotheka = await loginPage.getSubscriptionValue("/html//input[@id='subscription[ApothekaEE]']");
      var subscriptionPetcity = await loginPage.getSubscriptionValue("/html//input[@id='subscription[PetCityEE]']");
      var subscriptionApothekaBeauty = await loginPage.getSubscriptionValue("/html//input[@id='subscription[BeautyEE]']");
      //Expect subscriptions to be false
      (0, _chai.expect)(subscriptionApotheka).to.be.false;
      (0, _chai.expect)(subscriptionPetcity).to.be.false;
      (0, _chai.expect)(subscriptionApothekaBeauty).to.be.false;
    });
  });
  describe("Check subscriptions after Unsubscribe from Alpi API", function () {
    //Make Alpi API requests and check subscriptions
    (0, _mochaSteps.step)('Step 4.1: Check apotheka subscription ', async function () {
      var request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
      (0, _chai.expect)(request.subscriptions_newsletter[0].subscription_origin).equal('ApothekaEE');
      (0, _chai.expect)(request.subscriptions_newsletter[0].subscription).equal('0');
    });
    (0, _mochaSteps.step)('Step 4.2: Check petcity subscription ', async function () {
      var request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
      (0, _chai.expect)(request.subscriptions_newsletter[1].subscription_origin).equal('PetCityEE');
      (0, _chai.expect)(request.subscriptions_newsletter[1].subscription).equal('0');
    });
    (0, _mochaSteps.step)('Step 4.3: Check beauty subscription ', async function () {
      var request = await makePostRequest(config.alpiRequestUrl, config.personalCode);
      (0, _chai.expect)(request.subscriptions_newsletter[2].subscription_origin).equal('BeautyEE');
      (0, _chai.expect)(request.subscriptions_newsletter[2].subscription).equal('0');
    });
  });
});