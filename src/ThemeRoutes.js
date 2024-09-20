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
import { companyLogo, companyLogoM, loginState } from "./AllTheme/SmilingRock/Components/Recoil/atom";
import { dt_companyLogo } from "./AllTheme/DaimondTine/Components/Recoil/atom";
import { el_companyLogo } from "./AllTheme/Elveester/Components/Recoil/atom";
import SmilingRock_MobileApp_App from "./AllTheme/MobileApp/SmilingRock_MobileApp/SmilingRock_MobileApp_App";
import { smrMA_companyLogo } from "./AllTheme/MobileApp/SmilingRock_MobileApp/Components/Recoil/atom";
import Cookies from "js-cookie";
import HemratnaProcatalog_App from "./AllTheme/hemratnaProcatalog/HemratnaProcatalog_App";
import Procatalog_App from "./AllTheme/Pocatalog/Procatalog_App";
import HouseOfQuadri_App from "./AllTheme/HouseOfQuadri/HouseOfQuadri_App";
import ForEveryRoutes from "./AllTheme/Forevery/ForeveryRoutes";
import Procatalog_MobileApp_App from "./AllTheme/MobileApp/Procatalog_MobileApp/Procatalog_MobileApp_App";
import StamFordJewels_App from "./AllTheme/StamFordJewels/StamFordJewels_App";
import RoopJewellers_App from "./AllTheme/RoopJewellers/RoopJewellers_App";
import MalakanJewels_App from "./AllTheme/MalakanJwewls/MalakanJewels_App";
import { storImagePath } from "./utils/Glob_Functions/GlobalFunction";
import { Helmet } from "react-helmet";
import SEO from "./utils/Seo/Seo";
import { proCat_companyLogo, proCat_companyLogoM } from "./AllTheme/Pocatalog/Components/Recoil/atom";

