import { CommonAPI } from "../../CommonAPI/CommonAPI";

export const Get_Tren_BestS_NewAr_DesigSet_Album = async (mode, customerID, filterObj = {}, currentPage, itemsPerPage) => {
    let response;
    try {
        const storeInit = JSON.parse(sessionStorage.getItem("storeInit")) ?? ""
        const userData = JSON.parse(sessionStorage.getItem("loginUserDetail")) ?? ""
        let userLogin = sessionStorage.getItem('LoginUser')

        const combinedValue = JSON.stringify({
            "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
            "Customerid": `${customerID}`,
            "PackageId": `${storeInit?.PackageId}`,
            "Laboursetid": `${storeInit?.pricemanagement_laboursetid}`,
            "diamondpricelistname": `${storeInit?.diamondpricelistname}`,
            "colorstonepricelistname": `${storeInit?.colorstonepricelistname}`,
            "SettingPriceUniqueNo": `${storeInit?.SettingPriceUniqueNo}`,
            "Metalid": `${storeInit?.MetalId}`,
            "DiaQCid": `${storeInit?.cmboDiaQCid}`,
            "CsQCid": `${storeInit?.cmboCSQCid}`,
            "IsStockWebsite": `${storeInit?.IsStockWebsite}`,
            Collectionid: `${filterObj?.collection ?? ""}`,
            Categoryid: `${filterObj?.category ?? ""}`,
            SubCategoryid: `${filterObj?.subcategory ?? ""}`,
            Brandid: `${filterObj?.brand ?? ""}`,
            Genderid: `${filterObj?.gender ?? ""}`,
            Ocassionid: `${filterObj?.ocassion ?? ""}`,
            Themeid: `${filterObj?.theme ?? ""}`,
            Producttypeid: `${filterObj?.producttype ?? ""}`,
            Min_DiaWeight: '',
            Max_DiaWeight: '',
            Min_GrossWeight: '',
            Max_GrossWeight: '',
            Max_NetWt: '',
            Min_NetWt: '',
            FilPrice: filterObj?.Price,
            IsPLW: storeInit?.IsPLW,
            CurrencyRate: `${userData?.CurrencyRate ?? storeInit?.CurrencyRate}`,
            PageNo: `${currentPage ?? "1"}`,
            PageSize: `${itemsPerPage ?? "20"}`
        })

        const combinedValueLogin = JSON.stringify({
            "FrontEnd_RegNo": `${storeInit?.FrontEnd_RegNo}`,
            "Customerid": `${customerID}`,
            "PackageId": `${userData?.PackageId}`,
            "Laboursetid": `${userData?.pricemanagement_laboursetid}`,
            "diamondpricelistname": `${userData?._diamondpricelistname}`,
            "colorstonepricelistname": `${userData?.colorstonepricelistname}`,
            "SettingPriceUniqueNo": `${userData?._SettingPriceUniqueNo}`,
            "Metalid": `${userData?.MetalId}`,
            "DiaQCid": `${userData?.cmboDiaQCid}`,
            "CsQCid": `${userData?.cmboCSQCid}`,
            "IsStockWebsite": `${storeInit?.IsStockWebsite}`,
            Collectionid: `${filterObj?.collection ?? ""}`,
            Categoryid: `${filterObj?.category ?? ""}`,
            SubCategoryid: `${filterObj?.subcategory ?? ""}`,
            Brandid: `${filterObj?.brand ?? ""}`,
            Genderid: `${filterObj?.gender ?? ""}`,
            Ocassionid: `${filterObj?.ocassion ?? ""}`,
            Themeid: `${filterObj?.theme ?? ""}`,
            Producttypeid: `${filterObj?.producttype ?? ""}`,
            Min_DiaWeight: '',
            Max_DiaWeight: '',
            Min_GrossWeight: '',
            Max_GrossWeight: '',
            Max_NetWt: '',
            Min_NetWt: '',
            FilPrice: filterObj?.Price,
            IsPLW: storeInit?.IsPLW,
            CurrencyRate: `${userData?.CurrencyRate ?? storeInit?.CurrencyRate}`,
            PageNo: `${currentPage ?? "1"}`,
            PageSize: `${itemsPerPage ?? "20"}`
        })



        const email = sessionStorage.getItem("registerEmail") ?? ""

        const body = {
            "con": `{\"id\":\"\",\"mode\":\"${mode}\",\"appuserid\":\"${email}\"}`,
            "f": "zen (cartcount)",
            "dp": userLogin ? combinedValueLogin : combinedValue,
        }
        response = await CommonAPI(body);

    } catch (error) {
        console.error('Error:', error);
    }

    return response;

}