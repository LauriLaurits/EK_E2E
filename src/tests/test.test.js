import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../lib/builder";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const config = require("../lib/config");

let constants = require("../lib/constants/constants");
let alpi = require("../lib/constants/alpiConst");

const { makeGetRequest } = require("../lib/helpers");

describe.skip("NEWSLETTER SUBSCRIBE/UNSUBSCRIBE TEST", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
  });

  after(async () => {
    //Close Browser
    await page.close();
  });

  describe("Test Describe  ", () => {
    step("test postmann", async () => {
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
    });
  });
});
