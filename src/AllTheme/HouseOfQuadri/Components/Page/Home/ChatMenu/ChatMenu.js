import "./ChatMenu.modul.scss";

const ChatMenu = () => {
  return (
    <div className="hoq_main_ChatMenu">
      <button className="wa">
        <a
          href="https://api.whatsapp.com/send?phone=1234567890"
          target="_blank"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png"
            alt=""
          />
        </a>
      </button>
      {/* <div className={`chatbar ${show ? "chartbar_show" : " "} `}>
        <div className="section">
          <div className="hello_wa">
            <h3>Hello</h3>
            <span>Whatsapp us for to know more.</span>
          </div>
          <div className="close_wa">
            <button onClick={() => setshow(!show)} className="close">
              <IoCloseOutline size={27} />
            </button>
          </div>
        </div>
        <div className="msg">
          <a
            href="https://api.whatsapp.com/send?phone=1234567890"
            target="_blank"
            onClick={() => setshow(false)}
          >
            <div className="dp_wa">
              <img src="https://i.ibb.co/5Kh11Qm/Male-1.jpg" alt="" />
            </div>
          </a>
          <div className="text_wa">
            <a
            style={{
              textDecoration : "none",
              color : "inherit"
            }}
              href="https://api.whatsapp.com/send?phone=1234567890"
              target="_blank"
              onClick={() => setshow(false)}
            >
              <h2>Cutsomer Care</h2>
              <span>Diamond Expert</span>
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ChatMenu;
