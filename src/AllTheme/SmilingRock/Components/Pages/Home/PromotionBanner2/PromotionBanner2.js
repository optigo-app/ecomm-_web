import React from 'react'
import './PromotionBanner2.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const PromotionBanner2 = () => {
    return (
        <div className='paddingTopMobileSet'>
            <div className='smilingBridesMain'>
                <div className='smilingBrides'>
                    <p  className='smilingBridesMainTitle'>ELEGANT BRIDES </p>
                    <button className='enagementBtn'>ENGAGEMENT COLLECTION</button>
                </div>
                <div className='smlingBridesImages'>
                    <img src={`${storImagePath()}/images/HomePage/Promo/Banner/PromoBanner2.png`} className='smilingMainImages' alt={''} />
                </div>
            </div>
        </div>
    )
}

export default PromotionBanner2;