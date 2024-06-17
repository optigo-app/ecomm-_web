import { CommonAPI } from "../CommonAPI/CommonAPI";

export const fetchCartDetails = async (customerEmail, ukey, FrontEnd_RegNo) => {
    try {
        const combinedValue = JSON.stringify({
            PageNo: "1",
            PageSize: "1000",
            CurrRate: "1",
            FrontEnd_RegNo: `${FrontEnd_RegNo}`,
            Customerid: `${customerEmail}`,
        });

        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            con: `{\"id\":\"\",\"mode\":\"GetCartDetails\",\"appuserid\":\"${customerEmail}\"}`,
            f: "Header (getCartData)",
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
