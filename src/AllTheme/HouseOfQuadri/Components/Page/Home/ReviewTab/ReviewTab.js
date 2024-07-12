import { useRef, useState } from "react";
import "./ReviewTab.modul.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { fakeReviewsList } from "../../../Constants/FakeReviewList";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { settings } from "../../../Constants/SliderConfig";

const ReviewTab = () => {
  const slider = useRef(null);
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(-1);

  const toggleExpand = (index) => {
    if (expandedReviewIndex === index) {
      setExpandedReviewIndex(-1);
    } else {
      setExpandedReviewIndex(index);
    }
  };
  return (
    <div className="hoq_main_ReviewTab">
      <div className="header">
        <h1>1000+ Customers have trusted HoQ</h1>
      </div>
      <div className="review_Slider">
        <div className="Slider_Custom_btn next">
          <button onClick={() => slider?.current?.slickNext()}>
            <FiChevronLeft size={24} />
          </button>
          <button onClick={() => slider?.current?.slickPrev()}>
            <FiChevronRight size={24} />
          </button>
        </div>
        <Slider {...settings} ref={slider}>
          {fakeReviewsList?.map((val, i) => {
            return (
              <div className="review_card">
                <div className="r_card">
                  <div className="user_info_">
                    <img src={val?.img} alt="" />
                    <span>{val?.user}</span>
                  </div>
                  <div className="star">
                    <span>
                      {Array.from({ length: val?.rating }).map((val) => (
                        <FaStar color="#FFB400" size={22} />
                      ))}
                    </span>
                    <small>{val?.time}</small>
                  </div>
                  <div className="line" />
                  <div className="description">
                    <p>
                      {expandedReviewIndex === i
                        ? val?.review?.trim()
                        : val?.review?.trim()?.slice(0, 60) + '...'}
                    </p>
                    {val?.review?.trim()?.length > 50 && (
                      <>
                        <small
                          onClick={() => toggleExpand(i)}
                          className="readmore_btn"
                        >
                          {expandedReviewIndex === i ? "Hide" : "Read More"}
                        </small>
                      </>
                    )}
                  </div>
                  <div className="posted_on">
                    <FcGoogle size={24} />
                    <small>posted on</small>
                    <a href="#">{val?.postedOn}</a>
                    <hr />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewTab;
