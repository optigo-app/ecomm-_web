import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DiamondDetails from './DiamondDetails/DiamondDetails';
import ProductDetail from './ProductDetail/ProductDetail';

const DetailsRoute = () => {
  const { pathname } = useLocation();
  console.log('pathname: ', pathname);
  const [DiamondData, setDiamondData] = useState(false);
  const getDiamondDet = pathname.split('/')[3];

  useEffect(() => {
    if (getDiamondDet?.includes("diamond")) {
      setDiamondData(true)
    }

  }, [pathname])
  return (
    <>
      {DiamondData === true ? (
        <DiamondDetails />
      ) : (
        <ProductDetail />
      )}
    </>
  )
}

export default DetailsRoute