import React, { useEffect, useRef, useState } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const TopSection = () => {

  return (
    <div>
      <img src={`${storImagePath()}/images/HomePage/MainBanner/mainTopBanner.jpg`} style={{ width: '100%' }} />
    </div>
  )
}

export default TopSection