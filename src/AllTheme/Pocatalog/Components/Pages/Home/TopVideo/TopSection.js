import React, { useEffect, useRef, useState } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const TopSection = () => {


  const [localData, setLocalData] = useState();

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem('storeInit'));
    setLocalData(localData);
  }, [])

  return (
    <div>
      <img src={`${localData?.ProCatLogbanner}`} style={{ width: '100%' }} />
    </div>
  )
}

export default TopSection