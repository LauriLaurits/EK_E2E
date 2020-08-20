//import puppeteer from "puppeteer";
import { step } from "mocha-steps";

import Page from "../builder";
import { expect } from "chai";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

let constants = require("./../../constants");

describe.skip("ALPI Api request", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
  });
  
  after(async () => {
  
    await page.close();
  });

describe.skip('Make POST Request to Alpi', () => {
    step("test", async () => {
        await page.setRequestInterception(true);
        page.on("request", interceptedRequest => {
            interceptedRequest.continue({
                method: "POST",
                postData: JSON.stringify({"personal_code": 38610102716}),
                headers: { "Content-Type": "application/json" },
            });
        });
        const response = await page.goto("https://testcard.apotheka.ee/data.php?passcode=56af870f72782959cb1767ce67e1b7d3&query=777|SCUSTOMERV2");
        console.log(await response.text());
    });
});

});