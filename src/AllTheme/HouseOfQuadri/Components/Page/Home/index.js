import React, { useEffect } from "react";
import "./index.modul.scss";
import TopSlider from "./Slider/Slider";
import TabSection from "./TabSection/TabSection";
import Collection from "./Collection/Collection";
import FeaturedBrand from "./FeaturedBrand/FeaturedBrand";
import ReviewTab from "./ReviewTab/ReviewTab";
import CategoryTab from "./CategoryTab/CategoryTab";
import ReadyToShip from "./ReadyToShip/ReadyToShip";
import ImageBannerTab from "./ImageBannerTab/ImageBannerTab";
import ScrollTriggerTab from "./ScrollTriggerTab/ScrollTriggerTab";
import SocialTab from "./SocialTab/SocialTab";
import FaqSection from "./FaQSection/FaqSection";
import InfoSection from "./InfoSection/InfoSection";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  return (
    <div className="hoq_main_homepage">
      <TopSlider />
      <TabSection />
      <Collection />
      <FeaturedBrand />
      <ReviewTab />
      <CategoryTab />
      <ReadyToShip />
      <ImageBannerTab />
      <ScrollTriggerTab />
      <SocialTab />
      <InfoSection />
      <FaqSection />
    </div>
  );
};

export default HomePage;
