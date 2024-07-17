import React from 'react'
import './brandComponents.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const BrandsComponent = () => {
    return (
        <div id='brandsComponentID' className='smr_brandsComponentsDiv'>
            <p className='brandsCompoents'>introducing our exclusive brands</p>
            <div className='brandsComponentClass' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo2.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                {/* <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo1.png`} style={{ width: '10%', objectFit: 'cover', marginRight:'90px' }} /> */}
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo3.png`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                {/* <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo4.webp`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} /> */}
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo5.svg`} style={{ width: '10%', objectFit: 'cover', marginRight: '90px' }} />
                <img className='affilitionImg' loading="lazy" src={`${storImagePath()}/images/HomePage/BrandLogo/logo6.png`} style={{ width: '10%', objectFit: 'cover'}} />
            </div>
        </div>
    )
}

export default BrandsComponent