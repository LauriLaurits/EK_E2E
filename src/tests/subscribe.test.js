//import puppeteer from "puppeteer";
import { step } from "mocha-steps";

import Page from "../builder";
import { expect } from "chai";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

//TODO
//Vaja teha kasutaja saada tema email, alpi id
//Creatimisel lisada talle subscription
//Minna unsubscribe lingile ja see subscription maha võtta
// Kontrollida kas subscription läks maha
describe.only("Newsletter subscribe/unsubscribe test", () => {
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

  describe("Create New Customer ", () => {
    step(
      "Should go to Staging Apotheka homepage and click Login Button and Login with Mobile-ID",
      async () => {
        await page.goto("https:/staging.apotheka.ee");
        await page.waitAndClick("#registration_link");
        await page.waitForSelector("#horizontal_tabs");
        await page.waitAndClick("#mobile-id-input");
        await page.waitAndType("#mobile-id-input", "37200000566");
        await page.click("#mobileid-submit");
        await page.isElementVisible("#mobileid-verification");
        expect(await page.isElementVisible("#mobileid-verification")).to.be
          .true;
        await page.waitForSelector(".create.fieldset.info");
      }
    );
    step(
      "Should fill out register form with email and phone number",
      async () => {
        await page.waitAndClick("#email_address");
        await page.waitAndType("#email_address", "test@test.ee");
        await page.waitAndClick(".create.fieldset.info input#telephone");
        await page.waitAndType(
          ".create.fieldset.info input#telephone",
          "00000566"
        );
        await page.waitAndClick("#terms");
        await page.waitAndClick("#submit");
        //await page.waitForSelector("#clientcard-popup");
        //await page.waitAndClick("#terms_agreement");
        //await page.waitAndClick(".answer_yes.btn.new_clientcard_answer.primary");
      });
    //step("Step 2: Get ALPI id ", async () => {

    //});
    step("Step 3: Log in to Magento backend and get Customer Data", async () => {
        await page.goto("https://www.staging.apotheka.ee/MMadmin/", {
          waitUntil: "networkidle0",
        });
        await page.waitAndClick("#username");
        await page.waitAndType("#username", "lauri@upitech.ee");
        await page.waitAndClick("#login");
        await page.waitAndType("#login", "b8thLCzBP17KaaGCeDwm");
        await page.waitAndClick(".action-primary");
        await page.waitAndClick(".action-close");
        //await page.waitAndClick(".item-customer-manage.level-1 a");
        const customerUrl = await page.getHref(".item-customer-manage.level-1 a");
        await page.goto(customerUrl[0]);

        const getID = await page.getText("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");

        await page.goto("https://www.staging.apotheka.ee/MMadmin/customer/index/edit/id/"+ getID);
        console.log(getID);
        //Click edit last created customer
        //await page.goto("https://www.staging.apotheka.ee/MMadmin/customer/index/edit/id/279/");
        //console.log(ggg);
        //await page.waitAndClick("#container > div > div.admin__data-grid-wrap > table > tbody > tr:nth-child(2) > td.data-grid-actions-cell > a");
        //wait for last customer to load
        /*await page.waitForSelector(".admin__page-nav");

        const getName = await page.getText("h1.page-title");
        expect(getName).to.include("MARY ÄNN O’CONNEŽ-ŠUSLIK TESTNUMBER");
        
        */
        await page.waitFor(3000);
      });
   
  });
});
