import { CommonAPI } from "../CommonAPI/CommonAPI";

export const handleProductRemark = async (data, remarks, customerID, userEmail) => {
    try {
        const storeInit = JSON.parse(localStorage.getItem("storeInit")) || {};
        const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail")) || {};
        const { FrontEnd_RegNo } = storeInit;

        const combinedValue = {
            designno: data.designno,
            autocode: data.autocode,
            remarks: remarks,
            FrontEnd_RegNo: FrontEnd_RegNo,
            Customerid: loginUserDetail?.id ?? 0,
        };

        const encodedCombinedValue = btoa(JSON.stringify(combinedValue));
        
        const body = {
            con: JSON.stringify({
                id: "",
                mode: "SAVEDESIGNREMARK",
                appuserid: loginUserDetail?.email1 ?? "",
            }),
            f: "Header (handleSingleRemarksSubmit)",
            p: encodedCombinedValue,
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
