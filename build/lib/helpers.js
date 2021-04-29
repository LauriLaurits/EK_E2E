'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makePostRequest = makePostRequest;
exports.makeGetRequest = makeGetRequest;
exports.createEmail = createEmail;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Helper Functions
async function makePostRequest(requestUrl, personalCode) {
    var config = {
        method: 'post',
        url: requestUrl,
        headers: { 'Authorization': 'Bearer:ygzo1XhYD582FMIrSPCEPQ' },
        data: {
            personal_code: personalCode
        }
    };
    var res = await (0, _axios2.default)(config);
    return res.data.client_data;
};

async function makeGetRequest(requestUrl, productCode) {
    var config = {
        method: 'get',
        url: requestUrl + productCode + "&filter[in_stock]=all",
        headers: { 'Authorization': 'Bearer:ygzo1XhYD582FMIrSPCEPQ' }
    };
    var res = await (0, _axios2.default)(config);
    return res.data;
};

async function createEmail() {
    var options = {
        method: 'GET',
        url: 'https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/7eefafbf9f8dcad126e63b2d8b2bd214/',
        headers: {
            'x-rapidapi-key': '981b37a432mshd6d35f4ee5bdb3cp1fe56bjsne8c0169b1d5a',
            'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com'
        }
    };

    var res = await (0, _axios2.default)(options);
    var dataLength = res.data.length;
    //console.log(res.data);
    return res.data[dataLength - 1].mail_text;
    /* let res = axios.request(options).then(function (response) {
    return res.data[0].mail_text;
      }).catch(function (error) {
        console.error(error);
    }); */
};