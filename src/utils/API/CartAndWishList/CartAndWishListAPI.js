import { CommonAPI } from "../CommonAPI/CommonAPI";

export const CartAndWishListAPI = async(type,obj,visiterId) =>{

    const islogin = JSON.parse(localStorage.getItem("LoginUser")) ??  false;
    const UserEmail = localStorage.getItem("registerEmail");
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));

    const customerId = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginUserDetail.id ?? 0;
    const customerEmail = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginUserDetail.email1 ?? "";

    let FinalObj = {
        "ForEvt": `${type}`,
        "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
        "userid":`${customerEmail}`,
        "Customerid": `${customerId?? 0}`,
        "AddCartDetail":[obj]
    }


    let body = {
        con: `{\"id\":\"Store\",\"mode\":\"ADDTOCART\",\"appuserid\":\"${customerEmail}\"}`,
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