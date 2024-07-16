import { CommonAPI } from "../CommonAPI/CommonAPI";

export const DesignSetListAPI = async(obj,dno,visiterId) =>{

  let storeinit = JSON.parse(localStorage.getItem("storeInit"));
  let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));

  const islogin = JSON.parse(localStorage.getItem("LoginUser")) ?? false;

  const customerId = storeinit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo.id ?? 0;
  const customerEmail = storeinit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo.userid ?? "";
  
  let data = {
    PackageId: `${loginInfo?.PackageId ?? storeinit?.PackageId}`,
    FrontEnd_RegNo: `${storeinit?.FrontEnd_RegNo}`,
    Customerid: `${customerId ?? 0}`,
    designno:`${dno}`,
    Metalid: `${obj?.mt == undefined ? (loginInfo?.MetalId ?? storeinit?.MetalId) : obj?.mt}`,
    DiaQCid: `${obj?.diaQc == undefined ? (loginInfo?.cmboDiaQCid ?? storeinit?.cmboDiaQCid) : obj?.diaQc}`,
    CsQCid: `${obj?.csQc == undefined ? (loginInfo?.cmboCSQCid ?? storeinit?.cmboCSQCid) : obj?.csQc}`,
    Laboursetid: `${
        storeinit?.IsB2BWebsite == 0 && islogin == false
          ? storeinit?.pricemanagement_laboursetid
          : loginInfo?.pricemanagement_laboursetid
      }`,
      diamondpricelistname: `${
        storeinit?.IsB2BWebsite == 0 && islogin == false
          ? storeinit?.diamondpricelistname
          : loginInfo?.diamondpricelistname
      }`,
      colorstonepricelistname: `${
        storeinit?.IsB2BWebsite == 0 && islogin == false
          ? storeinit?.colorstonepricelistname
          : loginInfo?.colorstonepricelistname
      }`,
      SettingPriceUniqueNo: `${
        storeinit?.IsB2BWebsite == 0 && islogin == false
          ? storeinit?.SettingPriceUniqueNo
          : loginInfo?.SettingPriceUniqueNo
      }`,
      IsStockWebsite: `${storeinit?.IsStockWebsite}`,
  }

  let encData = JSON.stringify(data)

  let body = {
    con: `{\"id\":\"\",\"mode\":\"GETDesignSet_List\",\"appuserid\":\"${customerEmail?? ""}\"}`,
    f: "onlocationKey (designsetList)",
    p:btoa(encData),
    dp: encData,
  }

  let resp = []
  
  await CommonAPI(body).then((res)=> {
    if(res){
        resp = res
    }
  })

  return resp

}

