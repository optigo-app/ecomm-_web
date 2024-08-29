import React, { useEffect, useRef, useState } from "react";
import "./Navbar.for.scss";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import btnstyle from "../../../scss/Button.module.scss";
import {
  CollectionData,
  NavbarMenu,
  SideItems,
  diamondShapes,
} from "../../../data/NavbarMenu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoDiamondOutline, IoDiamond } from "react-icons/io5";
import { GiDiamondRing, GiGemPendant } from "react-icons/gi";
import { TbDiamond, TbSettingsHeart } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  for_CartCount,
  for_WishCount,
  for_customizationSteps,
  for_loginState,
} from "../../../Recoil/atom";
import Cookies from "js-cookie";
import { GetMenuAPI } from "../../../../../../utils/API/GetMenuAPI/GetMenuAPI";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import { Badge, Dialog, DialogContent } from "@mui/material";
import Pako from "pako";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import Preloader from "../../../../../../dum/Load";
import { RxCross1 } from "react-icons/rx";

const commonImage = `${storImagePath()}/Forevery/navCommon-image.png`;
const LetterImage = `${storImagePath()}/Forevery/letter-diamond-menu-banner.png`;
const BespokeImage = `${storImagePath()}/Forevery/collections/bespoke-header.webp`;
const Navbar = () => {
  const [ShowSearchBar, setShowSearchBar] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [ActiveMenu, setActiveMenu] = useState({ menu: "", index: "" });
  const Navigate = useNavigate();
  const [islogin, setislogin] = useRecoilState(for_loginState);
  const [LoggedUserDetails, setLoggedUserDetails] = useState();
  const [menuData, setMenuData] = useState([]);
  const [cartCountNum, setCartCountNum] = useRecoilState(for_CartCount);
  const [wishCountNum, setWishCountNum] = useRecoilState(for_WishCount);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    sessionStorage.setItem("isCart_hOQ", cartCountNum);
  }, [cartCountNum]);

  const handleLogout = () => {
    Navigate("/");
    setislogin(false);
    Cookies.remove("userLoginCookie");
    sessionStorage.setItem("LoginUser", false);
    sessionStorage.removeItem("storeInit");
    sessionStorage.removeItem("loginUserDetail");
    sessionStorage.removeItem("remarks");
    sessionStorage.removeItem("selectedAddressId");
    sessionStorage.removeItem("orderNumber");
    sessionStorage.removeItem("registerEmail");
    sessionStorage.removeItem("UploadLogicalPath");
    sessionStorage.removeItem("remarks");
    sessionStorage.removeItem("registerMobile");
    sessionStorage.removeItem("allproductlist");
    sessionStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = () => {
      const value = JSON.parse(sessionStorage?.getItem("LoginUser"));
      setislogin(value);
      console.log(value);
    };
    fetchData();
  }, []);

  const getMenuApi = async () => {
    const loginUserDetail = JSON.parse(
      sessionStorage?.getItem("loginUserDetail")
    );
    const storeInit = JSON.parse(sessionStorage?.getItem("storeInit"));
    const IsB2BWebsite = storeInit?.IsB2BWebsite;
    const visiterID = Cookies.get("visiterId");
    setLoggedUserDetails(loginUserDetail);
    let finalId;

    if (IsB2BWebsite === 0) {
      finalId = islogin === false ? visiterID : loginUserDetail?.id || "0";
    } else {
      finalId = loginUserDetail?.id || "0";
    }

    await GetMenuAPI(finalId)
      .then((response) => {
        setMenuData(response?.Data?.rd);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage?.getItem("storeInit"));
    let isUserLogin = JSON.parse(sessionStorage?.getItem("LoginUser"));
    console.log("callll");
    console.log(LoggedUserDetails);
    if (storeinit?.IsB2BWebsite === 0) {
      getMenuApi();
      return;
    } else if (storeinit?.IsB2BWebsite === 1 && isUserLogin === true) {
      getMenuApi();
      return;
    } else {
      return;
    }
  }, [islogin]);

  useEffect(() => {
    const visiterID = Cookies?.get("visiterId");
    GetCountAPI(visiterID)
      .then((res) => {
        if (res) {
          setCartCountNum(res?.cartcount);
          setWishCountNum(res?.wishcount);
        }
      })
      .catch((err) => {
        if (err) {
          console.log("getCountApiErr", err);
        }
      });
  }, []);

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

  const searchDataFucn = (e) => {
    if (e.key === "Enter") {
      if (searchText) {
        // navigation(`/p/${searchText}/?S=${btoa(JSON.stringify(searchText))}`)

        // const handleMoveToDetail = () => {

        let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
        let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));

        let obj = {
          a: "",
          b: searchText,
          m: loginInfo?.MetalId ?? storeInit?.MetalId,
          d: loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
          c: loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
          f: {},
        };

        let encodeObj = compressAndEncode(JSON.stringify(obj));

        Navigate(`/d/${searchText}?p=${encodeObj}`);
        // toggleOverlay();
        setSearchText("");
        setShowSearchBar(!ShowSearchBar);
        // navigate(`/d/${productData?.TitleLine.replace(/\s+/g, `_`)}${productData?.TitleLine?.length > 0 ? "_" : ""}${searchText}?p=${encodeObj}`)

        // }
      }
    }
  };

  return (
    <div className="for_Navbar">
      <Preloader />
      <nav className="for_nav">
        <NavbarLeft
          Navigate={Navigate}
          ActiveMenu={ActiveMenu}
          setActiveMenu={setActiveMenu}
          setHoveredIndex={setHoveredIndex}
          hoveredIndex={hoveredIndex}
        />
        <NavbarCenter Navigate={Navigate} />
        <NavbarRight
          Navigate={Navigate}
          ShowSearchBar={ShowSearchBar}
          setShowSearchBar={setShowSearchBar}
          user={LoggedUserDetails?.firstname}
          islogin={islogin}
          handleLogout={handleLogout}
          wishCountNum={wishCountNum}
          cartCountNum={cartCountNum}
          searchDataFucn={searchDataFucn}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </nav>
    </div>
  );
};
export default Navbar;

