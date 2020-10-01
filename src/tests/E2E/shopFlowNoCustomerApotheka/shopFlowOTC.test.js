import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../../../lib/builder";
import HomePage from "../../../pages/HomePage";
import LoginPage from "../../../pages/LoginPage";

let constants = require("../../../lib/constants/constants");

describe.skip("SHOP FLOW FOR NON CUSTOMER BUYING OTC PRODUCT", () => {
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

  describe("E2E Shopflow buying OTC products as non customer", () => {
    step("Step 1: Adding OTC to Cart from detailview", async () => {
      await page.goto(
        "https://www.staging.apotheka.ee/bisacodyl-gsk-rektaalsuposiit-10mg-n10-pmm0000489ee",{ waitUntil: 'networkidle0'});
      await homepage.navigation();
      await page.waitAndClick(".btn-addtocart");
      await page.clickHelp(".popup-content .control > .input-text");
      await page.waitAndType(".popup-content .control > .input-text", "23");
      await page.clickHelp("[id='usage_symptom\[0\]']");
      await page.clickHelp("#verify-addtocart > div > ul > li:nth-child(3) > button");
      //Procuct added to cart expect subtototal to be greater than 0€
      await page.waitForSelector(".item-info");
      expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
      await page.waitForSelector(".item-info .product-item-name");
      expect(await page.getText(".item-info .product-item-name")).to.include("BISACODYL");
      await page.waitAndClick(".primary.checkout");
      await page.waitForSelector("#checkout-root");
      expect(await page.url()).to.equal("https://www.staging.apotheka.ee/fast/checkout/index/");
  });
  step("Step 2: React checkout choose shipping method and fill necessary fields", async () => {
    // Choose Smartpost pakiautomaat
    await page.clickHelp("[class] li:nth-of-type(5) div span");
    //Get Order number
    await page.waitForSelector(".summary-title");
    //const orderNumber = await page.getText(".summary-title");
    //console.log("Order Nr. React: " + orderNumber);
    //Wait for dropdown and click on it
    await page.waitAndClick(".control-select-select");
    //Choose value
    await page.waitAndClick("body > div.bp3-portal > div > div > div > div > ul > li:nth-child(6) > a > div");
    //Wait for Continue button to be enabled
    await page.isElementVisible(constants.selectors.submitFirst);
    //Click Continue
    await page.click(constants.selectors.submitFirst);
  });
  step("Step 3: React checkout fill short contact information", async () => {
    //Email
    await page.waitAndType(constants.selectors.email,constants.formCredentials.email);
    //Firstname
    await page.waitAndType(constants.selectors.firstName,constants.formCredentials.firstName);
    //Lastname
    await page.waitAndType(constants.selectors.lastName,constants.formCredentials.lastName);
    //Telephone
    await page.waitAndType(constants.selectors.phoneNumber,constants.formCredentials.phoneNumber);
    //Click Continue
    await page.click(constants.selectors.submitSecond);
  });
  step("Step 4: React checkout check T&C and choose payment method", async () => {
    //Terms and conditions checkbox
    await page.waitAndClick(".checkbox-with-label-label > a");
    //Terms and conditions close
    await page.waitAndClick(".overlay-focusview-scroller .text");
    //Councelling Yes
    await page.waitAndClick(".radio-with-label-label");
    //LHV Payment
    await page.waitAndClick("li:nth-of-type(10) > button > .banklinks-item-label");
  });
  step("Step 5: Maksekeskuse test environment", async () => {
    //Wait for maksekeskus
    //Wait for maksekeskus confirmation
    await page.waitAndClick(".btn-success");
    await page.waitAndClick(".btn-success");
    //Wait for success page
    await page.waitForSelector(".checkout-success");
  });

  step("Step 6: Success page validation for Order Nr. and check for OrderXML", async () => {
    const urlSuccess = await page.url();
    expect(urlSuccess).to.include("success");
    //Redirect back to Success page
    await page.waitForSelector(".checkout-success p:nth-of-type(1) span");
    //Order number from succsess page
    const successOrderNumber = await page.getText(".checkout-success p:nth-of-type(1) span");
    //console.log("Success Order Nr: " + successOrderNumber);
    // expect(orderNumber).to.include(successOrderNumber);
    await page.goto("https://www.staging.apotheka.ee/export/api/order/"+ successOrderNumber);
    const getXMLOrderId = await page.getText(".html-attribute-value");
    //console.log("getXMLOrderId: "+ getXMLOrderId);
    expect(successOrderNumber).to.equal(getXMLOrderId);

  });

});
});
