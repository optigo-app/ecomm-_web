import { CommonAPI } from "../CommonAPI/CommonAPI";

export const GetMenuAPI = async () => {
    let response;
    try {


        const storeInit = JSON.parse(localStorage.getItem("storeInit")) ?? ""
        const userData = JSON.parse(localStorage.getItem("loginUserDetail")) ?? ""
        const email = localStorage.getItem("registerEmail") ?? ""
        let pData = JSON.stringify({ "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`, "Customerid": `${userData?.id ?? 0}` })
        let pEnc = btoa(pData)

        const body = {
            // con: "{\"id\":\"\",\"mode\":\"GETMENU\",\"appuserid\":\"nimesh@ymail.in\"}",
            con: `{\"id\":\"\",\"mode\":\"GETMENU\",\"appuserid\":\"${email}\"}`,
            f: "onload (GETMENU)",
            // p: pEnc
            dp:`{\"FrontEnd_RegNo\":\"${storeInit?.FrontEnd_RegNo}\",\"Customerid\":\"${userData?.id ?? 0}\"}`
        }

        response = await CommonAPI(body);
        console.log('menuDatamenuData', response);

    } catch (error) {
        console.error('Error:', error);
    }

    return response;

}