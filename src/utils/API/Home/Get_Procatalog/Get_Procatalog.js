import { CommonAPI } from "../../CommonAPI/CommonAPI";

export const Get_Procatalog = async (mode, customerID, ALCID) => {
    let response;
    try {
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit")) ?? ""
        let userLogin = sessionStorage.getItem('LoginUser')

        const combinedValue = JSON.stringify({
            "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
            "Customerid": `${customerID}`,
            "ALC": `${ALCID ?? ""}`,
        })

        const combinedValueLogin = JSON.stringify({
            "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
            "Customerid": `${customerID}`,
            "ALC": `${ALCID ?? ""}`,
        })



        const email = sessionStorage.getItem("registerEmail") ?? ""

        const body = {
            "con": `{\"id\":\"\",\"mode\":\"${mode}\",\"appuserid\":\"${email}\"}`,
            "f": "zen (cartcount)",
            "dp": userLogin ? combinedValueLogin : combinedValue,
        }

        console.log('bodybodybodybodybody',body);
        response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }

    return response;

}