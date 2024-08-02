import React, { useEffect, useState } from "react";
import "./Footer.modul.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { GrMailOption } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

const MobileFooter = () => {
  const [email, setemail] = useState("");
  const navigation = useNavigate();
  const [companyInfoData, setCompanuInfoData] = useState();
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [selectedFooteVal, setSelectedVal] = useState(0);
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
    <>
      <div className="mobile_footer">
        {/* Contact us */}
        <div className="accordian_Wrapper">
          <Accordion className="accordian">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="summary"
            >
              <span className="title">Contact Us</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="details">
                <p className="address">
                  Lorem ipsum dolor sit amet. <br />
                  Lorem ipsum dolor sit amet consectetur. 400001
                </p>
                <p className="phoneno">Mob. +12345674689</p>
                <p className="email">
                  Email : <span>Lorem ipsum dolor sit amet.</span>
                </p>
                <div
                  className="social-links"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row-reverse",
                    gap: "1rem",
                  }}
                >
                  <Link
                    to="https://www.instagram.com/"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      textDecoration: "none",
                      color: "black",
                    }}
                    target="_blank"
                  >
                    <FaInstagram size={17} color="#F60092" />
                    Instagram
                  </Link>
                  <Link
                    to="https://www.facebook.com/"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      textDecoration: "none",
                      color: "black",
                    }}
                    target="_blank"
                  >
                    <FaFacebook size={17} color="blue" />
                    Facebook
                  </Link>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* signup menu */}
        <div className="accordian_Wrapper">
          <Accordion className="accordian">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="summary"
            >
              <span className="title">sign up</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="details">
                <p className="subscribe-text">
                  Subscribe to get special offers, new collection launches, and
                  once-in-a-while deals.
                </p>
                <form onSubmit={HandleFormSubmit} className="subscribe-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    name="email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <button type="submit" className="mail">
                    <GrMailOption size={24} color="grey" />
                  </button>
                </form>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* policies menu */}
        <div className="accordian_Wrapper">
          <Accordion className="accordian">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="summary"
            >
              <span className="title">Policies</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="details">
                <ul>
                  <li>
                    <Link to="/Privacy-Policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/Shipping-Policy">Shipping Policy</Link>
                  </li>
                  <li>
                    <Link to="/Return-Exchange-Policy">
                      Return & Exchange Policy
                    </Link>
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
            </AccordionDetails>
          </Accordion>
        </div>
        {/* About menu */}
        <div className="accordian_Wrapper">
          <Accordion className="accordian">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="summary"
            >
              <span className="title">About</span>
            </AccordionSummary>
            <AccordionDetails>
              <div className="details">
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
                    <Link to="/quality-certification">
                      Quality & Certification
                    </Link>
                  </li>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="brand_logo">
          <div className="pay">
            <img
              src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/363_Visa_Credit_Card_logo-256.png"
              alt=""
            />
          </div>
          <div className="pay">
            <img
              src="https://cdn0.iconfinder.com/data/icons/shift-ecommerce/32/Master_Card-256.png"
              alt=""
            />
          </div>
          <div className="pay">
            <img
              src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/436/Google_Pay_GPay_Logo-512.png"
              alt=""
            />
          </div>
          <div className="pay">
            <img
              src="https://cdn2.iconfinder.com/data/icons/social-icons-color/512/paytm-512.png"
              alt=""
            />
          </div>
        </div>
        <div className="copyright">
          <p>© 2024 Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
