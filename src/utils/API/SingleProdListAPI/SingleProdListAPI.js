import { CommonAPI } from "../CommonAPI/CommonAPI";

export const SingleProdListAPI = async(singprod) =>{

    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
  let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));

    const data = {
        PackageId: `${loginInfo?.PackageId }`,
        autocode: `${singprod?.a}`,
        FrontEnd_RegNo: `${storeinit?.FrontEnd_RegNo}`,
        Customerid: `${loginInfo?.id}`,
        designno: `${singprod?.b}`,
        IsFromDesDet:1
      };
    
      let encData = JSON.stringify(data)
    
      let body = {
        con: `{\"id\":\"\",\"mode\":\"GETPRODUCTLIST\",\"appuserid\":\"${loginInfo?.userid ?? ""}\"}`,
        f: "(singleProdList)",
        p:btoa(encData),
        dp: encData,
      };
    
      let pdList = [];
      let pdResp = [];
    
      await CommonAPI(body).then((res) => {
        if(res){
          // let pdData = res?.Data.rd;
          pdList=res?.Data.rd;
          pdResp=res?.Data
        }
      });
    
      return {pdList,pdResp}
}