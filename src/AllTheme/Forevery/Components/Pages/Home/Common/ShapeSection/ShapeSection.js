import { DiamondLists, shapes } from "../../../../data/NavbarMenu";
import "./ShapeSection.scss";

const ShapeSection = () => {
  return (
    <div className="for_ShapeSection">
      <div className="shape_Section">
        <div className="head">
          <span>Explore With Diamond shapes </span>
        </div>
        {DiamondLists?.slice(0, DiamondLists.length - 3)?.map((val, i) => {
          return (
            <div className="shape_card_for">
              <img src={val?.img} alt="" />
              <span>{val?.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShapeSection;
