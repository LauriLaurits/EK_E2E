"use strict";

var _mochaSteps = require("mocha-steps");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

var _chai = require("chai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("EK E2E tests", function () {
  //let browser;
  var page = void 0;

  before(async function () {
    //browser = await puppeteer.launch({ headless: false });
    //page = await browser.newPage();
    page = await _builder2.default.build("Desktop");
    //await page.setDefaultTimeout(7000);
  });
  after(async function () {
    //await browser.close();
    await page.close();
  });

  describe("Login flow Staging Apotheka", function () {
    (0, _mochaSteps.step)("Should go to Staging Apotheka homepage and click Login Button and Login with Mobile-ID", async function () {
      await page.goto("https:/staging.apotheka.ee");
      await page.waitAndClick("#registration_link");
      await page.waitForSelector("#horizontal_tabs");
      await page.waitAndClick("#mobile-id-input");
      await page.waitAndType("#mobile-id-input", "37200007");
      await page.click("#mobileid-submit");
      await page.isElementVisible("#mobileid-verification");
      (0, _chai.expect)((await page.isElementVisible("#mobileid-verification"))).to.be.true;
      await page.waitForSelector(".authorization-link.logged-in");
      (0, _chai.expect)((await page.isElementVisible("#registration_link"))).to.be.false;
    });
    (0, _mochaSteps.step)("Should go to product detail page and press add to cart", async function () {
      await page.goto("https://www.staging.apotheka.ee/molutrex-sol-3ml-pmm0137643ee");
      await page.waitAndClick("#product-addtocart-button");
      (0, _chai.expect)((await page.isElementVisible(".message-success.success.message"))).to.be.true;
    });
    (0, _mochaSteps.step)("Should go to cart and checkout", async function () {
      await page.goto("https://www.staging.apotheka.ee/checkout/cart/");
      await page.waitAndClick(".action.primary.checkout");
      await page.waitForSelector("#checkout-root");
    });
  });
  // describe("Flow 2", () => {
  //   step("should go to staging homepage", async () => {
  //     await page.goto("https://staging.apotheka.ee");
  //   });
  //   step("should go to prelive homepage", async () => {
  //     await page.goto("https://prelive.apotheka.ee");
  //   });
  //   step("should go to apotheka homepage", async () => {
  //     await page.goto("https://apotheka.ee");
  //   });
  // });
}); //import puppeteer from "puppeteer";