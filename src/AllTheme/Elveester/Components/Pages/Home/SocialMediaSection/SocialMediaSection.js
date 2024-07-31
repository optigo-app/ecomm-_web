import React from 'react'
import './SocialMediaSection.modul.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const sliderData = [
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia1.jpg",
    link: 'https://www.instagram.com/p/Ce7uShwlDBi/?hl=en',
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia2.jpg",
    link: 'https://in.pinterest.com/pin/706854104032666402/',
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia3.jpg",
    link: 'https://www.facebook.com/photo/?fbid=5153569661402827&set=a.1321180487975116',
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia4.jpg",
    link: 'https://www.linkedin.com/feed/update/urn:li:share:7118470948286009344/?actorCompanyId=3118775',
  },
];

export default function SocialMediaSection() {
  return (
    <div className='mainSocialMediaConatiner' id='mainSocialMediaConatinerID'>
      <div>
        <p className='socialmediaptag'>Social Media</p>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
          1240: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        modules={[Pagination]}
        // pagination={{ clickable: true }}
        className="mySwiper"
      >
        {sliderData.map((slide, index) => (
          <div style={{ background: 'red' }}>
            <SwiperSlide key={index} style={{ marginRight: '0px', padding: '30px 20px' }}>
              <Link to={slide?.link}>
                <img loading="lazy" src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} style={{ objectFit: 'contain', width: '100%', padding: '0px' }} />
              </Link>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
}