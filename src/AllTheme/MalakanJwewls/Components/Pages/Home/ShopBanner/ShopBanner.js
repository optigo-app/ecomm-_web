import React from 'react'
import './ShopBanner.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const ShopBanner = () => {

    return (
        <div className='mala_BottomBannerMain'>
            <div className='mala_shop_div1'>
                <div className='mala_shop_div1_1'>
                    <img src={`${storImagePath()}/images/HomePage/shop/shop1.jpg`} className='mala_promo_secton2_img' />
                </div>
                <div className='mala_shop_div1_2'>
                    <img src={`${storImagePath()}/images/HomePage/shop/shop3.jpg`} className='mala_promo_secton2_img' />
                </div>
            </div>

            <div className='mala_shop_div2'>
                <div className='mala_shop_div2_1'>
                    <img src={`${storImagePath()}/images/HomePage/shop/shop2.jpg`} className='mala_promo_secton2_img' />
                </div>
                <div className='mala_shop_div2_2'>
                    <img src={`${storImagePath()}/images/HomePage/shop/shop4.jpeg`} className='mala_promo_secton2_img' />
                </div>
            </div>
        </div>
    )
}

export default ShopBanner;