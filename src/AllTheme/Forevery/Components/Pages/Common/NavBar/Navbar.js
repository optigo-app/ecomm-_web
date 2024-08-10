import React, { useEffect, useState } from "react";
import "./Navbar.for.scss";
import foreverylog from "../../../images/logo/logo.webp";
import appointment from "../../../images/navbar/appointment.png";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import btnstyle from "../../../scss/Button.module.scss";
import NavImage from "../../../Assets/collections/bespoke-header.webp";
import LetterBanner from "../../../Assets/letter-diamond-menu-banner.png";
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

const Navbar = () => {
  const [ShowSearchBar, setShowSearchBar] = useState(false);
  const [ActiveMenu, setActiveMenu] = useState({ menu: "", index: "" });
  return (
    <div className="for_Navbar">
      <nav className="for_nav">
        <NavbarLeft ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
        <NavbarCenter />
        <NavbarRight
          ShowSearchBar={ShowSearchBar}
          setShowSearchBar={setShowSearchBar}
        />
      </nav>
    </div>
  );
};
export default Navbar;

const NavbarRight = ({ ShowSearchBar, setShowSearchBar }) => {

  return (
    <div className="right">
      <span className="for_item_menu">
        <img
          src={appointment}
          alt=""
          width={18}
          height={18}
          style={{ objectFit: "contain" }}
        />
        Appointment
      </span>
      <span className="for_item_menu">
        <FaRegHeart size={18} />
        Wishlist
      </span>
      <span className="for_item_menu">
        <HiOutlineShoppingBag size={18} />
        Cart
      </span>
      <span className="for_item_menu search_main">
        {ShowSearchBar && (
          <input
            type="text"
            placeholder="Search Forevery"
            className="for_search_bar"
          />
        )}
        <GrSearch size={19} onClick={() => setShowSearchBar(!ShowSearchBar)} />
      </span>
      <span className="for_item_menu">
        <FaRegCircleUser size={19} />
        Login
      </span>
    </div>
  );
};
const NavbarCenter = () => {
  return (
    <div className="center">
      <div className="logo_mask">
        <img src={foreverylog} alt="" />
      </div>
    </div>
  );
};
const NavbarLeft = ({ setActiveMenu, ActiveMenu }) => {
  return (
    <>
      <div className="left">
        {NavbarMenu?.map((val, i) => {
          return (
            <div
              className="for_menu_items"
              key={i}
              onMouseOver={() => setActiveMenu({ menu: val, index: i })}
            >
              <span>
                {val?.category}
                {ActiveMenu?.menu === val ? (
                  <FaChevronUp size={13} className="chevorn-icon" />
                ) : (
                  <FaChevronDown size={13} className="chevorn-icon" />
                )}
              </span>
            </div>
          );
        })}
        <>
          <NavitemsWrapper SelectedMenu={ActiveMenu} />
        </>
      </div>
    </>
  );
};
const NavitemsWrapper = ({ SelectedMenu }) => {
  const NavbarMenuRender = (Menu) => {
    if (SelectedMenu?.index === Menu?.length - 1) {
      return Menu;
    } else {
      return Menu?.slice(0, 4);
    }
  };

  return (
    <>
      <div className="first_nav">
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
              <SecondNavMenu data={NavbarMenu[SelectedMenu?.index]} />
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
const FirstNavMenu = ({ data }) => {
  return (
    <>
      <div className="For_Nav_first_Menu">
        <div className="for_first_col">
          <h3>Engagement Ring</h3>
          <div className="for_ring_section">
            <div className="for_col_1">
              <h3>create your own diamond ring</h3>
              <div class="ring-types">
                <span class="ring-type">
                  <GiDiamondRing size={15} /> start with a setting
                </span>
                <span class="ring-type">
                  <IoDiamondOutline size={15} /> Start With a Diamond
                </span>
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
                  src="https://www.forevery.one/images_new/bespoke-icon.png"
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
                <img
                  src="https://www.forevery.one/images_new/foreveryimg/wedding-women.png"
                  alt=""
                />{" "}
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
                <img
                  src="https://www.forevery.one/images_new/foreveryimg/wedding-men.png"
                  alt=""
                />{" "}
                Men
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
          <img
            src="https://www.forevery.one/images_new/foreveryimg/engagement-submenu-img.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};
const SecondNavMenu = ({ data }) => {
  return (
    <div className="Second_Nav_first_Menu">
      <div className="for_first_col">
        <h3>Lab Grown Diamonds</h3>
        <div className="for_ring_section">
          <div className="for_col_2">
            <h3>shop By style</h3>
            <div class="ring-types-col">
              {diamondShapes?.map((val, i) => {
                return (
                  <span>
                    <img src={val?.img} alt="" width={15} height={15} />
                    {val?.name}
                  </span>
                );
              })}
              <span className="view-all-last">View All</span>
            </div>
          </div>
        </div>
      </div>
      <div className="for_second_col">
        <h3>Build Your Jewlery</h3>
        <div className="for_ring_section">
          {SideItems?.map((val, i) => {
            return (
              <span class="ring-type">
                <img src={val?.img} alt="" width={18} height={18} />
                {val?.name}
              </span>
            );
          })}
        </div>
      </div>
      <div className="for_third_col">
        <img
          src="https://www.forevery.one/images_new/foreveryimg/engagement-submenu-img.png"
          alt=""
        />
      </div>
    </div>
  );
};
const ThirdNavMenu = ({ data }) => {
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
            style={{ backgroundImage: `url(${NavImage})` }}
          >
            <div className="for-s-card">
              <h3>Bespoke Jewlery</h3>
              <button
                className={`${btnstyle?.btn_for_new} for_btn ${btnstyle?.btn_15}`}
              >
                Show More
              </button>
            </div>
            <div className="for-s-card">
              <h3>Bespoke Diamonds</h3>
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
          <img
            src="https://www.forevery.one/images_new/foreveryimg/engagement-submenu-img.png"
            alt=""
          />
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
                    src="https://www.forevery.one/images_new/foreveryimg/letter-diamond/letter-diamond-ring.png"
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Ring
                </span>
                <span class="ring-type">
                  <img
                    src="https://www.forevery.one/images_new/foreveryimg/letter-diamond/letter-diamond-earring.png"
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Earring
                </span>
                <span class="ring-type">
                  <img
                    src="https://www.forevery.one/images_new/foreveryimg/letter-diamond/letter-diamond-bracelet.png"
                    alt=""
                    width={16}
                    height={16}
                    style={{ objectFit: "contain" }}
                  />{" "}
                  Diamond Bracelets
                </span>
                <span class="ring-type">
                  <img
                    src="https://www.forevery.one/images_new/foreveryimg/letter-diamond/letter-diamond-necklace.png"
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
            <img
              src="https://www.forevery.one/images_new/foreveryimg/letter-diamond-menu-banner.png"
              alt=""
            />
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
