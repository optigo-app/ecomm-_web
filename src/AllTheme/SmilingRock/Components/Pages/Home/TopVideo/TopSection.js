import React, { useEffect, useRef, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TopSection.modul.scss";

const TopSection = () => {
  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);
  const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
  const [localData, setLocalData] = useState();
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/Store_Init.txt`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const jsonData = JSON.parse(text);
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
    if (htmlContent) {
      setLocalData((prevData) => ({
        ...prevData,
        Blockno: htmlContent?.rd[0]?.Blockno,
      }));
    }
  }, [htmlContent]);

  // useEffect(() => {
  //   let localData = JSON.parse(sessionStorage.getItem("storeInit"));
  //   setLocalData(localData);
  // }, []);

  const handleVideoLoad = () => {
    setLoading(false);
    // Unmute the video once it's loaded
    setTimeout(() => { }, 0);

    videoRef.current.controls = false;
  };

  const handleVideoPlay = () => {
    setVideoStarted(true);
  };

  return (
    <div className="smr_topVideoMain" style={{ minHeight: "550px" }}>
      {localData?.Blockno === 2 && (
        <div>
          <img
            src={`${storImagePath()}/images/HomePage/Banner/HomeBanner.png`}
            style={{ width: "100%" }}
          />
        </div>
      )}

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
          <source
            src={`${storImagePath()}/images/HomePage/TopSection/HomepageMainBannerVideo.mp4`}
            type="video/mp4"
          />
        </video>
      }
      {/* 
{localData?.Blockno === 1 && storeInit?.IsPLW == 1 ? (
        <div>
          <img
            src={`${storImagePath()}/images/HomePage/MainBanner/mainTopBanner2.webp`}
            style={{ width: "100%" }}
          />
        </div>
      ) : (
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
          <source
            src={`${storImagePath()}/images/HomePage/TopSection/HomepageMainBannerVideo.mp4`}
            type="video/mp4"
          />
        </video>
      )} */}


    </div>
  );
};

export default TopSection;
