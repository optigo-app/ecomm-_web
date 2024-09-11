import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./ChatMenu.modul.scss";
import { useMediaQuery } from "@mui/material";

const WhtasIcone = () => {

    const whatsappUrl = `https://web.whatsapp.com/send?phone=9899778849&text=Hello, Talk to a Jewellery expert now!`;
    const whatsappMobileUrl = `https://api.whatsapp.com/send?phone=9899778849&text=Hello,%20Talk%20to%20a%20Jewellery%20expert%20now!`;
    const isTablet = useMediaQuery('(min-width:600px) and (max-width:899px)');
  return (
    <div className="dt_main_ChatMenu">
      <button className="wai">
        <a
           href={isTablet ? whatsappMobileUrl : whatsappMobileUrl}
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

export default WhtasIcone;



// const WhtasIcone = () => {

//   const whatsappUrl = `https://web.whatsapp.com/send?phone=9899778849&text=Hello, Talk to a Jewellery expert now!`;
// return (
//   <div className="dt_Wths_main_ChatMenu">
//     <button className="wa">
//       <a
//         href={whatsappUrl}
//         target="_blank"
//       >
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png"
//           alt=""
//         />
//       </a>
//     </button>
//   </div>
// );
// };

// export default WhtasIcone;

