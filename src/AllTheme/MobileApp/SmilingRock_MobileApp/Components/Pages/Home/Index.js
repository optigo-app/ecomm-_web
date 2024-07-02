import React, { useEffect, useState } from 'react'
import TopSection from './TopSection/TopSection';
import PromotionBaner1 from './PromotionBanner1/PromotionBaner1';
import TrendingView from './TrandingView/TrendingView';
import Album from './Album/Album';
import NewArrival from './NewArrival/NewArrival';
import BestSellerSection from './BestSellerSection/BestSellerSection';
import DesignSet from './DesignSet/DesignSet';
import BottomBanner from './BottomBanner/BottomBanner';
import './Home.modul.scss'

const Home = () => {

  const [localData, setLocalData] = useState();

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('storeInit'));
    setLocalData(localData);
    console.log('localDatalocalData', localData);
  }, [])

  return (
    <div className='smrMA_Home_main'>
      <TopSection />
      {localData?.IsHomeAlbum === 1 && <Album />}
      <PromotionBaner1 />
      {localData?.IsHomeTrending === 1 && <TrendingView />}
      {localData?.IsHomeNewArrival === 1 && < NewArrival />}
      {localData?.IsHomeBestSeller === 1 && < BestSellerSection />}
      {localData?.IsHomeDesignSet === 1 && < DesignSet />}
      <BottomBanner />
    </div>
  )
}

export default Home;