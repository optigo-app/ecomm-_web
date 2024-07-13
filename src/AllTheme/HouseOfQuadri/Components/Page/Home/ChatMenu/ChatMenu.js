import "./ChatMenu.modul.scss";
import { useState } from "react";

const ChatMenu = () => {
  const [show, setshow] = useState(false);
  return (
    <div className="hoq_main_ChatMenu">
      {!show && (
        <button onClick={() => setshow(!show)} className="wa">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png"
            alt=""
          />
        </button>
      )}

      <div className={`chatbar ${show ? "chartbar_show" : " "} `}>
        <button onClick={() => setshow(!show)} className="close">
          x
        </button>
      </div>
    </div>
  );
};

export default ChatMenu;
