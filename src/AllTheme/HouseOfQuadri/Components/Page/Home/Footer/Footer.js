import React, { useEffect, useState } from "react";
import "./Footer.modul.scss";
import Payment from "./Payment";
import MobileFooter from "./MobileFooter";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const [email, setemail] = useState("");
  const [companyInfoData, setCompanuInfoData] = useState();
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [selectedFooteVal, setSelectedVal] = useState(0);
  const navigation = useNavigate();

  useEffect(() => {
    let storeInit;
    let companyInfoData;
  
    setTimeout(() => {
      try {
        const storeInitData = sessionStorage?.getItem("storeInit");
        if (storeInitData) {
          storeInit = JSON.parse(storeInitData);
        }
      } catch (error) {
        console.error("Error parsing storeInit:", error);
      }
  
      try {
        const companyInfoDataStr = sessionStorage?.getItem("CompanyInfoData");
        if (companyInfoDataStr) {
          companyInfoData = JSON.parse(companyInfoDataStr);
          setCompanuInfoData(companyInfoData);
          console.log("footer",companyInfoData)
  
          const socialLinkStr = companyInfoData?.SocialLinkObj;
          if (socialLinkStr) {
            try {
              const parsedSocialMediaUrlData = JSON.parse(socialLinkStr);
              console.log("footer",parsedSocialMediaUrlData)
              setSocialMediaData(parsedSocialMediaUrlData);
            } catch (error) {
              console.error("Error parsing social media data:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error parsing CompanyInfoData:", error);
      }
    }, 500);
  }, []);
  

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    const storeInit = JSON?.parse(sessionStorage.getItem("storeInit"));
    const newslater = storeInit?.newslatter;
    if (newslater) {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const newsletterUrl = `${newslater}${email}`;
      await fetch(newsletterUrl, requestOptions)
        .then((response) => {
          response.text();
        })
        .then((result) =>result)
        .catch((error) => console.error(error));
    }
  };
  return (
    <div className="hoq_main_footer">
      <footer className="footer">
        <div className="footer-content">
          <ContactInformation  socialLinkStr={socialMediaData}/>
          <NewsLetter
            onsubmit={HandleFormSubmit}
            email={email}
            setemail={setemail}
          />
          <Policy />
          <About />
        </div>
        <Copyright />
      </footer>
      <MobileFooter />
    </div>
  );
};

const About = () => {
  return (
    <div className="footer-section about-hoq">
      <h4>ABOUT</h4>
      <ul>
        {/* <li>
          <Link to="/blogs">Blogs</Link>
        </li> */}
        <li>
          <Link to="/our-story">Our Story</Link>
        </li>
        <li>
          <Link to="/size-guide">Size Guide</Link>
        </li>
        <li>
          <Link to="/lab-grown-diamond">Lab Grown Diamond</Link>
        </li>
        {/* <li>
          <Link to="/diamond-education">Diamond Education</Link>
        </li> */}
        <li>
          <Link to="/quality-certification">Quality & Certification</Link>
        </li>
      </ul>
    </div>
  );
};
const Policy = () => {
  return (
    <div className="footer-section">
      <h4>POLICIES</h4>
      <ul>
        <li>
          <Link to="/Privacy-Policy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/Shipping-Policy">Shipping Policy</Link>
        </li>
        {/* <li>
          <Link to="/Return-Exchange-Policy">Return & Exchange Policy</Link>
        </li> */}
        <li>
          <Link to="/Terms-Conditions">Terms & Conditions</Link>
        </li>
        <li>
          <Link to="/faq">FAQs</Link>
        </li>
        <li>
          <Link to="/contacts">Contact</Link>
        </li>
      </ul>
    </div>
  );
};
const NewsLetter = ({ onsubmit, email, setemail }) => {
  return (
    <div className="footer-section">
      <h4>NEWSLETTER</h4>
      <p>
        Subscribe to get special offers, new collection launches, and
        once-in-a-while deals.
      </p>
      <form className="subscribe-form" onSubmit={onsubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          name="email"
          onChange={(e) => setemail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};
const Copyright = () => {
  return (
    <div className="footer-bottom">
      <Payment />
      <p>© 2024 Lorem ipsum dolor sit amet.</p>
    </div>
  );
};
const ContactInformation = ({socialLinkStr}) => {
  return (
    <div className="footer-section">
      <h4>CONTACT US</h4>
      <p>
        Lorem ipsum, dolor sit amet consectetur
        <br />
        1st Flr, 7 Lorem ipsum dolok .,
        <br />
        192 lorem lorem Rd, lorem, lorem 000000
      </p>
      <p>
        Mob. +01234567890
        <br />
        Email: hello@loremipusmum.com
      </p>
      <div className="social-links">
      {
        socialLinkStr?.map((val,i)=>{
          return <>
            <Link
          to={val?.SLink}
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          target="_blank"
        >
          <img src={val?.SImgPath} alt="" width={15} height={15} style={{
            mixBlendMode  :"darken"
          }} />
          {val?.SName}
        </Link>
          </>
        })
      }
      </div>
    </div>
  );
};

export default Footer;
  {/* <Link
          to="https://www.facebook.com/"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          target="_blank"
        >
          <FaFacebook size={17} color="blue" />
          Facebook
        </Link> */}