import { CommonAPI } from "../CommonAPI/CommonAPI";

export const fetchCartDetails = async (visiterId, islogin) => {
    debugger
    let storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const storedData = localStorage.getItem("loginUserDetail");
    const data = JSON.parse(storedData);
    const customerId = storeInit?.IsB2BWebsite == 0 && islogin == false  ? visiterId : data.id ?? 0;
    const customerEmail = storeInit?.IsB2BWebsite == 0 && islogin == false  ? visiterId : data.id ?? 0;
    const {FrontEnd_RegNo} = storeInit;

    try {
        const combinedValue = JSON.stringify({
            PageNo: "1",
            PageSize: "1000",
            CurrRate: "1",
            FrontEnd_RegNo: `${FrontEnd_RegNo}`,
            Customerid: `${customerId}`,
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
