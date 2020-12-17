"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chai = require("chai");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../lib/config');

var LoginPage = function () {
  function LoginPage(page) {
    _classCallCheck(this, LoginPage);

    this.page = page;
  }
  //TODO if newcustomer is already customer how to continue


  _createClass(LoginPage, [{
    key: "newCustomer",
    value: async function newCustomer(personalCode, phoneNumber, email) {
      await this.page.goto(config.baseUrl);
      await this.page.waitAndClick("#registration_link");
      await this.page.waitForSelector("#horizontal_tabs");
      await this.page.waitAndClick("div#login-mobile-id > .fieldset input[name='personalcode']");
      await this.page.waitAndType("div#login-mobile-id > .fieldset input[name='personalcode']", personalCode);
      await this.page.waitAndClick("#mobile-id-input");
      await this.page.waitAndType("#mobile-id-input", phoneNumber);
      await this.page.click("#mobileid-submit");
      await this.page.isElementVisible("#mobileid-verification");
      (0, _chai.expect)((await this.page.isElementVisible("#mobileid-verification"))).to.be.true;
      await this.page.waitForSelector(".create.fieldset.info");
      await this.page.waitAndClick("#email_address");
      await this.page.waitAndType("#email_address", email);
      await this.page.waitAndClick(".create.fieldset.info input#telephone");
      await this.page.waitAndType(".create.fieldset.info input#telephone", phoneNumber);
      await this.page.waitAndClick("#terms");
      await this.page.waitAndClick("#is_subscribed");
      await this.page.waitAndClick("#submit");
      await this.page.waitForSelector(".authorization-link.logged-in");
    }
    //Login with Mobile ID TODO add PersonalCode

  }, {
    key: "loginMobileID",
    value: async function loginMobileID(personalCode, phoneNumber) {
      await this.page.goto(config.baseUrl);
      await this.page.waitAndClick("#registration_link");
      await this.page.waitForSelector("#horizontal_tabs");
      await this.page.waitAndClick("div#mobileid-login > .fieldset input[name='personalcode']");
      await this.page.waitAndType("div#mobileid-login > .fieldset input[name='personalcode']", personalCode);
      await this.page.waitAndClick("#mobile-id-input");
      await this.page.waitAndType("#mobile-id-input", phoneNumber);
      await this.page.click("#mobileid-submit");
      await this.page.isElementVisible("#mobileid-verification");
      (0, _chai.expect)((await this.page.isElementVisible("#mobileid-verification"))).to.be.true;
      await this.page.waitForSelector(".authorization-link.logged-in");
    }
  }, {
    key: "loginSmartID",
    value: async function loginSmartID(smartId) {
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

  }, {
    key: "getAlpiID",
    value: async function getAlpiID(userName, passWord) {
      await this.page.goto(config.backendUrl, { waitUntil: "networkidle0" });
      await this.page.waitAndClick("#username");
      await this.page.waitAndType("#username", userName);
      await this.page.waitAndClick("#login");
      await this.page.waitAndType("#login", passWord);
      await this.page.waitAndClick(".action-primary");
      await this.page.waitAndClick(".action-close");

      var customerDetailsUrl = await this.page.getHref(".item-customer-manage.level-1 a");
      await this.page.goto(customerDetailsUrl[0]);

      var getCustomerID = await this.page.getText("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
      await this.page.goto(config.backendUrl + "/customer/index/edit/id/" + getCustomerID);
      await this.page.waitForSelector(".admin__page-nav");
      var getCustomerName = await this.page.getText("h1.page-title");
      (0, _chai.expect)(getCustomerName).to.include("MARY ÄNN O’CONNEŽ-ŠUSLIK TESTNUMBER");
      await this.page.clickHelp("#tab_block_customer_alpi_tab_view");
      await this.page.waitForSelector("[for='alpi_id'] span");
      var alpi = await this.page.$("#alpi_id");
      var getAlpiId = await alpi.getProperty("value");
      return getAlpiId._remoteObject.value;
    }
    //Get subscription value

  }, {
    key: "getSubscriptionValue",
    value: async function getSubscriptionValue(valueXpath) {
      //await this.page.goto(subscription_page);
      var _ref = await this.page.$x(valueXpath),
          _ref2 = _slicedToArray(_ref, 1),
          checkboxApotheka = _ref2[0];

      var checkbox = await checkboxApotheka.getProperty("checked");
      var checkboxValue = await checkbox.jsonValue();
      return checkboxValue;
    }
    //delete Customer when you are logged in

  }, {
    key: "deleteCustomerFromMagento",
    value: async function deleteCustomerFromMagento() {
      await this.page.goto(config.backendUrl, { waitUntil: "networkidle0" });
      var customerDetailsUrl = await this.page.getHref(".item-customer-manage.level-1 a");
      await this.page.goto(customerDetailsUrl[0]);
      var getCustomerID = await this.page.getText("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
      await this.page.goto(config.backendUrl + "/customer/index/edit/id/" + getCustomerID);
      await this.page.waitForSelector(".admin__page-nav");
      await this.page.clickHelp("#customer-edit-delete-button");
      //await this.page.waitForSelector("aside:nth-of-type(1)  .modal-header");
      await this.page.waitFor(200);
      await this.page.clickHelp(".action-accept.action-primary");

      var deleteMessage = await this.page.getText(".message.message-success.success");
      (0, _chai.expect)(deleteMessage).to.include("You deleted the customer.");
    }
    //delete Customer when you are logged in

  }, {
    key: "deleteCustomerFromMagentoLoggedOut",
    value: async function deleteCustomerFromMagentoLoggedOut(userName, passWord) {
      await this.page.goto(config.backendUrl, { waitUntil: "networkidle0" });
      await this.page.waitAndClick("#username");
      await this.page.waitAndType("#username", userName);
      await this.page.waitAndClick("#login");
      await this.page.waitAndType("#login", passWord);
      await this.page.waitAndClick(".action-primary");
      await this.page.waitAndClick(".action-close");
      var customerDetailsUrl = await this.page.getHref(".item-customer-manage.level-1 a");
      await this.page.goto(customerDetailsUrl[0]);

      var getCustomerID = await this.page.getText("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
      await this.page.goto(config.backendUrl + "/customer/index/edit/id/" + getCustomerID);
      await this.page.waitForSelector(".admin__page-nav");
      await this.page.clickHelp("#customer-edit-delete-button");
      //await this.page.waitForSelector("aside:nth-of-type(1)  .modal-header");
      await this.page.waitFor(200);
      await this.page.clickHelp(".action-accept.action-primary");

      var deleteMessage = await this.page.getText(".message.message-success.success");
      (0, _chai.expect)(deleteMessage).to.include("You deleted the customer.");
    }
    //delete TestCustomer from ALPI

  }, {
    key: "deleteCustomerFromAlpi",
    value: async function deleteCustomerFromAlpi(userName, passWord, personalCode) {
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

  }, {
    key: "logOutMagento",
    value: async function logOutMagento() {
      await this.page.waitAndClick(".open-btn");
      await this.page.clickHelp(".signout");
      await this.page.waitForSelector(".customer-account-logoutsuccess");
    }
    //Login to Alpi check PersonalID and delete if you got a match

  }, {
    key: "checkAndDeleteAlpi",
    value: async function checkAndDeleteAlpi(userName, passWord, personalCode) {
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
      var client = await this.page.isElementVisible(".dropCard");
      if (client) {
        console.log("Test1 " + client);
        await this.page.waitAndClick(".dropCard");
        await this.page.waitForSelector(".ui-dialog-buttonset");
        await this.page.keyboard.press("Enter");
        await this.page.keyboard.press("Enter");
      } else {
        console.log("Test" + client);
        (0, _chai.expect)(client).to.be.false;
      }
    }
  }, {
    key: "checkAndDeleteMagento",
    value: async function checkAndDeleteMagento(userName, passWord, name) {
      await this.page.goto(config.backendUrl, { waitUntil: "networkidle0" });
      await this.page.waitAndClick("#username");
      await this.page.waitAndType("#username", userName);
      await this.page.waitAndClick("#login");
      await this.page.waitAndType("#login", passWord);
      var popup = await this.page.isElementVisible(".action-primary");
      if (popup) {
        await this.page.waitAndClick(".action-primary");
        await this.page.waitAndClick(".action-close");
      }
      var customerDetailsUrl = await this.page.getHref(".item-customer-manage.level-1 a");
      await this.page.goto(customerDetailsUrl[0], { waitUntil: "networkidle0" });
      var removeFilter = await this.page.isElementVisible(".action-remove");
      if (removeFilter) {
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
      var activeFilter = await this.page.isElementVisible("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
      if (activeFilter) {
        var getCustomerID = await this.page.getText("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
        var getUserName = await this.page.getText("td:nth-of-type(3) > .data-grid-cell-content");
        (0, _chai.expect)(getUserName).to.include(name);
        await this.page.goto(config.backendUrl + "/customer/index/edit/id/" + getCustomerID);
        await this.page.waitForSelector(".admin__page-nav");
        await this.page.clickHelp("#customer-edit-delete-button");
        //await this.page.waitForSelector("aside:nth-of-type(1)  .modal-header");
        await this.page.waitFor(200);
        await this.page.clickHelp(".action-accept.action-primary");

        var deleteMessage = await this.page.getText(".message.message-success.success");
        (0, _chai.expect)(deleteMessage).to.include("You deleted the customer.");
      }
      await this.page.waitFor(4000);
    }
  }, {
    key: "checkAndDeleteMagentoLoggedIn",
    value: async function checkAndDeleteMagentoLoggedIn(name) {
      await this.page.goto(config.backendUrl, { waitUntil: "networkidle0" });
      var popup = await this.page.isElementVisible(".action-primary");
      if (popup) {
        await this.page.waitAndClick(".action-primary");
        await this.page.waitAndClick(".action-close");
      }
      var customerDetailsUrl = await this.page.getHref(".item-customer-manage.level-1 a");
      await this.page.goto(customerDetailsUrl[0], { waitUntil: "networkidle0" });
      var removeFilter = await this.page.isElementVisible(".action-remove");
      if (removeFilter) {
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
      var activeFilter = await this.page.isElementVisible("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
      if (activeFilter) {
        var getCustomerID = await this.page.getText("tr:nth-of-type(2) > td:nth-of-type(2) > .data-grid-cell-content");
        var getUserName = await this.page.getText("td:nth-of-type(3) > .data-grid-cell-content");
        (0, _chai.expect)(getUserName).to.include(name);
        await this.page.goto(config.backendUrl + "/customer/index/edit/id/" + getCustomerID);
        await this.page.waitForSelector(".admin__page-nav");
        await this.page.clickHelp("#customer-edit-delete-button");
        //await this.page.waitForSelector("aside:nth-of-type(1)  .modal-header");
        await this.page.waitFor(200);
        await this.page.clickHelp(".action-accept.action-primary");

        var deleteMessage = await this.page.getText(".message.message-success.success");
        (0, _chai.expect)(deleteMessage).to.include("You deleted the customer.");
      }
    }
  }]);

  return LoginPage;
}();

exports.default = LoginPage;