//Includes settings and helper functions
import puppeteer from "puppeteer";

export default class Builder {
  static async build(viewport) {
    const launchOptions = {
     // product: 'firefox',
      headless: false,
      slowMo: 0,
      args: [
        "--no-sandbox",
        "--disable-setui-sandbox",
        "--disable-web-security",
        "--start-maximized",
      ],
    };
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    const extendedPage = new Builder(page);
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000)
    //Diffrent ViewPorts
    switch (viewport) {
      case "Mobile":
        const mobileViewport = puppeteer.devices["iPhone X"];
        await page.emulate(mobileViewport);
        break;
      case "Tablet":
        const tabletViewport = puppeteer.devices["iPad landscape"];
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
      get: function (_target, property) {
        return extendedPage[property] || browser[property] || page[property];
      },
    });
  }
  constructor(page) {
    this.page = page;
  }
  //waits for element to appear and clicks on it
  async waitAndClick(selector) {
    await this.page.waitForSelector(selector);
    try {
      //await this.page.evaluate((selector) => document.querySelector(selector).click(), selector);
      await this.page.click(selector);
    } catch (error) {
    console.log("Error clicking " + selector + " : " + error );
  }
  }
  // waits for element and clicks 2 times
  async waitAndClickTwo(selector) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector, { clickCount: 2 });
  }
  //waits for element to appear and types into it
  async waitAndType(selector, text) {
    await this.page.waitForSelector(selector);
    await this.page.type(selector, text);
  }
  //gets text for selector
  async getText(selector) {
    await this.page.waitForSelector(selector);
    const text = await this.page.$eval(selector, (e) => e.innerHTML);
    return text;
  }
  //returns number on selectors on page
  async getCount(selector) {
    await this.page.waitForSelector(selector);
    const count = await this.page.$$eval(selector, (items) => items.length);
    return count;
  }
  //waits for xpath to appear and clicks on it use only if selecors isnt available
  async waitForXPathAndClick(xpath) {
    await this.page.waitForXPath(xpath);
    const elements = await this.page.$x(xpath);
    if (elements.length > 1) {
      console.warn("waitForXPathAndClick returned more than one result");
    }
    await elements[0].click();
  }
  //returns visibility of selector
  async isElementVisible(selector) {
    let visible = true;
    await this.page
      .waitForSelector(selector, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false;
      });
    return visible;
  }
  //returns visibility of xpath
  async isXpathVisible(selector) {
    let visible = true;
    await this.page
      .waitForXpath(selector, { visible: true, timeout: 3000 })
      .catch(() => {
        visible = false;
      });
    return visible;
  }
  //returns link
  async getHref(selector) {
    return await this.page.$$eval(selector, anchors => [].map.call(anchors, a => a.href));
  }
  //helper function for click()
  async clickHelp(selector) {
    await this.page.waitForSelector(selector);
    try {
      await this.page.evaluate((selector) => document.querySelector(selector).click(), selector);
    } catch (error) {
    console.log("Error clicking " + selector + " : " + error );
  }
  }
  //wait for element to have a certain value
  async waitForValue(selector, value) {
    await this.page.waitForFunction(document.getElementById(selector).value != value);
    return true;
  }
  async detectUrl(message) {
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    //const response = JSON.parse(JSON.stringify(message));
    return message.match(urlRegex);
    //return ;
  }
}
