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

describe.skip("Tests for adding OTC product to shopping cart", function () {
  var page = void 0;
  var homepage = void 0;
  var loginPage = void 0;

  before(async function () {
    page = await _builder2.default.build("Desktop");
    homepage = new _HomePage2.default(page);
    loginPage = new _LoginPage2.default(page);
  });
  /*  afterEach(async () => {
     //Empty Cart
     await page.waitAndClick(".action-delete");
     await homepage.navigation();
   }); */
  after(async function () {
    await page.close();
  });

  describe("Adding OTC for Non Customers", function () {
    (0, _mochaSteps.step)("Step 1: Adding from detailview", async function () {
      await page.goto("https://www.staging.apotheka.ee/bisacodyl-gsk-rektaalsuposiit-10mg-n10-pmm0000489ee", { waitUntil: 'networkidle0' });
      await homepage.navigation();
      await page.waitAndClick(".btn-addtocart");
      await page.waitForSelector("#verify-addtocart");
      /* await page.waitAndClick("#verify-addtocart .automatic-dropdown div");
       await page.select("select#age", "23");
      await page.waitAndClickTwo(".btn.tocart.type02"); */
      await page.waitFor(5000);
      console.log("Test");
    });
  });
});