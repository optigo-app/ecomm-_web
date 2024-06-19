import { CommonAPI } from "../CommonAPI/CommonAPI";

export const removeFromCartList = async (data) => {
    try {
      const storeInit = JSON.parse(localStorage.getItem("storeInit")) || {};
      const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail")) || {};
      const { FrontEnd_RegNo } = storeInit;

      const combinedValue = JSON.stringify({
        designno: `${data.designno}`,
        autocode: `${data.autocode}`,
        metalcolorid: "0",
        isSolStockNo: "0",
        is_show_stock_website: "0",
        isdelete_all: "0",
        FrontEnd_RegNo: `${FrontEnd_RegNo}`,
        Customerid: `${loginUserDetail?.id ?? 0}`,
        cartidlist: "",
      });
      const encodedCombinedValue = btoa(combinedValue);
      const body = {
        con: `{\"id\":\"Store\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${ loginUserDetail?.email1 ?? ""}\"}`,
        f: "myWishLisy (handleRemoveCatList)",
        p: encodedCombinedValue,
      };
      const response = await CommonAPI(body);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  