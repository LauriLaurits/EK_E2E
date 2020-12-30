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

var config = require("../lib/config");

var constants = require("../lib/constants/constants");
var alpi = require("../lib/constants/alpiConst");

var _require = require("../lib/helpers"),
    makeGetRequest = _require.makeGetRequest;

describe.skip("NEWSLETTER SUBSCRIBE/UNSUBSCRIBE TEST", function () {
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
    (0, _mochaSteps.step)("Test newcustomer", async function () {
      await loginPage.newCustomer(config.personalCode, config.phoneNumber, config.email);
      await page.waitForSelector(".box-newsletter");
    });
    /* step("test postmann", async () => {
       const data = await makeGetRequest(
         config.requestUrlProgress,
         config.productCodeApotheka
       );
       console.log(data.data[0].in_stock);
     });
     step("Step 1.1: Adding from listview", async () => {
       const progressStock = await makeGetRequest(
         config.requestUrlProgress,
         config.productCodeApotheka
       );
       if (progressStock.data[0].in_stock >= 1) {
         await page.goto(config.baseUrl, { waitUntil: "networkidle0" });
         await homepage.navigation();
         await page.waitAndClick("#search");
         await page.waitAndType("#search", "P" + config.productCodeApotheka);
         await page.keyboard.press("Enter");
         await page.waitAndClick(".product-item:nth-of-type(1) .tocart");
         await page.waitForSelector(".counter-number");
         await homepage.navigation();
         expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
         await homepage.navigation();
         await page.waitAndClick(".subtotal");
         await page.waitForSelector(".item-info .product-item-name");
         const productName = await makeGetRequest(
           config.requestUrlProgress,
           config.productCodeApotheka
         );
         expect(await page.getText(".item-info .product-item-name")).to.include(
           productName.data[0].name
         );
       } else {
         console.log(
           "Product " + config.productCodeApotheka + " is out of stock"
         );
       }
     }); */
  });
});