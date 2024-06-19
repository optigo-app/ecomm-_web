import { CommonAPI } from "../../CommonAPI/CommonAPI";

export const GetTrandingView = async () => {
    let response;
    try {
        const storeInit = JSON.parse(localStorage.getItem("storeInit")) ?? ""
        const userData = JSON.parse(localStorage.getItem("loginUserDetail")) ?? ""
        let combinedValue = JSON.stringify({ "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${userData?.id ?? 0}` })
        const email = localStorage.getItem("registerEmail") ?? ""

        const body = {
            "con": `{\"id\":\"\",\"mode\":\"GETTrending\",\"appuserid\":\"${email}\"}`,
            "f": "zen (cartcount)",
            "dp": combinedValue,
        }
        response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }

    return response;

}