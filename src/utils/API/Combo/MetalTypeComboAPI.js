import { useRecoilValue } from "recoil";
import { CommonAPI } from "../CommonAPI/CommonAPI";
import { loginState } from "../../../AllTheme/SmilingRock/Components/Recoil/atom";
import Cookies from "js-cookie";



export const MetalTypeComboAPI = async () => {

    let response;
    const islogin = useRecoilValue(loginState)

    try {
        const loginUserDetail = (JSON.parse(localStorage.getItem('loginUserDetail')) || '0');
        const storedEmail = localStorage.getItem('registerEmail') || '';
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo, IsB2BWebsite } = storeInit;

        const visiterId = Cookies.get('visiterId');
        const CustomerID = IsB2BWebsite == 0 ?
            islogin == false ?
                visiterId
                :
                loginUserDetail?.id || '0'
            :
            loginUserDetail?.id || '0'

            console.log('CustomerIDCustomerIDCustomerID', CustomerID);



        const combinedValue = JSON.stringify({
            FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${loginUserDetail?.id}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": `{\"id\":\"\",\"mode\":\"METALTYPECOMBO\",\"appuserid\":\"${storedEmail}\"}`,
            "f": "Account (changePassword)",
            "p": encodedCombinedValue,
            "dp": combinedValue,

        }

        response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }
    return response;

}