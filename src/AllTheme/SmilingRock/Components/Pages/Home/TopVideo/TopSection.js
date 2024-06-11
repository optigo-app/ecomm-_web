import React, { useRef, useState } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const TopSection = () => {

    const [loading, setLoading] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);
    const videoRef = useRef(null);
  
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
    <video
      ref={videoRef}
      width="500"
      autoPlay
      muted
      controls={!videoStarted} // Show controls only if the video hasn't started playing
      loop
      style={{ height: "auto", width: "100%" }}
      onLoadedData={handleVideoLoad}
      onPlay={handleVideoPlay}
    >
      <source src={`${storImagePath()}/images/HomePage/MainBanner/videos/HomepageMainBannerVideo.mp4`} type="video/mp4" />
    </video>
  </div>
  )
}

export default TopSection