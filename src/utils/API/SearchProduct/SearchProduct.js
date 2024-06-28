import { CommonAPI } from "../CommonAPI/CommonAPI";


export const SearchProduct = async(searchVar) => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));
  
      const data = {
          PackageId: `${loginInfo?.PackageId }`,
          FrontEnd_RegNo: `${storeinit?.FrontEnd_RegNo}`,
          Customerid: `${loginInfo?.id}`,
          SearchKey:`${searchVar}`
        };
      
        let encData = JSON.stringify(data)
      
        let body = {
          con: `{\"id\":\"\",\"mode\":\"GETPRODUCTLIST\",\"appuserid\":\"${loginInfo?.userid ?? ""}\"}`,
          f: "(searchProduct)",
          p:btoa(encData),
          dp: encData,
        };
      
        let pdList = [];
        let pdResp = [];
      
        await CommonAPI(body).then((res) => {
          if(res){
            pdList=res?.Data.rd;
            pdResp=res?.Data
          }
        });
      
        return {pdList,pdResp}
}

