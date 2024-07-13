import React from "react";
import "./Footer.modul.scss";
import Payment from "./Payment";
import MobileFooter from "./MobileFooter";

const Footer = () => {
  return (
    <div className="hoq_main_footer">
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>CONTACT US</h4>
            <p>
              House Of Quadri
              <br />
              1st Flr, 7 Kitab Mahal,
              <br />
              192 Dr DN Rd, Fort, Mumbai 400001
            </p>
            <p>
              Mob. +91 93721 61575
              <br />
              Email: hello@houseofquadri.com
            </p>
            <div className="social-links">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>SIGN UP</h4>
            <p>
              Subscribe to get special offers, new collection launches, and
              once-in-a-while deals.
            </p>
            <form className="subscribe-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className="footer-section">
            <h4>POLICIES</h4>
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
          <div className="footer-section">
            <h4>ABOUT</h4>
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
        </div>
        <div className="footer-bottom">
          <Payment />
          <p>© 2024 House Of Quadri</p>
        </div>
      </footer>
      <MobileFooter />
    </div>
  );
};

export default Footer;
