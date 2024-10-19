import React from 'react'
import './ShopBanner.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { LiaChevronCircleRightSolid } from "react-icons/lia";

const ShopBanner = () => {

    return (
        <div className='mala_BottomBannerMain'>
            <div className='mala_shop_div1'>
                <div className='mala_shop_div1_1 parentcard_container'>
                    {/* <BannerPost bg="#17372F" color="#f6c2b5" text="Our custom jewelry process"/> */}
                    <img src={`${storImagePath()}/images/HomePage/shop/shop1.jpg`} className='mala_promo_secton2_img' />
                </div>
                <div className='mala_shop_div1_2 parentcard_container'>
                    {/* <BannerPost bg="#f6c2b5" color="#17372F" text="Our diamond collection"/> */}
                    <img src={`${storImagePath()}/images/HomePage/shop/shop3.jpg`} className='mala_promo_secton2_img' />
                </div>
            </div>
            <div className='mala_shop_div2'>
                <div className='mala_shop_div2_1 parentcard_container'>
                    {/* <BannerPost bg="#f6c2b5" color="#17372F" text="Why jewelers trust Malakan"/> */}
                    <img src={`${storImagePath()}/images/HomePage/shop/shop2.jpg`} className='mala_promo_secton2_img' />
                </div>
                <div className='mala_shop_div2_2 parentcard_container'>
                    {/* <BannerPost bg="#17372F" color="#f6c2b5" text='Start a converstation'/> */}
                    <img src={`${storImagePath()}/images/HomePage/shop/shop4.jpeg`} className='mala_promo_secton2_img' />
                </div>
            </div>
        </div>
    )
}

export default ShopBanner;





const BannerPost = ({text,color , bg})=>{
    return <div className='malkan_BannerPost'
    style={{
        color : color ,
        backgroundColor:bg
    }}
    >
    {text}  <LiaChevronCircleRightSolid size={70} className='icon_malkan'/>
    </div>
}