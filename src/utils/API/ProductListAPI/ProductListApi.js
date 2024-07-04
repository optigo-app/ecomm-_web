import { CommonAPI } from "../CommonAPI/CommonAPI";


const ProductListApi = async (filterObj={},page,obj={},mainData = "") => {

  console.log("mainData",mainData);

  let MenuParams = {};
  let serachVar = ""

  if(Array.isArray(mainData)){
    if(mainData?.length > 0){
      Object.values(mainData[0]).forEach((ele,index)=>{
       let keyName = `FilterKey${index === 0 ? '' : index}`;
       MenuParams[keyName] = ele.replace(/%20/g, ' ')
      })
  
      Object.values(mainData[1]).forEach((ele,index)=>{
       let keyName = `FilterVal${index === 0 ? '' : index}`;
       MenuParams[keyName] = ele.replace(/%20/g, ' ')
      })
    }
   }else{
    if(mainData !== ""){
      
      if(atob(mainData)?.split("=")[0] == "AlbumName"){
        MenuParams.FilterKey = atob(mainData)?.split("=")[0]
        MenuParams.FilterVal = atob(mainData)?.split("=")[1]
      } 
      else if(mainData.split("=")[0] == "S"){
        serachVar = atob(mainData.split("=")[1])
      }
        else{
        MenuParams.FilterKey = atob(mainData)
        MenuParams.FilterVal = atob(mainData)
      }
    }
   }


  const keyMapping = {
    "0": "id",
    "1": "IsBestSeller",
    "2": "IsTrending",
    "3": "designno",
    "4": "UnitCost",
    "5": "UnitCostWithmarkup",
    "6": "autocode",
    "7": "DefaultImageName",
    "8": "imgrandomno",
    "9": "RollOverImageName",
    "10": "IsNewArrival",
    "11": "MetalWeight",
    "12": "diamondweight",
    "13": "TitleLine",
    "14": "diamondquality",
    "15": "diamondsetting",
    "16": "diamondshape",
    "17": "diamondcolorname",
    "18": "colorstonequality",
    "19": "colorstonecolorname",
    "20": "totaldiamondweight",
    "21": "totaladditionalvalueweight",
    "22": "diamondpcs",
    "23": "totalcolorstoneweight",
    "24": "Grossweight",
    "25": "MasterManagement_labid",
    "26": "DisplayOrder",
    "27": "Producttypeid",
    "28": "Collectionid",
    "29": "Categoryid",
    "30": "SubCategoryid",
    "31": "Brandid",
    "32": "Genderid",
    "33": "Ocassionid",
    "34": "Themeid",
    "35": "MetalTypeid",
    "36": "MetalColorid",
    "37": "IsInReadyStock",
    "38": "InReadyStockCnt",
    "39": "AdditionalValWt",
    "40": "MetalPurityid",
    "41": "FrontEnd_OrderCnt",
    "42": "CenterStoneId",
    "43": "ColorWiseRollOverImageName",
    "44": "CenterStonePieces",
    "45": "Hashtagid",
    "46": "Hashtagname",
    "47": "ThumbImagePath",
    "48": "MediumImagePath",
    "49": "OriginalImagePath",
    "50": "videoName",
    "51": "UpdateDate",
    "52": "oldtag",
    "53": "description",
    "54": "netwt",
    "55": "totalcolorstonepcs",
    "56": "colorstoneshape",
    "57": "diamondclarityEcat_id",
    "58": "diamondcolorEcat_id",
    "59": "diamondshapeEcat_id",
    "60": "MasterManagement_labname",
    "61": "CollectionName",
    "62": "CategoryName",
    "63": "SubCategoryName",
    "64": "BrandName",
    "65": "GenderName",
    "66": "OcassionName",
    "67": "ThemeName",
    "68": "MetalTypeName",
    "69": "MetalColorName",
    "70": "MetalPurity",
    "71": "SetDno",
    "72": "similarband",
    "73": "DefaultSize",
    "74": "imagepath",
    "75": "ProducttypeName",
    "76": "ImageName",
    "77": "VideoName",
    "78": "DesignFolderName"
  };

  let storeinit = JSON.parse(localStorage.getItem("storeInit"));
  let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));
  let menuparam = JSON.parse(localStorage.getItem("menuparams"));

  const islogin = JSON.parse(localStorage.getItem("LoginUser"));

  // let diaQc = findDiaQcId(obj?.dia ?? loginInfo?.cmboDiaQCid)[0]
  // let csQc = findCsQcId(obj?.cs ?? loginInfo?.cmboCSQCid)[0]
  // let mtiddd =  obj?.mt === undefined ? loginInfo?.cmboMetalType : obj?.mt
  // let mtid = findMetal(loginInfo?.cmboMetalType)[0]?.Metalid
  // console.log("diaa prod api",mtid);

