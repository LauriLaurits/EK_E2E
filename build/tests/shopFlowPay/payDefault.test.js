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

var constants = require("../../lib/constants/constants");

describe("SHOP FLOW FOR NON CUSTOMER BUYING DEFAULT PRODUCT", function () {
  var page = void 0;
  var homepage = void 0;
  var loginPage = void 0;

  before(async function () {
    page = await _builder2.default.build("Desktop");
    homepage = new _HomePage2.default(page);
    loginPage = new _LoginPage2.default(page);
  });
  after(async function () {
    await page.close();
  });
  describe("E2E shopflow default products non customer", function () {
    (0, _mochaSteps.step)("Step 1: Adding default product with link to cart ", async function () {
      await page.goto("https://www.staging.apotheka.ee/products/link/add/pmm0100409ee", { waitUntil: "networkidle0" });
      await homepage.navigation();
      (0, _chai.expect)((await page.getText(".subtotal"))).not.to.equal("0.00 €");
      await homepage.navigation();
      //await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      (0, _chai.expect)((await page.getText(".item-info .product-item-name"))).to.include("BABE");
      await page.waitAndClick(".primary.checkout");
      await page.waitForSelector("#checkout-root");
      (0, _chai.expect)((await page.url())).to.equal("https://www.staging.apotheka.ee/fast/checkout/index/");
    });

    (0, _mochaSteps.step)("Step 2: React checkout choose shipping method and fill necessary fields", async function () {
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
      await page.waitAndType(constants.selectors.personalCode, constants.formCredentials.personalCode);
      //Info kullerile
      await page.waitAndType(constants.selectors.message, constants.formCredentials.message);
      await page.isElementVisible(constants.selectors.submitFirst);
      await page.click(constants.selectors.submitFirst);
    });

    (0, _mochaSteps.step)("Step 3: React checkout fill contact information", async function () {
      //Email
      await page.waitAndType(constants.selectors.email, constants.formCredentials.email);
      //Firstname
      await page.waitAndType(constants.selectors.firstName, constants.formCredentials.firstName);
      //Lastname
      await page.waitAndType(constants.selectors.lastName, constants.formCredentials.lastName);
      //Telephone
      await page.waitAndType(constants.selectors.phoneNumber, constants.formCredentials.phoneNumber);
      //County
      await page.waitAndClick(".control-select.has-value.size-default");
      await page.waitAndClick("[class='bp3-menu menu menu-layout-default Menu-menu-0-2-6'] li:nth-of-type(3) div");
      //City
      await page.waitAndType(constants.selectors.city, constants.formCredentials.city);
      //Aadress
      await page.waitAndType(constants.selectors.aadress, constants.formCredentials.aadress);
      //Zipcode
      await page.waitAndType(constants.selectors.zipCode, constants.formCredentials.zipCode);
      //Wait for button
      await page.isElementVisible(constants.selectors.submitSecond);
      await page.click(constants.selectors.submitSecond);
    });

    (0, _mochaSteps.step)("Step 4: React checkout check T&C and choose payment method", async function () {
      //Terms and conditions checkbox
      await page.waitAndClick(".checkbox-with-label-label > a");
      //Terms and conditions close
      await page.waitAndClick(".overlay-focusview-scroller .text");
      //LHV Payment
      await page.waitAndClick("li:nth-of-type(10) > button > .banklinks-item-label");
    });

    (0, _mochaSteps.step)("Step 5: Maksekeskuse test environment", async function () {
      //Wait for maksekeskus

      //Wait for maksekeskus confirmation
      await page.waitAndClick(".btn-success");
      await page.waitAndClick(".btn-success");
      //WAit for success page
      await page.waitForSelector(".checkout-success");
    });

    (0, _mochaSteps.step)("Step 6: Succsess page validation for Order Nr.", async function () {
      var urlSuccess = await page.url();
      (0, _chai.expect)(urlSuccess).to.include("success");
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