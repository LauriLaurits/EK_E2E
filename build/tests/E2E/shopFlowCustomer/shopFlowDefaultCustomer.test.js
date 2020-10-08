"use strict";

var _mochaSteps = require("mocha-steps");

var _chai = require("chai");

var _builder = require("../../../lib/builder");

var _builder2 = _interopRequireDefault(_builder);

var _HomePage = require("../../../pages/HomePage");

var _HomePage2 = _interopRequireDefault(_HomePage);

var _LoginPage = require("../../../pages/LoginPage");

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../../lib/config');

var constants = require("../../../lib/constants/constants");

describe("SHOP FLOW FOR LOGGED IN CUSTOMER BUYING DEFAULT PRODUCT", function () {
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
    await loginPage.deleteCustomerFromMagentoLoggedOut(config.magentoUsername, config.magentoPassword);
    //Delete Customer from TestALPI
    await loginPage.deleteCustomerFromAlpi(config.alpiUsername, config.alpiPassword, config.personalCode);
    //Close Browser
    await page.close();
  });
  describe("E2E Shopflow buying default products for logged in customer", function () {
    (0, _mochaSteps.step)("Step 1: Making new Customer", async function () {
      await loginPage.newCustomer(config.personalCode, config.phoneNumber, config.email);
    });
    (0, _mochaSteps.step)("Step 2: Adding default product with link to cart ", async function () {
      await page.goto(config.baseUrl + "/products/link/add/pmm0100409ee", { waitUntil: "networkidle0" });
      await homepage.navigation();
      (0, _chai.expect)((await page.getText(".subtotal"))).not.to.equal("0.00 €");
      await homepage.navigation();
      //await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      (0, _chai.expect)((await page.getText(".item-info .product-item-name"))).to.include("BABE");
      await page.waitAndClick(".primary.checkout");
      await page.waitForSelector("#checkout-root");
      (0, _chai.expect)((await page.url())).to.equal(config.baseUrl + "/fast/checkout/index/");
    });

    (0, _mochaSteps.step)("Step 3: React checkout choose shipping method and fill necessary fields", async function () {
      //Choose shipping method
      await page.waitAndClick("[class] li:nth-of-type(4) div span");
      //Get Order number
      await page.waitForSelector(".summary-title");
      //const orderNumber = await page.getText(".summary-title");
      //console.log("Order Nr. React: " + orderNumber);
      //Keelan saadetise üleandmise alaealisele
      await page.waitAndClick(".checkbox-with-label:nth-of-type(1) .checkbox-with-label-label");
      //Anda üle vaid kontaktisikule
      await page.waitAndClick(".checkbox-with-label:nth-of-type(2) .checkbox-with-label-label");
      //Sisesta lubatud isikukood
      await page.waitAndType(".control-input-input", "39010102711");
      //Info kullerile
      await page.waitAndType(".control-textarea-textarea", "Testinfo Kullerile");
      await page.isElementVisible(".button-inner .text");
      await page.click(".button-inner .text");
    });

    (0, _mochaSteps.step)("Step 4: React checkout fill contact information", async function () {
      //County
      await page.waitAndClick(".control-select.has-value.size-default");
      await page.waitAndClick("[class='bp3-menu menu menu-layout-default Menu-menu-0-2-6'] li:nth-of-type(3) div");
      //City
      await page.waitAndType(".form-row:nth-of-type(5) [type]", "Tartu");
      //Aadress
      await page.waitAndType(".form-row:nth-of-type(6) [type]", "Tamme 18");
      //Zipcode
      await page.waitAndType(".form-row:nth-of-type(7) [type]", "11318");
      //Wait for button
      await page.isElementVisible("#checkout-root > div > div.frame-checkout-content > div > div > div > div > div.layout-sidebar-primary > ul > li.list-progress-item.current.ListProgressItem-item-0-2-5 > div.list-progress-item-content.ListProgressItem-content-0-2-4 > div > ul > li");
      await page.click("#checkout-root > div > div.frame-checkout-content > div > div > div > div > div.layout-sidebar-primary > ul > li.list-progress-item.current.ListProgressItem-item-0-2-5 > div.list-progress-item-content.ListProgressItem-content-0-2-4 > div > ul > li");
    });

    (0, _mochaSteps.step)("Step 5: React checkout check T&C and choose payment method", async function () {
      //Terms and conditions checkbox
      await page.waitAndClick(".checkbox-with-label-label > a");
      //Terms and conditions close
      await page.waitAndClick(".overlay-focusview-scroller .text");
      //LHV Payment
      await page.waitAndClick("li:nth-of-type(10) > button > .banklinks-item-label");
    });

    (0, _mochaSteps.step)("Step 6: Maksekeskuse test environment", async function () {
      //Wait for maksekeskus confirmation
      await page.waitAndClick(".btn-success");
      await page.waitAndClick(".btn-success");
      //Wait for success page
      await page.waitForSelector(".checkout-success");
    });

    (0, _mochaSteps.step)("Step 7: Success page validation for Order Nr.", async function () {
      var urlSuccess = await page.url();
      (0, _chai.expect)(urlSuccess).to.include("success");
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