//   {
//     PackageId: "1",
//     autocode: "0000081",
//     designno: "D24705E",
//     FrontEnd_RegNo: "80kgizbiduw5e7gg",
//     Customerid: "10",
//     FilterKey: "Album",
//     FilterVal: "P15",
//     PageNo: "1",
//     PageSize: "50",
//     SortBy: "In Stock",
//     Laboursetid: "1",
//     diamondpricelistname: "Priyankdiam",
//     colorstonepricelistname: "Priyankcs",
//     SettingPriceUniqueNo: "1",
//     Metalid: "1",
//     DiaQCid: "1,2",
//     CsQCid": "7,4",
//     IsStockWebsite: "0",
//     Size: "9mm",
//     IsFromDesDet: "1"
// }


  let diaQc = (obj?.dia === undefined ? loginInfo?.cmboDiaQCid : obj?.dia)
  let csQc = (obj?.cs === undefined ? loginInfo?.cmboCSQCid : obj?.cs)
  let mtid = (obj?.mt === undefined ? loginInfo?.MetalId : obj?.mt)


  const data = {
    PackageId: `${loginInfo?.PackageId ?? storeinit?.PackageId}`,
    autocode: '',
    FrontEnd_RegNo: `${storeinit?.FrontEnd_RegNo}`,
    Customerid: `${loginInfo?.id ?? 0}`,
    designno:'',
    FilterKey:`${MenuParams?.FilterKey ?? ""}`,
    FilterVal:`${MenuParams?.FilterVal ?? ""}`,
    FilterKey1:`${MenuParams?.FilterKey1 ?? ""}`,
    FilterVal1:`${MenuParams?.FilterVal1 ?? ""}`,
    FilterKey2:`${MenuParams?.FilterKey2 ?? ""}`,
    FilterVal2:`${MenuParams?.FilterVal2 ?? ""}`,
    SearchKey:`${serachVar ?? ""}`,
    PageNo:`${page}`,
    PageSize:`${storeinit?.PageSize}`,
    Metalid: `${obj?.mt ?? mtid}`,
    DiaQCid: `${diaQc}`,
    CsQCid: `${csQc}`,
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
    Max_Price: '',
    Min_Price: '',

    SortBy: "",
    Laboursetid: `${
      storeinit?.IsB2BWebsite == 0 && islogin == false
        ? storeinit?.pricemanagement_laboursetid
        : loginInfo?.pricemanagement_laboursetid
    }`,
    diamondpricelistname: `${
      storeinit?.IsB2BWebsite == 0 && islogin == false
        ? storeinit?.diamondpricelistname
        : loginInfo?.diamondpricelistname
    }`,
    colorstonepricelistname: `${
      storeinit?.IsB2BWebsite == 0 && islogin == false
        ? storeinit?.colorstonepricelistname
        : loginInfo?.colorstonepricelistname
    }`,
    SettingPriceUniqueNo: `${
      storeinit?.IsB2BWebsite == 0 && islogin == false
        ? storeinit?.SettingPriceUniqueNo
        : loginInfo?.SettingPriceUniqueNo
    }`,
    IsStockWebsite: `${storeinit?.IsStockWebsite}`,
    Size: "",
    IsFromDesDet: "",

  };

  let encData = JSON.stringify(data)

  let body = {
    con: `{\"id\":\"\",\"mode\":\"GETPRODUCTLIST\",\"appuserid\":\"${loginInfo?.userid ?? ""}\"}`,
    f: "onlogin (GETPRODUCTLIST)",
    p:btoa(encData),
    dp: encData,
  };

  let pdList = [];
  let pdResp = [];

  await CommonAPI(body).then((res) => {
    if(res){
      pdList=res?.Data.rd;
      pdResp=res?.Data
    }
  });

  return {pdList,pdResp}
};

export default ProductListApi;
