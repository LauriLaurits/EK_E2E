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
    createEmail = _require.createEmail;

describe.skip("NEWSLETTER SUBSCRIBE/UNSUBSCRIBE TEST (1subscribe.test)", function () {
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
    // await loginPage.checkAndDeleteMagentoLoggedIn(config.name);
    //Delete Customer from TestALPI
    // await loginPage.checkAndDeleteAlpi(config.alpiUsername, config.alpiPassword, config.personalCode);
    //Close Browser
    await page.close();
  });

  describe("1.Create New Customer and test subscription links  ", function () {
    (0, _mochaSteps.step)("Step 1: Create new customer and test if he/she has subscription ", async function () {
      await loginPage.newCustomerConfirmation(config.personalCode, config.phoneNumber, config.email);
      //Make New Customer
      /* await loginPage.newCustomer(config.personalCode,config.phoneNumber,config.email);
      const confirmationResponse =  await createEmail();
      const confirmationLink = await page.detectUrl(confirmationResponse);
      const cofirmLink = confirmationLink[2].slice(0,-1);
      await page.goto(cofirmLink);
      await page.isElementVisible(".cookie-actions");
      await page.waitForSelector(".cookie-actions");
      await page.waitAndClick(".actions01.vertical .btn.primary");
      expect(await page.isElementVisible(".cookie-settings")).to.be.false;
      expect(await page.isElementVisible(".message-success.success.message"));
      await page.waitAndClick("div#login-mobile-id > .fieldset input[name='personalcode']");
      await page.waitAndType("div#login-mobile-id > .fieldset input[name='personalcode']", personalCode);
      await page.waitAndClick("#mobile-id-input");
      await page.waitAndType("#mobile-id-input", phoneNumber);
      await page.waitFor(1000);
      await page.waitAndClick("#mobileid-submit");
      await page.isElementVisible("#mobileid-verification");
      expect(await page.isElementVisible("#mobileid-verification")).to.be
        .true;
      await page.waitForSelector(".authorization-link.logged-in");  
      await page.waitFor(4000); */
    });
  });
});