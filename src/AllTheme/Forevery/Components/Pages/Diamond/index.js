import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./DiamondPage.scss";
import { StepImages } from "../../data/NavbarMenu";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { useEffect, useState } from "react";

const DiamondPage = () => {
  const Navigation = useNavigate();
  const { pathname } = useLocation();
  const breadCrumb = pathname?.split("/")[2];
  const [Swap, setswap] = useState("diamond");

  const StyleCondition = {
    fontSize: breadCrumb === "settings" && "14px",
    fontWeight: breadCrumb === "settings" && "700",
  };

  return (
    <>
      <div className="for_DiamondPage">
        <BannerForSettings breadCrumb={breadCrumb} />
        <div className="section_dia">
          <BreadCrumb breadCrumb={breadCrumb} />
          <DiamondNavigation
            StyleCondition={StyleCondition}
            Swap={Swap}
            setswap={setswap}
          />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default DiamondPage;

const BannerForSettings = ({ breadCrumb }) => {
  const location = useLocation();
  const getSettingName = location?.pathname.split('/')[3];
  return (
    <>
      {breadCrumb === "settings" && (
        <div className="setting_bg">
          {getSettingName.includes('Ring') ? (
            <img
              src={`${storImagePath()}/images/ProductListing/SettingBanner/Ring/ring.webp`}
              alt=""
            />
          ) : (
            <img
              src={`${storImagePath()}/images/ProductListing/SettingBanner/Pendant/pendant.webp`}
              alt=""
            />
          )}
        </div>
      )}
    </>
  );
};
const BreadCrumb = ({ breadCrumb }) => {
  return (
    <div className="breadcrumb">
      <ul>
        <li>
          <Link to={"/"}>Home</Link>{" "}
        </li>
        <li>/</li>
        <li>
          <Link to={breadCrumb}>{breadCrumb}</Link>
        </li>
        <li>/</li>
        <li> All</li>
      </ul>
    </div>
  );
};
const DiamondNavigation = ({ Swap, StyleCondition, setswap }) => {
  const Navigation = useNavigate();
  return (
    <div className="diamond_Step">
      {Swap === "diamond" ? (
        <div
          className="step d-1"
          onClick={() => {
            Navigation(`diamond`);
            setswap("diamond");
          }}
        >
          <span style={StyleCondition}>
            <img src={StepImages[0]?.img} alt="" /> Diamond
          </span>
        </div>
      ) : (
        <div
          className="step d-2"
          onClick={() => {
            Navigation(`settings`);
            setswap("settings");
          }}
        >
          <span style={StyleCondition}>
            <img src={StepImages[1]?.img} alt="" /> Settings
          </span>
        </div>
      )}
      {Swap !== "diamond" ? (
        <div
          className="step d-1"
          onClick={() => {
            Navigation(`diamond`);
            setswap("diamond");
          }}
        >
          <span style={StyleCondition}>
            <img src={StepImages[0]?.img} alt="" /> Diamond
          </span>
        </div>
      ) : (
        <div
          className="step d-2"
          onClick={() => {
            Navigation(`settings`);
            setswap("settings");
          }}
        >
          <span style={StyleCondition}>
            <img src={StepImages[1]?.img} alt="" /> Settings
          </span>
        </div>
      )}
      <div className="step d-3">
        <span style={StyleCondition} onClick={() => Navigation(`ring`)}>
          <img src={StepImages[2]?.img} alt="" /> Rings
        </span>
      </div>
    </div>
  );
};
