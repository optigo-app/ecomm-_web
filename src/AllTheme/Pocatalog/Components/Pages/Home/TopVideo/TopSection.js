import React, { useEffect, useRef, useState } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './TopSection.modul.scss'

const TopSection = () => {
  const localData = JSON.parse(sessionStorage.getItem('storeInit'));
  return (
    <div>
      <img src={`${storImagePath()}/images/HomePage/MainBanner/mainBanner.png`} className='proCatTopBannerImg' />
      {/* <img src={`${localData?.ProCatLogbanner}`} style={{ width: '100%' , minHeight: '250px' }} /> */}
    </div>
  )
}

export default TopSection