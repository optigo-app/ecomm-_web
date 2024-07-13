import React from "react";
import "./Footer.modul.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { GrMailOption } from "react-icons/gr";

const MobileFooter = () => {
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
                  House Of Quadri <br />
                  1st Flr, 7 Kitab Mahal, 192 Dr DN Rd, Fort, Mumbai 400001
                </p>
                <p className="phoneno">Mob. +91 93721 61575</p>
                <p className="email">
                  Email : <span>hello@houseofquadri.com</span>
                </p>
                <div className="social-links">
                  <a href="#">
                    <IoLogoInstagram />
                  </a>
                  <a href="#">
                    <FaFacebook />
                  </a>
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
                <form className="subscribe-form">
                  <input type="email" placeholder="Enter your email" />
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
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Shipping Policy</a>
                  </li>
                  <li>
                    <a href="#">Return & Exchange Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">FAQs</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">Terms of Service</a>
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
                    <a href="#">Blogs</a>
                  </li>
                  <li>
                    <a href="#">Our Story</a>
                  </li>
                  <li>
                    <a href="#">Size Guide</a>
                  </li>
                  <li>
                    <a href="#">Lab Grown Diamond</a>
                  </li>
                  <li>
                    <a href="#">Diamond Education</a>
                  </li>
                  <li>
                    <a href="#">Quality & Certification</a>
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
        <p>© 2024 House Of Quadri</p>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
