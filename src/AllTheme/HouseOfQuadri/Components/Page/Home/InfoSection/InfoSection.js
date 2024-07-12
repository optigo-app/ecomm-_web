import { useState } from "react";
import { aboutUsContent, collections } from "../../../Constants/InfoList";
import "./InfoSection.modul.scss";

const InfoSection = () => {
  const [show, setshow] = useState(false);

  return (
    <div className="hoq_main_InfoSection">
      <div className="main_content">
        {aboutUsContent.map((val, i) => {
          return (
            <div className="about_card">
              <h3>{val?.title}</h3>
              <p>{val?.description}</p>
            </div>
          );
        })}
      </div>
      {show && (
        <>
          <div className="main_content_2">
            <h1>Our Collections </h1>
            {collections.map((val, i) => {
              return (
                <div className="about_card_2">
                  <a href="#">{val?.title}</a>
                  <p>{val?.description}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
      <span onClick={() => setshow(!show)}>
        {show ? "Less Show" : "Read Less"}
      </span>
    </div>
  );
};

export default InfoSection;
