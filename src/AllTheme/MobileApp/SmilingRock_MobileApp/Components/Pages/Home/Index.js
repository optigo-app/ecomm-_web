import React, { useEffect, useState } from 'react'
import TopSection from './TopSection/TopSection';
import PromotionBaner1 from './PromotionBanner1/PromotionBaner1';
import TrendingView from './TrandingView/TrendingView';

const Home = () => {

    const [localData, setLocalData] = useState();

    useEffect(() => {
      let localData = JSON.parse(localStorage.getItem('storeInit'));
      setLocalData(localData);
      console.log('localDatalocalData', localData);
    }, [])

  return (
    <div>
        <TopSection />
        <PromotionBaner1 />
        <TrendingView />

    </div>
  )
}

export default Home;