

import { CommonAPI } from "../CommonAPI/CommonAPI";



export const ColorStoneQualityColorComboAPI = async () => {
    let response;
    try {
        const storedEmail = localStorage.getItem('registerEmail') || '';
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail')) || '0';
        
        const { FrontEnd_RegNo } = storeInit;
        const combinedValue = JSON.stringify({
            FrontEnd_RegNo: `${FrontEnd_RegNo}`, colorstonepricelistname: `${loginUserDetail?.colorstonepricelistname ?? storeInit?.colorstonepricelistname}`
        });

        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": `{\"id\":\"\",\"mode\":\"CSQUALITYCOLORCOMBO\",\"appuserid\":\"${storedEmail}\"}`,
            "f": "indexPage (getColorStoneQualityData)",
            "p": encodedCombinedValue,
            "dp": combinedValue,
        }

        response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }
    return response;

}