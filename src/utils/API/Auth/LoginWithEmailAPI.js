import { CommonAPI } from "../CommonAPI/CommonAPI";





export const LoginWithEmailAPI = async (email , hashedPassword) => {

    let response
    try {
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;

        const combinedValue = JSON.stringify({
            userid: `${email}`, mobileno: '', pass: `${hashedPassword}`, mobiletoken: '', FrontEnd_RegNo: `${FrontEnd_RegNo}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": "{\"id\":\"\",\"mode\":\"WEBLOGIN\"}",
            "f": "LoginWithEmail (handleSubmit)",
            p: encodedCombinedValue
        };
         response = await CommonAPI(body);
       
    } catch (error) {
        console.error('Error:', error);
    }
    return response;

}