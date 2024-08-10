import { GiDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import roundImg from "../Assets/diamond/i-round.png";
import pearImg from "../Assets/diamond/i-peer.png";
import princessImg from "../Assets/diamond/i-princess.png";
import asscherImg from "../Assets/diamond/i-asscher.png";
import cushionImg from "../Assets/diamond/i-cushion.png";
import heartImg from "../Assets/diamond/i-heart.png";
import ovalImg from "../Assets/diamond/i-oval.png";
import radiantImg from "../Assets/diamond/i-radiant.png";
import emeraldImg from "../Assets/diamond/i-emerald.png";
import marquiseImg from "../Assets/diamond/i-marquise.png";
import ringsS from "../Assets/diamond/side/wedding-rings.png";
import earringsS from "../Assets/diamond/side/easrrings.png";
import pendantS from "../Assets/diamond/side/s.png";

import Collection1 from "../Assets/collections/ikigai-banner.webp";
import Collection2 from "../Assets/collections/heritage-banner.webp";
import Collection3 from "../Assets/collections/icon-banner.webp";

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
 const NavbarMenu = [
  {
    category: "Engagement & Wedding Diamonds",
    submenu: [
      {
        title: ` Engagement Ring`,
        align: "col",
        submenu: [
          {
            icon: <GiDiamondRing />,
            icon2: <IoDiamondOutline />,
            title: "create your own diamond ring",
            menu: ["start with a setting", "Start With a Diamond"],
          },
          {
            title: `shop by style`,
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
        icon: <GiDiamondRing />,
        submenu: [
          {
            title: "Womens",
            icon: Women,
            align: "row",
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
            align: "row",
            icon: Mens,
            menu: ["Carved Rings", "Diamond Rings", "Classic Rings"],
          },
        ],
      },
      {
        img: "https://www.forevery.one/images_new/foreveryimg/engagement-submenu-img.png",
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

// Creating an array of diamond objects
const diamondShapes = [
  { name: "Round", img: roundImg },
  { name: "Pear", img: pearImg },
  { name: "Princess", img: princessImg },
  { name: "Asscher", img: asscherImg },
  { name: "Cushion", img: cushionImg },
  { name: "Heart", img: heartImg },
  { name: "Oval", img: ovalImg },
  { name: "Radiant", img: radiantImg },
  { name: "Emerald", img: emeraldImg },
  { name: "Marquise", img: marquiseImg },
];



const SideItems = [
  {name  :"Diamond Rings" , img :ringsS},
  {name  :"Diamond Earrings" , img :pendantS},
  {name  :"Diamond Pendant" , img : earringsS}
]

// ikgai
// IKIGAI
// collection
// shop the collection
// heritage-banner
// heritage
// collection
// shop the collection
// icon-banner
// Icon
// collection
// shop the collection
// bespoke jewelry  make 


const CollectionData = [
  {name  :"IKIGAI" ,img : Collection1},
  {name  :"heritage" ,img :Collection2 },
  {name  :"Icon" ,img : Collection3},
]

export  {SideItems ,diamondShapes ,NavbarMenu ,CollectionData};
