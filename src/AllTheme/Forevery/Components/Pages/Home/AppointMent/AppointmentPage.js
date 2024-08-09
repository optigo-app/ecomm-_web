import React from 'react';
import './AppointmentPage.scss';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Services from '../../ReusableComponent/OurServives/OurServices';
import NewsletterSignup from '../../ReusableComponent/SubscribeNewsLater/NewsletterSignup';
import Footer from '../Footer/Footer';

const AppointmentPage = () => {
    const items = [
        { id: 1, title: 'Engagement Ring', image: 'https://via.placeholder.com/300' },
        { id: 2, title: 'Wedding Ring', image: 'https://via.placeholder.com/300' },
        { id: 3, title: 'Diamonds', image: 'https://via.placeholder.com/300' },
        { id: 4, title: 'Fine Jewelry', image: 'https://via.placeholder.com/300' },
        { id: 5, title: 'High End Jewelry', image: 'https://via.placeholder.com/300' },
        { id: 6, title: 'Letter Diamonds', image: 'https://via.placeholder.com/300' }
    ];

    return (
        <div className="for_appointment-page">
            <div
                className="for_bg-imageCart"
                style={{
                    backgroundImage: `url(${storImagePath()}/images/BannerImage/TopBanner1.png)`,
                }}
            >
                <div className="for_overlay" />
                <div className="for_text-container">
                    <div className="for_textContainerData">
                        <h2
                            className="for_designCounttext"
                        >
                            BOOK AN APPOINTMENT<br />
                        </h2>
                    </div>
                </div>
            </div>
            <p className="for_intro">
                Welcome to Forevery your premier destination for exquisite labgrown diamonds.
                Schedule an appointment today to experience the brilliance and beauty of our lab-grown diamonds and let Forevery help you find the perfect piece to cherish forever.
                Experience the brilliance of lab-grown diamonds with Forevery.
                Book an appointment now to view our exquisite collection and discover the sustainable and ethical beauty of labgrown diamonds.
            </p>
            <div className="for_itemsMainDiv">
            <div className="for_itemsSubDiv">
                <h3>The kind of jewelry you are interested in?</h3>
                <div className="for_items-grid">
                    {items.map(item => (
                        <div className="for_item-card" key={item.id}>
                            <div className="for_imageDiv">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="for_item-content">
                                <h2>{item.title}</h2>
                                <button>BOOK NOW</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Services/>
            <NewsletterSignup/>
            </div>
            <Footer/>
        </div>
    );
};

export default AppointmentPage;
