import { CommonAPI } from "../CommonAPI/CommonAPI"

export const GetCountAPI = async(visiterId) =>{


        let storeInit = JSON.parse(localStorage.getItem("storeInit"))
        let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))
        let userEmail = localStorage.getItem("registerEmail")
        const islogin = JSON.parse(localStorage.getItem("LoginUser")) ?? false;

        const customerId = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo.id ?? 0;
        const customerEmail = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo?.email1 ?? 0;

        let data = {
            "FrontEnd_RegNo":`${storeInit?.FrontEnd_RegNo}`,
            "Customerid":`${customerId ?? 0}`
        }

        let stringify = JSON.stringify(data)

        let body ={
            "con":`{\"id\":\"\",\"mode\":\"Getcount\",\"appuserid\":\"${customerEmail ?? ""}\"}`
            ,"f":"zen (getCount)"
            ,"dp":stringify
            ,"p":btoa(stringify)
        }

        let ReVal
        

        try {
            const res = await CommonAPI(body);
             ReVal = res?.Data?.rd[0];
             return ReVal;
        } catch (err) {
            console.log("GetCountErr", err);
            return null
        }

}