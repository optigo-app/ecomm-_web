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
      if (localStorage.getItem("storeInit")) {
        storeInit = JSON?.parse(localStorage.getItem("storeInit")) ?? {};
      }
      if (localStorage.getItem("CompanyInfoData")) {
        companyInfoData =
          JSON?.parse(localStorage.getItem("CompanyInfoData")) ?? {};
        setCompanuInfoData(companyInfoData);
        const parsedSocilaMediaUrlData =
          JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
        if (parsedSocilaMediaUrlData) {
          setSocialMediaData(parsedSocilaMediaUrlData);
        }
      }
    }, 500);
  }, []);

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    const storeInit = JSON?.parse(localStorage.getItem("storeInit"));
    const newslater = storeInit?.newslatter;
    if (newslater) {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const newsletterUrl = `${newslater}${email}`;
      console.log("newsletterUrl: ", newsletterUrl);
      await fetch(newsletterUrl, requestOptions)
        .then((response) => {
          response.text();
          console.log(response);
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
  };
  return (
    <div className="hoq_main_footer">
      <footer className="footer">
        <div className="footer-content">
          <ContactInformation />
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
    <div className="footer-section">
      <h4>ABOUT</h4>
      <ul>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/our-story">Our Story</Link>
        </li>
        <li>
          <Link to="/size-guide">Size Guide</Link>
        </li>
        <li>
          <Link to="/lab-grown-diamond">Lab Grown Diamond</Link>
        </li>
        <li>
          <Link to="/diamond-education">Diamond Education</Link>
        </li>
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
        <li>
          <Link to="/Return-Exchange-Policy">Return & Exchange Policy</Link>
        </li>
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
const ContactInformation = () => {
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
        <Link
          to="https://www.instagram.com/"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          target="_blank"
        >
          <FaInstagram size={17} color="#F60092" />
          Instagram
        </Link>
        <Link
          to="https://www.facebook.com/"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
          target="_blank"
        >
          <FaFacebook size={17} color="blue" />
          Facebook
        </Link>
      </div>
    </div>
  );
};

export default Footer;
