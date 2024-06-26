import React from 'react'
import './SocialMediaSection.modul.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const sliderData = [
  {
    imageUrl: "/elvee/images/HomePage/SocialMedia/socialMedia1.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/SocialMedia/socialMedia2.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/SocialMedia/socialMedia3.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/SocialMedia/socialMedia4.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/SocialMedia/socialMedia5.jpg",
  },
];

export default function SocialMediaSection() {
  return (
    <div className='mainSocialMediaConatiner'>
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
          <SwiperSlide key={index} style={{ marginRight: '0px', padding: '30px 20px' }}>
            <img loading="lazy" src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} style={{objectFit:'contain', width:'100%', padding: '0px'}} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}