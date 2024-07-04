
import { CommonAPI } from "../CommonAPI/CommonAPI";

export const MetalColorCombo = async (visiterId) => {

    let response;

    const storeInit = JSON.parse(localStorage.getItem('storeInit'));
    const { FrontEnd_RegNo } = storeInit;
    const storedEmail = localStorage.getItem('registerEmail') || '';
    let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))

    const islogin = JSON.parse(localStorage.getItem("LoginUser")) ?? false;

    const customerId = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo.id ?? 0;
    const customerEmail = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo.email1 ?? "";

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