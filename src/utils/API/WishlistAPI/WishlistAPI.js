import { CommonAPI } from "../CommonAPI/CommonAPI";

export const fetchWishlistDetails = async (visiterId, islogin) => {
    let storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const storedData = localStorage.getItem("loginUserDetail");
    const data = JSON.parse(storedData);
    const customerId = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : data.id ?? 0;
    const customerEmail = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : data.email1 ?? "";
    const {FrontEnd_RegNo} = storeInit;

    try {
        const combinedValue = JSON.stringify({
            PageSize: "1000",
            PageNo: "1",
            FrontEnd_RegNo: `${FrontEnd_RegNo}`,
            Customerid: `${customerId ?? 0}`,
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
