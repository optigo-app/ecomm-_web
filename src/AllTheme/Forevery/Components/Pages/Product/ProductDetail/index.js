import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import DiamondDetails from "./DiamondDetails";

const ProductD = () => {
  const { pathname } = useLocation();
  const [show, setshow] = useState("");
  useEffect(() => {
    const islabgrown = pathname?.split("/")[2];
    setshow(islabgrown);
  }, [pathname]);
  return <>
{show === 'labgrowndiamond' ? <>
<DiamondDetails/>
</> : <ProductDetail/>}
  </>;
};

export default ProductD;


