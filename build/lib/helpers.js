'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makePostRequest = makePostRequest;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
} //Helper Functions