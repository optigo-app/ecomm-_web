import { CommonAPI } from "../CommonAPI/CommonAPI"


export const FilterListAPI = async() =>{

    let storeinit = JSON.parse(localStorage.getItem("storeInit"))
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))
    let menuparams = JSON.parse(localStorage.getItem("menuparams"))
    let userEmail = localStorage.getItem("registerEmail")

    const data = {
        "PackageId":`${loginInfo?.PackageId}`,
        "autocode":"",
        "FrontEnd_RegNo":`${storeinit?.FrontEnd_RegNo}`,
        "Customerid":`${loginInfo?.id}`,
        "FilterKey":`${menuparams?.FilterKey ?? ""}`,
        "FilterVal":`${menuparams?.FilterVal ?? ""}`,
        "FilterKey1":`${menuparams?.FilterKey1 ?? ""}`,
        "FilterVal1":`${menuparams?.FilterVal1 ?? ""}`,
        "FilterKey2":`${menuparams?.FilterKey2 ?? ""}`,
        "FilterVal2":`${menuparams?.FilterVal2 ?? ""}`,
      }
      let encData =  btoa(JSON.stringify(data))

      let body = {
        "con":`{\"id\":\"\",\"mode\":\"GETFILTERLIST\",\"appuserid\":\"${userEmail}\"}`,
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