"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomePage = function () {
    function HomePage(page) {
        _classCallCheck(this, HomePage);

        this.page = page;
    }

    _createClass(HomePage, [{
        key: "visit",
        value: async function visit(siteUrl) {
            await this.page.goto(siteUrl, { waitUntil: 'networkidle0' });
            await this.page.waitForSelector(".primary-menu");
            await this.page.waitForSelector("#registration_link");
        }
    }, {
        key: "navigation",
        value: async function navigation() {
            await this.page.waitForSelector(".primary-menu");
        }
    }]);

    return HomePage;
}();

exports.default = HomePage;