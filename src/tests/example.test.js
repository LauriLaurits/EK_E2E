//import puppeteer from "puppeteer";
import { step } from "mocha-steps";

import Page from "../builder";

describe("EK E2E tests", () => {
  //let browser;
  let page;

  before(async () => {
    //browser = await puppeteer.launch({ headless: false });
    //page = await browser.newPage();
    page = await Page.build("Desktop");
    //await page.setDefaultTimeout(7000);
  });
  after(async () => {
    //await browser.close();
    await page.close();
  });

  describe("Flow 1", () => {
    step("should go to google homepage", async () => {
      await page.goto("https://google.com");
    });
    step("should go to delfi homepage", async () => {
      await page.goto("https://delfi.ee");
    });
    step("should go to postimees homepage", async () => {
      await page.goto("https://postimees.ee");
    });
  });
  describe("Flow 2", () => {
    step("should go to staging homepage", async () => {
      await page.goto("https://staging.apotheka.ee");
    });
    step("should go to prelive homepage", async () => {
      await page.goto("https://prelive.apotheka.ee");
    });
    step("should go to apotheka homepage", async () => {
      await page.goto("https://apotheka.ee");
    });
  });
});
