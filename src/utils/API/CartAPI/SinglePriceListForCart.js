import { CommonAPI } from "../CommonAPI/CommonAPI";

export const GetSinglePriceListApi = async (item) => {

  console.log("prodInfo",item);

  const storeInit = JSON.parse(localStorage.getItem("storeInit"))
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"))
  const islogin = JSON.parse(localStorage.getItem("LoginUser"))
  const UserEmail = localStorage.getItem("registerEmail")


  
  
  // let encodedFilter = {
  //   "DesignNo":item?.designno,
  //   "FilterKey":"",
  //   "FilterVal":"",
  //   "PageNo":"",
  //   "PageSize":"",
  //   "Metalid":"",
  //   "DiaQCid":"",
  //   "CsQCid":"",
  //   "IsFromDesDet":"1"
  // }

  const GetPriceReq = {
    "CurrencyRate": `${storeInit?.CurrencyRate}`,
    "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
    "Customerid": `${loginUserDetail?.id ?? 0}`,
    "Laboursetid": `${(storeInit?.IsB2BWebsite == 0 && (islogin == false)) ? storeInit?.pricemanagement_laboursetid : loginUserDetail?.pricemanagement_laboursetid}`,
    "diamondpricelistname": `${(storeInit?.IsB2BWebsite == 0 && (islogin == false))  ? storeInit?.diamondpricelistname : loginUserDetail?.diamondpricelistname}`,
    "colorstonepricelistname": `${(storeInit?.IsB2BWebsite == 0 && (islogin == false)) ? storeInit?.colorstonepricelistname : loginUserDetail?.colorstonepricelistname}`,
    "SettingPriceUniqueNo": `${(storeInit?.IsB2BWebsite == 0 && (islogin == false)) ? storeInit?.SettingPriceUniqueNo : loginUserDetail?.SettingPriceUniqueNo}`,
    "designno":item?.designno,
    "FilterKey":"",
    "FilterVal":"",
    "PageNo":"",
    "PageSize":"",
    "Metalid":"",
    "DiaQCid":"",
    "CsQCid":"",
    "IsFromDesDet":"1"
  }

  const encodedCombinedValue = btoa(JSON.stringify(GetPriceReq));

  let body = {
    "con": `{\"id\":\"Store\",\"mode\":\"getdesignpricelist\",\"appuserid\":\"${UserEmail}\"}`,
    "f": "cartPagePriceApi (fullProdInfo)",
    "p": encodedCombinedValue,
    "dp":JSON.stringify(GetPriceReq)
  }

  let finalData;

  await CommonAPI(body).then((res) => {
    localStorage.setItem("fullProdInfo", JSON.stringify(res?.Data))
    finalData = res?.Data 
  })

  console.log('finaldataa',finalData);

  return finalData

}