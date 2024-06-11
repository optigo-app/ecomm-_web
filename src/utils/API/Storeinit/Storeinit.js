

import axios from 'axios';

export const Storeinit = async (param) => {

  const APIURL = 'https://api.optigoapps.com/storev26/store.aspx';

  const header = {
    Authorization: 'Bearer optigo_json_api',
    domain: (window.location.hostname === 'localhost' || window.location.hostname === 'zen') && param === "astore" ? 'astore.orail.co.in' : window.location.hostname,
    version: 'Live',
    sp: "1"
  };

  let response

  try {
    const body = {
      "con": "{\"id\":\"\",\"mode\":\"store_init\"}",
      "p": "",
      "f": "formname (init)",
    };
     response = await axios.post(APIURL, body, { headers: header });
    if (response.status === 200) {
      localStorage.setItem('storeInit', JSON.stringify(response.data.Data.rd[0]));
      localStorage.setItem('myAccountFlags', JSON.stringify(response.data.Data.rd1));
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return response;
};
