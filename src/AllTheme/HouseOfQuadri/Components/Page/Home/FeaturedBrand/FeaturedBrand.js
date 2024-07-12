import "./FeaturedBrand.modul.scss";
import { FeaturedBrandList } from "../../../Constants/Featuredbrandlist";
const FeaturedBrand = () => {
  return (
    <div className="hoq_main_FeaturedBrand">
      <div className="heading">
        <h3>Featured In</h3>
      </div>
      <div className="horizontal_list">
        {FeaturedBrandList?.map((val, i) => {
          return (
            <div className="brand_card">
              <img src={val} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedBrand;
