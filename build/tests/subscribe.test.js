"use strict";

var _mochaSteps = require("mocha-steps");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

var _chai = require("chai");

var _HomePage = require("../pages/HomePage");

var _HomePage2 = _interopRequireDefault(_HomePage);

var _LoginPage = require("../pages/LoginPage");

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO
//Vaja teha kasutaja saada tema email, alpi id
//Creatimisel lisada talle subscription
//Minna unsubscribe lingile ja see subscription maha võtta
// Kontrollida kas subscription läks maha
describe.only("Newsletter subscribe/unsubscribe test", function () {
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

  describe("Create New Customer ", function () {
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
      //await page.waitForSelector("#clientcard-popup");
      //await page.waitAndClick("#terms_agreement");
      //await page.waitAndClick(".answer_yes.btn.new_clientcard_answer.primary");
    });
    //step("Step 2: Get ALPI id ", async () => {

    //});
    (0, _mochaSteps.step)("Step 3: Log in to Magento backend and get Customer Data", async function () {
      await page.goto("https://www.staging.apotheka.ee/MMadmin/", {
        waitUntil: "networkidle0"
      });
      await page.waitAndClick("#username");
      await page.waitAndType("#username", "lauri@upitech.ee");
      await page.waitAndClick("#login");
      await page.waitAndType("#login", "b8thLCzBP17KaaGCeDwm");
      await page.waitAndClick(".action-primary");
      await page.waitAndClick(".action-close");
      //await page.waitAndClick(".item-customer-manage.level-1 a");
      var customerUrl = await page.getHref(".item-customer-manage.level-1 a");
      await page.goto(customerUrl[0]);

      var getID = await page.getText("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");

      await page.goto("https://www.staging.apotheka.ee/MMadmin/customer/index/edit/id/" + getID);
      console.log(getID);
      //Click edit last created customer
      //await page.goto("https://www.staging.apotheka.ee/MMadmin/customer/index/edit/id/279/");
      //console.log(ggg);
      //await page.waitAndClick("#container > div > div.admin__data-grid-wrap > table > tbody > tr:nth-child(2) > td.data-grid-actions-cell > a");
      //wait for last customer to load
      /*await page.waitForSelector(".admin__page-nav");
        const getName = await page.getText("h1.page-title");
      expect(getName).to.include("MARY ÄNN O’CONNEŽ-ŠUSLIK TESTNUMBER");
      
      */
      await page.waitFor(3000);
    });
  });
}); //import puppeteer from "puppeteer";