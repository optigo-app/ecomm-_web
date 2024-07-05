import { CommonAPI } from "../CommonAPI/CommonAPI"


export const LookBookAPI = async(MenuParams,visiterId) =>{

    let storeinit = JSON.parse(localStorage.getItem("storeInit"))
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))
    // let menuparams = JSON.parse(localStorage.getItem("menuparams"))
    // let userEmail = localStorage.getItem("registerEmail")

    const islogin = JSON.parse(localStorage.getItem("LoginUser")) ?? false;

    const customerId = storeinit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo.id ?? 0;
    const customerEmail = storeinit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo.email1 ?? "";


    const data = {
        "PackageId":`${loginInfo?.PackageId ?? storeinit?.PackageId}`,
        "autocode":"",
        "FrontEnd_RegNo":`${storeinit?.FrontEnd_RegNo}`,
        "Customerid":`${customerId ?? 0}`,
        "FilterKey":`${MenuParams?.FilterKey ?? ""}`,
        "FilterVal":`${MenuParams?.FilterVal ?? ""}`,
        "FilterKey1":`${MenuParams?.FilterKey1 ?? ""}`,
        "FilterVal1":`${MenuParams?.FilterVal1 ?? ""}`,
        "FilterKey2":`${MenuParams?.FilterKey2 ?? ""}`,
        "FilterVal2":`${MenuParams?.FilterVal2 ?? ""}`,
      }
      let encData =  btoa(JSON.stringify(data))

      let body = {
        "con":`{\"id\":\"\",\"mode\":\"GETFILTERLIST\",\"appuserid\":\"${customerEmail ?? ""}\"}`,
        "f":"onClickofMenuList (GETFILTERLIST)",
        "dp":JSON.stringify(data),
        "p":encData
      }

      let finalfilterData

        await CommonAPI(body).then((res) => {
            if(res){
                // console.log("res",res);
                localStorage.setItem("AllFilter",JSON.stringify(res?.Data?.rd));
                finalfilterData = res?.Data?.rd
            }
        })
    return finalfilterData
}