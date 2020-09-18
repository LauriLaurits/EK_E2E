'use strict';

const constants = {
  formCredentials: {
    personalCode: "39010102711",
    message: "Testinfo Kullerile",
    email: "lauri@upitech.ee",
    firstName: "Lauri",
    lastName: "Laurits",
    phoneNumber: "55555555",
    county: "Harjumaa",
    city: "Tartu",
    aadress: "Tamme 18",
    zipCode: "11318"
  },
  selectors: {
    underAge: ".checkbox-with-label:nth-of-type(1) .checkbox-with-label-label",
    onlyContact: ".checkbox-with-label:nth-of-type(2) .checkbox-with-label-label",
    personalCode: ".control-input-input",
    message: ".control-textarea-textarea",
    submitFirst: ".button-inner .text",
    email: ".layout-form-column:nth-of-type(1) [type]",
    firstName: ".layout-form-column:nth-of-type(2) .form-row:nth-of-type(1) [type]",
    lastName: ".layout-form-has-columns .form-row:nth-of-type(2) [type]",
    phoneNumber: ".form-row:nth-of-type(3) [type]",
    //duplikaat emailiga
    //county: ".layout-form-column:nth-of-type(1) [type]",
    city: ".form-row:nth-of-type(6) [type]",
    aadress: ".form-row:nth-of-type(7) [type]",
    zipCode: ".form-row:nth-of-type(8) [type]",
    submitSecond: "#checkout-root > div > div.frame-checkout-content > div > div > div > div > div.layout-sidebar-primary > ul > li.list-progress-item.current.ListProgressItem-item-0-2-5 > div.list-progress-item-content.ListProgressItem-content-0-2-4 > div > ul > li"
  },
  unSusubscribe: {
    backendUrl: "https://www.staging.apotheka.ee/MMadmin/",
    magentoBackendUsername: "lauri@upitech.ee",
    magentoBackendPassword: "Kutsikas12345.",
    unSubscribeUrl: "https://staging-sas.upitech.ee/#/unsubscribe?email=pimogam614@synevde.com&alpiCustomerId=",
    sSubscribeBlock: ".box-newsletter",
    subscribePage: "https://www.staging.apotheka.ee/newsletter/manage/",
    sSubscribeApo: "/html//input[@id='subscription[ApothekaEE]']",
    sSubscribePet: "/html//input[@id='subscription[PetCityEE]']",
    sSubscribeBeauty: "/html//input[@id='subscription[BeautyEE]']",
    sUnsubscribeBlock: ".layout-unsubscribe.ng-scope",
    sUnsubscribeButton: ".btn.ng-binding.primary"
  }
  
};

module.exports= Object.freeze(constants);