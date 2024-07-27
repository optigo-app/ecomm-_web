import { IoVideocamOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { storImagePath } from "../../../../utils/Glob_Functions/GlobalFunction";

// \images\HomePage\socialmedia
// url:`${storImagePath()}/images/HomePage/slider/1.webp` ,

export const socialLink = [
  {
    img: `${storImagePath()}/images/HomePage/socialmedia/1.jpg`,
    icon: <IoVideocamOutline size={24} />,
  },
  {
    img: `${storImagePath()}/images/HomePage/socialmedia/2.jpg`,
    icon: <IoVideocamOutline  size={24}/>,
  },
  {
    img:`${storImagePath()}/images/HomePage/socialmedia/3.jpg`,
    icon: <FaInstagram  size={24}/>,
  },
  {
    img: `${storImagePath()}/images/HomePage/socialmedia/4.jpg`,
    icon: <FaInstagram size={24} />,
  },
];
