import { GiDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
const Writing = (
  <img
    src="https://www.forevery.one/images_new/bespoke-icon.png"
    alt="writing"
  />
);

const Women = (
  <img
    src="https://www.forevery.one/images_new/foreveryimg/wedding-women.png"
    alt=""
  />
);
const Mens = (
  <img
    src="https://www.forevery.one/images_new/foreveryimg/wedding-men.png"
    alt=""
  />
);
export const NavbarMenu = [
  {
    category: "Engagement & Wedding Diamonds",
    submenu: [
      {
        title: ` Engagement Ring`,
        icon  : <GiDiamondRing /> ,
        submenu: [
          {
            title: "create your own diamond ring",
            menu: ["start with a setting", "Start With a Diamond"],
          },
          {
            title: `shop by style`,
            icon  :<IoDiamondOutline /> ,
            menu: ["Solitaire", "Halo", "Vintage", "Side Stone", "Designer"],
          },
          {
            title: "Bespoke",
            icon: Writing,
          },
        ],
      },
      {
        title: `Wedding Ring`,
        icon : <GiDiamondRing /> ,
        submenu: [
          {
            title: "Womens",
            icon: Women,
            menu: [
              "Classic Rings",
              "Diamond Rings",
              "Eternity Rings",
              "Half-Eternity Rings",
              "Stackable Rings",
            ],
          },
          {
            title: "Mens",
            icon: Mens,
            menu: ["Carved Rings", "Diamond Rings", "Classic Rings"],
          },
        ],
      },
    ],
  },
  {
    category: "Diamond",
  },
  {
    category: "High End Jewelry",
  },
  {
    category: "Fine Jewelry",
  },
  {
    category: "Letter Diamonds",
  },
];
