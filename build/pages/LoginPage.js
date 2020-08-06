"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chai = require("chai");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginPage = function () {
    function LoginPage(page) {
        _classCallCheck(this, LoginPage);

        this.page = page;
    }

    _createClass(LoginPage, [{
        key: "newCustomer",
        value: async function newCustomer() {
            await this.page.goto("https:/staging.apotheka.ee");
            await this.page.waitAndClick("#registration_link");
            await this.page.waitForSelector("#horizontal_tabs");
            await this.page.waitAndClick("#mobile-id-input");
            await this.page.waitAndType("#mobile-id-input", "37200000566");
            await this.page.click("#mobileid-submit");
            await this.page.isElementVisible("#mobileid-verification");
            (0, _chai.expect)((await this.page.isElementVisible("#mobileid-verification"))).to.be.true;
            await this.page.waitForSelector(".create.fieldset.info");
            await this.page.waitAndClick("#email_address");
            await this.page.waitAndType("#email_address", "test@test.ee");
            await this.page.waitAndClick(".create.fieldset.info input#telephone");
            await this.page.waitAndType(".create.fieldset.info input#telephone", "56600000");
            await this.page.waitAndClick("#terms");
            await this.page.waitAndClick("#submit");
            await this.page.waitForSelector(".authorization-link.logged-in");

            /*await this.page.waitForSelector("#clientcard-popup");
            await this.page.waitAndClick("#terms_agreement");
            await this.page.waitAndClick(
              ".answer_yes.btn.new_clientcard_answer.primary"
            ); */
        }
    }, {
        key: "loginMobileID",
        value: async function loginMobileID(site_url, mobile_id) {
            await this.page.goto(site_url);
            await this.page.waitAndClick("#registration_link");
            await this.page.waitAndClick("#mobile-id-input");
            await this.page.waitAndType("#mobile-id-input", mobile_id);
            await this.page.waitAndClick("#mobileid-submit");
            await this.page.isElementVisible("#mobileid-verification");
            await this.page.waitForSelector(".authorization-link.logged-in");
        }
        // async loginSmartID(personal_code){}

    }]);

    return LoginPage;
}();

exports.default = LoginPage;