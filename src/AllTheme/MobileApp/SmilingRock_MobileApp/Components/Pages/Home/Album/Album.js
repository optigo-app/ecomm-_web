import React, { useEffect, useState } from "react";
import "./Album.modul.scss";
import { useNavigate } from "react-router-dom";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";

const Album = () => {
  const [albumData, setAlbumData] = useState();
  const [imageUrl, setImageUrl] = useState();
  const navigation = useNavigate();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("storeInit"));
    setImageUrl(data?.AlbumImageFol);

    Get_Tren_BestS_NewAr_DesigSet_Album("GETAlbum")
      .then((response) => {
        if (response?.Data?.rd) {
          setAlbumData(response?.Data?.rd);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNavigate = (name) => {
    navigation(`/productlist/?AlbumName=${name}`);
  };

  return (
    <div className="smrMA_alubmMainDiv">
      {/* <p className="smr_albumTitle">ALBUM</p> */}
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
