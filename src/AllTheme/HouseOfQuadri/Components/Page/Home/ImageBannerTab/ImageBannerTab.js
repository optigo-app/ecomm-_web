import React from "react";
import "./ImageBannerTab.modul.scss";

const ImageBannerTab = () => {
  return (
    <>
      <div className="hoq_main_ImageBannerTab">
        <div className="banner">
          <img
            src="https://houseofquadri.com/cdn/shop/files/homepage_icons_2_6402e508-28b4-437d-93f9-793d67faebf5_1600x.png?v=1712319161"
            alt=""
          />
        </div>
        <button>
          <a href="https://cdn.shopify.com/s/files/1/0643/8731/8014/files/IGI_CERTIFICATE_COPY.pdf?v=1655287503">
            View sample certificate
          </a>
        </button>
      </div>
      <div className="MOBILE_BANNER">
        <MobileImageBannerTab />
      </div>
    </>
  );
};

export default ImageBannerTab;

const MobileImageBannerTab = () => {
  return (
    <>
      <div className="banner">
        <img
          src="https://houseofquadri.com/cdn/shop/files/We_never_leave_your_side_1080x.png?v=1684556277"
          alt="HOQ"
        />
      </div>
      <p>
        HOQ believes that your diamonds should empower you, and we make sure we
        stick by our promise in more ways than one.
      </p>
      <button>Read More</button>
      <button>
        <a href="https://cdn.shopify.com/s/files/1/0643/8731/8014/files/IGI_CERTIFICATE_COPY.pdf?v=1655287503">
          View sample certificate
        </a>
      </button>
    </>
  );
};
