import React from "react";
import "./Bespokejewelry.scss";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import OurServices from "../../Home/Common/OurServices/OurServices";
import GetInTouch from "../../Home/Common/GetInTouch/GetInTouch";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { foreveryProcess } from "../../../data/dummydata";

const Bespokejewelry = () => {
  return (
    <div className="for_Bespokejewelry">
      <Banner />
      <ColumnGrid />
      <OurServices />
      <GetInTouch />
      <NewsletterSignup />
    </div>
  );
};

export default Bespokejewelry;

const Banner = () => {
  const img = `${storImagePath()}/Forevery/static/pen.png`;
  return (
    <section className="bespoke-banner " style={{ background: `url(${img})` }}>
      <div className="overlay"></div>
      <div className="banner_content ">
        <h1 className="title">bespoke jewelry</h1>
        <div className="Parisienne">Turn your imagination into reality</div>
        <p className="para">
          With Forevery, you can tailor make your dream ring. We, at Forevery,
          make sure that all your ideas come to life with our special service to
          customize your ring. You just need to share your ideas and we’ll
          design and manufacture your ring and get it ready for collection in no
          time.
        </p>
        <button className="inquire_btn">inquire now</button>
      </div>
    </section>
  );
};
const ColumnGrid = () => {
  return (
    <>
      <div className="ColumnGrid">
        {foreveryProcess?.map(
          ({ Subtitle, description, step, title, img }, i) => {
            return (
              <div className="column_card">
                <div className="image_col">
                  <img src={img} alt="" />
                </div>
                <div className="details_col">
                  <h1 className="title_col">{title}</h1>
                  <span className="subtitle_col">{Subtitle}</span>
                  <p className="para_col">{description}</p>
                </div>
              </div>
            );
          }
        )}
        <button className="inquire_btn">inquire now</button>
      </div>
    </>
  );
};
