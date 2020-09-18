import { expect } from "chai";
export default class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async newCustomer() {
    await this.page.goto("https://staging.apotheka.ee");
    await this.page.waitAndClick("#registration_link");
    await this.page.waitForSelector("#horizontal_tabs");
    await this.page.waitAndClick("div#mobileid-login > .fieldset input[name='personalcode']");
    await this.page.waitAndType("div#mobileid-login > .fieldset input[name='personalcode']", "60001018800");
    await this.page.waitAndClick("#mobile-id-input");
    await this.page.waitAndType("#mobile-id-input", "37200000566");
    await this.page.click("#mobileid-submit");
    await this.page.isElementVisible("#mobileid-verification");
    expect(await this.page.isElementVisible("#mobileid-verification")).to.be
      .true;
    await this.page.waitForSelector(".create.fieldset.info");
    await this.page.waitAndClick("#email_address");
    await this.page.waitAndType("#email_address", "pimogam614@synevde.com");
    await this.page.waitAndClick(".create.fieldset.info input#telephone");
    await this.page.waitAndType(
      ".create.fieldset.info input#telephone",
      "56600000"
    );
    await this.page.waitAndClick("#terms");
    await this.page.waitAndClick("#submit");
    await this.page.waitForSelector(".authorization-link.logged-in");
  }
  async loginMobileID(site_url, mobile_id) {
    await this.page.goto(site_url);
    await this.page.waitAndClick("#registration_link");
    await this.page.waitAndClick("#mobile-id-input");
    await this.page.waitAndType("#mobile-id-input", mobile_id);
    await this.page.waitAndClick("#mobileid-submit");
    await this.page.isElementVisible("#mobileid-verification");
    await this.page.waitForSelector(".authorization-link.logged-in");
  }
  //get alpi id when you are logged out
  async getAlpiID(backend_url, username, password) {
    await this.page.goto(backend_url, { waitUntil: "networkidle0" });
    await this.page.waitAndClick("#username");
    await this.page.waitAndType("#username", username);
    await this.page.waitAndClick("#login");
    await this.page.waitAndType("#login", password);
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
      "https://www.staging.apotheka.ee/MMadmin/customer/index/edit/id/" +
        getCustomerID
    );
    await this.page.waitForSelector(".admin__page-nav");
    const getCustomerName = await this.page.getText("h1.page-title");
    expect(getCustomerName).to.include("MARY ÄNN O’CONNEŽ-ŠUSLIK TESTNUMBER");
    await this.page.clickHelp("#tab_block_customer_alpi_tab_view");
    await this.page.waitForSelector("[for='alpi_id'] span");
    const alpi = await this.page.$("#alpi_id");
    const getAlpiId = await alpi.getProperty("value");
    return getAlpiId._remoteObject.value;
  }
  //
  async getSubscriptionValue(valueXPath) {
    //await this.page.goto(subscription_page);
    const [checkboxApotheka] = await this.page.$x(valueXPath);
    const checkbox = await checkboxApotheka.getProperty("checked");
    const checkboxValue = await checkbox.jsonValue();
    return checkboxValue;
  }
  //delete Customer when you are logged in
  async deleteCustomerFromMagento(backend_url) {
    await this.page.goto(backend_url, { waitUntil: "networkidle0" });
    const customerDetailsUrl = await this.page.getHref(
      ".item-customer-manage.level-1 a"
    );
    await this.page.goto(customerDetailsUrl[0]);
    const getCustomerID = await this.page.getText(
      "tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content"
    );
    await this.page.goto(
      "https://www.staging.apotheka.ee/MMadmin/customer/index/edit/id/" +
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
  async deleteCustomerFromMagentoLoggedOut(backend_url, username, password) {
    await this.page.goto(backend_url, { waitUntil: "networkidle0" });
    await this.page.waitAndClick("#username");
    await this.page.waitAndType("#username", username);
    await this.page.waitAndClick("#login");
    await this.page.waitAndType("#login", password);
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
      "https://www.staging.apotheka.ee/MMadmin/customer/index/edit/id/" +
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
  async deleteCustomerFromAlpi() {
    await this.page.goto("https://testcard.apotheka.ee/");
    await this.page.waitAndClick("input[name='user']");
    await this.page.waitAndType("input[name='user']", "upitech");
    await this.page.waitAndClick("input[name='pass']");
    await this.page.waitAndType("input[name='pass']", "TCG8UpAzw");
    await this.page.waitAndClick("[type='submit']");
    await this.page.waitAndClick("a[title='Kaardid']");
    await this.page.waitForSelector("#field");
    await this.page.select("#field", "Personal_code");
    await this.page.waitAndClick("input#otsi");
    await this.page.waitAndType("input#otsi", "60001018800");
    await this.page.waitAndClick("input[value='Otsi']");
    await this.page.waitAndClick(".dropCard");
    await this.page.waitForSelector(".ui-dialog-buttonset");
    await this.page.keyboard.press("Enter");
    await this.page.keyboard.press("Enter");
  }
}
