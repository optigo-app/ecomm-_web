
const storeInit = JSON.parse(localStorage.getItem("storeInit"));

const config = {
    di: 'orail24', //`${storeInit?.ufcc}`, //storeinit.ufcc
    // En_ufcc: 'orail24',
    // En_UI: '15864',
    // En_UN: 'shreon prakash',
    // En_UC: 'shreon',
    // En_IMP: 'http://nzen/R50B3/UFS/ufs2/orail228FT0OWNGEI6DC3BVS//CustomerImages/',
    address: `${storeInit?.Socket_Address}`, //storeinit.soket_address
    SoPath: `${storeInit?.Socket_Path}` //storeini.soket_path
    // iTaskCallBackURL: ''
  };
  
  export default config;