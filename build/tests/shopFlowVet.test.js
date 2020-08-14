"use strict";

var _mochaSteps = require("mocha-steps");

var _chai = require("chai");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

var _HomePage = require("../pages/HomePage");

var _HomePage2 = _interopRequireDefault(_HomePage);

var _LoginPage = require("../pages/LoginPage");

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe.skip("Tests for adding Vet product to shopping cart", function () {
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

  describe("Adding Vet products for Non Customers", function () {
    (0, _mochaSteps.step)("Step 1: Adding from detailview on open times", async function () {
      await page.goto("https://www.staging.apotheka.ee/bolfo-flea-collar-ravimkaelarihm-98-7mg-g-12-5g-n1-pmm0039597ee", { waitUntil: 'networkidle0' });
      await homepage.navigation();
      await page.waitAndClick(".btn-addtocart");
      await page.waitForSelector("#verify-vet");
      await page.waitForSelector("#animal_species");
      await page.waitAndType("#animal_species", "Karu");
      await page.waitForSelector("#animal_weight");
      await page.waitAndType("#animal_weight", "300kg");
      await page.waitForSelector("#animal_age");
      await page.waitAndType("#animal_age", "11 aastat");
      await page.waitForSelector("form#verify-text-form > .fieldset textarea#comment");
      await page.waitAndType("form#verify-text-form > .fieldset textarea#comment", "Karu sööb mett");
      await page.isElementVisible("div#verify-vet  .actions01.mobile-stretch > li:nth-of-type(2) > .btn.ico-chat.type02");
      await page.click("div#verify-vet  .actions01.mobile-stretch > li:nth-of-type(2) > .btn.ico-chat.type02");
      await page.waitAndClick(".buttons li:nth-of-type(2) span");
      (0, _chai.expect)((await page.getText(".message-queue"))).to.include("Oled järjekorras");
    });
    (0, _mochaSteps.step)("Step 2: Adding with link", async function () {
      await page.goto("https://www.staging.apotheka.ee/products/link/add/pmm0039597ee", { waitUntil: 'networkidle0' });
      await homepage.navigation();
      (0, _chai.expect)((await page.getText(".subtotal"))).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      (0, _chai.expect)((await page.getText(".item-info .product-item-name"))).to.include("BOLFO");
      //Deleting product from cart
      await page.waitAndClick(".action-delete");
      await homepage.navigation();
    });
  });
});