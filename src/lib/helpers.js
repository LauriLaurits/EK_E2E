//Helper Functions
import axios from 'axios';
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
}
