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

var constants = require("./../../constants"); //import puppeteer from "puppeteer";


describe.skip("ALPI Api request", function () {
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

  describe.skip('Make POST Request to Alpi', function () {
    (0, _mochaSteps.step)("test", async function () {
      await page.setRequestInterception(true);
      page.on("request", function (interceptedRequest) {
        interceptedRequest.continue({
          method: "POST",
          postData: JSON.stringify({ "personal_code": 38610102716 }),
          headers: { "Content-Type": "application/json" }
        });
      });
      var response = await page.goto("https://testcard.apotheka.ee/data.php?passcode=56af870f72782959cb1767ce67e1b7d3&query=777|SCUSTOMERV2");
      console.log((await response.text()));
    });
  });
});