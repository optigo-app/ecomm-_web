import { CommonAPI } from "../CommonAPI/CommonAPI";





export const LoginWithEmailAPI = async (email, mobileNo, hashedPassword, ismobiletoke, userCookie) => {

    let response
    try {
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;

        const combinedValue = JSON.stringify({
            userid: `${email}`, mobileno: mobileNo, pass: `${hashedPassword}`, mobiletoken: ismobiletoke, FrontEnd_RegNo: `${FrontEnd_RegNo}`, Token: `${userCookie ?? ''}`,
            IsPLW: `${storeInit?.IsPLW}`,

        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": "{\"id\":\"\",\"mode\":\"WEBLOGIN\"}",
            "f": "LoginWithEmail (handleSubmit)",
            p: encodedCombinedValue,
            "dp": combinedValue,

        };
        response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }
    return response;

}