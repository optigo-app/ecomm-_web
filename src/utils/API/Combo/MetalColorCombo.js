
import { CommonAPI } from "../CommonAPI/CommonAPI";

export const MetalColorCombo = async (finalID) => {

    let response;

    try {
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;
        const storedEmail = localStorage.getItem('registerEmail') || '';

        const combinedValue = JSON.stringify({
            FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${finalID}`
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