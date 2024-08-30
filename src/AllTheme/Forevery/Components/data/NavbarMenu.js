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
    link: "lab-created-engagement-rings",
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
    link: "diamond",
  },
  {
    category: "High End Jewelry",
    link: "p/M_F_D_CS/Rebellious/?M=UmViZWxsaW91cy9jb2xsZWN0aW9u",
  },
  {
    category: "Fine Jewelry",
    link: "lab-grown-fine-jewelry",
  },
  {
    category: "Letter Diamonds",
    link: "letter-diamonds/all",
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
    link: `/p/M_F_D_CS/Rebellious/?M=UmViZWxsaW91cy9jb2xsZWN0aW9u`,
  },
  {
    name: "heritage",
    img: `${storImagePath()}/Forevery/collections/heritage-banner.webp`,
    link: `/p/Width/B/?M=Qi9jb2xsZWN0aW9u`,
  },
  {
    name: "Icon",
    img: `${storImagePath()}/Forevery/collections/icon-banner.webp`,
    link: `/p/M_CS/Artifact/?M=QXJ0aWZhY3QvY29sbGVjdGlvbg==`,
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

const DiamondLists = [
  { img: `${storImagePath()}/Forevery/home/shape-ew/r.png`, name: "Round" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/p.png`, name: "Princess" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/c.png`, name: "Cushion" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/e.png`, name: "Emerald" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/o.png`, name: "Oval" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/rad.png`, name: "Radiant" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/as.png`, name: "Asscher" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/m.png`, name: "Marquise" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/hea.png`, name: "Heart" },
  { img: `${storImagePath()}/Forevery/home/shape-ew/pear.png`, name: "Pear" },
  {
    img: `${storImagePath()}/Forevery/home/shape-ew/bag.png`,
    name: "Baguette",
  },
  { img: `${storImagePath()}/Forevery/home/shape-ew/kite.png`, name: "Kite" },
  {
    img: `${storImagePath()}/Forevery/home/shape-ew/shield.png`,
    name: "Shield",
  },
];

const StepImages = [
  {
    img: `${storImagePath()}/Forevery/diamondFilter/mount-diamond-icon.svg`,
    name: "Diamond",
    link: "diamond",
    eyeIcon: `${storImagePath()}/images/ProductListing/settingNav/eye.png`,
  },
  {
    img: `${storImagePath()}/Forevery/diamondFilter/mount-icon.svg`,
    img1: `${storImagePath()}/Forevery/diamondFilter/easrrings.png`,
    name: "Settings",
    link: "settings",
    eyeIcon: `${storImagePath()}/images/ProductListing/settingNav/eye.png`,
  },
  {
    img: `${storImagePath()}/Forevery/diamondFilter/complete-ring-icon.svg`,
    img1: `${storImagePath()}/Forevery/diamondFilter/easrrings.png`,
    name: "Rings",
    link: "ring",
    eyeIcon: `${storImagePath()}/images/ProductListing/settingNav/eye.png`,
  },
];

const Image = `${storImagePath()}/Forevery/diamondFilter/8-1.png`;
const Video = `${storImagePath()}/Forevery/diamondFilter/video.mp4`;
const IMG = `${storImagePath()}/Forevery/diamondFilter/svg.png`;

const DiamondProductList = [
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    img: IMG,
    vid: Video,
    HaveCustomization: true,
  },
  {
    Banner: Image,
    HaveCustomization: false,
  },
];

const LooseDiamond = [
  {
    img: `${storImagePath()}/Forevery/diamond/new/asscher-diamond.png`,
    name: "Asscher",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/cushion-diamond.png`,
    name: "Cushion",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/emerald-diamond.png`,
    name: "Emerald",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/oval-diamond.png`,
    name: "Oval",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/round-diamond.png`,
    name: "Round",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/asscher-diamond.png`,
    name: "Asscher",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/cushion-diamond.png`,
    name: "Cushion",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/emerald-diamond.png`,
    name: "Emerald",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/oval-diamond.png`,
    name: "Oval",
  },
  {
    img: `${storImagePath()}/Forevery/diamond/new/round-diamond.png`,
    name: "Round",
  },
];
export {
  SideItems,
  diamondShapes,
  NavbarMenu,
  CollectionData,
  CollectionArray,
  shapes,
  DiamondLists,
  StepImages,
  DiamondProductList,
  LooseDiamond,
};


