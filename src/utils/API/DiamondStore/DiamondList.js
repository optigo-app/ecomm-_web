import { CommonAPI } from "../CommonAPI/CommonAPI";

export const DiamondListData = async (
  page,
  shape,
  stockno,
  finalArray
) => {
  let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
  const storedData = sessionStorage.getItem("loginUserDetail");
  const islogin = JSON.parse(sessionStorage.getItem("LoginUser"));
  const data = JSON.parse(storedData);
  const customerId = data?.id ?? 0;
  const customerEmail = data?.userid ?? "";
  const { FrontEnd_RegNo } = storeInit;
  let packageId = data?.PackageId ?? 0;

  // Extract and assign values from finalArray
  const [priceFrom, priceTo] = finalArray?.Price || [null, null];
  const [caratFrom, caratTo] = finalArray?.Carat || [null, null];
  const [colorFrom, colorTo] = finalArray?.Color || ["", ""];
  const [clarityFrom, clarityTo] = finalArray?.Clarity || ["", ""];
  const [cutFrom, cutTo] = finalArray?.Cut || ["", ""];
  const polish = finalArray?.polish || [];
  const symmetry = finalArray?.symmetry || [];
  const lab = finalArray?.lab || [];
  const [depthFrom, depthTo] = finalArray?.depth || [null, null];
  const [tableFrom, tableTo] = finalArray?.table || [null, null];
  const fluorescence = finalArray?.fluorescence || [];

  try {
    const combinedValue = JSON.stringify({
      PageNo: `${page ?? 1}`,
      PageSize: `${storeInit?.PageSize ?? 50}`,
      OrderBy: "order by carat asc",
      FrontEnd_RegNo: `${FrontEnd_RegNo}`,
      Customerid: `${customerId}`,
      PackageId: packageId,
      Shape: `${shape ?? ''}`,
      Polish: `${polish ?? []}`,
      Lab: `${lab ?? []}`,
      Symmetry: `${symmetry ?? []}`,
      Fluorescence: `${fluorescence ?? []}`,
      FromColor: `${colorFrom ?? ""}`,
      ToColor: `${colorTo ?? ""}`,
      FromCarat: `${caratFrom ?? ""}`,
      ToCarat: `${caratTo ?? ""}`,
      FromClarity: `${clarityFrom ?? ""}`,
      ToClarity: `${clarityTo ?? ""}`,
      FromCut: `${cutFrom ?? ""}`,
      ToCut: `${cutTo ?? ""}`,
      FromPrice: `${priceFrom ?? ""}`,
      ToPrice: `${priceTo ?? ""}`,
      // FromPrice: '',
      // ToPrice: '',
      FromTable: '',
      ToTable: '',
      FromDepth: '',
      ToDepth: '',
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
