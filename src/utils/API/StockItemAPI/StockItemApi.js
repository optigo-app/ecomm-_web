import { CommonAPI } from "../CommonAPI/CommonAPI";

export const StockItemApi = async(ac,type) => {
    let storeInit = JSON.parse(localStorage.getItem("storeInit"));
    let loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    let islogin =  JSON.parse(localStorage.getItem("LoginUser"));
    

    let data = {
        FrontEnd_RegNo: `${storeInit?.FrontEnd_RegNo}`,
        autocode: `${ac ?? ""}`,
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
    }

    let encData = JSON.stringify(data)

    let body = {
        con: `{\"id\":\"\",\"mode\":\"${type === "stockitem" ? "GETStockItem" : "GETSimilar"}\",\"appuserid\":\"${loginUserDetail?.userid ?? ""}\"}`,
        f: "(singleProdList)",
        p:btoa(encData),
        dp: encData,
    };

    let resp;
    await CommonAPI(body).then((res) => {
    if(res){
         resp = res;
    }
    })
    return resp;
}
