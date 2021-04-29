"use strict";

var _mochaSteps = require("mocha-steps");

var _chai = require("chai");

var _builder = require("../../lib/builder");

var _builder2 = _interopRequireDefault(_builder);

var _HomePage = require("../../pages/HomePage");

var _HomePage2 = _interopRequireDefault(_HomePage);

var _LoginPage = require("../../pages/LoginPage");

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../lib/config');

var constants = require("../../lib/constants/constants");
var alpi = require("../../lib/constants/alpiConst");

var _require = require('../../lib/helpers'),
    makePostRequest = _require.makePostRequest;

describe.skip("NEWSLETTER STATUS TEST (subscribeStatus.test)", function () {
  var page = void 0;
  var homepage = void 0;
  var loginPage = void 0;

  before(async function () {
    page = await _builder2.default.build("Desktop");
    homepage = new _HomePage2.default(page);
    loginPage = new _LoginPage2.default(page);
  });

  after(async function () {
    //Close Browser
    await page.close();
  });

  describe("1.Log in to Customer account and test subscriptions  ", function () {
    (0, _mochaSteps.step)("Step 1: Log in to customer magento account and test if he/she has subscription ", async function () {
      //Make New Customer
      await loginPage.loginMobileID(config.personalCodeMID, config.phoneNumberMID);
      await page.goto(config.baseUrl + "/customer/account/");
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
  describe("2.Check subscriptions after account creation from Alpi API", function () {
    //Make Alpi API requests and check subscriptions
    (0, _mochaSteps.step)('Step 1: Check apotheka subscription ', async function () {
      var request = await makePostRequest(config.alpiRequestUrl, config.personalCodeMID);
      (0, _chai.expect)(request.subscriptions_newsletter[0].subscription_origin).equal('ApothekaEE');
      (0, _chai.expect)(request.subscriptions_newsletter[0].subscription).equal('1');
    });
    (0, _mochaSteps.step)('Step 2: Check petcity subscription ', async function () {
      var request = await makePostRequest(config.alpiRequestUrl, config.personalCodeMID);
      (0, _chai.expect)(request.subscriptions_newsletter[1].subscription_origin).equal('PetCityEE');
      (0, _chai.expect)(request.subscriptions_newsletter[1].subscription).equal('1');
    });
    (0, _mochaSteps.step)('Step 3: Check beauty subscription ', async function () {
      var request = await makePostRequest(config.alpiRequestUrl, config.personalCodeMID);
      (0, _chai.expect)(request.subscriptions_newsletter[2].subscription_origin).equal('BeautyEE');
      (0, _chai.expect)(request.subscriptions_newsletter[2].subscription).equal('1');
    });
  });
  describe("3.Check subscriptions after logout/login ", function () {
    //Make Alpi API requests and check subscriptions
    (0, _mochaSteps.step)("Step 1: Log out/ Log in and check if subscriptions have same values ", async function () {
      await loginPage.logOutMagento();
      await page.waitForSelector("#registration_link");
      await loginPage.loginMobileID(config.personalCodeMID, config.phoneNumberMID);
      await page.goto(config.baseUrl + "/customer/account/");
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
});