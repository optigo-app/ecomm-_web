import { useNavigate } from "react-router-dom";
import { DiamondLists, shapes } from "../../../../data/NavbarMenu";
import "./ShapeSection.scss";

const ShapeSection = () => {
  const navigate = useNavigate();
  const handleMoveTo = (shape) => {
    navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`)
  }
  return (
    <div className="for_ShapeSection">
      <div className="shape_Section">
        <div className="head">
          <span>Explore With Diamond shapes </span>
        </div>
        {DiamondLists?.slice(0, DiamondLists.length - 3)?.map((val, i) => {
          return (
            <div className="shape_card_for" onClick={() => handleMoveTo(val?.name)}>
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
