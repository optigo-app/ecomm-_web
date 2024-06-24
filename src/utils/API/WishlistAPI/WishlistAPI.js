import { CommonAPI } from "../CommonAPI/CommonAPI";

export const fetchWishlistDetails = async () => {
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const storedData = localStorage.getItem("loginUserDetail");
    const {FrontEnd_RegNo} = storeInit;
    const data = JSON.parse(storedData);
    let customerEmail = data?.email1 ?? "";
    const customerid = data.id;
    try {
        const combinedValue = JSON.stringify({
            PageSize: "1000",
            PageNo: "1",
            FrontEnd_RegNo: `${FrontEnd_RegNo}`,
            Customerid: `${customerid ?? 0}`,
          });

        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            con: `{\"id\":\"Store\",\"mode\":\"GetWishList\",\"appuserid\":\"${customerEmail}\"}`,
            f: "MyWishList (GetWishList)",
            p: encodedCombinedValue,
            dp: combinedValue
        };

        const response = await CommonAPI(body);

        return response;
    } catch (error) {
        console.error("Error fetching cart details:", error);
        throw error;
    }
};
