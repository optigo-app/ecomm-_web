import { CommonAPI } from "../CommonAPI/CommonAPI";

export const fetchCartDetails = async (visiterId, islogin) => {
    let storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const storedData = localStorage.getItem("loginUserDetail");
    const data = JSON.parse(storedData);
    const customerId = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : data.id ?? 0;
    const customerEmail = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : data.email1 ?? "";
    const {FrontEnd_RegNo} = storeInit;

    let packageId = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? storeInit?.PackageId : data?.PackageId ?? 0
    let laboursetid = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? storeInit?.pricemanagement_laboursetid : data?.pricemanagement_laboursetid ?? 0
    let diamondpricelistname = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? storeInit?.diamondpricelistname : data?.diamondpricelistname ?? ""
    let colorstonepricelistname = storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? storeInit?.colorstonepricelistname : data?.colorstonepricelistname ?? ""
    let SettingPriceUniqueNo =  storeInit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? storeInit?.SettingPriceUniqueNo : data?.SettingPriceUniqueNo ?? ""

    try {
        const combinedValue = JSON.stringify({
            PageNo: "1",
            PageSize: "1000",
            CurrRate: "1",
            FrontEnd_RegNo: `${FrontEnd_RegNo}`,
            Customerid: `${customerId}`,
            PackageId: packageId,
            Laboursetid:laboursetid,
            diamondpricelistname:diamondpricelistname,
            colorstonepricelistname:colorstonepricelistname,
            SettingPriceUniqueNo:SettingPriceUniqueNo,
            IsWishList:0
        });

        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            con: `{\"id\":\"\",\"mode\":\"GetCart_Details\",\"appuserid\":\"${customerEmail}\"}`,
            f: "Header (getCartData)",
            p: encodedCombinedValue,
            dp: combinedValue
        };

        const response = await CommonAPI(body);

        return response;
    } catch (error) {
        console.error("Error fetching cart details:", error);
        throw error;
    }
};
