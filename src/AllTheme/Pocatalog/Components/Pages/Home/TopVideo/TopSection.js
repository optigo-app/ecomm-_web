import React, { useEffect, useRef, useState } from 'react'

const TopSection = () => {
  const localData = JSON.parse(sessionStorage.getItem('storeInit'));
  return (
    <div>
      <img src={`${localData?.ProCatLogbanner}`} style={{ width: '100%' }} />
    </div>
  )
}

export default TopSection