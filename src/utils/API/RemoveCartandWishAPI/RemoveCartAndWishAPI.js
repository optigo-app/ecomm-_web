import { CommonAPI } from "../CommonAPI/CommonAPI";

export const RemoveCartAndWishAPI = async(type,autocode) => {

    const UserEmail = localStorage.getItem("registerEmail");
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));

  let removeApiObj = {
    "ForEvt": `${type}`,
    "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
    "Customerid": `${loginUserDetail?.id ?? 0}`,
    "autocode": `${autocode}`,
    "Cartidlist": "",
    "isdelete_all": 0,
        
  };

  let body = {
    con: `{\"id\":\"Store\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${UserEmail}\"}`,
    f: " (removeFromCartList)",
    p: btoa(removeApiObj),
    dp: JSON.stringify(removeApiObj),
  };

  let cartAndWishResp;
    await CommonAPI(body).then((res) => {
        cartAndWishResp =  res;
    });

    return cartAndWishResp;
};

// {
//     "ForEvt": "Cart",
//     "FrontEnd_RegNo": "80kgizbiduw5e7gg",
//     "Customerid": 17286,
//     "autocode": "00125873",
//     "Cartidlist": "",
//     "isdelete_all": 0
// }
