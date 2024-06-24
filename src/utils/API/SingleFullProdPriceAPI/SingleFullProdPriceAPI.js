import { CommonAPI } from "../CommonAPI/CommonAPI";

export const SingleFullProdPriceAPI = async(obj,autocode) => {
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    const param = JSON.parse(localStorage.getItem("menuparams"));
    const islogin = JSON.parse(localStorage.getItem("LoginUser"));
    const UserEmail = localStorage.getItem("registerEmail");

    const GetPriceReq = {
        CurrencyRate: `${storeInit?.CurrencyRate}`,
        FrontEnd_RegNo: `${storeInit?.FrontEnd_RegNo}`,
        Customerid: `${loginUserDetail?.id ?? 0}`,
        Laboursetid: `${
          storeInit?.IsB2BWebsite == 0 && islogin == false
            ? storeInit?.pricemanagement_laboursetid
            : loginUserDetail?.pricemanagement_laboursetid
        }`,
        diamondpricelistname: `${
          storeInit?.IsB2BWebsite == 0 && islogin == false
            ? storeInit?.diamondpricelistname
            : loginUserDetail?.diamondpricelistname
        }`,
        colorstonepricelistname: `${
          storeInit?.IsB2BWebsite == 0 && islogin == false
            ? storeInit?.colorstonepricelistname
            : loginUserDetail?.colorstonepricelistname
        }`,
        SettingPriceUniqueNo: `${
          storeInit?.IsB2BWebsite == 0 && islogin == false
            ? storeInit?.SettingPriceUniqueNo
            : loginUserDetail?.SettingPriceUniqueNo
        }`,
        designno:`${obj?.b}`,
        IsFromDesDet: 1,
        AutoCodeList: `${obj?.a}`,
      };
    
      const encodedCombinedValue = btoa(JSON.stringify(GetPriceReq));
    
      let body = {
        con: `{\"id\":\"Store\",\"mode\":\"getdesignpricelist\",\"appuserid\":\"${UserEmail}\"}`,
        f: "onloadFirstTime (getdesignpricelist)",
        p: encodedCombinedValue,
        dp: JSON.stringify(GetPriceReq),
      };
    
      let PriceApiData;
    
      await CommonAPI(body).then((res) => {
        PriceApiData = res?.Data;
      });
    
      return PriceApiData;
}