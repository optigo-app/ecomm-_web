import React, { useEffect, useState } from 'react'
import SmilingRock_App from './AllTheme/SmilingRock/SmilingRock_App'
import DaimondTine_App from './AllTheme/DaimondTine/DaimondTine_App'
import Elveester_App from './AllTheme/Elveester/Elveester_App'
// import MobileApp_App from './AllTheme/MobileApp/MobileApp_App'
import { Storeinit } from './utils/API/Home/Storeinit/Storeinit'
import { CurrencyComboAPI } from './utils/API/Combo/CurrencyComboAPI'
import { MetalColorCombo } from './utils/API/Combo/MetalColorCombo'
import { ColorStoneQualityColorComboAPI } from './utils/API/Combo/ColorStoneQualityColorComboAPI'
import { DiamondQualityColorComboAPI } from './utils/API/Combo/DiamondQualityColorComboAPI'
import { MetalTypeComboAPI } from './utils/API/Combo/MetalTypeComboAPI'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Helmet } from 'react-helmet'
import { companyLogo } from './AllTheme/SmilingRock/Components/Recoil/atom'
import { dt_companyLogo } from './AllTheme/DaimondTine/Components/Recoil/atom'
import { el_companyLogo } from './AllTheme/Elveester/Components/Recoil/atom'
import SmilingRock_MobileApp_App from './AllTheme/MobileApp/SmilingRock_MobileApp/SmilingRock_MobileApp_App'
import { smrMA_companyLogo } from './AllTheme/MobileApp/SmilingRock_MobileApp/Components/Recoil/atom'

export default function ThemeRoutes() {

  const [themeNo, setThemeNo] = useState(1);
  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(companyLogo)
  const [dt_companyTitleLogo, dt_setCompanyTitleLogo] = useRecoilState(dt_companyLogo)
  const [el_companyTitleLogo, el_setCompanyTitleLogo] = useRecoilState(el_companyLogo)
  const [smrMA_companyTitleLogo, smrMA_setCompanyTitleLogo] = useRecoilState(smrMA_companyLogo)

  const [title, setTitle] = useState();
  const [favicon, setFavIcon] = useState();

  useEffect(() => {
    let data = localStorage.getItem('storeInit');
    if (data) {
      let logo = JSON.parse(data);
      setCompanyTitleLogo(logo?.companylogo)
      dt_setCompanyTitleLogo(logo?.companylogo)
      el_setCompanyTitleLogo(logo?.companylogo)
    }
    Storeinit().then((response) => {
      if (response.status === 200) {

        // setThemeNo(response?.data?.Data?.rd[0]?.Themeno);

        if(response?.data?.Data?.rd[0]?.Themeno === 1){
          setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo)
        }

        if(response?.data?.Data?.rd[0]?.Themeno === 2){
          dt_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo)
        }

        if(response?.data?.Data?.rd[0]?.Themeno === 3){
          el_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo)
        }

        // if(response?.data?.Data?.rd[0]?.Themeno === 3){
          smrMA_setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo)
        // }

        
        localStorage.setItem('storeInit', JSON.stringify(response.data.Data.rd[0]));
        localStorage.setItem('myAccountFlags', JSON.stringify(response.data.Data.rd1));
        localStorage.setItem('CompanyInfoData', JSON.stringify(response.data.Data.rd2[0]));
        let title = response?.data?.Data?.rd[0]?.companyname
        let favIcon = response?.data?.Data?.rd[0]?.favicon
        setTitle(title);
        setFavIcon(favIcon)
        callAllApi();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }).catch((err) => console.log(err))
  }, [])


  const callAllApi = () => {
    MetalTypeComboAPI().then((response) => {
      if (response?.Data?.rd) {
        let data = JSON.stringify(response?.Data?.rd)
        localStorage.setItem('metalTypeCombo', data)
      }
    }).catch((err) => console.log(err))


    DiamondQualityColorComboAPI().then((response) => {
      if (response?.Data?.rd) {
        let data = JSON.stringify(response?.Data?.rd)
        localStorage.setItem('diamondQualityColorCombo', data)
      }
    }).catch((err) => console.log(err))

    ColorStoneQualityColorComboAPI().then((response) => {
      if (response?.Data?.rd) {
        let data = JSON.stringify(response?.Data?.rd)
        localStorage.setItem('ColorStoneQualityColorCombo', data)
      }
    }).catch((err) => console.log(err))

    MetalColorCombo().then((response) => {
      if (response?.Data?.rd) {
        let data = JSON.stringify(response?.Data?.rd)
        localStorage.setItem('MetalColorCombo', data)
      }
    }).catch((err) => console.log(err))

    CurrencyComboAPI().then((response) => {
      if (response?.Data?.rd) {
        let data = JSON.stringify(response?.Data?.rd)
        localStorage.setItem('CurrencyCombo', data)
      }
    }).catch((err) => console.log(err))

  }

  return (

    <>
      <div>
        <Helmet>
          <title>{title}</title>
          <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
          <meta name="description" content={title} />
          <link rel="apple-touch-icon" href={favicon} />
          <link rel="manifest" href={favicon} />
        </Helmet>
      </div>
      {themeNo === 4 && <SmilingRock_App />}

      {themeNo === 2 && <DaimondTine_App />}

      {themeNo === 3 && <Elveester_App />}

      {themeNo === 1 && <SmilingRock_MobileApp_App />}
    </>
  )
}
