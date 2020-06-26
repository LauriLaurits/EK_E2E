"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _puppeteer = require("puppeteer");

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = function () {
  _createClass(Builder, null, [{
    key: "build",
    value: async function build(viewport) {
      var launchOptions = {
        headless: true,
        slowMo: 0,
        args: ["--no-sandbox", "--disable-setui-sandbox", "--disable-web-security"]
      };
      var browser = await _puppeteer2.default.launch(launchOptions);
      var page = await browser.newPage();
      var extendedPage = new Builder(page);
      await page.setDefaultTimeout(10000);
      //Diffrent ViewPorts
      switch (viewport) {
        case "Mobile":
          var mobileViewport = _puppeteer2.default.devices["iPhone X"];
          await page.emulate(mobileViewport);
          break;
        case "Tablet":
          var tabletViewport = _puppeteer2.default.devices["iPad landscape"];
          await page.emulate(tabletViewport);
          break;
        case "Desktop":
          await page.setViewport({ width: 800, height: 600 });
          break;
        default:
          throw new Error("Supported devices are only Mobile | Tablet | Desktop");
      }

      return new Proxy(extendedPage, {
        get: function get(_target, property) {
          return extendedPage[property] || browser[property] || page[property];
        }
      });
    }
  }]);

  function Builder(page) {
    _classCallCheck(this, Builder);

    this.page = page;
  }

  return Builder;
}();

exports.default = Builder;