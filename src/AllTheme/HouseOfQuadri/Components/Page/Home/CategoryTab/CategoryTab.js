import React, { useEffect, useState } from "react";
import "./Category.modul.scss";
import { diamondShapes } from "../../../Constants/CategoryList";
import { Hoq_loginState } from "../../../Recoil/atom";
import { useRecoilValue } from "recoil";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CategoryTab = () => {
  const [albumData, setAlbumData] = useState();
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigate();
  const islogin = useRecoilValue(Hoq_loginState);
  const showShapeSection = false ;
  useEffect(() => {
    let data = JSON.parse(localStorage?.getItem("storeInit"));
    setImageUrl(data?.AlbumImageFol);

    const loginUserDetail = JSON.parse(
      localStorage?.getItem("loginUserDetail")
    );
    const storeInit = JSON.parse(localStorage?.getItem("storeInit"));
    const IsB2BWebsite = storeInit?.IsB2BWebsite;
    const visiterID = Cookies.get("visiterId");
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalID = loginUserDetail?.id || "0";
    }

    Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum", finalID)
      .then((response) => {
        if (response?.Data?.rd) {
          setAlbumData(response?.Data?.rd);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNavigate = (name) => {
    navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`);
  };

  return (
    <div className="hoq_main_CategoryTab">
      <div className="header">
        <h1>Shop By Category</h1>
      </div>
      <div className="category_row">
        {albumData?.slice(0, 4)?.map((data, i) => {
          return (
            <CategoryCard
              src={imageUrl + data?.AlbumImageFol + "/" + data?.AlbumImageName}
              onClick={() => handleNavigate(data?.AlbumName)}
              name={data?.AlbumName}
            />
          );
        })}
      </div>
      {showShapeSection && <ShapeSection />}
      {/*  */}
    </div>
  );
};

export default CategoryTab;

const ShapeSection = () => {
  return (
    <>
      <div className="header">
        <h1> Shop By Shape</h1>
      </div>
      <div className="shape_category_row">
        {diamondShapes?.map(({ img, shape }, i) => {
          return <ShapeCard img={img} shape={shape} />;
        })}
      </div>
    </>
  );
};

const CategoryCard = ({ src, onClick, name }) => {
  return (
    <div className="c_card" onClick={onClick}>
      <div className="image">
        <img src={src} alt="" />
      </div>
      <div className="title">
        <h2 className="hoq_albumName">{name}</h2>
      </div>
    </div>
  );
};

const ShapeCard = ({ img, shape }) => {
  return (
    <div className="s_card">
      <div className="image">
        <img src={img} alt="" />
      </div>
      <div className="title">
        <h2>{shape}</h2>
      </div>
    </div>
  );
};
