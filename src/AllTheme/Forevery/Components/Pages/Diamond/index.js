import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./DiamondPage.scss";
import { StepImages } from "../../data/NavbarMenu";
import { formatter, storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { forwardRef, useEffect, useRef, useState } from "react";
import Pako from "pako";

const DiamondPage = () => {
  const Navigation = useNavigate();
  const { pathname } = useLocation();
  const breadCrumb = pathname?.split("/")[2];
  const [Swap, setswap] = useState("diamond");

  const StyleCondition = {
    fontSize: breadCrumb === "settings" && "14px",
    fontWeight: breadCrumb === "settings" && "700",
  };

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);
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

const HandleDrp = forwardRef(({ index, open, handleOpen, data }, ref) => {
  const [storeInit, setStoreInit] = useState({});
  const [loginCurrency, setLoginCurrency] = useState();
  const Navigation = useNavigate();
  const location = useLocation();
  const loginUserDetail = JSON.parse(sessionStorage.getItem("loginUserDetail"));
  const [isRing, setIsRing] = useState(false);

  useEffect(() => {
    setIsRing(location?.pathname.split('/')[3])
  }, [location?.pathname])

  useEffect(() => {
    const storeData = JSON.parse(sessionStorage.getItem("storeInit"));
    setStoreInit(storeData);

    const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    setLoginCurrency(loginData);
  }, []);

  const handleRemoveItem = (index) => {
    const storedData = JSON.parse(sessionStorage.getItem('custStepData'));
    const storedSteps = JSON.parse(sessionStorage.getItem('customizeSteps'));

    if (index === 0) {
      sessionStorage.removeItem('custStepData');
      handleOpen(null)
    }
    else {
      if (Array.isArray(storedData)) {
        storedData.splice(index, 1);
        handleOpen(null)

        sessionStorage.setItem('custStepData', JSON.stringify(storedData));
      }
    }

    if (index === 0) {
      sessionStorage.removeItem('customizeSteps');
      handleOpen(null)
    }
    else {
      if (Array.isArray(storedSteps)) {
        storedSteps.splice(index, 2);
        handleOpen(null)

        sessionStorage.setItem('customizeSteps', JSON.stringify(storedSteps));
      }
    }
  };

  const handleInnerClick = (event) => {
    event.stopPropagation();
  };

  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);

      const compressed = Pako.deflate(uint8Array, { to: "string" });

      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error("Error compressing and encoding:", error);
      return null;
    }
  };

  const handleMoveToDet = (data) => {
    if (data?.stockno) {
      const obj = {
        a: data?.stockno,
        b: data?.shapename,
      };

      let encodeObj = compressAndEncode(JSON.stringify(obj));

      let navigateUrl = `/d/${data?.stockno}/det345/?p=${encodeObj}`;
      Navigation(navigateUrl);
    }
    if (data?.autocode) {
      let pValue = isRing === 'Ring' ? { menuname: 'Engagement_Ring' } : { menuname: 'Diamond_Pendants' };
      let obj = {
        a: data?.autocode,
        b: data?.designno,
        m: data?.MetalPurityid,
        d: loginUserDetail?.cmboDiaQCid,
        c: loginUserDetail?.cmboCSQCid,
        p: pValue,
        f: {},
      };
      console.log("ksjkfjkjdkjfkjsdk--", obj);
      let encodeObj = compressAndEncode(JSON.stringify(obj));

      Navigation(
        `/d/${data?.TitleLine.replace(/\s+/g, `_`)}${data?.TitleLine?.length > 0 ? "_" : ""
        }${data?.designno}/${pValue.menuname.split(' ').join('_')}/?p=${encodeObj}`
      );
    }
  }

  let getDesignImageFol = storeInit?.DesignImageFol;
  const getDynamicImages = (designno, extension) => {
    return `${getDesignImageFol}${designno}_${1}.${extension}`;
  };

  return (
    <div
      className="for_dia_step_eye_div"
      onClick={() => handleOpen(null)}
      style={{ cursor: 'pointer' }}
      ref={ref}
    >
      <img
        className="for_dia_step_eye"
        src={StepImages[0]?.eyeIcon}
        alt=""
        style={{ cursor: 'pointer' }}
      />
      <div
        className="for_navigate_eye_div"
        style={{
          height: open ? "65px" : "0px",
          overflow: open ? "unset" : "hidden",
          cursor: 'default'
        }}
      >
        <div
          className="for_dia_data_div"
          onClick={handleInnerClick}
          style={{ cursor: 'default' }}
        >
          <div className="for_dia_data_image">
            <img
              src={data?.stockno ? `${storImagePath()}/images/ProductListing/Diamond/images/r.png` : getDynamicImages(data?.designno, data?.ImageExtension)}
              alt=""
              style={{ cursor: 'default' }}
            />
          </div>
          <div className="for_dia_price">
            <span>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter(data?.price || data?.UnitCostWithMarkUp)}</span>
          </div>
          <div className="for_view_rem_div">
            <span onClick={(e) => { e.stopPropagation(); handleMoveToDet(data) }} className="for_view">View | </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveItem(index)
              }}
              className="for_rem"
            >
              &nbsp;Remove
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

