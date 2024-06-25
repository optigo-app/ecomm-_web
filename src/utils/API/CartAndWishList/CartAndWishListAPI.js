import { CommonAPI } from "../CommonAPI/CommonAPI";

export const CartAndWishListAPI = async(type,obj) =>{

    const UserEmail = localStorage.getItem("registerEmail");
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));

    let FinalObj = {
        "ForEvt": `${type}`,
        "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
        "userid":`${UserEmail}`,
        "Customerid": `${loginUserDetail?.id ?? 0}`,
        "AddCartDetail":[obj]
    }


    let body = {
        con: `{\"id\":\"Store\",\"mode\":\"ADDTOCART\",\"appuserid\":\"${UserEmail}\"}`,
        f: "onloadFirstTime (getdesignpricelist)",
        p: btoa(FinalObj),
        dp: JSON.stringify(FinalObj),
      };

    

    let cartAndWishResp;
    await CommonAPI(body).then((res) => {
        cartAndWishResp =  res;
    });

    return cartAndWishResp;
}