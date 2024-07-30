import React, { useEffect, useState } from 'react'
import TopSection from './TopSection/TopSection';
import Footer from './Footer/Footer';
import NewArrival from './NewArrival/NewArrival';
import WidgetsComponents from './WidgetsComponents/WidgetsComponents';
import SocialMedia from './SocialMedia/SocialMedia';
import Album1 from './Album/Album1';
import BestSellerSection1 from './BestSellerSection/BestSellerSection1';
import TrendingView1 from './TrandingView/TrendingView1';
import DesignSet1 from './DesignSet/DesignSet1';
import DesignSet2 from './DesignSet/DesignSet2';

function Home() {

  const [localData, setLocalData] = useState();

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("storeInit"));
    setLocalData(localData);
  }, []);

  return (
    <div>
         <TopSection />
         {localData?.IsHomeAlbum === 1 && <Album1 />}
         {localData?.IsHomeBestSeller === 1 && <BestSellerSection1 />}
         {localData?.IsHomeNewArrival === 1 && <NewArrival />}
         {localData?.IsHomeTrending === 1 && <TrendingView1 />}
         {localData?.IsHomeDesignSet === 1 && <DesignSet2 />}
         {/* <WidgetsComponents /> */}
         <SocialMedia />
         <Footer />
    </div>
  )
}

export default Home;