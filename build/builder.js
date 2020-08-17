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
        // product: 'firefox',
        headless: false,
        slowMo: 0,
        args: ["--no-sandbox", "--disable-setui-sandbox", "--disable-web-security", "--start-maximized"]
      };
      var browser = await _puppeteer2.default.launch(launchOptions);
      var page = await browser.newPage();
      var extendedPage = new Builder(page);
      page.setDefaultTimeout(20000);
      page.setDefaultNavigationTimeout(20000);
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
          //For max viewport according to window size const browser = await puppeteer.launch({defaultViewport: null}); 
          await page.setViewport({ width: 1920, height: 1080 });
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
  //waits for element to appear and clicks on it


  _createClass(Builder, [{
    key: "waitAndClick",
    value: async function waitAndClick(selector) {
      await this.page.waitForSelector(selector);
      await this.page.click(selector);
    }
    // waits for element and clicks 2 times

  }, {
    key: "waitAndClickTwo",
    value: async function waitAndClickTwo(selector) {
      await this.page.waitForSelector(selector);
      await this.page.click(selector, { clickCount: 2 });
    }
    //waits for element to appear and types into it

  }, {
    key: "waitAndType",
    value: async function waitAndType(selector, text) {
      await this.page.waitForSelector(selector);
      await this.page.type(selector, text);
    }
    //gets text for selector

  }, {
    key: "getText",
    value: async function getText(selector) {
      await this.page.waitForSelector(selector);
      var text = await this.page.$eval(selector, function (e) {
        return e.innerHTML;
      });
      return text;
    }
    //returns number on selectors on page

  }, {
    key: "getCount",
    value: async function getCount(selector) {
      await this.page.waitForSelector(selector);
      var count = await this.page.$$eval(selector, function (items) {
        return items.length;
      });
      return count;
    }
    //waits for xpath to appear and clicks on it use only if selecors isnt available

  }, {
    key: "waitForXpathClick",
    value: async function waitForXpathClick(xpath) {
      await this.page.waitForXpath(xpath);
      var elements = await this.page.$x(xpath);
      if (elements.length > 1) {
        console.warn("waitForXpathClick returned more than one result");
      }
      await element[0].click();
    }
    //returns visibility of selector

  }, {
    key: "isElementVisible",
    value: async function isElementVisible(selector) {
      var visible = true;
      await this.page.waitForSelector(selector, { visible: true, timeout: 3000 }).catch(function () {
        visible = false;
      });
      return visible;
    }
    //returns visibility of xpath

  }, {
    key: "isXpathVisible",
    value: async function isXpathVisible(selector) {
      var visible = true;
      await this.page.waitForXpath(selector, { visible: true, timeout: 3000 }).catch(function () {
        visible = false;
      });
      return visible;
    }
  }, {
    key: "getHref",
    value: async function getHref(selector) {
      return await this.page.$$eval(selector, function (anchors) {
        return [].map.call(anchors, function (a) {
          return a.href;
        });
      });
    }
  }]);

  return Builder;
}();

exports.default = Builder;