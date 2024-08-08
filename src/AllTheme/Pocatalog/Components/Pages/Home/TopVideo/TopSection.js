import React, { useEffect, useRef, useState } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const TopSection = () => {


  const localData = JSON.parse(localStorage.getItem('storeInit'));

  console.log('localData?.ProCatLogbannerlocalData?.ProCatLogbanner',localData?.ProCatLogbanner);
  return (
    <div>
      <img src={`${localData?.ProCatLogbanner}`} style={{ width: '100%' }} />
    </div>
  )
}

export default TopSection