import { CommonAPI } from "../CommonAPI/CommonAPI";


const ProductListApi = async (filterObj={},page,obj={},mainData = "",visiterId,sortby="") => {

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
       console.log("mainData",mainData);

      // if(mainData?.split("=")[0] == "AlbumName"){
      //   MenuParams.FilterKey = atob(mainData)?.split("=")[0]
      //   MenuParams.FilterVal = atob(mainData)?.split("=")[1]
      //   return;
      // } 

      if(mainData?.split("=")[0] == "S"){
        serachVar = JSON.parse(atob(mainData.split("=")[1]))
        console.log("serachVar",JSON.parse(atob(mainData.split("=")[1])))
      }else{
        MenuParams.FilterKey = atob(mainData)
        MenuParams.FilterVal = atob(mainData)
      }
    }
   }

   console.log("serachVar",serachVar);

  let storeinit = JSON.parse(localStorage.getItem("storeInit"));
  let loginInfo = JSON.parse(localStorage.getItem("loginUserDetail"));
  let menuparam = JSON.parse(localStorage.getItem("menuparams"));

  const islogin = JSON.parse(localStorage.getItem("LoginUser")) ?? false;

  const customerId = storeinit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo.id ?? 0;
  const customerEmail = storeinit?.IsB2BWebsite == 0 && islogin == false || islogin == null  ? visiterId : loginInfo.email1 ?? "";

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


  let diaQc = (obj?.dia === undefined ?(loginInfo?.cmboDiaQCid ?? storeinit?.cmboDiaQCid): obj?.dia)
  let csQc = (obj?.cs === undefined ? (loginInfo?.cmboCSQCid ?? storeinit?.cmboCSQCid) : obj?.cs)
  let mtid = (obj?.mt === undefined ? (loginInfo?.MetalId  ??  storeinit?.MetalId): obj?.mt)


  const data = {
    PackageId: `${loginInfo?.PackageId ?? storeinit?.PackageId}`,
    autocode: '',
    FrontEnd_RegNo: `${storeinit?.FrontEnd_RegNo}`,
    Customerid: `${customerId ?? 0}`,
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

    SortBy: `${sortby ?? ""}`,
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
    con: `{\"id\":\"\",\"mode\":\"GETPRODUCTLIST\",\"appuserid\":\"${customerEmail?? ""}\"}`,
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
