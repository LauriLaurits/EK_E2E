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

var constants = require("../../../lib/constants/constants");

describe("SHOP FLOW FOR GUEST BUYING OTC PRODUCT", function () {
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

  describe("E2E Shopflow buying OTC products as guest", function () {
    (0, _mochaSteps.step)("Step 1: Adding OTC to Cart from detailview", async function () {
      await page.goto("https://www.staging.apotheka.ee/smecta-suukaudse-susp-pulber-3g-n10-pmm0010809ee", { waitUntil: 'networkidle0' });
      await homepage.navigation();
      await page.waitAndClick(".btn-addtocart");
      await page.clickHelp(".popup-content .control > .input-text");
      await page.waitAndType(".popup-content .control > .input-text", "23");
      await page.clickHelp("[id='usage_symptom\[0\]']");
      await page.clickHelp("#verify-addtocart > div > ul > li:nth-child(3) > button");
      //Procuct added to cart expect subtototal to be greater than 0€
      await page.waitForSelector(".item-info");
      (0, _chai.expect)((await page.getText(".subtotal"))).not.to.equal("0.00 €");
      await page.waitForSelector(".item-info .product-item-name");
      (0, _chai.expect)((await page.getText(".item-info .product-item-name"))).to.include("SMECTA");
      await page.waitAndClick(".primary.checkout");
      await page.waitForSelector("#checkout-root");
      (0, _chai.expect)((await page.url())).to.equal("https://www.staging.apotheka.ee/fast/checkout/index/");
    });
    (0, _mochaSteps.step)("Step 2: React checkout choose shipping method and fill necessary fields", async function () {
      // Choose Smartpost pakiautomaat
      await page.clickHelp("[class] li:nth-of-type(5) div span");
      //Get Order number
      await page.waitForSelector(".summary-title");
      //const orderNumber = await page.getText(".summary-title");
      //console.log("Order Nr. React: " + orderNumber);
      //Wait for dropdown and click on it
      await page.waitAndClick(".control-select-select");
      //Choose value
      await page.waitAndClick("body > div.bp3-portal > div > div > div > div > ul > li:nth-child(6) > a > div");
      //Wait for Continue button to be enabled
      await page.isElementVisible(".button-inner .text");
      //Click Continue
      await page.click(".button-inner .text");
    });
    (0, _mochaSteps.step)("Step 3: React checkout fill short contact information", async function () {
      //Email
      await page.waitAndType(".layout-form-column:nth-of-type(1) [type]", "lauri@upitech.ee");
      //Firstname
      await page.waitAndType(".layout-form-column:nth-of-type(2) .form-row:nth-of-type(1) [type]", "Lauri");
      //Lastname
      await page.waitAndType(".layout-form-has-columns .form-row:nth-of-type(2) [type]", "Laurits");
      //Telephone
      await page.waitAndType(".form-row:nth-of-type(3) [type]", "55555555");
      //Click Continue
      await page.click("#checkout-root > div > div.frame-checkout-content > div > div > div > div > div.layout-sidebar-primary > ul > li.list-progress-item.current.ListProgressItem-item-0-2-5 > div.list-progress-item-content.ListProgressItem-content-0-2-4 > div > ul > li");
    });
    (0, _mochaSteps.step)("Step 4: React checkout check T&C and choose payment method", async function () {
      //Terms and conditions checkbox
      await page.waitAndClick(".checkbox-with-label-label > a");
      //Terms and conditions close
      await page.waitAndClick(".overlay-focusview-scroller .text");
      //Councelling Yes
      await page.waitAndClick(".radio-with-label-label");
      //LHV Payment
      await page.waitAndClick("li:nth-of-type(10) > button > .banklinks-item-label");
    });
    (0, _mochaSteps.step)("Step 5: Maksekeskuse test environment", async function () {
      //Wait for maksekeskus
      //Wait for maksekeskus confirmation
      await page.waitAndClick(".btn-success");
      await page.waitAndClick(".btn-success");
      //Wait for success page
      await page.waitForSelector(".checkout-success");
    });

    (0, _mochaSteps.step)("Step 6: Success page validation for Order Nr. and check for OrderXML", async function () {
      var urlSuccess = await page.url();
      (0, _chai.expect)(urlSuccess).to.include("success");
      //Redirect back to Success page
      await page.waitForSelector(".checkout-success p:nth-of-type(1) span");
      //Order number from succsess page
      var successOrderNumber = await page.getText(".checkout-success p:nth-of-type(1) span");
      //console.log("Success Order Nr: " + successOrderNumber);
      // expect(orderNumber).to.include(successOrderNumber);
      await page.goto("https://www.staging.apotheka.ee/export/api/order/" + successOrderNumber);
      var getXMLOrderId = await page.getText(".html-attribute-value");
      //console.log("getXMLOrderId: "+ getXMLOrderId);
      (0, _chai.expect)(successOrderNumber).to.equal(getXMLOrderId);
    });
  });
});