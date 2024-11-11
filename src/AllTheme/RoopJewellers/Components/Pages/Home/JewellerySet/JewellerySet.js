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
                    <p className='roop_jewls_Div_name'>Gold Necklace</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/3.jpg`} />
                </div>
                <div className='roop_jewls__image_div1'>
                    <p className='roop_jewls_Div_name'>Diamond Necklace</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/4.jpg`} />
                </div>

                <div className='roop_jewels_bannerImg_div'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/5.png`} />
                    <p className='roop_jewls_Div_name'>Silver Coin & Bars</p>
                </div>

                <div className='roop_jewls__image_div'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/3.jpg`} />
                    <p className='roop_jewls_Div_name'>Gold Necklace</p>
                </div>
                <div className='roop_jewls__image_div1'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/4.jpg`} />
                    <p className='roop_jewls_Div_name'>Diamond Necklace</p>
                </div>
                <div className='roop_jewls__image_div'>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/1.jpg`} />
                    <p className='roop_jewls_Div_name'>Gold Ring</p>
                </div>
                {/* <div className='roop_jewls__image_div' style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                        className='roop_jewelImg'
                        loading="lazy"
                        src={`${storImagePath()}/images/HomePage/DesignSet/1.jpg`}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                    <p
                        className='roop_jewls_Div_name'
                        style={{
                            position: 'absolute',
                            // bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            padding: '8px 15px',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent background
                            color: 'white',
                            fontSize: '23px',
                            // fontWeight: 'bold',
                            borderRadius: '5px',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // text shadow for better readability
                            margin: 0
                        }}
                    >
                        Gold Ring
                    </p>
                </div> */}

                <div className='roop_jewls__image_div1'>
                    <p className='roop_jewls_Div_name'>Gold Bar</p>
                    <img className='roop_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/DesignSet/2.jpg`} />
                </div>
            </div>
        </div>
    )
}

export default JewellerySet