const NavbarRight = ({
  ShowSearchBar,
  setShowSearchBar,
  Navigate,
  user,
  islogin,
  handleLogout,
  wishCountNum,
  cartCountNum,
  searchText,
  setSearchText,
  searchDataFucn,
}) => {
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (ShowSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
    } else {
      setSearchText("");
    }
  }, [ShowSearchBar]);
  return (
    <div className="right">
      <span
        className="for_item_menu"
        onClick={() => {
          Navigate("/appointment");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img
          src={`${storImagePath()}/Forevery/appointment.png`}
          alt=""
          width={18}
          height={18}
          style={{ objectFit: "contain", marginRight: "5px" }}
        />
        Appointment
      </span>
      <span
        className="for_item_menu"
        onClick={() => {
          Navigate("/wishlist");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <Badge
          style={{ size: "1px" }}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "9.4px",
              borderRadius: "100%",
              marginRight: "6px",
              marginTop: "3px",
              bgcolor: "#DC637D",
              width: 6,
              height: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          badgeContent={wishCountNum}
          color="primary"
        >
          <FaRegHeart size={18} style={{ marginRight: "5px" }} />
        </Badge>
        Wishlist
      </span>
      <span
        className="for_item_menu"
        onClick={() => {
          Navigate("/cart");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <Badge
          style={{ size: "1px" }}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "9.4px",
              borderRadius: "100%",
              marginRight: "6px",
              marginTop: "3px",
              bgcolor: "#DC637D",
              width: 6,
              height: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          badgeContent={cartCountNum}
          color="primary"
        >
          <HiOutlineShoppingBag size={18} style={{ marginRight: "5px" }} />
        </Badge>
        Cart
      </span>
      <span className="for_item_menu search_main">
        {ShowSearchBar && (
          <input
            type="text"
            placeholder="Search Forevery"
            className="for_search_bar"
            value={searchText}
            autoFocus
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={searchDataFucn}
          />
        )}
        <GrSearch size={19} onClick={() => setShowSearchBar(!ShowSearchBar)} />
      </span>
      {!islogin ? (
        <>
          {" "}
          <span
            className="for_item_menu"
            onClick={() => {
              Navigate("/LoginOption");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <FaRegCircleUser size={19} style={{ marginRight: "5px" }} />
            Login
          </span>
        </>
      ) : (
        <>
          <div className="for_login_user_dropdown">
            <span className="user_logged_in_for">{user}</span>
            <div className="for_dropdown">
              <div>
                <div
                  className="item_a"
                  onClick={() => {
                    Navigate("/account");
                    window.scrollTo({ behavior: "smooth", top: 0 });
                  }}
                >
                  <li>my account</li>
                </div>
                <div
                  className="item_a"
                  onClick={() => {
                    Navigate("/account");
                    window.scrollTo({ behavior: "smooth", top: 0 });
                  }}
                >
                  <li>my orders</li>
                </div>
                <div
                  className="item_a"
                  onClick={() => {
                    Navigate("/account");
                    window.scrollTo({ behavior: "smooth", top: 0 });
                  }}
                >
                  <li>my details</li>
                </div>
                <hr />
                <div className="item_a" onClick={() => handleLogout()}>
                  <li>log out</li>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
const NavbarCenter = ({ Navigate }) => {
  return (
    <div className="center">
      <div
        className="logo_mask"
        onClick={() => {
          Navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img
          src={`${storImagePath()}/Forevery/logo.webp`}
          alt=""
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};
const NavbarLeft = ({
  setActiveMenu,
  ActiveMenu,
  setHoveredIndex,
  hoveredIndex,
}) => {
  const Navigate = useNavigate();
  return (
    <>
      <div className="left">
        {NavbarMenu?.map((val, i) => {
          return (
            <div
              className="for_menu_items"
              key={i}
              onMouseOver={() => {
                setActiveMenu({ menu: val, index: i });
                setHoveredIndex(i);
              }}
              onClick={() => Navigate(val?.link)}
            >
              <Link to={val?.link} className="for_nav_menu">
                {val?.category}
                {hoveredIndex === i ? (
                  <FaChevronUp
                    size={13}
                    className={`chevorn-icon hide-Fo-1 `}
                  />
                ) : (
                  <FaChevronDown
                    size={13}
                    className={`chevorn-icon hide-Fo-2 `}
                  />
                )}
              </Link>
            </div>
          );
        })}
        <>
          <NavitemsWrapper
            SelectedMenu={ActiveMenu}
            setActiveMenu={setActiveMenu}
            setHoveredIndex={setHoveredIndex}
          />
        </>
      </div>
    </>
  );
};
const NavitemsWrapper = ({ SelectedMenu, setActiveMenu, setHoveredIndex }) => {
  const firstNavRef = useRef(null);
  const NavbarMenuRender = (Menu) => {
    if (SelectedMenu?.index === Menu?.length - 1) {
      return Menu;
    } else {
      return Menu?.slice(0, 4);
    }
  };

  const [customizeStep, setCustomizeStep] = useRecoilState(
    for_customizationSteps
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("firstNavRef is visible");
        } else {
          console.log("firstNavRef is not visible");
          setHoveredIndex(null);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (firstNavRef.current) {
      observer.observe(firstNavRef.current);
    }

    return () => {
      if (firstNavRef.current) {
        observer.unobserve(firstNavRef.current);
      }
    };
  }, []);
  return (
    <>
      <div className="first_nav" ref={firstNavRef}>
        <div className="bg-for-hoverlay">
          <div className="nav_bottom_top_head">
            {NavbarMenuRender(NavbarMenu).map((val, i) => {
              return (
                <div
                  style={{
                    backgroundColor:
                      SelectedMenu?.menu === val ? "#FEEEEE" : "",
                    opacity: SelectedMenu?.menu === val ? "" : "0.3",
                  }}
                  className="active_menu_for"
                  key={i}
                >
                  {val?.category}
                </div>
              );
            })}
          </div>
          <div className="for_Selected_Menu_item_list">
            {SelectedMenu?.index == 0 && (
              <FirstNavMenu data={NavbarMenu[SelectedMenu?.index]} />
            )}
            {SelectedMenu?.index == 1 && (
              <SecondNavMenu
                data={NavbarMenu[SelectedMenu?.index]}
                setCustomizeStep={setCustomizeStep}
              />
            )}
            {SelectedMenu?.index == 2 && (
              <ThirdNavMenu data={NavbarMenu[SelectedMenu?.index]} />
            )}
            {SelectedMenu?.index == 3 && (
              <FourNavMenu data={NavbarMenu[SelectedMenu?.index]} />
            )}
            {SelectedMenu?.index == 4 && (
              <LatsNavMenu data={NavbarMenu[SelectedMenu?.index]} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const FirstNavMenu = ({ data, setCustomizeStep }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const steps = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const steps1 = JSON.parse(sessionStorage.getItem('customizeSteps2'));
  const checkSteps = steps?.[1] !== undefined && steps?.[1] !== null || steps?.[2] !== undefined && steps?.[2] !== null || steps1?.[1] !== undefined && steps1?.[1] !== null;

  const handleCheckSteps = () => {
    if (checkSteps) {
      setShowModal(true);
    } else {
      console.log('Alternative action');
    }
  };

  const HandleSettingNavigation = () => {
    navigate(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
    const step1 = [{ "step1": true, "Setting": 'Ring' }];
    sessionStorage.setItem("customizeSteps2", JSON.stringify(step1));
  };

  const HandleDiamondNavigation = () => {
    navigate(`/certified-loose-lab-grown-diamonds/diamond/Round`);

    const step1 = [{ "step1": true, "shape": "Round" }];
    sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
  };

  const handleRemoveData = () => {
    sessionStorage.removeItem('customizeSteps');
    sessionStorage.removeItem('custStepData');
    sessionStorage.removeItem('customizeSteps2');
    sessionStorage.removeItem('custStepData2');
    navigate('/');
    handleToggle();
  }
  return (
    <>
      <div className="For_Nav_first_Menu">
        <div className="for_first_col">
          <h3>Engagement Ring</h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>create your own diamond ring</h3>
              <div class="ring-types">
                {checkSteps ? (
                  <span class="ring-type" onClick={() => handleCheckSteps()}>
                    <GiDiamondRing size={15} /> start with a setting
                  </span>
                ) : (
                  <span class="ring-type" onClick={() => HandleSettingNavigation()}>
                    <GiDiamondRing size={15} /> start with a setting
                  </span>
                )}
                {checkSteps ? (
                  <span class="ring-type" onClick={() => handleCheckSteps()}>
                    <IoDiamondOutline size={15} /> Start With a Diamond
                  </span>
                ) : (
                  <span class="ring-type" onClick={() => HandleDiamondNavigation()}>
                    <IoDiamondOutline size={15} /> Start With a Diamond
                  </span>
                )}

              </div>
            </div>
            <div className="for_col_2">
              <h3>shop By style</h3>
              <div class="ring-types-col">
                <span>Solitaire</span>
                <span>Halo</span>
                <span>Vintage</span>
                <span>Side Stone</span>
                <span>Designer</span>
              </div>
            </div>
            <div className="for_col_3">
              <h3>
                <img
                  src={`${storImagePath()}/Forevery/writing.png`}
                  alt=""
                  width={20}
                  height={20}
                />
                Bespoke
              </h3>
            </div>
          </div>
        </div>
        <div className="for_second_col">
          <h3>Wedding Ring</h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>
                <img src={`${storImagePath()}/Forevery/women.png`} alt="" />{" "}
                Womens
              </h3>
              <div class="ring-types">
                <span class="ring-type">Classic Rings</span>
                <span class="ring-type">Diamond Rings</span>
                <span class="ring-type">Eternity Rings</span>
                <span class="ring-type">Half-Eternity Rings</span>
                <span class="ring-type">Stackable Rings</span>
              </div>
            </div>
            <div className="for_col_2">
              <h3>
                <img src={`${storImagePath()}/Forevery/boy.png`} alt="" /> Men
              </h3>

              <div class="ring-types">
                <span class="ring-type">Carved Rings</span>
                <span class="ring-type">Diamond Rings</span>
                <span class="ring-type">Classic Rings</span>
              </div>
            </div>
          </div>
        </div>
        <div className="for_third_col">
          <img src={commonImage} alt="" />
        </div>
      </div>
      <Modal open={showModal} handleClose={handleToggle} handleRemoveData={handleRemoveData} />
    </>
  );
};
const SecondNavMenu = ({ data, setCustomizeStep }) => {
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const Navigate = useNavigate();
  const steps = JSON.parse(sessionStorage.getItem('customizeSteps'));
  const steps1 = JSON.parse(sessionStorage.getItem('customizeSteps2'));
  const checkSteps = steps?.[1] !== undefined && steps?.[1] !== null || steps?.[2] !== undefined && steps?.[2] !== null || steps1?.[1] !== undefined && steps1?.[1] !== null;

  const handleCheckSteps = () => {
    if (checkSteps) {
      setShowModal(true);
    } else {
      console.log('Alternative action');
    }
  };

  const HandleDiamondNavigation = (shape) => {
    Navigate(`/certified-loose-lab-grown-diamonds/diamond/${shape}`);
    setCustomizeStep({
      step1: true,
      step2: false,
      step3: false,
    });
    const step1 = [{ "step1": true, "shape": shape }];
    sessionStorage.setItem("customizeSteps", JSON.stringify(step1));
  };

  const handleRemoveData = () => {
    sessionStorage.removeItem('customizeSteps');
    sessionStorage.removeItem('custStepData');
    sessionStorage.removeItem('customizeSteps2');
    sessionStorage.removeItem('custStepData2');
    Navigate('/');
    handleToggle();
  }

  return (
    <div className="Second_Nav_first_Menu">
      <div className="for_first_col">
        <h3>Lab Grown Diamonds</h3>
        <div className="for_ring_section">
          <div className="for_col_2">
            <h3>Shop By Style</h3>
            <div className="ring-types-col">
              {diamondShapes?.map((val, i) => {
                return (
                  <>
                    {checkSteps ? (
                      <span onClick={() => handleCheckSteps()}>
                        <img src={val?.img} alt="" width={15} height={15} />
                        {val?.name}
                      </span>
                    ) : (
                      <span onClick={() => HandleDiamondNavigation(val?.name)}>
                        <img src={val?.img} alt="" width={15} height={15} />
                        {val?.name}
                      </span>
                    )}
                  </>
                );
              })}
              <span className="view-all-last">View All</span>
            </div>
          </div>
        </div>
      </div>
      <div className="for_second_col">
        <h3>Build Your Jewelry</h3>
        <div className="for_ring_section">
          {SideItems?.map((val, i) => (
            <span className="ring-type" key={i}>
              <img src={val?.img} alt="" width={18} height={18} />
              {val?.name}
            </span>
          ))}
        </div>
      </div>
      <div className="for_third_col">
        <img src={commonImage} alt="" />
      </div>

      <Modal open={showModal} handleClose={handleToggle} handleRemoveData={handleRemoveData} />
    </div>
  );
};
const ThirdNavMenu = ({ data }) => {
  const Navigate = useNavigate();
  return (
    <>
      <div className="Third_Nav_first_Menu">
        <div className="first_Section">
          {CollectionData?.map((val, i) => {
            return (
              <div className="for_collection_card">
                <img src={val?.img} alt="" />
                <div className="details_col">
                  <span className="for_title">{val?.name}</span>
                  <span className="for_collection_static">Collection</span>
                  <button
                    onClick={() => Navigate(val?.link)}
                    className={`${btnstyle?.btn_for_new} for_btn ${btnstyle?.btn_15}`}
                  >
                    Shop the Collection
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="second_section">
          <div
            className="images"
            style={{ backgroundImage: `url(${BespokeImage})` }}
          >
            <div className="for-s-card">
              <h3>Bespoke Jewlery</h3>
              <button
                className={`${btnstyle?.btn_for_new} for_btn ${btnstyle?.btn_15}`}
                onClick={() =>
                  Navigate(
                    `/p/Amber/Women/Mangalsutra/Mangalsutra/?M=V29tZW4sTWFuZ2Fsc3V0cmEsTWFuZ2Fsc3V0cmEvZ2VuZGVyLGNhdGVnb3J5LHN1Yl9jYXRlZ29yeQ==`
                  )
                }
              >
                Show More
              </button>
            </div>
            <div className="for-s-card">
              <h3>Bespoke Diamonds</h3>
              <button
                className={`${btnstyle?.btn_for_new} for_btn ${btnstyle?.btn_15}`}
                onClick={() =>
                  Navigate(
                    `/p/Amber/Women/Mangalsutra/Mangalsutra/?M=V29tZW4sTWFuZ2Fsc3V0cmEsTWFuZ2Fsc3V0cmEvZ2VuZGVyLGNhdGVnb3J5LHN1Yl9jYXRlZ29yeQ==`
                  )
                }
              >
                Show More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const FourNavMenu = ({ data }) => {
  return (
    <>
      <div className="Fourth_Nav_first_Menu">
        <div className="for_first_col">
          <h3> Fine Jewelry</h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>ready to ship jewelry</h3>
              <div class="ring-types">
                <span class="ring-type">Diamond Earrings</span>
                <span class="ring-type">Diamond Neklace</span>
                <span class="ring-type">Diamond Pendants</span>
                <span class="ring-type">Diamond Bracelets</span>
                <span class="ring-type">Diamond Rings</span>
                <span class="ring-type">Signet Rings</span>
              </div>
            </div>
          </div>
        </div>
        <div className="for_first_col">
          <h3> </h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>design your own earrings</h3>
              <div class="ring-types">
                <span class="ring-type">
                  <TbSettingsHeart size={15} /> Start With a Setting
                </span>
                <span class="ring-type">
                  <TbDiamond size={15} /> Start With Matching Diamonds
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="for_first_col">
          <h3> </h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>design your own pendant</h3>
              <div class="ring-types">
                <span className="ring-type">
                  <GiGemPendant size={15} /> Start With a Setting
                </span>
                <span className="ring-type">
                  <IoDiamond size={15} /> Start With a Diamond
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="for_third_col">
          <img src={commonImage} alt="" />
        </div>
      </div>
    </>
  );
};
const LatsNavMenu = ({ data }) => {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  return (
    <>
      <div className="Fifth_Nav_first_Menu">
        <div className="for_first_col">
          <h3>Letter Diamond</h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>Choose your letter diamond jewelry</h3>
              <div class="ring-types">
                <span class="ring-type">
                  <img
                    src={`${storImagePath()}/Forevery/lastnav/letter-diamond-ring.png`}
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Ring
                </span>
                <span class="ring-type">
                  <img
                    src={`${storImagePath()}/Forevery/lastnav/letter-diamond-earring.png`}
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Earring
                </span>
                <span class="ring-type">
                  <img
                    src={`${storImagePath()}/Forevery/lastnav/letter-diamond-bracelet.png`}
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Bracelets
                </span>
                <span class="ring-type">
                  <img
                    src={`${storImagePath()}/Forevery/lastnav/letter-diamond-necklace.png`}
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Necklace
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="for_first_col">
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>Choose Letter Diamonds</h3>
              <div class="alphabet-types">
                {alphabet?.map((val, i) => {
                  return (
                    <div className="alphabet">
                      <span>{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="for_third_col">
          <div className="second_section">
            <img src={LetterImage} alt="" />
            <div className="for-s-card">
              <h3>
                Letter <span>Diamond Jewlery</span>
              </h3>
              <button
                className={`${btnstyle?.btn_for_new} for_btn ${btnstyle?.btn_15}`}
              >
                Show More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Modal = ({
  open,
  handleClose,
  handleRemoveData,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-root': {
            zIndex: 9999,
          },
          '& .MuiDialog-paper': {
            backgroundColor: 'transparent',
            border: '1px solid white',
            zIndex: 9999,
          },
          '& .MuiDialogContent-root': {
            padding: '10px',
          },
        }}
      >
        <DialogContent
          sx={{
            minWidth: 260,
            padding: '0px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="for_modal_cancel_btn_nav_div" onClick={handleClose}>
            <RxCross1 className='for_modal_cancel_nav_btn' size={'12px'} />
          </div>
          <div className="for_modal_inner_nav_div">
            <span className='for_modal_nav_title'>
              You have already selected mount & diamond, would you like to view it?
            </span>
            <div className="for_modal_buttons_nav_div">
              <button onClick={() => {
                handleClose();
              }}>Yes</button>
              <button onClick={() => { handleRemoveData() }}>No</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
