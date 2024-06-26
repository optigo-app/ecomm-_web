import React from 'react'
import './GaleryView.modul.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const sliderData = [
  {
    imageUrl: "/elvee/images/HomePage/Gallery/GalleryImg01.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/Gallery/GalleryImg02.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/Gallery/GalleryImg03.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/Gallery/GalleryImg04.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/Gallery/GalleryImg05.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/Gallery/GalleryImg06.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/Gallery/GalleryImg07.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/Gallery/GalleryImg08.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/Gallery/GalleryImg09.jpg",
  },
  {
    imageUrl: "/elvee/images/HomePage/Gallery/GalleryImg10.jpg",
  },
];

export default function GaleryView() {
  return (
    <div className='el_mainGalleryConatinerID'>
      <div>
        <p className='galeryComponents'>Gallery</p>
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
        className="mySwiper"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index} style={{ marginRight: '0px' , padding: '20px'}}>
            <img loading="lazy" src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} style={{ objectFit: 'contain', width: '100%', padding: '28px' }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}