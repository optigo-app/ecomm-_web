import React from 'react'
import TopSection from './TopSection/TopSection';
import Footer from './Footer/Footer';
import NewArrival from './NewArrival/NewArrival';
import WidgetsComponents from './WidgetsComponents/WidgetsComponents';
import SocialMedia from './SocialMedia/SocialMedia';

function Home() {
  return (
    <div>
         <TopSection />

         <NewArrival />

         <WidgetsComponents />
         <SocialMedia />
         <Footer />

    </div>
  )
}

export default Home;