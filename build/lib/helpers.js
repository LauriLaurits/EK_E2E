'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makePostRequest = makePostRequest;
exports.makeGetRequest = makeGetRequest;

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