import "./GetInTouch.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import btnstyle from "../../../../scss/Button.module.scss";
const GetInTouch = () => {
  const historyImage = `${storImagePath()}/Forevery/82.webp`;

  return (
    <div className="for_GetInTouch">
      <main className="main_warapper">
        <div
          className="image_overlay_getin"
          style={{ background: `url(${historyImage})` }}
        ></div>
        <div className="image_backward_details">
          <div className="store-content ">
            <p className="for_get_title">
              Experience The Dazzling World Of Lab-Grown Diamonds Today!!
            </p>
            <p className="get_desc">
              Need help finding the perfect jewelry piece? Our jewelry
              specialists are here to assist you with all your queries.
              <br /> With their keen eye for detail and expert knowledge,
              they'll guide you toward the perfect addition to your collection.
              Get in touch with us today, and let us help you find the perfect
              piece!
            </p>
            <div className="store-btns">
              <button
                className={`${btnstyle?.btn_15} forevery-btn-get ${btnstyle?.btn_for_new}`}
              >
                Request a Callback
              </button>
              <button className="or">Or</button>
              <button
                className={`${btnstyle?.btn_15} forevery-btn-get ${btnstyle?.btn_for_new}`}
              >
                Book a Virtual Appointment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetInTouch;
