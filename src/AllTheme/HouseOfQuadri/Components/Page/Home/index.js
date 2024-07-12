import React from "react";
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
import ChatMenu from "./ChatMenu/ChatMenu";
const HomePage = () => {
  return (
    <div className="hoq_main_homepage">
      <ChatMenu/>
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
