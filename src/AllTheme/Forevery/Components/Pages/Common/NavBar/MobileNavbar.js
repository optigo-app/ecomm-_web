import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useNavigate } from "react-router-dom";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from "js-cookie";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilState } from "recoil";
import {
  for_CartCount,
  for_NavbarItems,
  for_WishCount,
  for_loginState,
} from "../../../Recoil/atom";
import "./MobileCss.scss";
import { IoClose } from "react-icons/io5";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { IoIosSearch } from "react-icons/io";

export default function MobileNav({ open, onClose }) {
  const [cartCountNum, setCartCountNum] = useRecoilState(for_CartCount);
  const [wishCountNum, setWishCountNum] = useRecoilState(for_WishCount);
  const [islogin, setislogin] = useRecoilState(for_loginState);
  const [menuItems, setMenuItems] = useRecoilState(for_NavbarItems);
  const navigate = useNavigate();
  const fetchData = () => {
    const value = JSON.parse(sessionStorage?.getItem("LoginUser"));
    setislogin(value);
  };

  React.useEffect(() => {
    fetchData();
  }, [islogin]);
  

  React.useEffect(() => {
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

  const handleMenu = (param, param1, param2) => {
    let finalData = {
      menuname: param?.menuname ?? "",
      FilterKey: param?.key ?? "",
      FilterVal: param?.value ?? "",
      FilterKey1: param1?.key ?? "",
      FilterVal1: param1?.value ?? "",
      FilterKey2: param2?.key ?? "",
      FilterVal2: param2?.value ?? "",
    };
    sessionStorage.setItem("menuparams", JSON.stringify(finalData));

    const queryParameters1 = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ]
      .filter(Boolean)
      .join("/");

    const queryParameters = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ]
      // .filter(Boolean)
      .join(",");

    const otherparamUrl = Object.entries({
      b: finalData?.FilterKey,
      g: finalData?.FilterKey1,
      c: finalData?.FilterKey2,
    })
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => value)
      .filter(Boolean)
      .join(",");

    const paginationParam = [
      `page=${finalData.page ?? 1}`,
      `size=${finalData.size ?? 50}`,
    ].join("&");

    let menuEncoded = `${queryParameters}/${otherparamUrl}`;
    // const url = `/productlist?V=${queryParameters}/K=${otherparamUrl}`;
    const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(
      menuEncoded
    )}`;
    // let d = new Date();
    // let randomno = Math.floor(Math.random() * 1000 * d.getMilliseconds() * d.getSeconds() * d.getDate() * d.getHours() * d.getMinutes())
    navigate(url);
  };

  const handleLogout = () => {
    setislogin(false);
    Cookies?.remove("userLoginCookie");
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
    navigate("/");
    window.location.reload();
  };

  const NavbarMenu = [
    {
      title: "Engagement & Wedding Diamonds",
      link: `/lab-created-engagement-rings`,
      submenu: [
        {
          title: "Engagement & Wedding Diamonds",
        },
      ],
    },
    {
      title: "Diamond",
      link: `/diamond`,
      submenu: [{}],
    },
    {
      title: "High End Jewelry",
      link: `/p/Ikigai/?M=SWtpZ2FpL2NvbGxlY3Rpb24=`,
      submenu: [{}],
    },
  ];

  const DrawerList = (
    <Box
      className="navbar_mobile_drawer"
      role="presentation"
      sx={{
        width: 700,
        "@media (max-width: 768px)": {
          width: 540,
        },
        "@media (max-width: 540px)": {
          width: 500,
        },
        "@media (max-width: 420px)": {
          width: 340,
        },
        "@media (max-width: 320px)": {
          width: 300,
        },
      }}
    >
      <div className="for_mobile_DrawerList">
        <div className="close_btn_Section">
          <span>
            <IoClose size={22} onClick={onClose} />
          </span>
        </div>
        <div className="profile_btn_Section">
          <img src={`${storImagePath()}/forevery/profile.svg`} alt="" />
          <Link to={"/LoginOption"}>LOGIN</Link>
        </div>
        <div className="searchbar-m-r">
          <div className="search_mob">
            <input type="text" placeholder="Search Forevery" />
            <IoIosSearch size={27} />
          </div>
        </div>
        <div className="mobile_nav_manu">
          <div className="Menu_m_a">
            {/* Level 1 */}
            <Accordion
              elevation={0}
              sx={{
                borderRadius: 0,
                padding: "0 25px",
                margin: 0,
                "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                },
                "&.MuiPaper-root.MuiAccordion-root:before": {
                  background: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ width: "40px", fontSize: "2rem", color: "#000" }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  color: "black",
                  borderRadius: 0,
                  fontWeight: "500",

                  "&.MuiAccordionSummary-root": {
                    padding: 0,
                  },
                }}
              >
                <span className="title_for_accordian">{`Engagement & Wedding Diamonds `}</span>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "0",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  {/* Level 2 */}
                  <Accordion
                    elevation={0}
                    sx={{
                      borderRadius: 0,
                      margin: 0,
                      "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <AddIcon
                          sx={{
                            width: "40px",
                            fontSize: "1.6rem",
                            color: "#000",
                          }}
                        />
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{
                        color: "black",
                        borderRadius: 0,
                        fontWeight: "500",

                        "&.MuiAccordionSummary-root": {
                          padding: 0,
                        },
                      }}
                    >
                      <span className="title_for_accordian">dummy nav</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      css-smi0hl-MuiAccordionDetails-root
                    </AccordionDetails>
                  </Accordion>
                </span>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="Menu_m_a">
            {/* Level 1 */}
            <Accordion
              elevation={0}
              sx={{
                borderRadius: 0,
                padding: "0 25px",
                margin: 0,
                "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                },
                "&.MuiPaper-root.MuiAccordion-root:before": {
                  background: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ width: "40px", fontSize: "2rem", color: "#000" }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  color: "black",
                  borderRadius: 0,
                  fontWeight: "500",

                  "&.MuiAccordionSummary-root": {
                    padding: 0,
                  },
                }}
              >
                <span className="title_for_accordian">{`Diamond`}</span>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "0",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  {/* Level 2 */}
                  <Accordion
                    elevation={0}
                    sx={{
                      borderRadius: 0,
                      margin: 0,
                      "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                      "&.MuiPaper-root.MuiAccordion-root:before": {
                        background: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <AddIcon
                          sx={{
                            width: "40px",
                            fontSize: "1.6rem",
                            color: "#000",
                          }}
                        />
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{
                        color: "black",
                        borderRadius: 0,
                        fontWeight: "500",

                        "&.MuiAccordionSummary-root": {
                          padding: 0,
                        },
                      }}
                    >
                      <span className="title_for_accordian">dummy nav</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      css-smi0hl-MuiAccordionDetails-root
                    </AccordionDetails>
                  </Accordion>
                </span>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="Menu_m_a">
            {/* Level 1 */}
            <Accordion
              elevation={0}
              sx={{
                borderRadius: 0,
                padding: "0 25px",
                margin: 0,
                "&.MuiPaper-root.MuiAccordion-root:last-of-type": {
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                },
                "&.MuiPaper-root.MuiAccordion-root:before": {
                  background: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ width: "40px", fontSize: "2rem", color: "#000" }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  color: "black",
                  borderRadius: 0,
                  fontWeight: "500",

                  "&.MuiAccordionSummary-root": {
                    padding: 0,
                  },
                }}
              >
                <span className="title_for_accordian">{`High End Jewelry`}</span>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "0",
                }}
              >
                {/* Level 2 */}
                {menuItems &&
                  menuItems?.map((menuItem, i) => {
                    const { menuname, param1 } = menuItem;
                    return (
                      <React.Fragment key={i}>
                        <li
                          style={{
                            listStyle: "none",
                            padding: "0",
                            margin: "0",
                          }}
                        >
                          <Accordion
                            elevation={0}
                            sx={{
                              // borderBottom: "0.2px solid #c7c8c9",
                              borderRadius: 0,
                              padding: 0,
                              margin: 0,
                              "&.MuiPaper-root.MuiAccordion-root:last-of-type":
                                {
                                  borderBottomLeftRadius: "0px",
                                  borderBottomRightRadius: "0px",
                                },
                              "&.MuiPaper-root.MuiAccordion-root:before": {
                                background: "none",
                              },
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon sx={{ width: "20px" }} />
                              }
                              aria-controls="panel1-content"
                              id="panel1-header"
                              sx={{
                                color: "black",
                                borderRadius: 0,
                                fontWeight: "500",

                                "&.MuiAccordionSummary-root": {
                                  padding: 0,
                                },
                              }}
                            >
                              <span
                                onClick={() =>
                                  handleMenu({
                                    menuname: menuname,
                                    key: menuItem?.param0name,
                                    value: menuItem?.param0dataname,
                                  })
                                }
                              >
                                {menuname}
                              </span>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              }}
                            >
                              <li
                                style={{
                                  marginLeft: "-16px",
                                  marginBottom: "1px",
                                }}
                              >
                                {/* <span
                                  onClick={() =>
                                    handleMenu({
                                      menuname: menuname,
                                      key: menuItem?.param0name,
                                      value: menuItem?.param0dataname,
                                    })
                                  }
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "700",
                                  }}
                                >
                                  View All
                                </span> */}
                              </li>
                              {param1 &&
                                param1?.length > 0 &&
                                param1[0].param1name !== "" && (
                                  <ul
                                    style={{
                                      display: "flex",
                                      margin: "0",
                                      listStyle: "none",
                                      flexDirection: "column",
                                      gap: "0.5rem",
                                      padding: "0",
                                    }}
                                  >
                                    {param1?.map(
                                      ({ param1dataname, param1name }, j) => (
                                        <li
                                          style={{
                                            marginLeft: "-16px",
                                            fontSize: "16px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleMenu(
                                                {
                                                  menuname: menuname,
                                                  key: menuItem?.param0name,
                                                  value:
                                                    menuItem?.param0dataname,
                                                },
                                                {
                                                  key: param1name,
                                                  value: param1dataname,
                                                }
                                              )
                                            }
                                          >
                                            {param1dataname}
                                          </span>
                                          {/* level not needed its present below */}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                            </AccordionDetails>
                          </Accordion>
                          <Divider />
                        </li>
                      </React.Fragment>
                    );
                  })}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <Drawer
      sx={{
        zIndex: 55555,
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(4px)",
        },
      }}
      open={open}
      onClose={onClose}
    >
      {DrawerList}
    </Drawer>
  );
}