export default function ThemeRoutes() {

  const [themeNo, setThemeNo] = useState()
  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(companyLogo)
  const [companyTitleLogoM, setCompanyTitleLogoM] = useRecoilState(companyLogoM)
  const [dt_companyTitleLogo, dt_setCompanyTitleLogo] = useRecoilState(dt_companyLogo)
  const [el_companyTitleLogo, el_setCompanyTitleLogo] = useRecoilState(el_companyLogo)
  const [smrMA_companyTitleLogo, smrMA_setCompanyTitleLogo] = useRecoilState(smrMA_companyLogo)
  const [proCatM_companyTitleLogo, proCatM_setCompanyTitleLogo] = useRecoilState(proCat_companyLogoM)
  const [proCat_companyTitleLogo, proCat_setCompanyTitleLogo] = useRecoilState(proCat_companyLogo)

  const [title, setTitle] = useState();

  const [favicon, setFavIcon] = useState();
  const islogin = useRecoilValue(loginState);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/Store_Init.txt`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const jsonData = JSON?.parse(text);
          console.log(jsonData, "hoq")
          setHtmlContent(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);

  useEffect(() => {
    let data = sessionStorage.getItem("storeInit");
    let Logindata = JSON.parse(sessionStorage.getItem("storeInit"));
    let SessionData = JSON.parse(sessionStorage.getItem("storeInit"));
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

    if (!SessionData) {
      Storeinit()
        .then((response) => {
          if (response.status === 200 && response?.data?.Data) {
            setThemeNo(response?.data?.Data?.rd[0]?.Themeno);
            let title = response?.data?.Data?.rd[0]?.companyname;
            let favIcon = response?.data?.Data?.rd[0]?.favicon;
            setTitle(title);
            setFavIcon(favIcon);
            console.log(response.data.Data.rd1, response.data.Data.rd[0]);
            let visiterId = response?.data.Data?.rd2[0]?.VisitorId;
            sessionStorage.setItem("storeInit", JSON.stringify(response.data.Data.rd[0]));
            sessionStorage.setItem("myAccountFlags", JSON.stringify(response.data.Data.rd1));
            sessionStorage.setItem("CompanyInfoData", JSON.stringify(response.data.Data.rd2[0]));
            const existingVisitorId = Cookies.get("visiterId");
            if (!existingVisitorId) {
              Cookies.set("visiterId", visiterId, { path: "/", expires: 30 });
            } else {
              try {
                const visitorIdCookie = JSON.parse(Cookies.get("visiterId"));
                const expirationDate = visitorIdCookie?.expires && new Date(visitorIdCookie.expires);
                if (expirationDate && expirationDate <= new Date()) {
                  Cookies.remove("visiterId", { path: "/" });
                }
              } catch (e) {
                console.error("Error parsing visiterId cookie:", e);
              }
            }

            if (response?.data?.Data?.rd[0]?.Themeno === 1) {
              setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo);
              setCompanyTitleLogoM(response?.data?.Data?.rd[0]?.companyMlogo);
            }

            if (response?.data?.Data?.rd[0]?.Themeno === 2) {
              dt_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo);
            }

            if (response?.data?.Data?.rd[0]?.Themeno === 3) {
              el_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo);
            }

            if (response?.data?.Data?.rd[0]?.Themeno === 6) {
              proCat_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo);
              proCatM_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companyMlogo);
            }

            if (response?.data?.Data?.rd[0]?.Themeno === 4) {
              smrMA_setCompanyTitleLogo(
                response?.data?.Data?.rd[0]?.companylogo
              );
            }

            if (response?.data?.Data) {
              callAllApi(response?.data?.Data);
            }
            // let title = response?.data?.Data?.rd[0]?.companyname;
            let title1 = response?.data?.Data?.rd[0]?.BrowserTitle;
            // let title = response?.data?.Data?.rd[0]?.companyname;
            // let favIcon = response?.data?.Data?.rd[0]?.favicon;
            setTitle(title1);
            setFavIcon(favIcon);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      setThemeNo(SessionData?.Themeno);
    }
    let title = SessionData?.companyname;
    let favIcon = SessionData?.favicon;
    setTitle(title);
    setFavIcon(favIcon);
    // .finally(() => setLoading(false));
  }, []);

  const callAllApi = (Data) => {
    const loginUserDetail = JSON?.parse(sessionStorage.getItem("loginUserDetail"));
    const { IsB2BWebsite } = Data;
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
          // sessionStorage.setItem("metalTypeCombo", data);
          sessionStorage.setItem("metalTypeCombo", data);
        }
      })
      .catch((err) => console.log(err));

    DiamondQualityColorComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          // sessionStorage.setItem("diamondQualityColorCombo", data);
          sessionStorage.setItem("diamondQualityColorCombo", data);
        }
      })
      .catch((err) => console.log(err));


    MetalColorCombo(finalID).then((response) => {
      if (response?.Data?.rd) {
        let data = JSON.stringify(response?.Data?.rd)
        // sessionStorage.setItem('MetalColorCombo', data)
        sessionStorage.setItem('MetalColorCombo', data)
      }
    }).catch((err) => console.log(err))

    ColorStoneQualityColorComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          // sessionStorage.setItem("ColorStoneQualityColorCombo", data);
          sessionStorage.setItem("ColorStoneQualityColorCombo", data);
        }
      })
      .catch((err) => console.log(err));

    CurrencyComboAPI(finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          let data = JSON.stringify(response?.Data?.rd);
          // sessionStorage.setItem("CurrencyCombo", data);
          sessionStorage.setItem("CurrencyCombo", data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />

          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
          <link rel="apple-touch-icon" href={favicon} />
          <link rel="icon" sizes="192x192" href={favicon} />
          <link rel="icon" sizes="512x512" href={favicon} />
          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
          <meta name="description" content={title} />
          <link rel="icon" href={`${storImagePath()}/logo-icon/favicon1.png`} type="image/x-icon" />

          {/* Apple Touch Icon */}
          <link rel="apple-touch-icon" sizes="180x180" href={`${storImagePath()}/logo-icon/apple-touch-icon.png`} />

          {/* Android Chrome Icons */}
          <link rel="icon" type="image/png" sizes="192x192" href={`${storImagePath()}/logo-icon/androidCh1.png`} />
          <link rel="icon" type="image/png" sizes="512x512" href={`${storImagePath()}/logo-icon/androidCh2.png`} />

          {/* Safari Pinned Tab Icon */}
          <link rel="mask-icon" href={`${storImagePath()}/logo-icon/apple-touch-icon.png`} />

          {/* Microsoft Tile Icons */}
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content={`${storImagePath()}/logo-icon/androidCh2.png`} />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Helmet>

      </div>

      {htmlContent?.rd && htmlContent?.rd.length > 0 &&
        (
          <>
            {htmlContent?.rd[0]?.Themeno === 1 && <SmilingRock_App />}

            {htmlContent?.rd[0]?.Themeno === 2 && <DaimondTine_App />}

            {htmlContent?.rd[0]?.Themeno === 3 && <Elveester_App />}

            {htmlContent?.rd[0]?.Themeno === 4 && <SmilingRock_MobileApp_App />}

            {htmlContent?.rd[0]?.Themeno === 5 && <HemratnaProcatalog_App />}

            {htmlContent?.rd[0]?.Themeno === 6 && <Procatalog_App />}

            {htmlContent?.rd[0]?.Themeno === 7 && <HouseOfQuadri_App />}

            {htmlContent?.rd[0]?.Themeno === 8 && <ForEveryRoutes />}

            {htmlContent?.rd[0]?.Themeno === 9 && <Procatalog_MobileApp_App />}

            {htmlContent?.rd[0]?.Themeno === 10 && <StamFordJewels_App />}

            {htmlContent?.rd[0]?.Themeno === 11 && <RoopJewellers_App />}

            {htmlContent?.rd[0]?.Themeno === 12 && <MalakanJewels_App />}
          </>
        )
      }
    </>
  );
}
