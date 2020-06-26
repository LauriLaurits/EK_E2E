"use strict";

var _mochaSteps = require("mocha-steps");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import puppeteer from "puppeteer";
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

  describe("Flow 1", function () {
    (0, _mochaSteps.step)("should go to google homepage", async function () {
      await page.goto("https://google.com");
    });
    (0, _mochaSteps.step)("should go to delfi homepage", async function () {
      await page.goto("https://delfi.ee");
    });
    (0, _mochaSteps.step)("should go to postimees homepage", async function () {
      await page.goto("https://postimees.ee");
    });
  });
  describe("Flow 2", function () {
    (0, _mochaSteps.step)("should go to staging homepage", async function () {
      await page.goto("https://staging.apotheka.ee");
    });
    (0, _mochaSteps.step)("should go to prelive homepage", async function () {
      await page.goto("https://prelive.apotheka.ee");
    });
    (0, _mochaSteps.step)("should go to apotheka homepage", async function () {
      await page.goto("https://apotheka.ee");
    });
  });
});