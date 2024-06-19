import React, { useEffect, useState } from 'react'
import './Index.modul.scss'
import { Storeinit } from '../../../../../utils/API/Home/Storeinit/Storeinit';
import { companyLogo } from '../../Recoil/atom';
import { useRecoilState } from 'recoil';
import TopSection from './TopVideo/TopSection';
import TheDifference from './TheDifference/TheDifference';
import PromotionBaner1 from './PromotionBanner1/PromotionBaner1';
import DaimondEveyone from './DaimondEveyone/DaimondEveyone';
import ShopByCategory from './ShopByCategory/ShopByCategory';
import PromotionBanner2 from './PromotionBanner2/PromotionBanner2';
import PromoSetSection from './PromosetSection/PromoSetSection';
import SustainAbility from './SustainAbility/SustainAbility';
import BottomBanner from './BottomBanner/BottomBanner';
import Footer from './Footer/Footer';
import BestSaller from './BestSaller/BestSaller';
import { Helmet } from 'react-helmet';
import NewArrival from './NewArrival/NewArrival';
import DesignSet from './DesignSet/DesignSet';
import TrendingView from './TrandingView/TrendingView';

function Home() {


  return (
    <div className='smiling_home_index_main'>

      <div className='smiling_home_index_Submain'>
        <TopSection />
        <TheDifference />
        <PromotionBaner1 />
        <DaimondEveyone />
        <ShopByCategory />
        <PromotionBanner2 />

        <DesignSet />
        <TrendingView />
        
        <PromoSetSection />

        <NewArrival />
        <SustainAbility />

        <BestSaller />
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