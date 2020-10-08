import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../lib/builder";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

let constants = require("../lib/constants/constants");
let alpi = require("../lib/constants/alpiConst");

const { makePostRequest } = require('../lib/helpers');

describe("NEWSLETTER SUBSCRIBE/UNSUBSCRIBE TEST", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
  });
  
  after(async () => {
    //Close Browser
    await page.close();
  });
  

  describe("Test Describe  ", () => {
   /*  step("Test", async () => {
        await loginPage.checkAndDeleteAlpi("38610102716");
    }); */
    /* step("Test NewCustomer", async () => {
        await loginPage.newCustomer();
    }); */
    step("Test Magento", async ()=> {
        await loginPage.checkAndDeleteMagento(constants.unSusubscribe.backendUrl, constants.unSusubscribe.mbUsername, constants.unSusubscribe.mbPassword);
        //await loginPage.deleteCustomerFromMagentoLoggedOut(constants.unSusubscribe.backendUrl, constants.unSusubscribe.mbUsername, constants.unSusubscribe.mbPassword);

    })
    });
});
   
 
