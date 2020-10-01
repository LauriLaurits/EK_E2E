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

describe("ADDING PRODUCTS TO CART FOR NON CUSTOMER", function () {
  var page = void 0;
  var homepage = void 0;
  var loginPage = void 0;

  before(async function () {
    page = await _builder2.default.build("Desktop");
    homepage = new _HomePage2.default(page);
    loginPage = new _LoginPage2.default(page);
  });
  afterEach(async function () {
    //Empty Cart
    await page.waitAndClick(".action-delete");
    await homepage.navigation();
  });
  after(async function () {
    // Delete Customer from Magento
    //await loginPage.deleteCustomerFromMagentoLoggedOut(constants.unSusubscribe.backendUrl, constants.unSusubscribe.magentoBackendUsername, constants.unSusubscribe.magentoBackendPassword);
    //Delete Customer from TestALPI
    //await loginPage.deleteCustomerFromAlpi();
    // Close Browser
    await page.close();
  });

  describe("Adding DEFAULT Products for Non Customers", function () {
    (0, _mochaSteps.step)("Step 1.1: Adding from listview", async function () {
      await page.goto("https://www.staging.apotheka.ee/tooted/ilu/huulepulgad", { waitUntil: 'networkidle0' });
      await homepage.navigation();
      await page.waitAndClick(".product-item:nth-of-type(1) .tocart");
      await page.waitForSelector(".counter-number");
      await homepage.navigation();
      (0, _chai.expect)((await page.getText(".subtotal"))).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      (0, _chai.expect)((await page.getText(".item-info .product-item-name"))).to.include("BABE");
    });
    (0, _mochaSteps.step)("Step 1.2: Adding from detailview", async function () {
      await page.goto("https://www.staging.apotheka.ee/babe-huulepulk-spf20-4g-pmm0100409ee", { waitUntil: 'networkidle0' });
      await page.waitAndClick("#product-addtocart-button");
      await page.waitForSelector(".counter-number");
      await homepage.navigation();
      (0, _chai.expect)((await page.getText(".subtotal"))).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      (0, _chai.expect)((await page.getText(".item-info .product-item-name"))).to.include("BABE");
    });
    (0, _mochaSteps.step)("Step 1.3: Adding with link", async function () {
      await page.goto("https://www.staging.apotheka.ee/products/link/add/pmm0100409ee", { waitUntil: 'networkidle0' });
      await homepage.navigation();
      (0, _chai.expect)((await page.getText(".subtotal"))).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      (0, _chai.expect)((await page.getText(".item-info .product-item-name"))).to.include("BABE");
    });
  });
  describe.skip("Adding DEFAULT Products for Customers", function () {
    (0, _mochaSteps.step)("Step 2.1: Adding from listview", async function () {
      //await loginPage.loginMobileID("https://www.staging.apotheka.ee","37200000566");
      //Make new Customer
      await loginPage.newCustomer();
      await page.goto("https://www.staging.apotheka.ee/tooted/ilu/huulepulgad", { waitUntil: 'networkidle0' });
      await homepage.navigation();
      await page.waitAndClick(".product-item:nth-of-type(1) .tocart");
      await page.waitForSelector(".counter-number");
      (0, _chai.expect)((await page.getText(".subtotal"))).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      (0, _chai.expect)((await page.getText(".item-info .product-item-name"))).to.include("BABE");
    });
    (0, _mochaSteps.step)("Step 2.2: Adding from detailview", async function () {
      await page.goto("https://www.staging.apotheka.ee/babe-huulepulk-spf20-4g-pmm0100409ee", { waitUntil: 'networkidle0' });
      await page.waitAndClick("#product-addtocart-button");
      await page.waitForSelector(".counter-number");
      await homepage.navigation();
      (0, _chai.expect)((await page.getText(".subtotal"))).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      (0, _chai.expect)((await page.getText(".item-info .product-item-name"))).to.include("BABE");
    });
    (0, _mochaSteps.step)("Step 2.3: Adding with link", async function () {
      await page.goto("https://www.staging.apotheka.ee/products/link/add/pmm0100409ee", { waitUntil: 'networkidle0' });
      await homepage.navigation();
      (0, _chai.expect)((await page.getText(".subtotal"))).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      (0, _chai.expect)((await page.getText(".item-info .product-item-name"))).to.include("BABE");
    });
  });
});