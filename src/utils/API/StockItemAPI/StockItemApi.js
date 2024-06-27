import { CommonAPI } from "../CommonAPI/CommonAPI";

export const StockItemApi = async(ac,type) => {
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));

    let data = {
        FrontEnd_RegNo: `${storeinit?.FrontEnd_RegNo}`,
        Customerid: `${loginInfo?.id}`,
        autocode: `${ac}`
    }

    let encData = JSON.stringify(data)

    let body = {
        con: `{\"id\":\"\",\"mode\":\"${type === "stockitem" ? "GETStockItem" : "GETSimilar"}\",\"appuserid\":\"${loginInfo?.userid ?? ""}\"}`,
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
