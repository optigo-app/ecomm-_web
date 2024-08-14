import React from 'react';
import './AppointmentPage.scss';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Services from '../../ReusableComponent/OurServives/OurServices';
import NewsletterSignup from '../../ReusableComponent/SubscribeNewsLater/NewsletterSignup';
import Footer from '../Footer/Footer';
import btnStyle  from "../../../scss/Button.module.scss"

export const services = [
    {
      title: 'Free Shipping',
      description: 'Now it\'s easier for customers to get the beautiful and sustainable diamonds they want without paying extra for shipping.',
      image: 'https://forevery.one/images_new/new-home/free-ship.png',
      link: '#',
      btnText:"Read More"
    },
    {
      title: 'Free 30 Day Returns',
      description: 'Forevery offers a hassle-free jewelry shopping experience with its 30-DAY Returns policy. Get ready to shop confidently.',
      image: 'https://forevery.one/images_new/new-home/free-return.png',
      link: '#',
      btnText:"Read More"
    },
    {
      title: 'Free Lifetime Warranty',
      description: 'Shop with Confidence; a lifetime warranty covers every piece of fine jewelry you buy.',
      image: 'https://forevery.one/images_new/new-home/waranty.png',
      link: '#',
      btnText:"Read More"
    },
    {
      title: '60-Days Free Resizing',
      description: 'Within 60 days of purchase, resize your jewelry to the perfect fit without any additional costs.',
      image: 'https://forevery.one/images_new/new-home/resizing.png',
      link: '#',
      btnText:"Read More"
    },
    {
      title: 'Free Engraving',
      description: 'Add sentimental value to the piece and make it a unique and meaningful gift.',
      image: 'https://forevery.one/images_new/new-home/engraving.png',
      link: '#',
      btnText:"Read More"
    }
  ];

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
                                <button className={`${btnStyle?.btn_for_new} ${btnStyle?.btn_15}`}>BOOK NOW</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Services title={"Our Services"} services={services}/>
            <NewsletterSignup/>
            </div>
        </div>
    );
};

export default AppointmentPage;
