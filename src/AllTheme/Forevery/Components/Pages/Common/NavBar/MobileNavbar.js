import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useNavigate } from "react-router-dom";
import { GetCountAPI } from "../../../../../../utils/API/GetCount/GetCountAPI";
import Cookies from "js-cookie";

import { useRecoilState } from "recoil";
import {
  for_CartCount,
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
  const navigate = useNavigate();
  const fetchData = () => {
    const value = JSON.parse(sessionStorage?.getItem("LoginUser"));
    setislogin(value);
    console.log(value);
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
          {Array.from({ length: 5 }).map((_, i) => {
            return (
              <div className="Menu_m_a">
                <Accordion
                  elevation={0}
                  sx={{
                    // borderBottom: "0.2px solid #c7c8c9",
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
                        sx={{ width: "40px", fontSize: "2rem", color: "black" }}
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
                    <span>{"menuname"}</span>
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
                      <span
                        style={{
                          cursor: "pointer",
                          fontSize: "16px",
                          fontWeight: "700",
                        }}
                      >
                        View All
                      </span>
                    </li>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );

  return (
    <Drawer
      sx={{
        zIndex: 55555,
      }}
      open={open}
      onClose={onClose}
    >
      {DrawerList}
    </Drawer>
  );
}
