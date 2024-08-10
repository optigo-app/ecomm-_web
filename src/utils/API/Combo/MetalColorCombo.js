
import { CommonAPI } from "../CommonAPI/CommonAPI";

export const MetalColorCombo = async (visiterId) => {

    let response;

    const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
    const { FrontEnd_RegNo } = storeInit;
    const storedEmail = sessionStorage.getItem('registerEmail') || '';
    let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"))

    const islogin = JSON.parse(sessionStorage.getItem("LoginUser")) ?? false;

    const customerId = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo.id ?? 0;
    const customerEmail = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo?.userid ?? "";

    try {
       
        const combinedValue = JSON.stringify({
            FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerId}`
        });


        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": `{\"id\":\"\",\"mode\":\"METALCOLORCOMBO\",\"appuserid\":\"${customerEmail ?? ""}\"}`,
            "f": "index (getSizeData)",
            "p": encodedCombinedValue,
            "dp": combinedValue,
        }

        response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }
    return response;

}