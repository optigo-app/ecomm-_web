import React, { useEffect, useState } from 'react'
import './TrendingView.modul.scss'
import imageNotFound from "../../../Assets/image-not-found.jpg"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Get_Tren_BestS_NewAr_DesigSet_Album } from '../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album';

const TrendingView = () => {

    const [trandingViewData, setTrandingViewData] = useState();
    const [imageUrl, setImageUrl] = useState();

    const [ring3ImageChange, setRing3ImageChange] = useState(false);
    const [ring4ImageChange, setRing4ImageChange] = useState(false);



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // prevArrow: false, 
        // nextArrow: false,
    };



    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('storeInit'))
        setImageUrl(data?.DesignImageFol);

        Get_Tren_BestS_NewAr_DesigSet_Album("GETTrending").then((response) => {
            if (response?.Data?.rd) {
                setTrandingViewData(response?.Data?.rd);
            }
        }).catch((err) => console.log(err))
    }, [])


    const handleMouseEnterRing3 = () => {
        setRing3ImageChange(true)
    }
    const handleMouseLeaveRing3 = () => {
        setRing3ImageChange(false)
    }

    const handleMouseEnterRing4 = () => {
        setRing4ImageChange(true)
    }
    const handleMouseLeaveRing4 = () => {
        setRing4ImageChange(false)
    }


    console.log('trandingViewDatatrandingViewData', trandingViewData &&


        `${imageUrl}${trandingViewData && trandingViewData[0]?.designno}_1.${trandingViewData && trandingViewData[0]?.ImageExtension}`
    );
    const ProdCardImageFunc = (pd) => {
        let finalprodListimg;
        if (pd?.ImageCount > 0) {
            finalprodListimg = imageUrl + pd?.designno + "_" + 1 + "." + pd?.ImageExtension
        }
        else {
            finalprodListimg = imageNotFound;
        }
        return finalprodListimg
    }


    return (
        <div className='smr_trendingViewTopMain'>


            <div className='linkingLoveMain linkingLoveMain2'>
                <div className='linkingLoveImage'>
                    <img src={`${storImagePath()}/images/HomePage/TrendingViewBanner/TrendingViewImg.jpg`} className='linkingLoveImageDesign' />
                </div>
                <div className='linkingLove'>
                    <p className='linkingTitle'>Trending View</p>
                    <p className='linkingShopCol'>SHOP COLLECTION</p>
                    <Slider {...settings} >
                        <div className='linkRingLove'>
                            <div>
                                <div className='linkLoveRing1'>
                                    <img src={!ring3ImageChange ? `${imageUrl}${trandingViewData && trandingViewData[0]?.designno}_1.${trandingViewData && trandingViewData[0]?.ImageExtension}` : `${imageUrl}${trandingViewData && trandingViewData[1]?.designno}_1.${trandingViewData && trandingViewData[1]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2'>
                                    <img src={!ring4ImageChange ? `${imageUrl}${trandingViewData && trandingViewData[1]?.designno}_1.${trandingViewData && trandingViewData[0]?.ImageExtension}` : `${imageUrl}${trandingViewData && trandingViewData[0]?.designno}_1.${trandingViewData && trandingViewData[0]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>

                        </div>

                        <div className='linkRingLove'>
                            <div>
                                <div className='linkLoveRing1'>
                                    <img src={!ring3ImageChange ? `${imageUrl}${trandingViewData && trandingViewData[3]?.designno}_1.${trandingViewData && trandingViewData[3]?.ImageExtension}` : `${imageUrl}${trandingViewData && trandingViewData[4]?.designno}_1.${trandingViewData && trandingViewData[4]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2'>
                                    <img src={!ring4ImageChange ? `${imageUrl}${trandingViewData && trandingViewData[4]?.designno}_1.${trandingViewData && trandingViewData[4]?.ImageExtension}` : `${imageUrl}${trandingViewData && trandingViewData[3]?.designno}_1.${trandingViewData && trandingViewData[3]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>

                        </div>

                        <div className='linkRingLove'>
                            <div>
                                <div className='linkLoveRing1'>
                                    <img src={!ring3ImageChange ? `${imageUrl}${trandingViewData && trandingViewData[9]?.designno}_1.${trandingViewData && trandingViewData[9]?.ImageExtension}` : `${imageUrl}${trandingViewData && trandingViewData[10]?.designno}_1.${trandingViewData && trandingViewData[10]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing3} onMouseLeave={handleMouseLeaveRing3} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>
                            <div>
                                <div className='linkLoveRing2'>
                                    <img src={!ring4ImageChange ? `${imageUrl} + ${trandingViewData && trandingViewData[11]?.designno} + "_" + 1 + "." + ${trandingViewData && trandingViewData[11]?.ImageExtension}` : `${imageUrl} + ${trandingViewData && trandingViewData[12]?.designno} + "_" + 1 + "." + ${trandingViewData && trandingViewData[12]?.ImageExtension}`} className='likingLoveImages' onMouseEnter={handleMouseEnterRing4} onMouseLeave={handleMouseLeaveRing4} />
                                </div>
                                <div className='linkLoveRing1Desc'>
                                    <p className='ring1Desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                </div>
                            </div>

                        </div>
                    </Slider>
                    <p className='smr_TrendingViewAll'>View All</p>
                </div>
            </div>

            {/* <div>
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
                    modules={[Pagination, Navigation]}
                    navigation={{ // Custom navigation configuration
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    className="mySwiper"
                >

                    {trandingViewData?.slice(0, 11).map((data, index) => (
                        <SwiperSlide key={index} className='smr_trendingViewMain'>
                            <div className='smr_trendingImageDiv'>
                                <img loading="lazy" src={ProdCardImageFunc(data)}
                                    alt={`Slide ${index}`} className='smr_TrendingViewImage' />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div> */}
        </div>
    )
}

export default TrendingView