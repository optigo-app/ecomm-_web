import React, { useEffect } from 'react'
import './Index.modul.scss'
import { Storeinit } from '../../../../../utils/API/Storeinit/Storeinit';
import { companyLogo } from '../../Recoil/atom';
import { useRecoilState } from 'recoil';
import TopSection from './TopVideo/TopSection';
import TheDifference from './TheDifference/TheDifference';
import PromotionBaner1 from './PromotionBanner1/PromotionBaner1';
import DaimondEveyone from './DaimondEveyone/DaimondEveyone';
import ShopByCategory from './ShopByCategory/ShopByCategory';

function Home() {

  const [companyTitleLogo, setCompanyTitleLogo] = useRecoilState(companyLogo)


  useEffect(() => {
    Storeinit('astore').then((res) => {
      setCompanyTitleLogo(res?.data?.Data?.rd[0]?.companylogo)
    }).catch((err) => console.log(err))
  }, [])

  return (
    <div className='smiling_home_index_main'>
      <div className='smiling_home_index_Submain'>
        <TopSection />
        <TheDifference />
        <PromotionBaner1 />
        <DaimondEveyone />
        <ShopByCategory />
        {/* <div className="main">
        <h1>SmilingRock</h1>
      </div>

      <div className='Submain'>
        <h1>Sub Main</h1>
      </div>

      <div className='Submain'>
        <h1>Sub Main 2</h1>
      </div> */}

      </div>
    </div>
  )
}

export default Home;