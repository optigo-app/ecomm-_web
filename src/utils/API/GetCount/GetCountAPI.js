import { CommonAPI } from "../CommonAPI/CommonAPI"

export const GetCountAPI = async() =>{


        let storeinit = JSON.parse(localStorage.getItem("storeInit"))
        let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"))
        let userEmail = localStorage.getItem("registerEmail")

        let data = {
            "FrontEnd_RegNo":`${storeinit?.FrontEnd_RegNo}`,
            "Customerid":`${loginInfo?.id}`
        }

        let stringify = JSON.stringify(data)

        let body ={
            "con":`{\"id\":\"\",\"mode\":\"Getcount\",\"appuserid\":\"${userEmail}\"}`
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