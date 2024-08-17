import { CommonAPI } from "../CommonAPI/CommonAPI";

export const DiamondListData = async (shape) => {
    let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const storedData = sessionStorage.getItem("loginUserDetail");
    const islogin = JSON.parse(sessionStorage.getItem("LoginUser"));
    const data = JSON.parse(storedData);
    const customerId = data?.id ?? 0;
    const customerEmail = data?.userid ?? "";
    const {FrontEnd_RegNo} = storeInit;

    let packageId = data?.PackageId ?? 0

    try {          
        const combinedValue = JSON.stringify({
            PageNo: "1",
            PageSize: "1000",
            OrderBy: "order by carat asc",
            FrontEnd_RegNo: `${FrontEnd_RegNo}`,
            Customerid: `${customerId ?? 0}`,
            PackageId: packageId,
            Shape: `${shape ?? ''}`,
            Polish: "",
            Lab: "",
            Symmetry: "",
            Fluorescence: "",
            FromColor: "",
            ToColor: "",
            FromCarat: "",
            ToCarat: "",
            FromClarity: "",
            ToClarity: "",
            FromCut: "",
            ToCut: "",
            FromPrice: "",
            ToPrice: "",
            FromTable: "",
            ToTable: "",
            FromDepth: "",
            ToDepth: "",
            stockno:""
        });

        const encodedCombinedValue = btoa(combinedValue);

        console.log("diamondListApi", combinedValue);
        
        const body = {
            con: `{\"id\":\"\",\"mode\":\"GETDIAMONDLIST\",\"appuserid\":\"${customerEmail}\"}`,
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
