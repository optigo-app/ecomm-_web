import React, { useState } from "react";
import "./DesignSet2.scss";
import bgImg from "../../../Assets/full.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Clothes = () => {
  const arr = [
    {
      id: 1,
      name: "The Silvia Eylet Vee",
      price: "$ 388.00",
      imgsrc:
        "https://pipeline-theme-fashion.myshopify.com/cdn/shop/products/SU_Gorjapant_DSP3188_Tumeric_1_ColorCorrection.jpg?v=1639856522&width=352",
    },
    {
      id: 2,
      name:'The Gorja Point',
      price:"$ 328.00",
      imgsrc:
        "https://pipeline-theme-fashion.myshopify.com/cdn/shop/products/SU_Silviaeyeletvee_EPA3577_Saltwhite_2.jpg?v=1639856500&width=352",
    },
  ];

  const [swiper, setSwiper] = useState(null);

  const handlePrevious = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };
  // const currentItem = arr[currentIndex];
  return (
    <>
    <div className="smr_MainDt2Div">
        <div
          style={{
            height: "99.5vh",
            backgroundColor: "black",
            margin: "0px",
            padding: "0px",
            width: '100%',
            position: 'relative',
          }}
          className="maindiv"
        >
          <img src={bgImg} alt="" className="imgBG" />
          <div className="subimgpart">
            <div className="card">
              <Swiper
                      style={{width:'215px'}}
                      spaceBetween={5}
                      slidesPerView={1}
                      loop
                      speed={1500}
                      onSwiper={setSwiper}
              >
              {arr.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="centerall">
                      <img
                        src={item.imgsrc}
                        alt={item.name}
                        className="cardimg"
                      />
                    </div>
                    <div className="fs1 centerall">{item.name}</div>
                    <div className="fs2 centerall">{item.price}</div>
                    <div className="fs3 centerall">View Details</div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="btnflex">
              <button className="btncst" onClick={handlePrevious}>&lt;</button>
              <button className="btncst" onClick={handleNext}>&gt;</button>
            </div>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default Clothes;


// import React, { useState } from "react";
// import "./clothes.css";
// import bgImg from "../../assets/images/full.jpg";

// const Clothes = () => {
//   const arr = [
//     {
//       id: 1,
//       name: "The Silvia Eylet Vee",
//       price: "$ 388.00",
//       imgsrc:
//         "https://pipeline-theme-fashion.myshopify.com/cdn/shop/products/SU_Gorjapant_DSP3188_Tumeric_1_ColorCorrection.jpg?v=1639856522&width=352",
//     },
//     {
//       id: 2,
//       name:'The Gorja Point',
//       price:"$ 328.00",
//       imgsrc:
//         "https://pipeline-theme-fashion.myshopify.com/cdn/shop/products/SU_Silviaeyeletvee_EPA3577_Saltwhite_2.jpg?v=1639856500&width=352",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrevious = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? arr.length - 1 : prevIndex - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === arr.length - 1 ? 0 : prevIndex + 1));
//   };

//   const currentItem = arr[currentIndex];
//   return (
//     <>
//     <div className="">
//         <div
//           style={{
//             height: "99.5vh",
//             backgroundColor: "black",
//             margin: "0px",
//             padding: "0px",
//             width: '100%',
//             position: 'relative',
//           }}
//           className="maindiv"
//         >
//           <img src={bgImg} alt="" className="imgBG" />
//           <div className="subimgpart">
//             <div className="card">
//               <div>
//                 <img src={currentItem.imgsrc} alt={currentItem.name} className="cardimg" />
//               </div>
//               <div className="fs1">{currentItem.name}</div>
//               <div className="fs2">{currentItem.price}</div>
//               <div className="fs3">View Details</div>
//             </div>
//             <div className="btnflex">
//               <button className="btncst" onClick={handlePrevious}>&lt;</button>
//               <button className="btncst" onClick={handleNext}>&gt;</button>
//             </div>
//           </div>
//         </div>
//       </div>
   
//     </>
//   );
// };

// export default Clothes;
