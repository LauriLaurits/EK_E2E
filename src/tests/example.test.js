//import puppeteer from "puppeteer";
import { step } from "mocha-steps";

import Page from "../builder";
import { expect } from "chai";

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

  describe("Login flow Staging Apotheka", () => {
    step(
      "Should go to Staging Apotheka homepage and click Login Button and Login with Mobile-ID",
      async () => {
        await page.goto("https:/staging.apotheka.ee");
        await page.waitAndClick("#registration_link");
        await page.waitForSelector("#horizontal_tabs");
        await page.waitAndClick("#mobile-id-input");
        await page.waitAndType("#mobile-id-input", "37200007");
        await page.click("#mobileid-submit");
        await page.isElementVisible("#mobileid-verification");
        expect(await page.isElementVisible("#mobileid-verification")).to.be
          .true;
        await page.waitForSelector(".authorization-link.logged-in");
        expect(await page.isElementVisible("#registration_link")).to.be.false;
      }
    );
    step("Should go to product detail page and press add to cart", async () => {
      await page.goto(
        "https://www.staging.apotheka.ee/molutrex-sol-3ml-pmm0137643ee"
      );
      await page.waitAndClick("#product-addtocart-button");
      expect(await page.isElementVisible(".message-success.success.message")).to
        .be.true;
    });
    step("Should go to cart and checkout", async () => {
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
});
