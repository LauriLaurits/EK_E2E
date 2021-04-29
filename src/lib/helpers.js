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

export async function createEmail() {
    const options = {
        method: 'GET',
        url: 'https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/7eefafbf9f8dcad126e63b2d8b2bd214/',
        headers: {
          'x-rapidapi-key': '981b37a432mshd6d35f4ee5bdb3cp1fe56bjsne8c0169b1d5a',
          'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com'
        }
      };

      let res = await axios(options);
      let dataLength = res.data.length;
      //console.log(res.data);
      return res.data[dataLength-1].mail_text;
      /* let res = axios.request(options).then(function (response) {
      return res.data[0].mail_text;

      }).catch(function (error) {
          console.error(error);
      }); */
};
