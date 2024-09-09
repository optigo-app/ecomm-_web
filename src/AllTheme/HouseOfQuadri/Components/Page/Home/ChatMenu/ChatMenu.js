import { useMediaQuery } from "@mui/material";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./ChatMenu.modul.scss";

const ChatMenu = () => {

    const whatsappUrl = `https://web.whatsapp.com/send?phone=9099889962&text=Hello, Talk to a Jewellery expert now!`;
    const whatsappMobileUrl = `https://api.whatsapp.com/send?phone=9099889962&text=Hello,%20Talk%20to%20a%20Jewellery%20expert%20now!`;
    const isTablet = useMediaQuery('(min-width:600px) and (max-width:899px)');
  return (
    <div className="hoq_main_ChatMenu">
      <button className="wa">
        <a
           href={isTablet ? whatsappUrl : whatsappMobileUrl}
          target="_blank"
        >
          <img
            src={`${storImagePath()}/images/wa.png`}
            alt=""
          />
        </a>
      </button>
    </div>
  );
};

export default ChatMenu;
