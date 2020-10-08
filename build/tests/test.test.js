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

var constants = require("../lib/constants/constants");
var alpi = require("../lib/constants/alpiConst");

var _require = require('../lib/helpers'),
    makePostRequest = _require.makePostRequest;

describe("NEWSLETTER SUBSCRIBE/UNSUBSCRIBE TEST", function () {
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

  describe("Test Describe  ", function () {
    /*  step("Test", async () => {
         await loginPage.checkAndDeleteAlpi("38610102716");
     }); */
    /* step("Test NewCustomer", async () => {
        await loginPage.newCustomer();
    }); */
    (0, _mochaSteps.step)("Test Magento", async function () {
      await loginPage.checkAndDeleteMagento(constants.unSusubscribe.backendUrl, constants.unSusubscribe.mbUsername, constants.unSusubscribe.mbPassword);
      //await loginPage.deleteCustomerFromMagentoLoggedOut(constants.unSusubscribe.backendUrl, constants.unSusubscribe.mbUsername, constants.unSusubscribe.mbPassword);
    });
  });
});