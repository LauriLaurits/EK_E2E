import { expect } from "chai";

const config = require('../lib/config');
const { createEmail } = require('../lib/helpers');



export default class LoginPage {
  constructor(page) {
    this.page = page;
  }
  //TODO if newcustomer is already customer how to continue
  async newCustomer(personalCode, phoneNumber, email) {
    await this.page.goto(config.baseUrl);
    //Wait and close cookie modal
    await this.page.isElementVisible(".cookie-actions");
    await this.page.waitForSelector(".cookie-actions");
    await this.page.waitAndClick(".actions01.vertical .btn.primary");
    expect(await this.page.isElementVisible(".cookie-settings")).to.be.false;
    await this.page.waitForSelector("#registration_link");
    await this.page.clickHelp("#registration_link");
    await this.page.waitForSelector("#horizontal_tabs");
    await this.page.waitAndClick("div#login-mobile-id > .fieldset input[name='personalcode']");
    await this.page.waitAndType("div#login-mobile-id > .fieldset input[name='personalcode']", personalCode);
    await this.page.waitAndClick("#mobile-id-input");
    await this.page.waitAndType("#mobile-id-input", phoneNumber);
    await this.page.waitFor(1000);
    await this.page.waitAndClick("#mobileid-submit");
    await this.page.isElementVisible("#mobileid-verification");
    expect(await this.page.isElementVisible("#mobileid-verification")).to.be
      .true;
    await this.page.waitForSelector(".create.fieldset.info");
    await this.page.waitAndClick("#email_address");
    await this.page.waitAndType("#email_address", email);
    await this.page.waitAndClick(".create.fieldset.info input#telephone");
    await this.page.waitAndType(
      ".create.fieldset.info input#telephone",
      phoneNumber
    );
    await this.page.waitAndClick("#terms");
    await this.page.waitAndClick("#is_subscribed");
    await this.page.waitAndClick("button#submit");
    await this.page.waitForSelector("#form-validate");
  }
  //Login with Mobile ID TODO add PersonalCode
  async loginMobileID(personalCode, phoneNumber) {
    await this.page.goto(config.baseUrl);
    const cookies = await this.page.isElementVisible(".cookie-actions");
    if(cookies) {
        await this.page.waitForSelector(".cookie-actions");
        await this.page.waitAndClick(".actions01.vertical .btn.primary");
        expect(await this.page.isElementVisible(".cookie-settings")).to.be.false;
        await this.page.clickHelp("#registration_link");
        await this.page.waitForSelector("#horizontal_tabs");
        await this.page.waitAndClick("div#login-mobile-id > .fieldset input[name='personalcode']");
        await this.page.waitAndType("div#login-mobile-id > .fieldset input[name='personalcode']", personalCode);
        await this.page.waitAndClick("#mobile-id-input");
        await this.page.waitAndType("#mobile-id-input", phoneNumber);
        await this.page.waitFor(1000);
        await this.page.waitAndClick("#mobileid-submit");
        await this.page.isElementVisible("#mobileid-verification");
        expect(await this.page.isElementVisible("#mobileid-verification")).to.be
          .true;
        await this.page.waitForSelector(".authorization-link.logged-in");
    } else {
      await this.page.clickHelp("#registration_link");
      await this.page.waitForSelector("#horizontal_tabs");
      await this.page.waitAndClick("div#login-mobile-id > .fieldset input[name='personalcode']");
      await this.page.waitAndType("div#login-mobile-id > .fieldset input[name='personalcode']", personalCode);
      await this.page.waitAndClick("#mobile-id-input");
      await this.page.waitAndType("#mobile-id-input", phoneNumber);
      await this.page.waitFor(1000);
      await this.page.waitAndClick("#mobileid-submit");
      await this.page.isElementVisible("#mobileid-verification");
      expect(await this.page.isElementVisible("#mobileid-verification")).to.be
        .true;
      await this.page.waitForSelector(".authorization-link.logged-in");
    }
  }
  async loginSmartID(smartId) {
    await this.page.goto(config.baseUrl);
    await this.page.waitAndClick("#registration_link");
    await this.page.waitAndClick("[aria-controls='login-smartid']");
    await this.page.waitAndClick("#smart-id-input");
    await this.page.waitAndType("#smart-id-input", smartId);
    await this.page.waitAndClick("#smartid-submit");
    await this.page.isElementVisible("#smartid-verification");
    await this.page.waitForSelector(".authorization-link.logged-in");
  }
  //get alpi id when you are logged out
  async getAlpiID(userName, passWord, name) {
    await this.page.goto(config.backendUrl, { waitUntil: "networkidle0" });

    await this.page.waitAndClick("#username");
    await this.page.waitAndType("#username", userName);
    await this.page.waitAndClick("#login");
    await this.page.waitAndType("#login", passWord);
    await this.page.waitAndClick(".action-primary");
    await this.page.waitAndClick(".action-close");

    const customerDetailsUrl = await this.page.getHref(
      ".item-customer-manage.level-1 a"
    );
    await this.page.goto(customerDetailsUrl[0]);

    const getCustomerID = await this.page.getText(
      "tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content"
    );
    await this.page.goto(
      config.backendUrl + "/customer/index/edit/id/" +
        getCustomerID
    );
    await this.page.waitForSelector(".admin__page-nav");
    const getCustomerName = await this.page.getText("h1.page-title");
    expect(getCustomerName).to.include(name);
    await this.page.clickHelp("#tab_block_customer_alpi_tab_view");
    await this.page.waitForSelector("[for='alpi_id'] span");
    const alpi = await this.page.$("#alpi_id");
    const getAlpiId = await alpi.getProperty("value");
    return getAlpiId._remoteObject.value;
  }
  //Get subscription value
  async getSubscriptionValue(valueXpath) {
    //await this.page.goto(subscription_page);
    const [checkboxApotheka] = await this.page.$x(valueXpath);
    const checkbox = await checkboxApotheka.getProperty("checked");
    const checkboxValue = await checkbox.jsonValue();
    return checkboxValue;
  }
  //delete Customer when you are logged in
  async deleteCustomerFromMagento() {
    await this.page.goto(config.backendUrl, { waitUntil: "networkidle0" });
    const customerDetailsUrl = await this.page.getHref(
      ".item-customer-manage.level-1 a"
    );
    await this.page.goto(customerDetailsUrl[0]);
    const getCustomerID = await this.page.getText(
      "tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content"
    );
    await this.page.goto(
      config.backendUrl + "/customer/index/edit/id/" +
        getCustomerID
    );
    await this.page.waitForSelector(".admin__page-nav");
    await this.page.clickHelp("#customer-edit-delete-button");
    //await this.page.waitForSelector("aside:nth-of-type(1)  .modal-header");
    await this.page.waitFor(200);
    await this.page.clickHelp(".action-accept.action-primary");

    const deleteMessage = await this.page.getText(
      ".message.message-success.success"
    );
    expect(deleteMessage).to.include("You deleted the customer.");
  }
  //delete Customer when you are logged in
  async deleteCustomerFromMagentoLoggedOut(userName, passWord) {
    await this.page.goto(config.backendUrl, { waitUntil: "networkidle0" });
    await this.page.waitAndClick("#username");
    await this.page.waitAndType("#username", userName);
    await this.page.waitAndClick("#login");
    await this.page.waitAndType("#login", passWord);
    await this.page.waitAndClick(".action-primary");
    await this.page.waitAndClick(".action-close");
    const customerDetailsUrl = await this.page.getHref(
      ".item-customer-manage.level-1 a"
    );
    await this.page.goto(customerDetailsUrl[0]);

    const getCustomerID = await this.page.getText(
      "tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content"
    );
    await this.page.goto(
      config.backendUrl + "/customer/index/edit/id/" +
        getCustomerID
    );
    await this.page.waitForSelector(".admin__page-nav");
    await this.page.clickHelp("#customer-edit-delete-button");
    //await this.page.waitForSelector("aside:nth-of-type(1)  .modal-header");
    await this.page.waitFor(200);
    await this.page.clickHelp(".action-accept.action-primary");

    const deleteMessage = await this.page.getText(
      ".message.message-success.success"
    );
    expect(deleteMessage).to.include("You deleted the customer.");
  }
  //delete TestCustomer from ALPI
  async deleteCustomerFromAlpi(userName, passWord, personalCode) {
    await this.page.goto(config.baseUrlAlpi);
    await this.page.waitAndClick("input[name='user']");
    await this.page.waitAndType("input[name='user']", userName);
    await this.page.waitAndClick("input[name='pass']");
    await this.page.waitAndType("input[name='pass']", passWord);
    await this.page.waitAndClick("[type='submit']");
    await this.page.waitAndClick("a[title='Kaardid']");
    await this.page.waitForSelector("#field");
    await this.page.select("#field", "Personal_code");
    await this.page.waitAndClick("input#otsi");
    await this.page.waitAndType("input#otsi", personalCode);
    await this.page.waitAndClick("input[value='Otsi']");
    await this.page.waitAndClick(".dropCard");
    await this.page.waitForSelector(".ui-dialog-buttonset");
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("Enter");
  }
  //Logout from Magento
  async logOutMagento() {
    await this.page.waitAndClick(".open-btn");
    await this.page.clickHelp(".signout");
    await this.page.waitForSelector(".customer-account-logoutsuccess");
  }
  //Logout Magento Back
  async logOutBackend() {
    await this.page.waitAndClick(".admin-user-account-text");
    await this.page.waitAndClick(".account-signout");
    await this.page.waitForSelector(".message.message-success.success > div");
  }
  //Login to Alpi check PersonalID and delete if you got a match
  async checkAndDeleteAlpi(userName, passWord, personalCode) {
    await this.page.goto(config.baseUrlAlpi);
    await this.page.waitAndClick("input[name='user']");
    await this.page.waitAndType("input[name='user']", userName);
    await this.page.waitAndClick("input[name='pass']");
    await this.page.waitAndType("input[name='pass']", passWord);
    await this.page.waitAndClick("[type='submit']");
    await this.page.waitAndClick("a[title='Kaardid']");
    await this.page.waitForSelector("#field");
    await this.page.select("#field", "Personal_code");
    await this.page.waitAndClick("input#otsi");
    await this.page.waitAndType("input#otsi", personalCode);
    await this.page.waitAndClick("input[value='Otsi']");
    const client = await this.page.isElementVisible(".dropCard");
    if(client) {
      await this.page.waitAndClick(".dropCard");
      await this.page.waitForSelector(".ui-dialog-buttonset");
      await this.page.keyboard.press("Enter");
      await this.page.keyboard.press("Enter");
      await this.page.waitAndClick("a[title='Logi välja'] > span");
      await this.page.waitForSelector("input[name='user']");
    } else {
      expect(client).to.be.false;
      await this.page.waitAndClick("a[title='Logi välja'] > span");
      await this.page.waitForSelector("input[name='user']");
    }
  }
  async checkAndDeleteMagento(userName, passWord, name) {
    await this.page.goto(config.backendUrl, { waitUntil: "networkidle0" });
    await this.page.waitAndClick("#username");
    await this.page.waitAndType("#username", userName);
    await this.page.waitAndClick("#login");
    await this.page.waitAndType("#login", passWord);
    await this.page.waitAndClick(".action-primary");
    //console.log("Poup1" + popup);
    await this.page.waitFor(2000);
    const popup = await this.page.isElementVisible(".warning");
    //console.log("Poup" + popup);
    if(popup) {
      //await this.page.clickHelp("[aria-labelledby] [data-role='closeBtn']");
      await this.page.waitAndClick(".action-primary");
      await this.page.waitAndClick(".action-close");
      //await this.page.waitAndClick(".action-close");
    }
    const customerDetailsUrl = await this.page.getHref(
      ".item-customer-manage.level-1 a"
    );
    await this.page.goto(customerDetailsUrl[0],  { waitUntil: "networkidle0" });
    const removeFilter = await this.page.isElementVisible(".action-remove");
    if(removeFilter) {
      await this.page.waitAndClick(".action-remove");
    }
    //Kui see on olemas cliki seda .action-remove
    await this.page.clickHelp(".admin__data-grid-outer-wrap > .admin__data-grid-header .action-default");
    await this.page.waitAndClick("input[name='name']");
    await this.page.waitAndType("input[name='name']", name);
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("Enter");
    //await this.page.waitAndClickTwo(".action-secondary > span");
    await this.page.waitFor(2000);
    await this.page.waitForSelector(".admin__data-grid-header .admin__current-filters-list > li > span:nth-of-type(2)");
    //const result = await this.page.isElementVisible("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
    const activeFilter = await this.page.isElementVisible("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
    if(activeFilter){
      const getCustomerID = await this.page.getText(
        "tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content"
      );
      const getUserName = await this.page.getText("td:nth-of-type(3) > .data-grid-cell-content");
      expect(getUserName).to.include(name);
      await this.page.goto(
        config.backendUrl + "/customer/index/edit/id/" +
          getCustomerID
      );
      await this.page.waitForSelector(".admin__page-nav");
      await this.page.clickHelp("#customer-edit-delete-button");
      //await this.page.waitForSelector("aside:nth-of-type(1)  .modal-header");
      await this.page.waitFor(200);
      await this.page.clickHelp(".action-accept.action-primary");
  
      const deleteMessage = await this.page.getText(
        ".message.message-success.success"
      );
      expect(deleteMessage).to.include("You deleted the customer.");
    }
    //await this.page.waitFor(4000);
  }
  async checkAndDeleteMagentoLoggedIn(name) {
    await this.page.goto(config.backendUrl, { waitUntil: "networkidle0" });
    const popup = await this.page.isElementVisible(".action-primary");
    if(popup) {
      await this.page.waitAndClick(".action-primary");
      await this.page.waitAndClick(".action-close");
    }
    const customerDetailsUrl = await this.page.getHref(
      ".item-customer-manage.level-1 a"
    );
    await this.page.goto(customerDetailsUrl[0],  { waitUntil: "networkidle0" });
    const removeFilter = await this.page.isElementVisible(".action-remove");
    if(removeFilter) {
      await this.page.waitAndClick(".action-remove");
    }
    //Kui see on olemas cliki seda .action-remove
    await this.page.clickHelp(".admin__data-grid-outer-wrap > .admin__data-grid-header .action-default");
    await this.page.waitAndClick("input[name='name']");
    await this.page.waitAndType("input[name='name']", name);
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("Enter");
    //await this.page.waitAndClickTwo(".action-secondary > span");
    await this.page.waitFor(1000);
    await this.page.waitForSelector(".admin__data-grid-header .admin__current-filters-list > li > span:nth-of-type(2)");
    //const result = await this.page.isElementVisible("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
    const activeFilter = await this.page.isElementVisible("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
    if(activeFilter){
      const getCustomerID = await this.page.getText(
        "tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content"
      );
      const getUserName = await this.page.getText("td:nth-of-type(3) > .data-grid-cell-content");
      expect(getUserName).to.include(name);
      await this.page.goto(
        config.backendUrl + "/customer/index/edit/id/" +
          getCustomerID
      );
      await this.page.waitForSelector(".admin__page-nav");
      await this.page.clickHelp("#customer-edit-delete-button");
      //await this.page.waitForSelector("aside:nth-of-type(1)  .modal-header");
      await this.page.waitFor(200);
      await this.page.clickHelp(".action-accept.action-primary");
  
      const deleteMessage = await this.page.getText(
        ".message.message-success.success"
      );
      expect(deleteMessage).to.include("You deleted the customer.");
    }

  }
  async newCustomerConfirmation(personalCode, phoneNumber, email) {
    await this.page.goto(config.baseUrl);
    //Wait and close cookie modal
    await this.page.isElementVisible(".cookie-actions");
    await this.page.waitForSelector(".cookie-actions");
    await this.page.waitAndClick(".actions01.vertical .btn.primary");
    expect(await this.page.isElementVisible(".cookie-settings")).to.be.false;
    await this.page.waitForSelector("#registration_link");
    await this.page.clickHelp("#registration_link");
    await this.page.waitForSelector("#horizontal_tabs");
    await this.page.waitAndClick("div#login-mobile-id > .fieldset input[name='personalcode']");
    await this.page.waitAndType("div#login-mobile-id > .fieldset input[name='personalcode']", personalCode);
    await this.page.waitAndClick("#mobile-id-input");
    await this.page.waitAndType("#mobile-id-input", phoneNumber);
    await this.page.waitFor(500);
    await this.page.waitAndClick("#mobileid-submit");
    await this.page.isElementVisible("#mobileid-verification");
    expect(await this.page.isElementVisible("#mobileid-verification")).to.be
      .true;
    await this.page.waitForSelector(".create.fieldset.info");
    await this.page.waitAndClick("#email_address");
    await this.page.waitAndType("#email_address", email);
    await this.page.waitAndClick(".create.fieldset.info input#telephone");
    await this.page.waitAndType(
      ".create.fieldset.info input#telephone",
      phoneNumber
    );
    await this.page.waitAndClick("#terms");
    await this.page.waitAndClick("#is_subscribed");
    await this.page.waitForSelector("#submit");
    await this.page.waitFor(500);
    await this.page.waitAndClickTwo("button#submit");
    await this.page.waitForSelector(".action.primary.send");
    const confirmationResponse =  await createEmail();
    const confirmationLink = await this.page.detectUrl(confirmationResponse);
    const cofirmLink = confirmationLink[2].slice(0,-1);
    //console.log("Link " + cofirmLink);
    await this.page.goto(cofirmLink);
    //await this.page.isElementVisible(".cookie-actions");
    //await this.page.waitForSelector(".cookie-actions");
    //await this.page.waitAndClick(".actions01.vertical .btn.primary");
    //expect(await this.page.isElementVisible(".cookie-settings")).to.be.false;
    expect(await this.page.isElementVisible(".message-success.success.message")).to.be.true;
    await this.page.waitAndClick("div#login-mobile-id > .fieldset input[name='personalcode']");
    await this.page.waitAndType("div#login-mobile-id > .fieldset input[name='personalcode']", personalCode);
    await this.page.waitAndClick("#mobile-id-input");
    await this.page.waitAndType("#mobile-id-input", phoneNumber);
    await this.page.waitFor(500);
    await this.page.waitAndClick("#mobileid-submit");
    await this.page.isElementVisible("#mobileid-verification");
    expect(await this.page.isElementVisible("#mobileid-verification")).to.be
        .true;
    await this.page.waitForSelector(".authorization-link.logged-in");
    //await this.page.waitFor(4000);
  }
  async closeCookie() {
    await this.page.isElementVisible(".cookie-actions");
    await this.page.waitForSelector(".cookie-actions");
    await this.page.waitAndClick(".actions01.vertical .btn.primary");
    expect(await this.page.isElementVisible(".cookie-settings")).to.be.false;
    await this.page.waitFor(1000);
  }
}