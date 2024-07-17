import "./ReadyToShip.modul.scss";
import { ReadyToShipImage } from "../../../Constants/ReadyToShopImg";
import { Link } from "react-router-dom";

const ReadyToShip = () => {
  return (
    <div className="hoq_main_TabSection">
      <div className="header">
        <h1>Ready to Ship</h1>
        <button>View All</button>
      </div>
      <div className="tab_card">
        {ReadyToShipImage?.map((val, i) => {
          return (
            <div className="TabCard_main">
              {val?.new && <button className="new">New</button>}
              <div className="cardhover">
                <img src={val?.FrontImg} alt={val?.id} />
                <div className="overlay_img">
                  <img src={val?.BackerImg} alt={val?.id} />
                </div>
              </div>
              <div className="tab_hover_Details">
                <h3>{i + 1} ct Heart Ring</h3>
                <small>INR 79,000</small>
              </div>
            </div>
          );
        })}
        <div className="TabCard_main t-mobile-only">
          <div className="box">
            <Link to={"/"}>View All 106 Products</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyToShip;