const DiamondNavigation = ({ Swap, StyleCondition, setswap }) => {
  const dropdownRefs = useRef({});
  const [open, setOpen] = useState(null);
  const [isSetting, setIsSetting] = useState([]);
  const Navigation = useNavigate();
  const location = useLocation();
  const getStepName = location?.pathname.split('/');
  const getCustStepData = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const getCustStepData2 = JSON.parse(sessionStorage.getItem('customizeSteps2'));
  const getdiaData = JSON.parse(sessionStorage.getItem('custStepData'));
  const getdiaData2 = JSON.parse(sessionStorage.getItem('custStepData2'));
  const setting = getStepName.includes('Ring') || getStepName.includes('Pendant');

  useEffect(() => {
    setIsSetting(location?.pathname.split('/'));
  }, [location?.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside of any dropdown
      if (Object.values(dropdownRefs.current).every(ref => ref && !ref.contains(event.target))) {
        setOpen(null); // Close all dropdowns
      }
    };

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  const renderSteps = () => {
    return (
      <>
        <div className={`step_data ${setting === true ? 'active' : ''} d-2`}>
          <span className="for_title_span" style={StyleCondition}
            onClick={() => {
              Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring`);
              setswap("settings");
            }}
          >
            <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={
              (getCustStepData2?.[0]?.Setting === 'Pendant' ? StepImages[1]?.img1 : StepImages[1]?.img) ||
              StepImages[1]?.img
            } alt="" /> Settings
          </span>
          {getdiaData2?.[0]?.step1Data?.[0] && (
            <HandleDrp
              index={0}
              open={open === 'setting'}
              handleOpen={() => handleOpen('setting')}
              data={getdiaData2?.[0]?.step1Data?.[0]}
              ref={(el) => { dropdownRefs.current[0] = el; }}
            />
          )}
        </div>

        <div className={`step_data ${getStepName.includes('diamond') ? 'active' : ''} d-1`}>
          <span className="for_title_span" style={StyleCondition} onClick={() => {
            Navigation(`/certified-loose-lab-grown-diamonds/diamond/Round`);
            setswap("diamond");
          }}>
            <img src={StepImages[0]?.img} alt="" /> Diamond
          </span>
          {(getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && (
            <HandleDrp
              index={1}
              open={open === 'diamond'}
              handleOpen={() => handleOpen('diamond')}
              data={getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data}
              ref={(el) => { dropdownRefs.current[1] = el; }}
            />
          )}
        </div>

        <div className={`step_data ${(getdiaData2?.[1]?.step2Data) ? '' : 'finish_set'} ${getCustStepData2?.[2]?.step3 === true ? 'active' : ''} d-3`}>
          <span style={StyleCondition} onClick={() => { Navigation(`/diamond`); setswap("finish"); }}>
            <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={(getCustStepData2?.[0]?.Setting === 'Pendant' ? StepImages[2]?.img1 : StepImages[2]?.img) ||
              StepImages[2]?.img} alt="" /> {getCustStepData2?.[0]?.Setting === "Pendant" ? 'Pendant' : 'Ring'}
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      {getdiaData?.length > 0 || getStepName.includes('diamond') ? (
        <div className="diamond_Step_data">
          <div className={`step_data ${getStepName.includes('diamond') ? 'active' : ''} d-1`}>
            <span className="for_title_span" style={StyleCondition} onClick={() => {
              Navigation(`/certified-loose-lab-grown-diamonds/diamond/Round`);
              setswap("diamond");
            }}>
              <img src={StepImages[0]?.img} alt="" /> Diamond
            </span>
            {getdiaData?.[0]?.step1Data?.[0] && (
              <HandleDrp
                index={0}
                open={open === 'diamond'}
                handleOpen={() => handleOpen('diamond')}
                data={getdiaData?.[0]?.step1Data?.[0]}
                ref={(el) => { dropdownRefs.current[0] = el; }}
              />
            )}
          </div>

          <div className={`step_data ${setting === true ? 'active' : ''} d-2`}>
            <span className="for_title_span" style={StyleCondition}
              onClick={() => {
                Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring`);
                setswap("settings");
              }}
            >
              <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={(getCustStepData?.[1]?.Setting === 'Pendant' ? StepImages[1]?.img1 : StepImages[1]?.img) ||
                StepImages[2]?.img} alt="" /> Settings
            </span>
            {(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) && (
              <HandleDrp
                index={1}
                open={open === 'setting'}
                handleOpen={() => handleOpen('setting')}
                data={getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data}
                ref={(el) => { dropdownRefs.current[1] = el; }}
              />
            )}
          </div>

          <div className={`step_data ${(getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getCustStepData?.[3]?.step3 === true ? 'active' : ''} d-3`}>
            <span style={StyleCondition} onClick={() => { Navigation(`/diamond`); setswap("finish"); }}>
              <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={(getCustStepData?.[1]?.Setting === 'Pendant' ? StepImages[2]?.img1 : StepImages[2]?.img) ||
                StepImages[2]?.img} alt="" /> {getCustStepData?.[1]?.Setting === "Pendant" ? 'Pendant' : 'Ring'}
            </span>
          </div>
        </div>
      ) : (
        <>
          {!isSetting.join(' ').includes('diamond_shape') ? (
            <div className="diamond_Step_data">
              {renderSteps()}
            </div>
          ) : (
            <>
              <div className="diamond_Step">
                {Swap === "diamond" ? (
                  <div
                    className="step d-1"
                    onClick={() => {
                      Navigation(`/certified-loose-lab-grown-diamonds/diamond/Round`);
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
                      Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=V29tZW4vZ2VuZGVy`);
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
                      Navigation(`/certified-loose-lab-grown-diamonds/diamond`);
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
                      Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring`);
                      setswap("settings");
                    }}
                  >
                    <span style={StyleCondition}>
                      <img src={StepImages[1]?.img} alt="" /> Settings
                    </span>
                  </div>
                )}
                <div className="step d-3">
                  <span style={StyleCondition} onClick={() => Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring`)}>
                    <img src={StepImages[2]?.img} alt="" /> Rings
                  </span>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
