import { CommonAPI } from "../CommonAPI/CommonAPI";

export const updateCartAPI = async (updatedItems, metalID, metalCOLORID, diaIDData, colorStoneID, sizeId, markupData, finalPrice, finalPriceWithMarkup) => {
    try {
        const storeInit = JSON.parse(localStorage.getItem("storeInit"));
        const { FrontEnd_RegNo } = storeInit;
        const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"))
        const UserEmail = localStorage.getItem("registerEmail")

        console.log('jbjasd--', updatedItems, metalID, metalCOLORID, diaIDData, colorStoneID, sizeId, markupData, finalPrice, finalPriceWithMarkup);

        const combinedValue = JSON.stringify({
            ForEvt: "Cart",
            FrontEnd_RegNo: `${FrontEnd_RegNo}`,
            userid: `${UserEmail}`,
            Customerid: `${loginUserDetail?.id ?? 0}`,
            AddCartDetail: [
                {
                    "CartId": `${updatedItems?.id}`,
                    "Metalid": metalID ?? 0,
                    "MetalColorId": metalCOLORID ?? 0,
                    "DiaQCid": `${diaIDData}` ?? "0,0",
                    "CsQCid": `${colorStoneID}` ?? "0,0",
                    "Size": `${sizeId ?? 0}`,
                    "Unitcost": `${finalPrice ?? 0}`,
                    "markup": `${markupData ?? 0}`,
                    "UnitCostWithmarkup": `${finalPriceWithMarkup ?? 0}`
                }]
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            con: `{\"id\":\"\",\"mode\":\"CartCustomize\",\"appuserid\":\"${UserEmail ?? ""}\"}`,
            f: "header (handleUpdateCart)",
            p: encodedCombinedValue,
            dp: combinedValue,
        };


        console.log("updatecartBody", body);
        // const response = await CommonAPI(body);
        // return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

