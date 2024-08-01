import React, { useEffect, useState } from "react";
import "./Album.modul.scss";
import { useNavigate } from "react-router-dom";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import Cookies from "js-cookie";
import { smrMA_loginState } from "../../../Recoil/atom";
import { useRecoilValue } from "recoil";

const Album = () => {
  const [albumData, setAlbumData] = useState();
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigate();
  const islogin = useRecoilValue(smrMA_loginState);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("storeInit"));
    setImageUrl(data?.AlbumImageFol);

    const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));
    const storeInit = JSON.parse(localStorage.getItem('storeInit'));
    const { IsB2BWebsite } = storeInit;
    const visiterID = Cookies.get('visiterId');
    let finalID;
    if (IsB2BWebsite == 0) {
      finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
    } else {
      finalID = loginUserDetail?.id || '0';
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
    let storeinit = JSON.parse(localStorage.getItem("storeInit"));
    if (storeinit?.IsB2BWebsite == 1) {
      if (islogin) {
        navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`)
      } else {
        navigation('/signin')
      }
    } else {
      navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`)
    }

  }

  return (
    <div className="smrMA_alubmMainDiv">
      <p className="smr_albumTitle">Album</p>
      <div className="smr_albumALL_div">
        {albumData?.slice(0, 4).map((data, index) => (
          <div
            key={index}
            className="smr_AlbumImageMain"
            onClick={() => handleNavigate(data?.AlbumName)}
          >
            <img
              src={imageUrl + data?.AlbumImageFol + "/" + data?.AlbumImageName}
              className="smr_AlbumImageMain_img"
            />
            {/* <p className="smr_albumName">{data?.AlbumName}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
