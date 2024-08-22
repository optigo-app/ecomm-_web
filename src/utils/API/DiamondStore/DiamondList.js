import { CommonAPI } from "../CommonAPI/CommonAPI";

export const DiamondListData = async (
    page,
    shape,
    stockno,
    price,
    carat,
    color = "",
    clarity = "",
    cut = ""
) => {
    let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const storedData = sessionStorage.getItem("loginUserDetail");
    const islogin = JSON.parse(sessionStorage.getItem("LoginUser"));
    const data = JSON.parse(storedData);
    const customerId = data?.id ?? 0;
    const customerEmail = data?.userid ?? "";
    const { FrontEnd_RegNo } = storeInit;

    let packageId = data?.PackageId ?? 0;

    console.log("pricejhshdhjas", carat);

    // Split price and carat into From and To values
    const [priceFrom, priceTo] = price ? price?.split(',')?.map(Number) : [null, null];
    const [caratFrom, caratTo] = carat ? carat?.split(',')?.map(Number) : [null, null];

    try {
        const combinedValue = JSON.stringify({
            PageNo: `${page ?? 1}`,
            PageSize: `${storeInit?.PageSize ?? 50}`,
            OrderBy: "order by carat asc",
            FrontEnd_RegNo: `${FrontEnd_RegNo}`,
            Customerid: `${customerId ?? 0}`,
            PackageId: packageId,
            Shape: `${shape ?? ''}`,
            Polish: "",
            Lab: "",
            Symmetry: "",
            Fluorescence: "",
            FromColor:"",
            ToColor: "",
            FromCarat: `${caratFrom ?? ""}`,
            ToCarat: `${caratTo ?? ""}`,
            FromClarity:"" ,
            ToClarity: "",
            FromCut: "",
            ToCut: "",
            FromPrice: `${priceFrom ?? ""}`,
            ToPrice: `${priceTo ?? ""}`,
            FromTable: "",
            ToTable: "",
            FromDepth: "",
            ToDepth: "",
            stockno: `${stockno ?? ""}`
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
        console.error("Error fetching diamond details:", error);
        throw error;
    }
};
