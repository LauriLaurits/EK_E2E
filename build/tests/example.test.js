"use strict";

var _mochaSteps = require("mocha-steps");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

var _chai = require("chai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { usernameMMadmin, passwordMMadmin} from "../../config";

describe.skip("EK E2E tests", function () {
  //let browser;
  var page = void 0;

  before(async function () {
    //browser = await puppeteer.launch({ headless: false });
    //page = await browser.newPage();
    page = await _builder2.default.build("Desktop");
    //await page.setDefaultTimeout(7000);
  });
  after(async function () {
    await page.close();
  });

  describe("Flow for non customer to buy default product", function () {

    (0, _mochaSteps.step)("Step 1: Add Default product to cart from listview", async function () {
      await page.goto("https://www.staging.apotheka.ee/tooted?attribute_set_for_filter=Default&p=3");
      await page.waitForSelector(".navigation");
      await page.waitAndClick(".product-item:nth-of-type(1) .tocart");
      await page.waitForSelector(".counter-number");
      await page.reload();
      var subtotal = await page.getText(".subtotal");
      (0, _chai.expect)(subtotal).not.to.equal("0.00 €");
      await page.goto("https://www.staging.apotheka.ee/checkout/cart/");
      await page.waitForSelector(".product-item-name");
      var productText = await page.getText(".product-item-name");
      /* expect(productText).to.include('VITAMIIN D3 KAPSLID 30MCG'); */
      console.log(productText);
    });

    (0, _mochaSteps.step)("Step 2: Add Default product to cart from detailview", async function () {
      await page.goto("https://www.staging.apotheka.ee/elujou-hea-tee-puhitisetee-20g-karp-pmm0093502ee");
      await page.waitForSelector(".navigation");
      await page.waitAndClick("#product-addtocart-button");
      await page.waitForSelector(".counter-number");
      await page.goto("https://www.staging.apotheka.ee/checkout/cart/");
      await page.waitForSelector(".product-item-name");
      var productText = await page.getText(".product-item-name");
      //expect(productText).to.include('ELUJÕU HEA TEE PUHITISETEE 20G (KARP)');
      console.log(productText);
    });
    (0, _mochaSteps.step)("Step 3: Add Default product to cart from custom link", async function () {
      await page.goto("https://www.staging.apotheka.ee/products/link/add/pmm0090292ee");
      await page.waitAndClick(".primary.checkout");
      var url = await page.url();
      (0, _chai.expect)(url).to.include("https://www.staging.apotheka.ee/fast/checkout/index/");
    });
  });

  describe("New Customer flow Staging Apotheka", function () {
    (0, _mochaSteps.step)("Should go to Staging Apotheka homepage and click Login Button and Login with Mobile-ID", async function () {
      await page.goto("https:/staging.apotheka.ee");
      await page.waitAndClick("#registration_link");
      await page.waitForSelector("#horizontal_tabs");
      await page.waitAndClick("#mobile-id-input");
      await page.waitAndType("#mobile-id-input", "37200000566");
      await page.click("#mobileid-submit");
      await page.isElementVisible("#mobileid-verification");
      (0, _chai.expect)((await page.isElementVisible("#mobileid-verification"))).to.be.true;
      await page.waitForSelector(".create.fieldset.info");
    });
    (0, _mochaSteps.step)("Should fill out register form with email and phone number", async function () {
      await page.waitAndClick("#email_address");
      await page.waitAndType("#email_address", "test@test.ee");
      await page.waitAndClick(".create.fieldset.info input#telephone");
      await page.waitAndType(".create.fieldset.info input#telephone", "00000566");
      await page.waitAndClick("#terms");
      await page.waitAndClick("#submit");
      await page.waitForSelector("#clientcard-popup");
      await page.waitAndClick("#terms_agreement");
      await page.waitAndClick(".answer_yes.btn.new_clientcard_answer.primary");
    });
    (0, _mochaSteps.step)("Delete last inserted customer", async function () {
      await page.goto("https://www.staging.apotheka.ee/MMadmin/", {
        waitUntil: "networkidle0"
      });
      await page.waitAndClick("#username");
      await page.waitAndType("#username", "lauri@upitech.ee");
      await page.waitAndClick("#login");
      await page.waitAndType("#login", "b8thLCzBP17KaaGCeDwm");
      await page.waitAndClick(".action-primary");
      await page.waitForSelector(".menu-wrapper");
      await page.goto("https://www.staging.apotheka.ee/MMadmin/customer/index/index/key/d4068d1aa69c445ce03a573d36373d0576fc7e28ad6310a2b6aea5c62286f906/");
      await page.waitFor(3000);
    });

    /*  step("Should go to cart and checkout", async () => {
      await page.goto("https://www.staging.apotheka.ee/checkout/cart/");
      await page.waitAndClick(".action.primary.checkout");
      await page.waitForSelector("#checkout-root");
    });
    step("Should go to checkout checkout choose shipping method", async () => {
      await page.waitForSelector("button.action.primary.checkout")
      await page.waitAndClick(".action.primary.checkout");
      await page.waitForSelector("#checkout-root");
    }); */
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