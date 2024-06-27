import { CommonAPI } from "../CommonAPI/CommonAPI";

export const handleOrderRemark = async (orderRemark) => {
    try {
        const storeInit = JSON.parse(localStorage.getItem("storeInit")) || {};
        const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail")) || {};
        const { FrontEnd_RegNo } = storeInit;

        let customerEmail = loginUserDetail?.email1

        const combinedValue = {
            orderRemarks: orderRemark,
            FrontEnd_RegNo: FrontEnd_RegNo,
            Customerid: loginUserDetail?.id ?? 0,
        };

        const encodedCombinedValue = btoa(JSON.stringify(combinedValue));
        
        const body = {
            "con": `{\"id\":\"\",\"mode\":\"SAVEORDERREMARK\",\"appuserid\":\"${customerEmail ?? ''}\"}`,
            f: "payment (handleOrderRemark)",
            p: encodedCombinedValue,
            dp:JSON.stringify(combinedValue),
        };

        const response = await CommonAPI(body);

        if (response?.Data?.rd[0]?.stat === 1) {
            return response;
        } else {
            throw new Error("Error: Failed to save design remark.");
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
