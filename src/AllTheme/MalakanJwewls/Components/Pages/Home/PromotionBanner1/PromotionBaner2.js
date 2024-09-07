import React from 'react'
import { useRecoilValue } from 'recoil';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './PromotionBaner1.modul.scss'

const PromotionBaner1 = () => {



    return (
        <div className='mala_Banner_main'>
            <div className='mala_BannerMAinTitleMAin'>
                <p className='mala_BannerMAinTitle2'>DISCOVER OUR COLLECTIONS</p>
            </div>
            <div className='mala_Banner_main_div'>
                <div className='mala_Banner_main_div_subMain'>
                    <div className='mala_Banner_main_div_main1'>
                        <img src={`${storImagePath()}/images/HomePage/Banner/banner1.jpg`} className='mala_Banner_Iamge1' />
                    </div>
                    <div className='mala_Banner_main_div_main2'>
                        <div class="products__desc">
                            <p className='mala_banner_Title'>Ring</p>
                            <p class="products__subtitle">Drawing on our discerning eye for hand-selecting and arranging the finest natural diamonds, our diamond bracelets encompass graceful and architectural shapes. Each creation follows the curves of the wrist producing an eye-catching display of light that showcases the character of each diamond, offering a timeless symbol of individuality.</p>
                        </div>
                    </div>
                </div>

                <div className='mala_Banner_main_div_subMain'>
                    <div className='mala_Banner_main_div_main2'>
                        <div class="products__desc">
                            <p className='mala_banner_Title'>BRACELET</p>
                            <p class="products__subtitle">Drawing on our discerning eye for hand-selecting and arranging the finest natural diamonds, our diamond bracelets encompass graceful and architectural shapes. Each creation follows the curves of the wrist producing an eye-catching display of light that showcases the character of each diamond, offering a timeless symbol of individuality.</p>
                        </div>
                    </div>
                    <div className='mala_Banner_main_div_main1'>
                        <img src={`${storImagePath()}/images/HomePage/Banner/banner2.jpg`} className='mala_Banner_Iamge1' />
                    </div>
                </div>

                {/* <div className=''>
                    <div className='mala_Banner_main_div_main3'>
                        <img src={`${storImagePath()}/images/HomePage/Banner/banner3.jpg`} className='mala_Banner_Iamge3' />
                        <p className='mala_banner_Title'>Chain</p>
                        <div class="products__desc">
                            <h2 class="products__title">CHAIN</h2>
                            <p class="products__subtitle">A treasure trove of perfectly cut diamond pendants in stunning arrangements that will help you stand apart in any setting with your unmatched beauty.</p>
                        </div>
                    </div>
                    <div className='mala_Banner_main_div_main4'>
                        <img src={`${storImagePath()}/images/HomePage/Banner/banner4.jpg`} className='mala_Banner_Iamge4' />
                        <p className='mala_banner_Title'>EARRINGS</p>
                        <div class="products__desc">
                            <h2 class="products__title">EARRINGS</h2>
                            <p class="products__subtitle">diamond studs, drop earrings and hoops reveal the precise artistry of our craftspeople. Whether an understated or an intricate arrangement, each pair of diamonds is hand-selected and expertly matched, to ensure harmonious balance in every design.</p>
                        </div>
                    </div>
                </div> */}
            </div>

            <div className='mala_promo_section2'>
                <div className='mala_promo_section2_div1'>
                    <p className='mala_promo_section2_div1_p1'>Custom Jewelry.
                    Made Without Rules.</p>
                    <p className='mala_promo_section2_div1_p2'>Your clients’ dreams, handmade.</p>
                    <button className='mala_promo_section2_div1_btn'>CREATE</button>
                </div>
                <div className='mala_promo_section2_div2'>
                    <img src={`${storImagePath()}/images/HomePage/Banner/ring.jpg`} className='mala_promo_secton2_img' />
                </div>
            </div>
            {/* <div className='festiveBox'>
                <p className='smilingFestiMainTitle1' style={{ color: 'gray' }}>LAB GROWN DIAMONDS</p>
                <p className='smilingFestiMainTitle2' style={{ color: 'gray', fontSize: '40px', margin: '0px' }}>Festive Finds!</p>
                <p className='smilingFestiMainTitle3' style={{ color: 'gray', margin: '0px', fontSize: '13px' }}>
                    Explore your jewelry for upcoming holiday!
                </p>
            </div> */}
        </div>
    )
}

export default PromotionBaner1