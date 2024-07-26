import React, { useEffect, useState } from "react";
import "./Album.modul.scss";
import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import { proCat_loginState } from "../../../Recoil/atom";
import imageNotFound from "../../../Assets/image-not-found.jpg"
import { Box, Modal } from "@mui/material";

const Album = () => {
  const [albumData, setAlbumData] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageStatus, setImageStatus] = useState({});
  const navigate = useNavigate();
  const islogin = useRecoilValue(proCat_loginState);
  const [open, setOpen] = useState(false);
  const [designSubData, setDesignSubData] = useState();

  // Load initial image URL from local storage
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("storeInit"));
    setImageUrl(data?.AlbumImageFol || "");
  }, []);

  function checkImageAvailability(imageUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }

  const handleNavigate = (data) => {
    const url = `/p/${data?.AlbumName}/?A=${btoa(`AlbumName=${data?.AlbumName}`)}`;
    const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;

    if (data?.IsDual == 1) {
      let Newdata = JSON.parse(data?.AlbumDetail);
      setDesignSubData(Newdata);
      handleOpen();
    } else {
      if (islogin || data?.AlbumSecurityId == 0) {
        navigate(url);
      } else {
        navigate(redirectUrl);
      }
    }
  };

  const handleNavigateSub = (data) => {
    const url = `/p/${data?.AlbumName}/?A=${btoa(`AlbumName=${data?.AlbumName}`)}`;
    const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;

    if (islogin || data?.AlbumSecurityId == 0) {
      navigate(url);
    } else {
      navigate(redirectUrl);
    }
  };
  console.log('datadatadata', designSubData);

  // Fetch album data and check image availability
  useEffect(() => {
    const fetchAlbumData = async () => {
      const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));
      const storeInit = JSON.parse(localStorage.getItem('storeInit'));
      const { IsB2BWebsite } = storeInit;
      const visiterID = Cookies.get('visiterId');
      const finalID = IsB2BWebsite == 0
        ? islogin ? loginUserDetail?.id || '0' : visiterID
        : loginUserDetail?.id || '0';

      try {
        const response = await Get_Tren_BestS_NewAr_DesigSet_Album("GETProcatalog", finalID);
        if (response?.Data?.rd) {
          setAlbumData(response.Data.rd);

          const status = {};
          for (const data of response.Data.rd) {
            const fullImageUrl = `${imageUrl}${data?.AlbumImageFol}/${data?.AlbumImageName}`;
            status[fullImageUrl] = await checkImageAvailability(fullImageUrl);
          }
          setImageStatus(status);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (imageUrl) {
      fetchAlbumData();
    }
  }, [imageUrl, islogin]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className="proCat_alubmMainDiv">

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          height: '500px',
          display: 'flex',
          p: 4,
        }}>
          {designSubData?.map((data, index) => (
            <div
              key={index}
              className="smr_AlbumImageMainPopup"
              onClick={() => handleNavigateSub(data)}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={
                    imageStatus[`${imageUrl}${data?.AlbumImageFol}/${data?.AlbumImageName}`]
                      ? `${imageUrl}${data?.AlbumImageFol}/${data?.AlbumImageName}`
                      : imageNotFound
                  }
                  className="smr_AlbumImageMainPopup_img"
                  alt={data?.AlbumName}
                />
                {islogin || data?.AlbumSecurityId == 0 ?
                  ''
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" className="proCat_AlbumLockIcone_popup lock_icon">
                    <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z" fill="#000000"></path>
                  </svg>
                }
              </div>
              <p className="smr_albumName">{data?.AlbumName}</p>
            </div>
          ))}

        </Box>
      </Modal>
      <p className="smr_albumTitle">ALBUM</p>
      <div className="smr_albumALL_div">
        {albumData.map((data, index) => (
          <div
            key={index}
            className="smr_AlbumImageMain"
            onClick={() => handleNavigate(data)}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={
                  imageStatus[`${imageUrl}${data?.AlbumImageFol}/${data?.AlbumImageName}`]
                    ? `${imageUrl}${data?.AlbumImageFol}/${data?.AlbumImageName}`
                    : imageNotFound
                }
                className="smr_AlbumImageMain_img"
                alt={data?.AlbumName}
              />
              {islogin || data?.AlbumSecurityId == 0 ?
                ''
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" className="proCat_AlbumLockIcone lock_icon">
                  <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z" fill="#000000"></path>
                </svg>
              }
            </div>
            <p className="smr_albumName">{data?.AlbumName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;




// import React, { useEffect, useState } from "react";
// import "./Album.modul.scss";
// import { Get_Tren_BestS_NewAr_DesigSet_Album } from "../../../../../../utils/API/Home/Get_Tren_BestS_NewAr_DesigSet_Album/Get_Tren_BestS_NewAr_DesigSet_Album";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { useRecoilValue } from "recoil";
// import { proCat_loginState } from "../../../Recoil/atom";
// import imageNotFound from "../../../Assets/image-not-found.jpg"

// const Album = () => {
//   const [albumData, setAlbumData] = useState();
//   const [imageUrl, setImageUrl] = useState();
//   const navigation = useNavigate();
//   const islogin = useRecoilValue(proCat_loginState);

//   useEffect(() => {

//     const queryParams = new URLSearchParams(window.location.search);
//     const AlbumVal = queryParams.get('AlbumVal');
//     // const token = queryParams.get('token');

//     console.log('AlbumValAlbumVal', AlbumVal);


//     let data = JSON.parse(localStorage.getItem("storeInit"));
//     setImageUrl(data?.AlbumImageFol);

//     const loginUserDetail = JSON.parse(localStorage.getItem('loginUserDetail'));
//     const storeInit = JSON.parse(localStorage.getItem('storeInit'));
//     const { IsB2BWebsite } = storeInit;
//     const visiterID = Cookies.get('visiterId');
//     let finalID;
//     if (IsB2BWebsite == 0) {
//       finalID = islogin === false ? visiterID : (loginUserDetail?.id || '0');
//     } else {
//       finalID = loginUserDetail?.id || '0';
//     }

//     Get_Tren_BestS_NewAr_DesigSet_Album("GETProcatalog", finalID)
//       .then((response) => {
//         if (response?.Data?.rd) {
//           setAlbumData(response?.Data?.rd);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);


//   console.log('albumDataalbumData', albumData);

//   const handleNavigate = (name) => {

//     let url = (`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`);
//     const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(url)}`;

//     if (islogin == true) {
//       navigation(`/p/${name}/?A=${btoa(`AlbumName=${name}`)}`)
//     } else {
//       navigation(redirectUrl);
//     }
//   }


//   return (
//     <div className="proCat_alubmMainDiv">
//       <p className="smr_albumTitle">ALBUM</p>
//       <div className="smr_albumALL_div">
//         {albumData?.map((data, index) => (
//           <div
//             key={index}
//             className="smr_AlbumImageMain"
//             onClick={() => handleNavigate(data?.AlbumName)}
//           >
//             <div style={{ position: 'relative' }}>
//               <img
//                 src={imageUrl + data?.AlbumImageFol + "/" + data?.AlbumImageName}

//                 className="smr_AlbumImageMain_img"
//               />
//               {!islogin &&
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" className="proCat_AlbumLockIcone lock_icon">
//                   <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z" fill="#000000"></path>
//                 </svg>
//               }
//             </div>
//             <p className="smr_albumName">{data?.AlbumName}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Album;