
import { CommonAPI } from "../CommonAPI/CommonAPI";


export const MetalColorCombo = async () => {
    let response;
    try {
        const storedEmail = localStorage.getItem('registerEmail') || '';
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail')) || '0';
        const { FrontEnd_RegNo } = storeInit;
        const combinedValue = JSON.stringify({
            FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${loginUserDetail?.id}`
        });

        const encodedCombinedValue = btoa(combinedValue);
        const body = {
          "con": `{\"id\":\"\",\"mode\":\"METALCOLORCOMBO\",\"appuserid\":\"${storedEmail}\"}`,
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