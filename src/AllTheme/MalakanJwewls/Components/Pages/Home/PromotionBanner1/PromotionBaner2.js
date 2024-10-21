import React from 'react'
import { useRecoilValue } from 'recoil';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './PromotionBaner1.modul.scss'

const PromotionBaner1 = () => {



    return (
        <div className='mala_Banner_main'>
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

            
            <div className='mala_promo2_main2'>
                <div className='mala_promo2_main2_1'>
                    <img src={`${storImagePath()}/images/HomePage/ring.jpg`} className='mala_promo_secton2_img' />
                </div>
                <div className='mala_promo2_main2_2'>
                    <p className='mala_promo2_main2_2_p' >Every piece of Malakan custom jewelry is the result of exquisite craftsmanship. Dedicated to time-honored traditions, Malakan is the workshop that has been trusted by jewelers for more than 80 years to create extraordinary pieces of jewelry for their customers.</p>
                    <p className='mala_promo2_main2_2_p' >Your clients dare to dream – and they don’t dream of the status quo. They dream of greatness – shattered ceilings and forged opportunities. Your clients deserve custom jewelry that stands out as much as they do. You can feel confident creating exactly what they desire knowing the Malakan team is behind you.</p>
                </div>
            </div>

            <div className='mala_promo_bottomMain'>
                <div className='mala_promo_bottomMainSub'>
                    <p className='mala_promo_bottomMainP'>Let us be your custom jewelry workshop and create pieces for your customers that will last a lifetime.</p>
                    <button className='mala_promo_bottomMainBtn'>GET STARTED</button>
                </div>
            </div>
        </div>
    )
}

export default PromotionBaner1