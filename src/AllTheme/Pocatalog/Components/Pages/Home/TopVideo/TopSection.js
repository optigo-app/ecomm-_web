import React, { useEffect, useRef, useState } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const TopSection = () => {

  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);

  const [localData, setLocalData] = useState();

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('storeInit'));
    setLocalData(localData);
    console.log('localDatalocalData', localData);
  }, [])

  const handleVideoLoad = () => {
    setLoading(false);
    // Unmute the video once it's loaded
    setTimeout(() => {

    }, 0);

    videoRef.current.controls = false;
  };

  const handleVideoPlay = () => {
    setVideoStarted(true);
  };


  return (
    <div>

      {localData?.Blockno === 1 &&
        <video
          ref={videoRef}
          width="500"
          autoPlay
          muted
          controls={!videoStarted} 
          loop
          style={{ height: "auto", width: "100%" }}
          onLoadedData={handleVideoLoad}
          onPlay={handleVideoPlay}
        >
          <source src={`${storImagePath()}/images/HomePage/MainBanner/videos/HomepageMainBannerVideo.mp4`} type="video/mp4" />
        </video>}

      {localData?.Blockno === 2 &&
        <div>
          <img src={`${storImagePath()}/images/HomePage/MainBanner/mainTopBanner.jpg`} style={{ width: '100%' }} />
        </div>

      }
    </div>
  )
}

export default TopSection