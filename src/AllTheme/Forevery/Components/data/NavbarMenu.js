import { GiDiamondRing } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";

import { storImagePath } from "../../../../utils/Glob_Functions/GlobalFunction";

console.log(`${storImagePath()}/Forevery/writing.png`);
const Writing = (
  <img src={`${storImagePath()}/Forevery/writing.png`} alt="writing" />
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
  { name: "Round", img: `${storImagePath()}/Forevery/diamond/i-round.png` },
  { name: "Pear", img: `${storImagePath()}/Forevery/diamond/i-peer.png` },
  {
    name: "Princess",
    img: `${storImagePath()}/Forevery/diamond/i-princess.png`,
  },
  { name: "Asscher", img: `${storImagePath()}/Forevery/diamond/i-asscher.png` },
  { name: "Cushion", img: `${storImagePath()}/Forevery/diamond/i-cushion.png` },
  { name: "Heart", img: `${storImagePath()}/Forevery/diamond/i-heart.png` },
  { name: "Oval", img: `${storImagePath()}/Forevery/diamond/i-oval.png` },
  { name: "Radiant", img: `${storImagePath()}/Forevery/diamond/i-radiant.png` },
  { name: "Emerald", img: `${storImagePath()}/Forevery/diamond/i-emerald.png` },
  {
    name: "Marquise",
    img: `${storImagePath()}/Forevery/diamond/i-marquise.png`,
  },
];
// diamond
const SideItems = [
  {
    name: "Diamond Rings",
    img: `${storImagePath()}/Forevery/diamond/side/wedding-rings.png`,
  },
  {
    name: "Diamond Earrings",
    img: `${storImagePath()}/Forevery/diamond/side/easrrings.png`,
  },
  {
    name: "Diamond Pendant",
    img: `${storImagePath()}/Forevery/diamond/side/s.png`,
  },
];

const CollectionData = [
  {
    name: "IKIGAI",
    img: `${storImagePath()}/Forevery/collections/ikigai-banner.webp`,
    link : `/p/M_F_D_CS/Rebellious/?M=UmViZWxsaW91cy9jb2xsZWN0aW9u`
  },
  {
    name: "heritage",
    img: `${storImagePath()}/Forevery/collections/heritage-banner.webp`,
    link : `/p/Width/B/?M=Qi9jb2xsZWN0aW9u`
  },
  {
    name: "Icon",
    img: `${storImagePath()}/Forevery/collections/icon-banner.webp`,
    link : `/p/M_CS/Artifact/?M=QXJ0aWZhY3QvY29sbGVjdGlvbg==`
  },
];

const CollectionArray = [
  {
    titel: "Engagement Ring",
    img: `${storImagePath()}/Forevery/home/collection/76.webp`,
  },
  {
    titel: "Wedding Ring",
    img: `${storImagePath()}/Forevery/home/collection/77.webp`,
  },
  {
    titel: "Diamond Earrings",
    img: `${storImagePath()}/Forevery/home/collection/78.webp`,
  },
  {
    titel: "Fine Jewelry",
    img: `${storImagePath()}/Forevery/home/collection/79.webp`,
  },
];
const shapes = [
  { name: "Round", img: `${storImagePath()}/Forevery/home/shape/round.png` },
  {
    name: "Princess",
    img: `${storImagePath()}/Forevery/home/shape/princess.png`,
  },
  {
    name: "Cushion",
    img: `${storImagePath()}/Forevery/home/shape/cushion.png`,
  },
  {
    name: "Asscher",
    img: `${storImagePath()}/Forevery/home/shape/asscher.jpg`,
  },
  {
    name: "Marquise",
    img: `${storImagePath()}/Forevery/home/shape/marqise.png`,
  },
  { name: "Oval", img: `${storImagePath()}/Forevery/home/shape/oval.png` },
  {
    name: "Radiant",
    img: `${storImagePath()}/Forevery/home/shape/radiant.png`,
  },
  { name: "Pear", img: `${storImagePath()}/Forevery/home/shape/pear.jpg` },
  { name: "Emerald", img: `${storImagePath()}/Forevery/home/shape/emrald.png` },
  { name: "Heart", img: `${storImagePath()}/Forevery/home/shape/heart.png` },
];

export {
  SideItems,
  diamondShapes,
  NavbarMenu,
  CollectionData,
  CollectionArray,
  shapes
};
