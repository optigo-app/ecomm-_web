import React from 'react'
import './JewellerySet.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

function JewellerySet() {
    return (
        <div className='roop_jewlSet_Main'>

            <p className='roop_jewl_title'>Discover our carefully curated Jewellery Sets</p>
            <div className='roop_jewls_main_sub'>
                <div className='roop_jewls__image_div'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/1.jpg`} />
                    <p className='roop_jewls_Div_name'>Gold Ring</p>
                </div>
                <div className='roop_jewls__image_div1'>
                    <p className='roop_jewls_Div_name'>Gold Bar</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/2.jpg`} />
                </div>
                <div className='roop_jewls__image_div'>
                    <p className='roop_jewls_Div_name'>Ring</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/3.jpg`} />
                </div>
                <div className='roop_jewls__image_div1'>
                    <p className='roop_jewls_Div_name'>Necklace Sets</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/4.jpg`} />
                </div>

                <div className='roop_jewels_bannerImg_div'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/5.png`} />
                    <p className='roop_jewls_Div_name'>Gold Ring</p>
                </div>

                <div className='roop_jewls__image_div'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/3.jpg`} />
                    <p className='roop_jewls_Div_name'>Ring</p>
                </div>
                <div className='roop_jewls__image_div1'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/4.jpg`} />
                    <p className='roop_jewls_Div_name'>Necklace Sets</p>
                </div>
                <div className='roop_jewls__image_div'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/1.jpg`} />
                    <p className='roop_jewls_Div_name'>Gold Ring</p>
                </div>
                <div className='roop_jewls__image_div1'>
                    <p className='roop_jewls_Div_name'>Gold Bar</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/2.jpg`} />
                </div>
            </div>
        </div>
    )
}

export default JewellerySet