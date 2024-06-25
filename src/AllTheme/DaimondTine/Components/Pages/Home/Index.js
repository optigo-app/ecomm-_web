import React from 'react'
import TopSection from './TopSection/TopSection';
import Footer from './Footer/Footer';
import NewArrival from './NewArrival/NewArrival';
import WidgetsComponents from './WidgetsComponents/WidgetsComponents';

function Home() {
  return (
    <div>
         <TopSection />

         <NewArrival />

         <WidgetsComponents />
         <Footer />

    </div>
  )
}

export default Home;