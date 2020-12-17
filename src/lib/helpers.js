//Helper Functions
import axios from 'axios';
import config from './config';

export async function makePostRequest(requestUrl, personalCode) {
    const config = {
        method: 'post',
        url: requestUrl,
        headers: { 'Authorization': 'Bearer:ygzo1XhYD582FMIrSPCEPQ' },
        data: {
            personal_code: personalCode
        }
    };
    let res = await axios(config);
    return res.data.client_data;
};

export async function makeGetRequest(requestUrl,productCode) {
    const config = {
        method: 'get',
        url: requestUrl + productCode + "&filter[in_stock]=all",
        headers: { 'Authorization': 'Bearer:ygzo1XhYD582FMIrSPCEPQ' }
    };
    let res = await axios(config);
    return res.data;
};
