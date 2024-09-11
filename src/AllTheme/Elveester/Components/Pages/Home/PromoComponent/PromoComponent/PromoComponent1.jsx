import React from 'react'
import './Styles.css'
import { useNavigate } from 'react-router-dom'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const PromoComponent1 = () => {

    const navigation = useNavigate();
    
    return (
        <div className='mt-5' style={{marginTop: '50px'}}>
            <div className='promo-daimondBoxMain'>
                <div className='promo-daimondBox2'>
                    <img src={`${storImagePath()}/images/HomePage/Promo/Banner/PromoBanner1.jpg`} loading="lazy" className='promo-daimondBox2-image'/>
                </div>
                <div className='promo-daimondBox_1'>
                    <p style={{  fontSize: '22px', color: 'rgba(29, 50, 88, 0.8)' }}>From the first sketch to the final polish, every step of the journey takes place within the walls of our atelier, where master artisans breathe life into raw materials, transforming them into timeless works of art. Each piece is meticulously crafted with a blend of traditional techniques and contemporary innovation, reflecting a harmonious balance between heritage and modernity.</p>
                </div>
            </div>
        </div>
    )
}

export default PromoComponent1