import React from 'react';
import './OurServices.scss';

const services = [
  {
    title: 'Free Shipping',
    description: 'Now it\'s easier for customers to get the beautiful and sustainable diamonds they want without paying extra for shipping.',
    image: 'https://forevery.one/images_new/new-home/free-ship.png',
    link: '#',
  },
  {
    title: 'Free 30 Day Returns',
    description: 'Forevery offers a hassle-free jewelry shopping experience with its 30-DAY Returns policy. Get ready to shop confidently.',
    image: 'https://forevery.one/images_new/new-home/free-return.png',
    link: '#',
  },
  {
    title: 'Free Lifetime Warranty',
    description: 'Shop with Confidence; a lifetime warranty covers every piece of fine jewelry you buy.',
    image: 'https://forevery.one/images_new/new-home/waranty.png',
    link: '#',
  },
  {
    title: '60-Days Free Resizing',
    description: 'Within 60 days of purchase, resize your jewelry to the perfect fit without any additional costs.',
    image: 'https://forevery.one/images_new/new-home/resizing.png',
    link: '#',
  },
  {
    title: 'Free Engraving',
    description: 'Add sentimental value to the piece and make it a unique and meaningful gift.',
    image: 'https://forevery.one/images_new/new-home/engraving.png',
    link: '#',
  }
];

const Services = () => {
  return (
    <div className='for_serviceMainDiv'>
        <h2>Our Services</h2>
      <div className="for_services-container">
        <div className="for_services-list">
          {services.map((service, index) => (
            <div className="for_service-item" key={index}>
              <img src={service.image} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href={service.link}>Read More</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
