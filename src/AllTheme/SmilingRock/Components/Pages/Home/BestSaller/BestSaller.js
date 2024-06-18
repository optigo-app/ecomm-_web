import React from 'react'
import './BestSaller.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


const BestSaller = () => {


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

    return (
        <div className='smr_bestSallerMain'>
            <p className='linkingTitle'>Best Saller</p>
            <div className='smr_BestSallerMainSub'>
                <div className='smr_BestSallerMainImage'>
                    <img src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.png`} className='smr_BestSallerMainImage_img' />
                </div>
                <div className='smr_bestSallerSliderMin'>
                    <Slider {...settings} className='smr_Slider'>
                        <div className='smr_Slider_main'>
                            <div className='smr_Slider_main1'>
                                <div className='linkLoveRing1'>
                                    <img src={`${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png`} className='smr_Slider_main_image' />
                                </div>
                                <div>
                                    <p className='smr_Slider_main1_desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                    <p className='smr_Slider_main1_price'>$ 55,500 </p>
                                </div>
                            </div>
                            <div className='smr_Slider_main2'>
                                <div className='linkLoveRing2'>
                                    <img src={`${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='smr_Slider_main_image' />
                                </div>
                                <div>
                                    <p className='smr_Slider_main1_desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                    <p className='smr_Slider_main1_price'>$ 65,500 </p>
                                </div>
                            </div>

                        </div>

                        <div className='smr_Slider_main'>
                            <div className='smr_Slider_main1'>
                                <div className='linkLoveRing1'>
                                    <img src={`${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png`} className='smr_Slider_main_image' />
                                </div>
                                <div>
                                    <p className='smr_Slider_main1_desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                    <p className='smr_Slider_main1_price'>$ 5,500 </p>
                                </div>
                            </div>
                            <div className='smr_Slider_main2'>
                                <div className='linkLoveRing2'>
                                    <img src={`${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='smr_Slider_main_image' />
                                </div>
                                <div>
                                    <p className='smr_Slider_main1_desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                    <p className='smr_Slider_main1_price'>$ 25,500 </p>
                                </div>
                            </div>

                        </div>

                        <div className='smr_Slider_main'>
                            <div className='smr_Slider_main1'>
                                <div className='linkLoveRing1'>
                                    <img src={`${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img1.png`} className='smr_Slider_main_image' />
                                </div>
                                <div>
                                    <p className='smr_Slider_main1_desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                    <p className='smr_Slider_main1_price'>$ 10,500 </p>
                                </div>
                            </div>
                            <div className='smr_Slider_main2'>
                                <div className='linkLoveRing2'>
                                    <img src={`${storImagePath()}/images/HomePage/Promo/Set/2/promoSetBanner2Img2Hover.png`} className='smr_Slider_main_image' />
                                </div>
                                <div>
                                    <p className='smr_Slider_main1_desc'>Lab Grown Diamond 1.97ctw Chain Linking Bracelet BL-01993WHT</p>
                                    <p className='smr_Slider_main1_price'>$ 65,500 </p>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default BestSaller