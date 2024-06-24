import { findCsQcId, findDiaQcId, findMetal } from "../../Glob_Functions/GlobalFunction";
import { CommonAPI } from "../CommonAPI/CommonAPI";

export const GetPriceListApi = async (page = 1,obj = {},filterObj = {},autocodeList,obje) => {
  const storeInit = JSON.parse(localStorage.getItem("storeInit"));
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
  const param = JSON.parse(localStorage.getItem("menuparams"));
  const islogin = JSON.parse(localStorage.getItem("LoginUser"));
  const UserEmail = localStorage.getItem("registerEmail");

  // let encodedFilter = {
  //     "DesignNo":"",
  //     "FilterKey":`${param?.FilterKey}`,
  //     "FilterVal":`${param?.FilterVal}`,
  //     "FilterKey1":`${param?.FilterKey1}`,
  //     "FilterVal1":`${param?.FilterVal1}`,
  //     "FilterKey2":`${param?.FilterKey2}`,
  //     "FilterVal2":`${param?.FilterVal2}`,
  //     "PageNo":`${page}`,
  //     "PageSize":`${storeInit?.PageSize}`,
  //     "Metalid":`${mtid}`,
  //     "DiaQCid":`${diaqcId}`,
  //     "CsQCid":`${csqcId}`,
  //     "IsFromDesDet":"0",
  //     "Collectionid": `${filterObj?.Collectionid ?? ""}`,
  //     "Categoryid": `${filterObj?.Categoryid ?? ""}`,
  //     "SubCategoryid": `${filterObj?.SubCategoryid ?? ""}`,
  //     "Brandid": `${filterObj?.Brandid ?? ""}`,
  //     "Genderid": `${filterObj?.Genderid ?? ""}`,
  //     "Ocassionid": `${filterObj?.Ocassionid ?? ""}`,
  //     "Themeid": `${filterObj?.Themeid ?? ""}`,
  //     "Min_DiaWeight": '',
  //     "Max_DiaWeight": '',
  //     "Min_GrossWeight": '',
  //     "Max_GrossWeight": '',
  //     "Max_NetWt": '',
  //     "Min_NetWt": '',
  //     "Max_Price": '',
  //     "Min_Price": '',
  //     "Producttypeid": `${filterObj?.Producttypeid ?? ""}`,
  //     "AutoCodeList":`${autocodeList}`,
  //   }

  // let diaQc = findDiaQcId(obje?.dia ?? loginUserDetail?.cmboDiaQCid)[0]
  let diaQc = (obje?.dia === undefined ?  loginUserDetail?.cmboDiaQCid : obj?.dia)
  // let csQc = findCsQcId(obje?.cs ?? loginUserDetail?.cmboCSQCid)[0]
  let csQc = (obje?.cs === undefined ? loginUserDetail?.cmboCSQCid : obj?.cs)

  let mtidd = obje?.mt===undefined ?loginUserDetail?.cmboMetalType: obje?.mt

  let mtid = findMetal(loginUserDetail?.cmboMetalType)[0]?.Metalid

  // console.log("diaa prod api",obje?.mt);

  const GetPriceReq = {
    CurrencyRate: `${storeInit?.CurrencyRate}`,
    FrontEnd_RegNo: `${storeInit?.FrontEnd_RegNo}`,
    // "Customerid": `${loginUserDetail?.id}`,
    // "Laboursetid": `${loginUserDetail?.pricemanagement_laboursetid}`,
    // "diamondpricelistname": `${loginUserDetail?.diamondpricelistname}`,
    // "colorstonepricelistname": `${loginUserDetail?.colorstonepricelistname}`,
    // "SettingPriceUniqueNo": `${loginUserDetail?.SettingPriceUniqueNo}`,
    Customerid: `${loginUserDetail?.id ?? 0}`,
    Laboursetid: `${
      storeInit?.IsB2BWebsite == 0 && islogin == false
        ? storeInit?.pricemanagement_laboursetid
        : loginUserDetail?.pricemanagement_laboursetid
    }`,
    diamondpricelistname: `${
      storeInit?.IsB2BWebsite == 0 && islogin == false
        ? storeInit?.diamondpricelistname
        : loginUserDetail?.diamondpricelistname
    }`,
    colorstonepricelistname: `${
      storeInit?.IsB2BWebsite == 0 && islogin == false
        ? storeInit?.colorstonepricelistname
        : loginUserDetail?.colorstonepricelistname
    }`,
    SettingPriceUniqueNo: `${
      storeInit?.IsB2BWebsite == 0 && islogin == false
        ? storeInit?.SettingPriceUniqueNo
        : loginUserDetail?.SettingPriceUniqueNo
    }`,
    designno: "",
    FilterKey: `${param?.FilterKey}`,
    FilterVal: `${param?.FilterVal}`,
    FilterKey1: `${param?.FilterKey1}`,
    FilterVal1: `${param?.FilterVal1}`,
    FilterKey2: `${param?.FilterKey2}`,
    FilterVal2: `${param?.FilterVal2}`,
    PageNo: `${page}`,
    PageSize: `${storeInit?.PageSize}`,
    Metalid: `${obje?.mt ?? mtid}`,
    DiaQCid: `${diaQc}`,
    CsQCid: `${csQc}`,
    IsFromDesDet: "0",
    Collectionid: `${filterObj?.collection ?? ""}`,
    Categoryid: `${filterObj?.category ?? ""}`,
    SubCategoryid: `${filterObj?.subcategory ?? ""}`,
    Brandid: `${filterObj?.brand ?? ""}`,
    Genderid: `${filterObj?.gender ?? ""}`,
    Ocassionid: `${filterObj?.ocassion ?? ""}`,
    Themeid: `${filterObj?.theme ?? ""}`,
    Min_DiaWeight: "",
    Max_DiaWeight: "",
    Min_GrossWeight: "",
    Max_GrossWeight: "",
    Max_NetWt: "",
    Min_NetWt: "",
    Max_Price: "",
    Min_Price: "",
    Producttypeid: `${filterObj?.producttype ?? ""}`,
    AutoCodeList: `${autocodeList}`,
  };

  const encodedCombinedValue = btoa(JSON.stringify(GetPriceReq));

  let body = {
    con: `{\"id\":\"Store\",\"mode\":\"getdesignpricelist\",\"appuserid\":\"${UserEmail}\"}`,
    f: "onloadFirstTime (getdesignpricelist)",
    p: encodedCombinedValue,
    dp: JSON.stringify(GetPriceReq),
  };

  let PriceApiData;

  await CommonAPI(body).then((res) => {
    PriceApiData = res?.Data;
  });

  return PriceApiData;
};
