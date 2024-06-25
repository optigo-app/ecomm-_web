import React, { useEffect, useState } from 'react'
import './Index.modul.scss'
import TopSection from './TopVideo/TopSection';
import TheDifference from './TheDifference/TheDifference';
import PromotionBaner1 from './PromotionBanner1/PromotionBaner1';
import ShopByCategory from './ShopByCategory/ShopByCategory';
import PromoSetSection from './PromosetSection/PromoSetSection';
import SustainAbility from './SustainAbility/SustainAbility';
import BottomBanner from './BottomBanner/BottomBanner';
import Footer from './Footer/Footer';
import TrendingView from './TrandingView/TrendingView';
import DesignSet from './DesignSet/DesignSet';
import Album from './Album/Album';
import NewArrival from './newArrival/NewArrival';

function Home() {

  const [localData, setLocalData] = useState();

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('storeInit'));
    setLocalData(localData);
    console.log('localDatalocalData', localData);
  },[])

  return (
    <div className='smiling_home_index_main'>

      <div className='smiling_home_index_Submain'>
        <TopSection />
        <TheDifference />
        <PromotionBaner1 />
        {localData?.IsHomeAlbum === 1 && <Album />}
        {localData?.IsHomeTrending === 1 && <TrendingView />}

        {/* <DaimondEveyone /> */}
        <ShopByCategory />
        {localData?.IsHomeNewArrival === 1 && <NewArrival />}

        {localData?.IsHomeDesignSet === 1 && <DesignSet />}


        {localData?.IsHomeBestSeller === 1 && <PromoSetSection />}

        {/* <SustainAbility /> */}

        {/* <BestSaller /> */}


        <BottomBanner />
        <Footer />
      </div>
      <div>
        <p style={{
          paddingBlock: '30px',
          margin: '0px',
          textAlign: 'center',
          color: 'white',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '1px'
        }} onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })}>BACK TO TOP</p>
      </div>
    </div>
  )
}

export default Home;