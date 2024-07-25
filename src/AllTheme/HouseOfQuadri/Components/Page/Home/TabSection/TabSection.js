import React from "react";
import "./TabSection.modul.scss";
import { TabImage } from "../../../Constants/TabImages";
import { Link } from "react-router-dom";
const TabSection = () => {
  return (
    <div className="hoq_main_TabSection">
      <div className="header">
        <h1>Solitaire Rings</h1>
        <button>View All</button>
      </div>
      <div className="tab_card">
        {TabImage?.map((val, i) => {
          return (
            <div className="TabCard_main">
              <div className="cardhover">
                <img src={val?.FrontImg} alt={val?.id} />
                <div className="overlay_img">
                  <img src={val?.BackerImg} alt={val?.id} />
                </div>
              </div>
              <div className="tab_hover_Details">
                <h3>{i + 1} ct Heart Ring</h3>
                <small>INR 79,000</small>
              </div>
            </div>
          );
        })}
        <div className="TabCard_main mobile-only">
          <div className="box">
            <Link to={"/"}>View All 106 Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSection;

// import React, { useEffect, useState } from "react";
// import "./TabSection.modul.scss";
// import { TabImage } from "../../../Constants/TabImages";
// import { Link, useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { Hoq_loginState } from "../../../Recoil/atom";
// import Cookies from "js-cookie";
// import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
// import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";

// const TabSection = () => {
//   const [newArrivalData, setNewArrivalData] = useState("");
//   const [imageUrl, setImageUrl] = useState();
//   const navigation = useNavigate();
//   const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
//   const [storeInit, setStoreInit] = useState({});
//   const islogin = useRecoilValue(Hoq_loginState);

//   useEffect(() => {
//     const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
//     const storeInit = JSON.parse(localStorage.getItem("storeInit"));
//     const { IsB2BWebsite } = storeInit;
//     const visiterID = Cookies.get("visiterId");
//     let finalID;
//     if (IsB2BWebsite == 0) {
//       finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
//     } else {
//       finalID = loginUserDetail?.id || "0";
//     }
//     let storeinit = JSON.parse(localStorage.getItem("storeInit"));
//     setStoreInit(storeinit);

//     let data = JSON.parse(localStorage.getItem("storeInit"));
//     setImageUrl(data?.DesignImageFol);

//     Get_Tren_BestS_NewAr_DesigSet_Album("GETNewArrival", finalID)
//       .then((response) => {
//         if (response?.Data?.rd) {
//           setNewArrivalData(response?.Data?.rd);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const ImageGenrate = (product) => {
//     return product?.ImageCount >= 1
//       ? `${imageUrl}${newArrivalData && product?.designno}_1.${
//           newArrivalData && product?.ImageExtension
//         }`
//       : "noImageFound";
//   };
//   // http://zen/R50B3/UFS/demostoreQI9S5BDATC0M1KYJH_uKey/Design_Image/D24705E_1.jpg
//   useEffect(() => {}, []);
//   return (
//     <div className="hoq_main_TabSection">
//       <div className="header">
//         <h1>NEW ARRIVALS</h1>
//         <button>View All</button>
//       </div>
//       <div className="tab_card">
//         {newArrivalData?.slice(0, 4)?.map((val, i) => {
//           return (
//             <div className="TabCard_main">
//               <div className="cardhover">
//                 <img src={ImageGenrate(val)} alt={val?.id} />
//                 <div className="overlay_img">
//                   <img src={val?.BackerImg} alt={val?.id} />
//                 </div>
//               </div>
//               <div className="tab_hover_Details">
//                 <h3>{i + 1} ct Heart Ring</h3>
//                 <small>INR 79,000</small>
//               </div>
//             </div>
//           );
//         })}
//         <div className="TabCard_main mobile-only">
//           <div className="box">
//             <Link to={"/"}>View All 106 Products</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TabSection;
