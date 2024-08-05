import React, { useEffect, useState } from "react";
import SmilingRock_App from "./AllTheme/SmilingRock/SmilingRock_App";
import DaimondTine_App from "./AllTheme/DaimondTine/DaimondTine_App";
import Elveester_App from "./AllTheme/Elveester/Elveester_App";
// import MobileApp_App from './AllTheme/MobileApp/MobileApp_App'
import { Storeinit } from "./utils/API/Home/Storeinit/Storeinit";
import { CurrencyComboAPI } from "./utils/API/Combo/CurrencyComboAPI";
import { MetalColorCombo } from "./utils/API/Combo/MetalColorCombo";
import { ColorStoneQualityColorComboAPI } from "./utils/API/Combo/ColorStoneQualityColorComboAPI";
import { DiamondQualityColorComboAPI } from "./utils/API/Combo/DiamondQualityColorComboAPI";
import { MetalTypeComboAPI } from "./utils/API/Combo/MetalTypeComboAPI";
import { useRecoilState, useRecoilValue } from "recoil";
import { Helmet } from "react-helmet";
import {
  companyLogo,
  loginState,
} from "./AllTheme/SmilingRock/Components/Recoil/atom";
import { dt_companyLogo } from "./AllTheme/DaimondTine/Components/Recoil/atom";
import { el_companyLogo } from "./AllTheme/Elveester/Components/Recoil/atom";
import SmilingRock_MobileApp_App from "./AllTheme/MobileApp/SmilingRock_MobileApp/SmilingRock_MobileApp_App";
import { smrMA_companyLogo } from "./AllTheme/MobileApp/SmilingRock_MobileApp/Components/Recoil/atom";
import Cookies from "js-cookie";
import HemratnaProcatalog_App from "./AllTheme/hemratnaProcatalog/HemratnaProcatalog_App";
import Procatalog_App from "./AllTheme/Pocatalog/Procatalog_App";
import HouseOfQuadri_App from "./AllTheme/HouseOfQuadri/HouseOfQuadri_App";

export default function ThemeRoutes() {

  const [themeNo, setThemeNo] = useState(3);
  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(companyLogo)
  const [dt_companyTitleLogo, dt_setCompanyTitleLogo] = useRecoilState(dt_companyLogo)
  const [el_companyTitleLogo, el_setCompanyTitleLogo] = useRecoilState(el_companyLogo)
  const [smrMA_companyTitleLogo, smrMA_setCompanyTitleLogo] = useRecoilState(smrMA_companyLogo)
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [favicon, setFavIcon] = useState();
  const islogin = useRecoilValue(loginState);

  useEffect(() => {
    let data = localStorage.getItem("storeInit");
    let Logindata = JSON.parse(localStorage.getItem("storeInit"));
    let logo = JSON?.parse(data);


    if (data) {
      if (Logindata) {
        if (Logindata?.IsPLWOn == 1) {
          setCompanyTitleLogo(Logindata?.Private_label_logo);
        }
      } else {
        setCompanyTitleLogo(logo?.companylogo);
      }
      dt_setCompanyTitleLogo(logo?.companylogo);
      el_setCompanyTitleLogo(logo?.companylogo);
    }
    Storeinit().then((response) => {
      if (response.status === 200) {
        setLoading(false);

        // setThemeNo(response?.data?.Data?.rd[0]?.Themeno);

        localStorage.setItem('storeInit', JSON.stringify(response.data.Data.rd[0]));
        localStorage.setItem('myAccountFlags', JSON.stringify(response.data.Data.rd1));
        localStorage.setItem('CompanyInfoData', JSON.stringify(response.data.Data.rd2[0]));
        let visiterId = response?.data.Data?.rd2[0]?.VisitorId
        const existingVisitorId = Cookies.get('visiterId');
        callAllApi();
        if (islogin == false) {
          if (!existingVisitorId) {
            Cookies.set('visiterId', visiterId, { path: '/', expires: 30 });
          } else {
            const expirationDate = Cookies.getJSON('visiterId')?.expires && new Date(Cookies.getJSON('visiterId').expires);
            if (expirationDate && expirationDate <= new Date()) {
              Cookies.remove('visiterId', { path: '/' });
            }
          }

          if (response?.data?.Data?.rd[0]?.Themeno === 1) {
            setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo);
          }

          if (response?.data?.Data?.rd[0]?.Themeno === 2) {
            dt_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo);
          }

          if (response?.data?.Data?.rd[0]?.Themeno === 3) {
            el_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo);
          }

          if (response?.data?.Data?.rd[0]?.Themeno === 4) {
            smrMA_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo);
          }

          let title = response?.data?.Data?.rd[0]?.companyname;
          let favIcon = response?.data?.Data?.rd[0]?.favicon;
          setTitle(title);
          setFavIcon(favIcon);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    })
      .catch((err) => console.log(err))
    // .finally(() => setLoading(false));
  }, []);

  const callAllApi = () => {
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"));
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }

    MetalTypeComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          localStorage.setItem("metalTypeCombo", data);
        }
      })
      .catch((err) => console.log(err));

    DiamondQualityColorComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          localStorage.setItem("diamondQualityColorCombo", data);
        }
      })
      .catch((err) => console.log(err));

    ColorStoneQualityColorComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          localStorage.setItem("ColorStoneQualityColorCombo", data);
        }
      })
      .catch((err) => console.log(err));

    CurrencyComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          localStorage.setItem("CurrencyCombo", data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <Helmet>
          <title>{title}</title>
          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
          <meta name="description" content={title} />
          <link rel="apple-touch-icon" href={favicon} />
          <link rel="manifest" href={favicon} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </Helmet>
      </div>

      {/* {loading ? (
        <div className="loading-container" style={{ textAlign: 'center', marginTop: '35%' }}>
          <img src={loadingGif} alt="Loading..." style={{width: '100%'}}/>
        </div>
      ) : (
        <> */}

      {themeNo === 1 && <SmilingRock_App />}

      {themeNo === 2 && <DaimondTine_App />}

      {themeNo === 3 && <Elveester_App />}

      {themeNo === 4 && <SmilingRock_MobileApp_App />}

      {themeNo === 5 && <HemratnaProcatalog_App />}

      {themeNo === 6 && <Procatalog_App />}

      {themeNo === 7 && <HouseOfQuadri_App />}

      {/* </>
      )} */}
    </>
  );
}
