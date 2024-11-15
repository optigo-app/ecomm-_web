import React, { useEffect, useState } from "react";
import "./Footer.modul.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { dt_companyLogo, dt_loginState } from "../../../Recoil/atom";
import Cookies from "js-cookie";

export default function Footer() {
  const titleImg = useRecoilValue(dt_companyLogo);
  const [storeInitData, setStoreInitData] = useState();
  const [companyInfoData, setCompanuInfoData] = useState();
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [email, setEmail] = useState();
  const [islogin, setIsLogin] = useRecoilState(dt_loginState);
  const navigation = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmitNewlater = async () => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
    const newslater = storeInit?.newslatter;
    if (email) {
      if (newslater) {
        setEmail("");
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        const newsletterUrl = `${newslater}${email}`;
        fetch(newsletterUrl, requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      }
    }
  };

  const handleNavigte = (navigateUrl) => {
    navigation(navigateUrl);
  };

  useEffect(() => {
    const storeInit = JSON.parse(sessionStorage.getItem("storeInit")) ?? "";
    setStoreInitData(storeInit);
    const companyInfoData =
      JSON.parse(sessionStorage.getItem("CompanyInfoData")) ?? "";
    if (companyInfoData) {
      setCompanuInfoData(companyInfoData);
      const parsedSocilaMediaUrlData = companyInfoData?.SocialLinkObj;
      setSocialMediaData(parsedSocilaMediaUrlData);
    }
  }, []);

  const openPdf = () => {
    window.open(`${storImagePath()}/html/size_guide_diamondtine.pdf`, "_blank");
    // window.open(`${storImagePath()}/html/size_guide_sonasons.pdf`, '_blank');
  };

  const handleLogout = () => {
    navigation("/");
    setIsLogin(false);
    Cookies.remove("userLoginCookie");
    window.location.reload();
    sessionStorage.setItem("LoginUser", false);
    sessionStorage.removeItem("storeInit");
    sessionStorage.removeItem("loginUserDetail");
    sessionStorage.removeItem("remarks");
    sessionStorage.removeItem("selectedAddressId");
    sessionStorage.removeItem("orderNumber");
    sessionStorage.removeItem("registerEmail");
    sessionStorage.removeItem("UploadLogicalPath");
    sessionStorage.removeItem("remarks");
    sessionStorage.removeItem("registerMobile");
    sessionStorage.removeItem("allproductlist");
    sessionStorage.clear();
  };

  return (
    <div className="dt_footer_main">
      <div className="daimondFooterMain">
        <div
          className="footerNewslater"
          style={{
            paddingTop: "30px",
            paddingInline: "20%",
            marginTop: "50px",
          }}
        >
          <div className="subScriMain">
            {/* <p className='subScriMainTitle'>STAY CONNECTED FOR LATEST COLLECTIONS OFFERS</p> */}
            <p className="subScriMainTitle">LATEST COLLECTIONS & OFFERS</p>
            <div
              style={{
                width: "100%",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <input
                type="text"
                className="footerInputBox"
                placeholder="Your email here"
                value={email}
                onChange={handleEmailChange}
                required
                 aria-label="Email for subscription"
              />
              <button                 aria-label="Subscribe to newsletter"
 className="FooterSubBtn" onClick={handleSubmitNewlater}>
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="FooterLinkMain">
            <div className="FooterLinkMainBox">
              {/* <p className='footerMoteText'>ABOUT SONASONS</p> */}
              <p className="footerMoteText">ABOUT DIAMONDTIME</p>
              <p className="FoooterText">
                We are a contemporary diamond and gold jewellery brand selling
                exquisite pieces for the woman of today.
                <br />
                <span
                  onClick={() => navigation("/aboutUs")}
                  className="dt_footerLermore"
                     aria-label="Learn more about Diamondtime"
                     role="link"
                >
                  {" "}
                  Learn More
                </span>
              </p>
            </div>
            <div className="FooterLinkMainBox">
              <p className="footerMoteText">QUICK LINKS</p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/faq");
                  window.scroll(0, 0);
                }}
                 aria-label="FAQ page"
                 role="link"
              >
                FAQs
              </p>
              <p className="FoooterTextLink"  aria-label="Size guide PDF" role="link" onClick={openPdf}>
                Size Guide
              </p>
              {/* <p className='FoooterTextLink'>Gift Cards</p> */}
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/MaterialCore");
                  window.scroll(0, 0);
                }}
                   aria-label="Material & Care page"
                 role="link"
              >
                Material & Care
              </p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/term&condition");
                  window.scroll(0, 0);
                }}
                  aria-label="Terms & Conditions page"
                  role="link"
              >
                Terms & Conditions
              </p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/PrivacyPolicy");
                  window.scroll(0, 0);
                }}
                role="link"
                aria-label="Privacy Policy page"
              >
                Privacy Policy
              </p>
            </div>
            <div className="FooterLinkMainBox">
              <p className="footerMoteText">CUSTOMER SERVICE</p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/ShipingReturn");
                  window.scroll(0, 0);
                }}
                aria-label="Shipping & Returns page"
                role="link"
              >
                Shipping & Returns
              </p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/Exchange");
                  window.scroll(0, 0);
                }}
                aria-label="Exchange & Buyback page"
role="link"
              >
                Exchange & Buyback
              </p>
              <p
                className="FoooterTextLink"
                onClick={() => {
                  navigation("/Location");
                  window.scroll(0, 0);
                  
                }} 
                role="link"
aria-label="Store Locations page"
              >
                Location
              </p>
              {/* <p className='FoooterTextLink'>Loyalty Program</p> */}
              {/* <p className='FoooterTextLink'>Material & Care</p> */}
              {/* <p className='FoooterTextLink'>Try at Home</p> */}
              <p
                className="FoooterTextLink"
role="link"
                onClick={() => handleNavigte("/contactUs")} 
                aria-label="Contact Us page"

              >
                Contact us
              </p>
            </div>
            {islogin == true ? (
              <div className="FooterLinkMainBox">
                <p className="footerMoteText">MY ACCOUNT</p>
                <p
                  className="FoooterTextLink"
                  onClick={() => {
                    navigation("/account");
                    window.scroll(0, 0);
                  }} 
                  role="link"
                  aria-label="Account page"
                >
                  Account
                </p>
                <p className="FoooterTextLink"   aria-label="Sign out of the account" role="link" onClick={handleLogout}>
                  Sign Out
                </p>
                {/* <p className='FoooterTextLink' onClick={() => navigation('/faq')}>Help</p> */}
              </div>
            ) : (
              <div className="FooterLinkMainBox">
                <p className="footerMoteText">MY ACCOUNT</p>
                <p
                  className="FoooterTextLink"
                  onClick={() => navigation("/LoginOption")}
                   aria-label="Sign in page"
                   role="link"
                >
                  Sign In
                </p>
                {/* <p className='FoooterTextLink' onClick={() => navigation('/faq')}>Help</p> */}
              </div>
            )}
          </div>
        </div>
        <div className="footerBottom">
          {/* <img src='https://d-themes.com/wordpress/molla/dummy/wp-content/uploads/sites/38/2020/09/payments.png' className='newImgFooter'/> */}
          {/* <img src={titleImg} className='logoImgFooter' /> */}
          {/* <p className='FooterBottomText'>Copyright © 2024 Sonasons. All Rights Reserved.</p> */}
          <p className="FooterBottomText" role="copyright" aria-label="copyright-bar">
            Copyright © 2024 Diamondtine. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
