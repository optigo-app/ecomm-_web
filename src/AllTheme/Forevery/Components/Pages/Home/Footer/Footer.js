import React, { useState, useEffect } from 'react';
import './Footer.scss';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [companyInfoData, setCompanuInfoData] = useState();
  const [localData, setLocalData] = useState();
  let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  useEffect(() => {
    let localD = JSON.parse(sessionStorage.getItem('storeInit'));
    setLocalData(localD);
  }, []);

  useEffect(() => {
    let storeInit;
    let companyInfoData;
    setTimeout(() => {
      if (sessionStorage.getItem("storeInit")) {
        storeInit = JSON?.parse(sessionStorage.getItem("storeInit")) ?? {};
      }
      if (sessionStorage.getItem("CompanyInfoData")) {
        companyInfoData = JSON?.parse(sessionStorage.getItem("CompanyInfoData")) ?? {};
        setCompanuInfoData(companyInfoData);
        const parsedSocilaMediaUrlData = JSON?.parse(companyInfoData?.SocialLinkObj) ?? [];
        if (parsedSocilaMediaUrlData) {
          setSocialMediaData(parsedSocilaMediaUrlData);
        }
      }
    }, 500);
  }, []);

  const handleNavigate = (event, path) => {
    if (
      event?.ctrlKey ||
      event?.shiftKey ||
      event?.metaKey ||
      (event?.button && event?.button === 1)
    ) {
      return;
    } else {
      event?.preventDefault();
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const sections = [
    {
      title: 'About Us',
      items: [
        { name: 'About Us', path: '/about-us' },
        { name: 'Packaging', path: '/packaging' },
        { name: 'Affiliate Login', path: '/affiliate-login' },
        { name: 'Partner Login', path: '/partner-login' }
      ],
    },
    {
      title: 'Our Services',
      items: [
        { name: 'Bespoke Jewelry', path: '/bespoke-jewelry' },
        { name: 'Bespoke Diamonds', path: '/bespoke-diamonds' },
        { name: 'Lifetime Warranty', path: '/lifetime-warranty' },
        { name: 'Free Shipping Worldwide', path: '/free-shipping' },
        { name: '60-Day Free Resizing', path: '/free-resizing' },
        { name: 'Free Engraving', path: '/free-engraving' }
      ],
    },
    {
      title: 'Need Help',
      items: [
        { name: 'Contact Us', path: '/contact-us' },
        { name: 'Education', path: '/education' },
        { name: 'Blog', path: '/blog' },
        { name: 'Forevery Reviews', path: '/reviews' }
      ],
    },
    {
      title: 'Quick Links',
      items: [
        { name: 'Engagement Rings', path: '/engagement-rings' },
        { name: 'Wedding Rings', path: '/wedding-rings' },
        { name: 'Fine Jewelry', path: '/fine-jewelry' },
        { name: 'Certified Loose Diamonds', path: '/loose-diamonds' },
        { name: 'Letter Diamonds Jewelry', path: '/letter-diamonds' }
      ],
    },
    {
      title: 'Social Media',
      items: []
    }
  ];

  return (
    <footer className="footer">
      <div className="footerContainer">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`footer-section ${isMobile && activeSection === index ? 'active' : ''}`}
          >
            <h4
              className={section.title === "Social Media" ? "socialMediaTitle" : ""}
              onClick={() => isMobile && toggleSection(index)}
            >
              {section.title}
            </h4>
            <ul>
              {section.title === "Social Media" ? (
                <div className="socialMediaMainDiv">
                  <div className="socialMediaIconDiv">
                    {socialMediaData?.map((social, index) => (
                      <div className="footerSocialIcon" key={index}>
                        <a href={`${social.SLink}`} target="_blank" rel="noopener noreferrer">
                          <img
                            src={social.SImgPath}
                            alt={social.SName}
                            style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                  <a href="/payment-methods" className="paymentLink" onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(e, "/payment-methods");
                      }}>
                    <h4>Secure Payment Method</h4>
                  </a>
                  <div className="paymentDiv">
                          <img
                            src="https://forevery.one/icons_images/card.webp"
                            alt="paymant-merchant image"
                            style={{ width: '100%', objectFit: 'cover', mixBlendMode:'multiply' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />                  
                  </div>
                </div>
              ) : (
                <>
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <a href={item?.path} onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(e, item.path);
                      }}>{item.name}</a>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        ))}
      </div>
      <ul className="companyCopyRight">
        <li>© 2024 FOREVERY</li>
        <li><a href="/terms-of-use" onClick={(e) => { e.preventDefault(); handleNavigate(e, '/terms-of-use'); }}>TERMS OF USE</a></li>
        <li><a href="/privacy-policy" onClick={(e) => { e.preventDefault(); handleNavigate(e, '/privacy-policy'); }}>PRIVACY POLICY</a></li>
        <li><a href="/cookies-policy" onClick={(e) => { e.preventDefault(); handleNavigate(e, '/cookies-policy'); }}>COOKIES POLICY</a></li>
        <li><a href="/return-refund-policy" onClick={(e) => { e.preventDefault(); handleNavigate(e, '/return-refund-policy'); }}>RETURN AND REFUND POLICY</a></li>
        <li><a href="/change-cookie-preferences" onClick={(e) => { e.preventDefault(); handleNavigate(e, '/change-cookie-preferences'); }}>CHANGE COOKIE PREFERENCES</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
