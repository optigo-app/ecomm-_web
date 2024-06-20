import React, { useEffect, useState } from 'react'
import Header from './Components/Pages/Home/Header/Header'
import { Storeinit } from '../../utils/API/Home/Storeinit/Storeinit'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dt_companyLogo, dt_loginState } from './Components/Recoil/atom'
import { MetalTypeComboAPI } from '../../utils/API/Combo/MetalTypeComboAPI'
import { DiamondQualityColorComboAPI } from '../../utils/API/Combo/DiamondQualityColorComboAPI'
import { ColorStoneQualityColorComboAPI } from '../../utils/API/Combo/ColorStoneQualityColorComboAPI'
import { MetalColorCombo } from '../../utils/API/Combo/MetalColorCombo'
import { CurrencyComboAPI } from '../../utils/API/Combo/CurrencyComboAPI'

const DaimondTine_App = () => {

  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(dt_companyLogo)
  const islogin = useRecoilValue(dt_loginState)

  const [title, setTitle] = useState();
  const [favicon, setFavIcon] = useState();

  useEffect(() => {
    let data = localStorage.getItem('storeInit');
    if (data) {
      let logo = JSON.parse(data);
      setCompanyTitleLogo(logo?.companylogo)
    }
    Storeinit().then((response) => {
      if (response.status === 200) {
        setCompanyTitleLogo(response?.data?.Data?.rd[0]?.companylogo)
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
    <div>

      <Header />
    </div>
  )
}

export default DaimondTine_App