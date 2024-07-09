

import axios from 'axios';

export const Storeinit = async (param) => {

  // const APIURL = 'https://api.optigoapps.com/storev26/store.aspx';

  const APIURL = (window.location.hostname === 'localhost' || window.location.hostname === 'zen' || window.location.hostname === 'fgstore.web' || window.location.hostname === 'fgstore.mapp' || window.location.hostname === 'fgstore.pro' || window.location.hostname === 'fgstore.plw') ? 'http://zen/api/ReactStore.aspx' : 'https://api.optigoapps.com/test/ReactStore.aspx';
  // const APIURL = (window.location.hostname === 'localhost' || window.location.hostname === 'zen') ? 'http://zen/api/ReactStore.aspx' : 'https://api.optigoapps.com/storev26/ReactStore.aspx';
  // const APIURL = 'http://zen/api/ReactStore.aspx'

  console.log('eeeeeeeee',window.location);
  
  const header = {
    Authorization: 'Bearer optigo_json_api',
    domain: (window.location.hostname === 'localhost' || window.location.hostname === 'zen') ? 'demostore' : window.location.hostname,
    // domain: (window.location.hostname === 'localhost' || window.location.hostname === 'zen') ? 'developerstore' : window.location.hostname,
    // domain: (window.location.hostname === 'localhost' || window.location.hostname === 'zen') && param === "astore" ? 'astore.orail.co.in' : window.location.hostname,
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

  } catch (error) {
    console.error('Error:', error);
  }

  return response;
};
