import React, { Suspense, startTransition, useEffect, useState } from 'react'
import {  storInitDataPath } from '../../../../../utils/Glob_Functions/GlobalFunction';
import './Index.modul.scss'
import { useRecoilValue } from 'recoil';
import { dt_homeLoading } from '../../Recoil/atom';

const DesignSet2  = React.lazy(()=>import('./DesignSet/DesignSet2'));
const TrendingView1  = React.lazy(()=>import('./TrandingView/TrendingView1'));
const BestSellerSection1  = React.lazy(()=>import('./BestSellerSection/BestSellerSection1'));
const Album1  = React.lazy(()=>import('./Album/Album1'));
const SocialMedia  = React.lazy(()=>import('./SocialMedia/SocialMedia'));
const NewArrival  = React.lazy(()=>import('./NewArrival/NewArrival'));
const Footer  = React.lazy(()=>import('./Footer/Footer'));
const TopSection  = React.lazy(()=>import('./TopSection/TopSection'));

function Home() {

  const [localData, setLocalData] = useState();
  const [htmlContent, setHtmlContent] = useState("");
  const isLoadingHome = useRecoilValue(dt_homeLoading);


  useEffect(() => {
    fetch(`${storInitDataPath()}/StoreInit.json`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const jsonData = JSON?.parse(text);
          setHtmlContent(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  }, []);

  useEffect(() => {
    let localData = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localData);
  }, []);

  // useEffect(() => {
  //   let localData = JSON.parse(sessionStorage.getItem("storeInit"));
  //   // Wrap the state change in startTransition
  //   startTransition(() => {
  //     setLocalData(localData);
  //   });
  // }, []);

  return (
    <>


      {/* {htmlContent?.rd && htmlContent?.rd.length > 0 &&
        (
          <div>
            <TopSection />
            {htmlContent?.rd[0]?.IsHomeAlbum === 1 && <Album1 />}
            {htmlContent?.rd[0]?.IsHomeBestSeller === 1 && <BestSellerSection1 />}
            {htmlContent?.rd[0]?.IsHomeNewArrival === 1 && <NewArrival />}
            {htmlContent?.rd[0]?.IsHomeTrending === 1 && <TrendingView1 />}
            {htmlContent?.rd[0]?.IsHomeDesignSet === 1 && <DesignSet2 />}
            {isLoadingHome == true ?
              <div className="dat_Home_loader_container">
                <div className="dt_Home_loader"></div>
              </div>
              :
              <>
                <SocialMedia />
                <Footer />
              </>
            }
          </div>
        )} */}


        {htmlContent?.rd && htmlContent?.rd.length > 0 && (
  <div role="main" aria-labelledby="mainContent">
    {/* Top Section with aria-label */}
    <section aria-labelledby="topSection" role="region">
              <Suspense fallback={<></>}>
      <TopSection />
            </Suspense>
    </section>

    {/* Album Section with aria-label */}
    {htmlContent?.rd[0]?.IsHomeAlbum === 1 && (
      <section aria-labelledby="albumSection" role="region">
                <Suspense fallback={<></>}>
        <Album1 />
              </Suspense>
      </section>
    )}

    {/* Best Seller Section with aria-label */}
    {htmlContent?.rd[0]?.IsHomeBestSeller === 1 && (
      <section aria-labelledby="bestSellerSection" role="region">
        <Suspense fallback={<></>}>
        <BestSellerSection1 />
      </Suspense>
      </section>
    )}

    {/* New Arrival Section with aria-label */}
    {htmlContent?.rd[0]?.IsHomeNewArrival === 1 && (
      <section aria-labelledby="newArrivalSection" role="region">
                <Suspense fallback={<></>}>
        <NewArrival />
              </Suspense>
      </section>
    )}

    {/* Trending Section with aria-label */}
    {htmlContent?.rd[0]?.IsHomeTrending === 1 && (
      <section aria-labelledby="trendingSection" role="region">
                <Suspense fallback={<></>}>
        <TrendingView1 />
              </Suspense>
      </section>
    )}

    {/* Design Set Section with aria-label */}
    {htmlContent?.rd[0]?.IsHomeDesignSet === 1 && (
      <section aria-labelledby="designSetSection" role="region">
                <Suspense fallback={<></>}>
      </Suspense>
        <DesignSet2 />
      </section>
    )}

    {/* Loading Spinner with ARIA live region */}
   {isLoadingHome === true ? (
  <div className="dat_Home_loader_container" role="status" aria-live="polite" aria-label="Content is loading, please wait.">
    <div className="dt_Home_loader"></div>
  </div>
) : (
  <>
    {/* Social Media and Footer sections */}
    <section aria-labelledby="socialMediaSection" role="region">
              <Suspense fallback={<></>}>
      <SocialMedia />
            </Suspense>
    </section>
    <section aria-labelledby="footerSection" role="contentinfo">
              <Suspense fallback={<></>}>
      <Footer />
            </Suspense>
    </section>
  </>
)}
  </div>
)}

    </>
  )
}

export default Home;

// {isLoadingHome === true ? (
//   <div className="dat_Home_loader_container" role="status" aria-live="polite" aria-label="Content is loading, please wait.">
//     <div className="dt_Home_loader"></div>
//   </div>
// ) : (
//   <>
//     {/* Social Media and Footer sections */}
//     <section aria-labelledby="socialMediaSection" role="region">
//               <Suspense fallback={<>...</>}>
//       <SocialMedia />
//             </Suspense>
//     </section>
//     <section aria-labelledby="footerSection" role="contentinfo">
//               <Suspense fallback={<>...</>}>
//       <Footer />
//             </Suspense>
//     </section>
//   </>
// )}