import { CommonAPI } from "../CommonAPI/CommonAPI"


export const FilterListAPI = async(mainData) =>{

    let storeinit = JSON.parse(localStorage.getItem("storeInit"))
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))
    let menuparams = JSON.parse(localStorage.getItem("menuparams"))
    let userEmail = localStorage.getItem("registerEmail")

    let MenuParams = {};
    let serachVar = ""

  if(Array.isArray(mainData)){
    if(mainData?.length > 0){
      Object.values(mainData[0]).forEach((ele,index)=>{
       let keyName = `FilterKey${index === 0 ? '' : index}`;
       MenuParams[keyName] = ele.replace(/%20/g, ' ')
      })
  
      Object.values(mainData[1]).forEach((ele,index)=>{
       let keyName = `FilterVal${index === 0 ? '' : index}`;
       MenuParams[keyName] = ele.replace(/%20/g, ' ')
      })
    }
   }else{
    if(mainData !== ""){
      if(mainData.split("=")[0] == "AlbumName"){
        MenuParams.FilterKey = mainData?.split("=")[0]
        MenuParams.FilterVal = mainData?.split("=")[1]
      }else if(mainData.split("=")[0] == "S"){
        serachVar = mainData.split("=")[1] 
      }else{
        MenuParams.FilterKey = mainData?.split("=")[1]
        MenuParams.FilterVal = mainData?.split("=")[1]
      }
    }
   }

    const data = {
        "PackageId":`${loginInfo?.PackageId}`,
        "autocode":"",
        "FrontEnd_RegNo":`${storeinit?.FrontEnd_RegNo}`,
        "Customerid":`${loginInfo?.id}`,
        "FilterKey":`${MenuParams?.FilterKey ?? ""}`,
        "FilterVal":`${MenuParams?.FilterVal ?? ""}`,
        "FilterKey1":`${MenuParams?.FilterKey1 ?? ""}`,
        "FilterVal1":`${MenuParams?.FilterVal1 ?? ""}`,
        "FilterKey2":`${MenuParams?.FilterKey2 ?? ""}`,
        "FilterVal2":`${MenuParams?.FilterVal2 ?? ""}`,
        SearchKey:`${serachVar ?? ""}`
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